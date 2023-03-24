currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/referenceFile1.ts]

                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();

//// [/a/b/tsconfig.json]
{}


Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/referenceFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] Search path: /a/b
Info 3    [00:00:14.000] For info: /a/b/referenceFile1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:15.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:17.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/referenceFile1.ts to open"}}
Info 7    [00:00:18.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/referenceFile1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 8    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:21.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 11   [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/b/modulefile2.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 12   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 13   [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [00:00:26.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:28.000] 	Files (1)
	/a/b/referenceFile1.ts SVC-1-0 "\n                    /// <reference path=\"./moduleFile2.ts\" />\n                    export var x = Foo();"


	referenceFile1.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:29.000] -----------------------------------------------
Info 19   [00:00:30.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 20   [00:00:31.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":104,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 21   [00:00:32.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/referenceFile1.ts","configFile":"/a/b/tsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
Info 22   [00:00:33.000] Project '/a/b/tsconfig.json' (Configured)
Info 22   [00:00:34.000] 	Files (1)

Info 22   [00:00:35.000] -----------------------------------------------
Info 22   [00:00:36.000] Open files: 
Info 22   [00:00:37.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 22   [00:00:38.000] 		Projects: /a/b/tsconfig.json
Info 22   [00:00:39.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/modulefile2.ts: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Info 23   [00:00:45.000] FileWatcher:: Triggered with /a/lib/lib.d.ts 0:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 24   [00:00:46.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 25   [00:00:47.000] Scheduled: /a/b/tsconfig.json
Info 26   [00:00:48.000] Scheduled: *ensureProjectForOpenFiles*
Info 27   [00:00:49.000] Elapsed:: *ms FileWatcher:: Triggered with /a/lib/lib.d.ts 0:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
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


PolledWatches::
/a/b/modulefile2.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 28   [00:00:51.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/a/b/referenceFile1.ts",
        "insertString": "\n                    /// <reference path=\"./moduleFile2.ts\" />\n                    export var x = Foo();export var yy = Foo();",
        "endLine": 1,
        "endOffset": 104,
        "line": 1,
        "offset": 1
      },
      "seq": 2,
      "type": "request"
    }
Info 29   [00:00:52.000] response:
    {
      "responseRequired": false
    }
After request

Before running timeout callbacks

Info 30   [00:00:53.000] Running: /a/b/tsconfig.json
Info 31   [00:00:54.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 32   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 33   [00:00:56.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [00:00:57.000] Project '/a/b/tsconfig.json' (Configured)
Info 35   [00:00:58.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/referenceFile1.ts SVC-1-1 "\n                    /// <reference path=\"./moduleFile2.ts\" />\n                    export var x = Foo();export var yy = Foo();;"


	../lib/lib.d.ts
	  Default library for target 'es5'
	referenceFile1.ts
	  Matched by default include pattern '**/*'

Info 36   [00:00:59.000] -----------------------------------------------
Info 37   [00:01:00.000] Running: *ensureProjectForOpenFiles*
Info 38   [00:01:01.000] Before ensureProjectForOpenFiles:
Info 39   [00:01:02.000] Project '/a/b/tsconfig.json' (Configured)
Info 39   [00:01:03.000] 	Files (2)

Info 39   [00:01:04.000] -----------------------------------------------
Info 39   [00:01:05.000] Open files: 
Info 39   [00:01:06.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 39   [00:01:07.000] 		Projects: /a/b/tsconfig.json
Info 39   [00:01:08.000] After ensureProjectForOpenFiles:
Info 40   [00:01:09.000] Project '/a/b/tsconfig.json' (Configured)
Info 40   [00:01:10.000] 	Files (2)

Info 40   [00:01:11.000] -----------------------------------------------
Info 40   [00:01:12.000] Open files: 
Info 40   [00:01:13.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 40   [00:01:14.000] 		Projects: /a/b/tsconfig.json
Info 40   [00:01:15.000] got projects updated in background, updating diagnostics for /a/b/referenceFile1.ts
Info 41   [00:01:16.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/referenceFile1.ts"]}}
After running timeout callbacks

PolledWatches::
/a/b/modulefile2.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 42   [00:01:19.000] FileWatcher:: Triggered with /a/b/modulefile2.ts 0:: WatchInfo: /a/b/modulefile2.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 43   [00:01:20.000] FileWatcher:: Close:: WatchInfo: /a/b/modulefile2.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 44   [00:01:21.000] Scheduled: /a/b/tsconfig.json
Info 45   [00:01:22.000] Scheduled: *ensureProjectForOpenFiles*
Info 46   [00:01:23.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/modulefile2.ts 0:: WatchInfo: /a/b/modulefile2.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 47   [00:01:24.000] DirectoryWatcher:: Triggered with /a/b/moduleFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 48   [00:01:25.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 49   [00:01:26.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 50   [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/a/b/moduleFile2.ts]
export var Foo4 = 10;


PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/modulefile2.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 51   [00:01:28.000] Running: /a/b/tsconfig.json
Info 52   [00:01:29.000] FileWatcher:: Added:: WatchInfo: /a/b/modulefile2.ts 500 undefined WatchType: Closed Script info
Info 53   [00:01:30.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 54   [00:01:31.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 55   [00:01:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 56   [00:01:33.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/moduleFile2.ts Text-1 "export var Foo4 = 10;"
	/a/b/referenceFile1.ts SVC-1-1 "\n                    /// <reference path=\"./moduleFile2.ts\" />\n                    export var x = Foo();export var yy = Foo();;"


	../lib/lib.d.ts
	  Default library for target 'es5'
	moduleFile2.ts
	  Referenced via './moduleFile2.ts' from file 'referenceFile1.ts'
	  Matched by default include pattern '**/*'
	referenceFile1.ts
	  Matched by default include pattern '**/*'

Info 57   [00:01:34.000] -----------------------------------------------
Info 58   [00:01:35.000] Running: *ensureProjectForOpenFiles*
Info 59   [00:01:36.000] Before ensureProjectForOpenFiles:
Info 60   [00:01:37.000] Project '/a/b/tsconfig.json' (Configured)
Info 60   [00:01:38.000] 	Files (3)

Info 60   [00:01:39.000] -----------------------------------------------
Info 60   [00:01:40.000] Open files: 
Info 60   [00:01:41.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 60   [00:01:42.000] 		Projects: /a/b/tsconfig.json
Info 60   [00:01:43.000] After ensureProjectForOpenFiles:
Info 61   [00:01:44.000] Project '/a/b/tsconfig.json' (Configured)
Info 61   [00:01:45.000] 	Files (3)

Info 61   [00:01:46.000] -----------------------------------------------
Info 61   [00:01:47.000] Open files: 
Info 61   [00:01:48.000] 	FileName: /a/b/referenceFile1.ts ProjectRootPath: undefined
Info 61   [00:01:49.000] 		Projects: /a/b/tsconfig.json
Info 61   [00:01:50.000] got projects updated in background, updating diagnostics for /a/b/referenceFile1.ts
Info 62   [00:01:51.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/referenceFile1.ts"]}}
After running timeout callbacks

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/modulefile2.ts: *new*
  {}

FsWatchesRecursive::
/a/b:
  {}
