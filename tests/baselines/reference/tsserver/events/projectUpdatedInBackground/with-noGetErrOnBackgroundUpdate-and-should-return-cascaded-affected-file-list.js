Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/a/b/tsconfig.json]
{}


Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1Consumer1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] Search path: /a/b
Info 3    [00:00:14.000] For info: /a/b/file1Consumer1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:15.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:17.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/file1Consumer1.ts to open"}}
Info 7    [00:00:18.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1Consumer1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 8    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:21.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 11   [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile1 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile1 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 16   [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 17   [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 18   [00:00:29.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:00:30.000] Project '/a/b/tsconfig.json' (Configured)
Info 20   [00:00:31.000] 	Files (1)
	/a/b/file1Consumer1.ts SVC-1-0 "import {Foo} from \"./moduleFile1\"; export var y = 10;"


	file1Consumer1.ts
	  Matched by default include pattern '**/*'

Info 21   [00:00:32.000] -----------------------------------------------
Info 22   [00:00:33.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 23   [00:00:34.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":53,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 24   [00:00:35.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/file1Consumer1.ts","configFile":"/a/b/tsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
Info 25   [00:00:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 25   [00:00:37.000] 	Files (1)

Info 25   [00:00:38.000] -----------------------------------------------
Info 25   [00:00:39.000] Open files: 
Info 25   [00:00:40.000] 	FileName: /a/b/file1Consumer1.ts ProjectRootPath: undefined
Info 25   [00:00:41.000] 		Projects: /a/b/tsconfig.json
Info 25   [00:00:42.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/modulefile1: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Info 26   [00:00:46.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [00:00:47.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 28   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 29   [00:00:49.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 30   [00:00:50.000] Scheduled: /a/b/tsconfig.json
Info 31   [00:00:51.000] Scheduled: *ensureProjectForOpenFiles*
Info 32   [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 33   [00:00:55.000] DirectoryWatcher:: Triggered with /a/b/file1Consumer2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 34   [00:00:56.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 35   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/file1Consumer2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 36   [00:00:58.000] DirectoryWatcher:: Triggered with /a/b/file1Consumer2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 37   [00:00:59.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 38   [00:01:00.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 39   [00:01:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/file1Consumer2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 40   [00:01:04.000] DirectoryWatcher:: Triggered with /a/b/moduleFile2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 41   [00:01:05.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 42   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 43   [00:01:07.000] DirectoryWatcher:: Triggered with /a/b/moduleFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 44   [00:01:08.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 45   [00:01:09.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 46   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 47   [00:01:13.000] DirectoryWatcher:: Triggered with /a/b/file1Consumer1Consumer1.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 48   [00:01:14.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 49   [00:01:15.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/file1Consumer1Consumer1.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 50   [00:01:16.000] DirectoryWatcher:: Triggered with /a/b/file1Consumer1Consumer1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 51   [00:01:17.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 52   [00:01:18.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 53   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/file1Consumer1Consumer1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 54   [00:01:22.000] DirectoryWatcher:: Triggered with /a/b/globalFile3.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 55   [00:01:23.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 56   [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/globalFile3.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 57   [00:01:25.000] DirectoryWatcher:: Triggered with /a/b/globalFile3.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 58   [00:01:26.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 59   [00:01:27.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 60   [00:01:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/globalFile3.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 61   [00:01:33.000] FileWatcher:: Triggered with /a/lib/lib.d.ts 0:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 62   [00:01:34.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 63   [00:01:35.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 64   [00:01:36.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 65   [00:01:37.000] Elapsed:: *ms FileWatcher:: Triggered with /a/lib/lib.d.ts 0:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Before running timeout callbacks
//// [/a/b/moduleFile1.ts]
export function Foo() { };

//// [/a/b/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/a/b/moduleFile2.ts]
export var Foo4 = 10;

//// [/a/b/file1Consumer1Consumer1.ts]
import {y} from "./file1Consumer1";

//// [/a/b/globalFile3.ts]
interface GlobalFoo { age: number }

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
/a/b/modulefile1:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 66   [00:01:39.000] Running: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 67   [00:01:40.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 68   [00:01:41.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After running timeout callbacks

Before request

Info 69   [00:01:42.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/a/b/file1Consumer1.ts",
        "insertString": "import {Foo} from \"./moduleFile1\"; export var y = 10;export var T: number;",
        "endLine": 1,
        "endOffset": 53,
        "line": 1,
        "offset": 1
      },
      "seq": 2,
      "type": "request"
    }
Info 70   [00:01:43.000] response:
    {
      "responseRequired": false
    }
After request

Before running timeout callbacks

Info 71   [00:01:44.000] Running: /a/b/tsconfig.json
Info 72   [00:01:45.000] FileWatcher:: Added:: WatchInfo: /a/b/file1Consumer1Consumer1.ts 500 undefined WatchType: Closed Script info
Info 73   [00:01:46.000] FileWatcher:: Added:: WatchInfo: /a/b/file1Consumer2.ts 500 undefined WatchType: Closed Script info
Info 74   [00:01:47.000] FileWatcher:: Added:: WatchInfo: /a/b/globalFile3.ts 500 undefined WatchType: Closed Script info
Info 75   [00:01:48.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 76   [00:01:49.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile2.ts 500 undefined WatchType: Closed Script info
Info 77   [00:01:50.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 78   [00:01:51.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 79   [00:01:52.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile1 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 80   [00:01:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile1 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 81   [00:01:54.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 82   [00:01:55.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 83   [00:01:56.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 84   [00:01:57.000] Project '/a/b/tsconfig.json' (Configured)
Info 85   [00:01:58.000] 	Files (7)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/moduleFile1.ts Text-1 "export function Foo() { };"
	/a/b/file1Consumer1.ts SVC-1-1 "import {Foo} from \"./moduleFile1\"; export var y = 10;export var T: number;;"
	/a/b/file1Consumer1Consumer1.ts Text-1 "import {y} from \"./file1Consumer1\";"
	/a/b/file1Consumer2.ts Text-1 "import {Foo} from \"./moduleFile1\"; let z = 10;"
	/a/b/globalFile3.ts Text-1 "interface GlobalFoo { age: number }"
	/a/b/moduleFile2.ts Text-1 "export var Foo4 = 10;"


	../lib/lib.d.ts
	  Default library for target 'es5'
	moduleFile1.ts
	  Imported via "./moduleFile1" from file 'file1Consumer1.ts'
	  Imported via "./moduleFile1" from file 'file1Consumer2.ts'
	  Matched by default include pattern '**/*'
	file1Consumer1.ts
	  Matched by default include pattern '**/*'
	  Imported via "./file1Consumer1" from file 'file1Consumer1Consumer1.ts'
	file1Consumer1Consumer1.ts
	  Matched by default include pattern '**/*'
	file1Consumer2.ts
	  Matched by default include pattern '**/*'
	globalFile3.ts
	  Matched by default include pattern '**/*'
	moduleFile2.ts
	  Matched by default include pattern '**/*'

Info 86   [00:01:59.000] -----------------------------------------------
Info 87   [00:02:00.000] Running: *ensureProjectForOpenFiles*
Info 88   [00:02:01.000] Before ensureProjectForOpenFiles:
Info 89   [00:02:02.000] Project '/a/b/tsconfig.json' (Configured)
Info 89   [00:02:03.000] 	Files (7)

Info 89   [00:02:04.000] -----------------------------------------------
Info 89   [00:02:05.000] Open files: 
Info 89   [00:02:06.000] 	FileName: /a/b/file1Consumer1.ts ProjectRootPath: undefined
Info 89   [00:02:07.000] 		Projects: /a/b/tsconfig.json
Info 89   [00:02:08.000] After ensureProjectForOpenFiles:
Info 90   [00:02:09.000] Project '/a/b/tsconfig.json' (Configured)
Info 90   [00:02:10.000] 	Files (7)

Info 90   [00:02:11.000] -----------------------------------------------
Info 90   [00:02:12.000] Open files: 
Info 90   [00:02:13.000] 	FileName: /a/b/file1Consumer1.ts ProjectRootPath: undefined
Info 90   [00:02:14.000] 		Projects: /a/b/tsconfig.json
Info 90   [00:02:15.000] got projects updated in background, updating diagnostics for /a/b/file1Consumer1.ts
Info 91   [00:02:16.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/file1Consumer1.ts"]}}
After running timeout callbacks

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/modulefile1:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1consumer1.ts: *new*
  {}
/a/b/file1consumer2.ts: *new*
  {}
/a/b/globalfile3.ts: *new*
  {}
/a/b/modulefile1.ts: *new*
  {}
/a/b/modulefile2.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatches *deleted*::
/a/b:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 92   [00:02:20.000] FileWatcher:: Triggered with /a/b/moduleFile1.ts 1:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 93   [00:02:21.000] Scheduled: /a/b/tsconfig.json
Info 94   [00:02:22.000] Scheduled: *ensureProjectForOpenFiles*
Info 95   [00:02:23.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/moduleFile1.ts 1:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Before running timeout callbacks
//// [/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };


Info 96   [00:02:24.000] Running: /a/b/tsconfig.json
Info 97   [00:02:25.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 98   [00:02:26.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 99   [00:02:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 100  [00:02:28.000] 	Files (7)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/moduleFile1.ts Text-2 "export var T: number;export function Foo() { };"
	/a/b/file1Consumer1.ts SVC-1-1 "import {Foo} from \"./moduleFile1\"; export var y = 10;export var T: number;;"
	/a/b/file1Consumer1Consumer1.ts Text-1 "import {y} from \"./file1Consumer1\";"
	/a/b/file1Consumer2.ts Text-1 "import {Foo} from \"./moduleFile1\"; let z = 10;"
	/a/b/globalFile3.ts Text-1 "interface GlobalFoo { age: number }"
	/a/b/moduleFile2.ts Text-1 "export var Foo4 = 10;"

Info 101  [00:02:29.000] -----------------------------------------------
Info 102  [00:02:30.000] Running: *ensureProjectForOpenFiles*
Info 103  [00:02:31.000] Before ensureProjectForOpenFiles:
Info 104  [00:02:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 104  [00:02:33.000] 	Files (7)

Info 104  [00:02:34.000] -----------------------------------------------
Info 104  [00:02:35.000] Open files: 
Info 104  [00:02:36.000] 	FileName: /a/b/file1Consumer1.ts ProjectRootPath: undefined
Info 104  [00:02:37.000] 		Projects: /a/b/tsconfig.json
Info 104  [00:02:38.000] After ensureProjectForOpenFiles:
Info 105  [00:02:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 105  [00:02:40.000] 	Files (7)

Info 105  [00:02:41.000] -----------------------------------------------
Info 105  [00:02:42.000] Open files: 
Info 105  [00:02:43.000] 	FileName: /a/b/file1Consumer1.ts ProjectRootPath: undefined
Info 105  [00:02:44.000] 		Projects: /a/b/tsconfig.json
Info 105  [00:02:45.000] got projects updated in background, updating diagnostics for /a/b/file1Consumer1.ts
Info 106  [00:02:46.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/file1Consumer1.ts"]}}
After running timeout callbacks

Before request

Info 107  [00:02:47.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/a/b/file1Consumer1.ts",
        "insertString": "import {Foo} from \"./moduleFile1\"; export var y = 10;export var T: number;export var T2: number;",
        "endLine": 1,
        "endOffset": 74,
        "line": 1,
        "offset": 1
      },
      "seq": 3,
      "type": "request"
    }
Info 108  [00:02:48.000] response:
    {
      "responseRequired": false
    }
After request

Info 109  [00:02:52.000] FileWatcher:: Triggered with /a/b/moduleFile1.ts 1:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 110  [00:02:53.000] Scheduled: /a/b/tsconfig.json
Info 111  [00:02:54.000] Scheduled: *ensureProjectForOpenFiles*
Info 112  [00:02:55.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/moduleFile1.ts 1:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Before running timeout callbacks
//// [/a/b/moduleFile1.ts]
export var T2: number;export function Foo() { };


Info 113  [00:02:56.000] Running: /a/b/tsconfig.json
Info 114  [00:02:57.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 115  [00:02:58.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 4 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 116  [00:02:59.000] Project '/a/b/tsconfig.json' (Configured)
Info 117  [00:03:00.000] 	Files (7)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/moduleFile1.ts Text-3 "export var T2: number;export function Foo() { };"
	/a/b/file1Consumer1.ts SVC-1-2 "import {Foo} from \"./moduleFile1\"; export var y = 10;export var T: number;export var T2: number;;;"
	/a/b/file1Consumer1Consumer1.ts Text-1 "import {y} from \"./file1Consumer1\";"
	/a/b/file1Consumer2.ts Text-1 "import {Foo} from \"./moduleFile1\"; let z = 10;"
	/a/b/globalFile3.ts Text-1 "interface GlobalFoo { age: number }"
	/a/b/moduleFile2.ts Text-1 "export var Foo4 = 10;"

Info 118  [00:03:01.000] -----------------------------------------------
Info 119  [00:03:02.000] Running: *ensureProjectForOpenFiles*
Info 120  [00:03:03.000] Before ensureProjectForOpenFiles:
Info 121  [00:03:04.000] Project '/a/b/tsconfig.json' (Configured)
Info 121  [00:03:05.000] 	Files (7)

Info 121  [00:03:06.000] -----------------------------------------------
Info 121  [00:03:07.000] Open files: 
Info 121  [00:03:08.000] 	FileName: /a/b/file1Consumer1.ts ProjectRootPath: undefined
Info 121  [00:03:09.000] 		Projects: /a/b/tsconfig.json
Info 121  [00:03:10.000] After ensureProjectForOpenFiles:
Info 122  [00:03:11.000] Project '/a/b/tsconfig.json' (Configured)
Info 122  [00:03:12.000] 	Files (7)

Info 122  [00:03:13.000] -----------------------------------------------
Info 122  [00:03:14.000] Open files: 
Info 122  [00:03:15.000] 	FileName: /a/b/file1Consumer1.ts ProjectRootPath: undefined
Info 122  [00:03:16.000] 		Projects: /a/b/tsconfig.json
Info 122  [00:03:17.000] got projects updated in background, updating diagnostics for /a/b/file1Consumer1.ts
Info 123  [00:03:18.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/file1Consumer1.ts"]}}
After running timeout callbacks
