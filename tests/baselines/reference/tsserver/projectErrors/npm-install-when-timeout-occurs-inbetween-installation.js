Info 0    [00:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/src/main.ts]
import * as _a from '@angular/core';

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

//// [/user/username/projects/myproject/tsconfig.json]
{}


Info 1    [00:00:24.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/main.ts",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:25.000] Search path: /user/username/projects/myproject/src
Info 3    [00:00:26.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:27.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:29.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 7    [00:00:30.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 8    [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:33.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 11   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 19   [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 20   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 21   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 22   [00:00:45.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:46.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 24   [00:00:47.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/main.ts SVC-1-0 "import * as _a from '@angular/core';"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/main.ts
	  Matched by default include pattern '**/*'

Info 25   [00:00:48.000] -----------------------------------------------
Info 26   [00:00:49.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 27   [00:00:50.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":36,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 28   [00:00:51.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 29   [00:00:52.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 29   [00:00:53.000] 	Files (2)

Info 29   [00:00:54.000] -----------------------------------------------
Info 29   [00:00:55.000] Open files: 
Info 29   [00:00:56.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 29   [00:00:57.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 29   [00:00:58.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}

Before request

Info 30   [00:00:59.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/main.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info 31   [00:01:00.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 32   [00:01:01.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 33   [00:01:02.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":36},"text":"Cannot find module '@angular/core' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 34   [00:01:03.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 35   [00:01:04.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)

Info 36   [00:01:07.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 37   [00:01:08.000] Scheduled: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info 38   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 39   [00:01:10.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 40   [00:01:11.000] Scheduled: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 41   [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 42   [00:01:13.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 43   [00:01:14.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 44   [00:01:15.000] Scheduled: *ensureProjectForOpenFiles*
Info 45   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 46   [00:01:19.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 47   [00:01:20.000] Scheduled: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 48   [00:01:21.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 49   [00:01:22.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 50   [00:01:23.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 51   [00:01:24.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 52   [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 53   [00:01:28.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 54   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 55   [00:01:30.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 56   [00:01:31.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@babel
Info 57   [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 58   [00:01:35.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 59   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 60   [00:01:37.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 61   [00:01:38.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f
Info 62   [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 63   [00:01:42.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 64   [00:01:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 65   [00:01:44.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 66   [00:01:45.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/core-js-db53158d
Info 67   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (3) and running

PolledWatches::
/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules: *new*
  {}

Info 68   [00:01:47.000] Running: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info 69   [00:01:48.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 70   [00:01:49.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After checking timeout queue length (3) and running

Before checking timeout queue length (2) and running

Info 71   [00:01:50.000] Running: /user/username/projects/myproject/tsconfig.json
Info 72   [00:01:51.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 73   [00:01:52.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 74   [00:01:53.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 75   [00:01:54.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/main.ts SVC-1-0 "import * as _a from '@angular/core';"

Info 76   [00:01:55.000] -----------------------------------------------
Info 77   [00:01:56.000] Running: *ensureProjectForOpenFiles*
Info 78   [00:01:57.000] Before ensureProjectForOpenFiles:
Info 79   [00:01:58.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 79   [00:01:59.000] 	Files (2)

Info 79   [00:02:00.000] -----------------------------------------------
Info 79   [00:02:01.000] Open files: 
Info 79   [00:02:02.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 79   [00:02:03.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 79   [00:02:04.000] After ensureProjectForOpenFiles:
Info 80   [00:02:05.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 80   [00:02:06.000] 	Files (2)

Info 80   [00:02:07.000] -----------------------------------------------
Info 80   [00:02:08.000] Open files: 
Info 80   [00:02:09.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 80   [00:02:10.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 80   [00:02:11.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/main.ts
Info 81   [00:02:12.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/myproject/src/main.ts"]}}
After checking timeout queue length (2) and running

Before request

Info 82   [00:02:13.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/main.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 83   [00:02:14.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 84   [00:02:15.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 85   [00:02:16.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":36},"text":"Cannot find module '@angular/core' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 86   [00:02:17.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 87   [00:02:18.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)

Info 88   [00:02:21.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 89   [00:02:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 90   [00:02:23.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 91   [00:02:24.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular
Info 92   [00:02:25.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 93   [00:02:28.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 94   [00:02:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 95   [00:02:30.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 96   [00:02:31.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a
Info 97   [00:02:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 98   [00:02:37.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 99   [00:02:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 100  [00:02:39.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 101  [00:02:40.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05
Info 102  [00:02:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 103  [00:02:43.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 104  [00:02:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 105  [00:02:45.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 106  [00:02:46.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models
Info 107  [00:02:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 108  [00:02:49.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 109  [00:02:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 110  [00:02:51.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 111  [00:02:52.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts
Info 112  [00:02:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 113  [00:02:57.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 114  [00:02:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 115  [00:02:59.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 116  [00:03:00.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf
Info 117  [00:03:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 118  [00:03:03.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 119  [00:03:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 120  [00:03:05.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 121  [00:03:06.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts
Info 122  [00:03:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (0) and running
//// [/user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts]
export const x = 10;

//// [/user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts]
export const y = 10;


After checking timeout queue length (0) and running

Before request

Info 123  [00:03:08.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/main.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info 124  [00:03:09.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 125  [00:03:10.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 126  [00:03:11.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":36},"text":"Cannot find module '@angular/core' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 127  [00:03:12.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 128  [00:03:13.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":4}}
Before running immediate callbacks and checking length (1)

Before checking timeout queue length (0) and running
//// [/user/username/projects/myproject/node_modules/@angular/core/index.d.ts]
export const y = 10;


After checking timeout queue length (0) and running

Before request

Info 129  [00:03:20.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/main.ts"
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info 130  [00:03:21.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 131  [00:03:22.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 132  [00:03:23.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":36},"text":"Cannot find module '@angular/core' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 133  [00:03:24.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 134  [00:03:25.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":5}}
Before running immediate callbacks and checking length (1)

Info 135  [00:03:27.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 136  [00:03:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 137  [00:03:29.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 138  [00:03:30.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts
Info 139  [00:03:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 140  [00:03:33.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 141  [00:03:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 142  [00:03:35.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 143  [00:03:36.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models
Info 144  [00:03:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 145  [00:03:39.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 146  [00:03:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 147  [00:03:41.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 148  [00:03:42.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05
Info 149  [00:03:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 150  [00:03:45.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 151  [00:03:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 152  [00:03:47.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 153  [00:03:48.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts
Info 154  [00:03:49.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 155  [00:03:51.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 156  [00:03:52.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 157  [00:03:53.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 158  [00:03:54.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf
Info 159  [00:03:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 160  [00:03:57.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 161  [00:03:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 162  [00:03:59.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 163  [00:04:00.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a
Info 164  [00:04:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 165  [00:04:03.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 166  [00:04:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 167  [00:04:05.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 168  [00:04:06.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular
Info 169  [00:04:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 170  [00:04:09.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 171  [00:04:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 172  [00:04:11.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 173  [00:04:12.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f
Info 174  [00:04:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 175  [00:04:15.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 176  [00:04:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 177  [00:04:17.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 178  [00:04:18.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@babel
Info 179  [00:04:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 180  [00:04:21.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 181  [00:04:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 182  [00:04:23.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 183  [00:04:24.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/core-js-db53158d
Info 184  [00:04:25.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 185  [00:04:27.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 186  [00:04:28.000] Scheduled: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info 187  [00:04:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 188  [00:04:30.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 189  [00:04:31.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 190  [00:04:32.000] Scheduled: *ensureProjectForOpenFiles*
Info 191  [00:04:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (3) and running
//// [/user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts] deleted
//// [/user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts] deleted

Info 192  [00:04:34.000] Running: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info 193  [00:04:35.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 194  [00:04:36.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After checking timeout queue length (3) and running

Before checking timeout queue length (2) and running

Info 195  [00:04:37.000] Running: /user/username/projects/myproject/tsconfig.json
Info 196  [00:04:38.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 197  [00:04:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 198  [00:04:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 199  [00:04:41.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 200  [00:04:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 201  [00:04:43.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 202  [00:04:44.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 203  [00:04:45.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/node_modules/@angular/core/index.d.ts Text-1 "export const y = 10;"
	/user/username/projects/myproject/src/main.ts SVC-1-0 "import * as _a from '@angular/core';"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/@angular/core/index.d.ts
	  Imported via '@angular/core' from file 'src/main.ts'
	src/main.ts
	  Matched by default include pattern '**/*'

Info 204  [00:04:46.000] -----------------------------------------------
Info 205  [00:04:47.000] Running: *ensureProjectForOpenFiles*
Info 206  [00:04:48.000] Before ensureProjectForOpenFiles:
Info 207  [00:04:49.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 207  [00:04:50.000] 	Files (3)

Info 207  [00:04:51.000] -----------------------------------------------
Info 207  [00:04:52.000] Open files: 
Info 207  [00:04:53.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 207  [00:04:54.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 207  [00:04:55.000] After ensureProjectForOpenFiles:
Info 208  [00:04:56.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 208  [00:04:57.000] 	Files (3)

Info 208  [00:04:58.000] -----------------------------------------------
Info 208  [00:04:59.000] Open files: 
Info 208  [00:05:00.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 208  [00:05:01.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 208  [00:05:02.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/main.ts
Info 209  [00:05:03.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/myproject/src/main.ts"]}}
After checking timeout queue length (2) and running

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Before request

Info 210  [00:05:04.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/main.ts"
        ]
      },
      "seq": 6,
      "type": "request"
    }
Info 211  [00:05:05.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 212  [00:05:06.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 213  [00:05:07.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 214  [00:05:08.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 215  [00:05:09.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":6}}
Before running immediate callbacks and checking length (1)
