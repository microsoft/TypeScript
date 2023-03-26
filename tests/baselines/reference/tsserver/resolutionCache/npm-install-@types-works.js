currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info 1    [00:00:18.000] request:
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
Info 2    [00:00:19.000] Search path: /a/b/projects/temp
Info 3    [00:00:20.000] For info: /a/b/projects/temp/a.ts :: No config files found.
Info 4    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:23.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 7    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 9    [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 10   [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:29.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:31.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/projects/temp/a.ts SVC-1-0 "import f = require(\"pad\"); f;"


	../../../lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Root file specified for compilation

Info 15   [00:00:32.000] -----------------------------------------------
Info 16   [00:00:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:34.000] 	Files (2)

Info 16   [00:00:35.000] -----------------------------------------------
Info 16   [00:00:36.000] Open files: 
Info 16   [00:00:37.000] 	FileName: /a/b/projects/temp/a.ts ProjectRootPath: /a/b/projects/temp
Info 16   [00:00:38.000] 		Projects: /dev/null/inferredProject1*
Info 16   [00:00:39.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/projects/temp/tsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules: *new*
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 17   [00:00:40.000] request:
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
Info 18   [00:00:41.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 19   [00:00:42.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 20   [00:00:43.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[{"start":{"line":1,"offset":20},"end":{"line":1,"offset":25},"text":"Cannot find module 'pad' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 21   [00:00:44.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[]}}
Info 22   [00:00:45.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)

Info 23   [00:00:51.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 24   [00:00:52.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation
Info 25   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 26   [00:00:54.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 27   [00:00:55.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 28   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 29   [00:00:58.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 30   [00:00:59.000] Scheduled: /dev/null/inferredProject1*
Info 31   [00:01:00.000] Scheduled: *ensureProjectForOpenFiles*
Info 32   [00:01:01.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 33   [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 34   [00:01:03.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 35   [00:01:04.000] Scheduled: /dev/null/inferredProject1*, Cancelled earlier one
Info 36   [00:01:05.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 37   [00:01:06.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 38   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 39   [00:01:08.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 40   [00:01:09.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 41   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 42   [00:01:12.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types/pad :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 43   [00:01:13.000] Scheduled: /dev/null/inferredProject1*, Cancelled earlier one
Info 44   [00:01:14.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 45   [00:01:15.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 46   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types/pad :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 47   [00:01:17.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types/pad :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 48   [00:01:18.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 49   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types/pad :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/a/b/projects/temp/node_modules/@types/pad/index.d.ts]
export = pad;declare function pad(length: number, text: string, char ?: string): string;


PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/temp/node_modules: *new*
  {}
/a/b/projects/temp/node_modules/@types: *new*
  {}

Info 50   [00:01:21.000] Running: /dev/null/inferredProject1*
Info 51   [00:01:22.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 52   [00:01:23.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 53   [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 54   [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 55   [00:01:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 56   [00:01:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 57   [00:01:28.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/projects/temp/node_modules/@types/pad/index.d.ts Text-1 "export = pad;declare function pad(length: number, text: string, char ?: string): string;"
	/a/b/projects/temp/a.ts SVC-1-0 "import f = require(\"pad\"); f;"


	../../../lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/@types/pad/index.d.ts
	  Imported via "pad" from file 'a.ts'
	  Entry point for implicit type library 'pad'
	a.ts
	  Root file specified for compilation

Info 58   [00:01:29.000] -----------------------------------------------
After running timeout callbacks

Before running timeout callbacks

Info 59   [00:01:30.000] Running: *ensureProjectForOpenFiles*
Info 60   [00:01:31.000] Before ensureProjectForOpenFiles:
Info 61   [00:01:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 61   [00:01:33.000] 	Files (3)

Info 61   [00:01:34.000] -----------------------------------------------
Info 61   [00:01:35.000] Open files: 
Info 61   [00:01:36.000] 	FileName: /a/b/projects/temp/a.ts ProjectRootPath: /a/b/projects/temp
Info 61   [00:01:37.000] 		Projects: /dev/null/inferredProject1*
Info 61   [00:01:38.000] After ensureProjectForOpenFiles:
Info 62   [00:01:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 62   [00:01:40.000] 	Files (3)

Info 62   [00:01:41.000] -----------------------------------------------
Info 62   [00:01:42.000] Open files: 
Info 62   [00:01:43.000] 	FileName: /a/b/projects/temp/a.ts ProjectRootPath: /a/b/projects/temp
Info 62   [00:01:44.000] 		Projects: /dev/null/inferredProject1*
Info 62   [00:01:45.000] got projects updated in background, updating diagnostics for /a/b/projects/temp/a.ts
Info 63   [00:01:46.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/projects/temp/a.ts"]}}
After running timeout callbacks

Before running timeout callbacks

Info 64   [00:01:47.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[]}}
After running timeout callbacks

Before running immediate callbacks

Info 65   [00:01:48.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[]}}
Before running immediate callbacks
