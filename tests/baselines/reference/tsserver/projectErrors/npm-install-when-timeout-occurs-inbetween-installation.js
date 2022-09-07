Info 0    [16:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:24.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/main.ts",
        "projectRootPath": "/user/username/projects/myproject"
      }
    }
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:25.000] Search path: /user/username/projects/myproject/src
Info 3    [16:00:26.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [16:00:27.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [16:00:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [16:00:29.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 7    [16:00:30.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 8    [16:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:33.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:34.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 12   [16:00:35.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [16:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [16:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [16:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [16:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [16:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 18   [16:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 19   [16:00:42.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [16:00:43.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 21   [16:00:44.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/main.ts
	  Matched by default include pattern '**/*'

Info 22   [16:00:45.000] -----------------------------------------------
Info 23   [16:00:46.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 24   [16:00:47.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":36,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 25   [16:00:48.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 26   [16:00:49.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 26   [16:00:50.000] 	Files (2)

Info 26   [16:00:51.000] -----------------------------------------------
Info 26   [16:00:52.000] Open files: 
Info 26   [16:00:53.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 26   [16:00:54.000] 		Projects: /user/username/projects/myproject/tsconfig.json

PolledWatches::
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
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

Info 26   [16:00:55.000] response:
    {
      "responseRequired": false
    }
Info 27   [16:00:56.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/main.ts"
        ]
      },
      "seq": 1,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
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


PolledWatches::
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
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

Info 28   [16:00:57.000] response:
    {
      "responseRequired": false
    }
Info 29   [16:00:58.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 30   [16:00:59.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":36},"text":"Cannot find module '@angular/core' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Info 31   [16:01:00.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 32   [16:01:01.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Info 33   [16:01:04.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 34   [16:01:05.000] Scheduled: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info 35   [16:01:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 36   [16:01:07.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 37   [16:01:08.000] Scheduled: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 38   [16:01:09.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 39   [16:01:10.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 40   [16:01:11.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 41   [16:01:12.000] Scheduled: *ensureProjectForOpenFiles*
Info 42   [16:01:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 43   [16:01:16.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 44   [16:01:17.000] Scheduled: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 45   [16:01:18.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [16:01:19.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 47   [16:01:20.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 48   [16:01:21.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 49   [16:01:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 50   [16:01:25.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 51   [16:01:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 52   [16:01:27.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 53   [16:01:28.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@babel
Info 54   [16:01:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 55   [16:01:32.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 56   [16:01:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 57   [16:01:34.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 58   [16:01:35.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f
Info 59   [16:01:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 60   [16:01:39.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 61   [16:01:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 62   [16:01:41.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 63   [16:01:42.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/core-js-db53158d
Info 64   [16:01:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 65   [16:01:44.000] Running: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info 66   [16:01:45.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 67   [16:01:46.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 68   [16:01:47.000] Running: /user/username/projects/myproject/tsconfig.json
Info 69   [16:01:48.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 70   [16:01:49.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 71   [16:01:50.000] Different program with same set of files
Info 72   [16:01:51.000] Running: *ensureProjectForOpenFiles*
Info 73   [16:01:52.000] Before ensureProjectForOpenFiles:
Info 74   [16:01:53.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 74   [16:01:54.000] 	Files (2)

Info 74   [16:01:55.000] -----------------------------------------------
Info 74   [16:01:56.000] Open files: 
Info 74   [16:01:57.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 74   [16:01:58.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 74   [16:01:59.000] After ensureProjectForOpenFiles:
Info 75   [16:02:00.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 75   [16:02:01.000] 	Files (2)

Info 75   [16:02:02.000] -----------------------------------------------
Info 75   [16:02:03.000] Open files: 
Info 75   [16:02:04.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 75   [16:02:05.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 75   [16:02:06.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/main.ts
Info 76   [16:02:07.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/myproject/src/main.ts"]}}
Info 77   [16:02:08.000] request:
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

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 78   [16:02:09.000] response:
    {
      "responseRequired": false
    }
Info 79   [16:02:10.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 80   [16:02:11.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":36},"text":"Cannot find module '@angular/core' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Info 81   [16:02:12.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 82   [16:02:13.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Info 83   [16:02:16.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 84   [16:02:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 85   [16:02:18.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 86   [16:02:19.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular
Info 87   [16:02:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 88   [16:02:23.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 89   [16:02:24.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 90   [16:02:25.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 91   [16:02:26.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a
Info 92   [16:02:27.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 93   [16:02:32.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 94   [16:02:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 95   [16:02:34.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 96   [16:02:35.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05
Info 97   [16:02:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 98   [16:02:38.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 99   [16:02:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 100  [16:02:40.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 101  [16:02:41.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models
Info 102  [16:02:42.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 103  [16:02:44.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 104  [16:02:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 105  [16:02:46.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 106  [16:02:47.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts
Info 107  [16:02:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 108  [16:02:52.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 109  [16:02:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 110  [16:02:54.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 111  [16:02:55.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf
Info 112  [16:02:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 113  [16:02:58.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 114  [16:02:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 115  [16:03:00.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 116  [16:03:01.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts
Info 117  [16:03:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 118  [16:03:03.000] request:
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
//// [/user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts]
export const x = 10;

//// [/user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts]
export const y = 10;


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 119  [16:03:04.000] response:
    {
      "responseRequired": false
    }
Info 120  [16:03:05.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 121  [16:03:06.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":36},"text":"Cannot find module '@angular/core' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Info 122  [16:03:07.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 123  [16:03:08.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Info 124  [16:03:15.000] request:
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
//// [/user/username/projects/myproject/node_modules/@angular/core/index.d.ts]
export const y = 10;


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 125  [16:03:16.000] response:
    {
      "responseRequired": false
    }
Info 126  [16:03:17.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 127  [16:03:18.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[{"start":{"line":1,"offset":21},"end":{"line":1,"offset":36},"text":"Cannot find module '@angular/core' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Info 128  [16:03:19.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 129  [16:03:20.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":4}}
Info 130  [16:03:22.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 131  [16:03:23.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 132  [16:03:24.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 133  [16:03:25.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts
Info 134  [16:03:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 135  [16:03:28.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 136  [16:03:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 137  [16:03:30.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 138  [16:03:31.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models
Info 139  [16:03:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 140  [16:03:34.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 141  [16:03:35.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 142  [16:03:36.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 143  [16:03:37.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05
Info 144  [16:03:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05 :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 145  [16:03:40.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 146  [16:03:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 147  [16:03:42.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 148  [16:03:43.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts
Info 149  [16:03:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 150  [16:03:46.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 151  [16:03:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 152  [16:03:48.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 153  [16:03:49.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf
Info 154  [16:03:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 155  [16:03:52.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 156  [16:03:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 157  [16:03:54.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 158  [16:03:55.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a
Info 159  [16:03:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular/platform-browser-dynamic-5efaaa1a :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 160  [16:03:58.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 161  [16:03:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 162  [16:04:00.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 163  [16:04:01.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@angular
Info 164  [16:04:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@angular :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 165  [16:04:04.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 166  [16:04:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 167  [16:04:06.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 168  [16:04:07.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f
Info 169  [16:04:08.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel/helper-plugin-utils-a06c629f :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 170  [16:04:10.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 171  [16:04:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 172  [16:04:12.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 173  [16:04:13.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/@babel
Info 174  [16:04:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/@babel :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 175  [16:04:16.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 176  [16:04:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 177  [16:04:18.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 178  [16:04:19.000] Project: /user/username/projects/myproject/tsconfig.json Detected ignored path: /user/username/projects/myproject/node_modules/.staging/core-js-db53158d
Info 179  [16:04:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging/core-js-db53158d :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 180  [16:04:22.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 181  [16:04:23.000] Scheduled: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info 182  [16:04:24.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 183  [16:04:25.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 184  [16:04:26.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 185  [16:04:27.000] Scheduled: *ensureProjectForOpenFiles*
Info 186  [16:04:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/.staging :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 187  [16:04:29.000] Running: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info 188  [16:04:30.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 189  [16:04:31.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 190  [16:04:32.000] Running: /user/username/projects/myproject/tsconfig.json
Info 191  [16:04:33.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 192  [16:04:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 193  [16:04:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 194  [16:04:36.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 195  [16:04:37.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 196  [16:04:38.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/node_modules/@angular/core/index.d.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	node_modules/@angular/core/index.d.ts
	  Imported via '@angular/core' from file 'src/main.ts'
	src/main.ts
	  Matched by default include pattern '**/*'

Info 197  [16:04:39.000] -----------------------------------------------
Info 198  [16:04:40.000] Running: *ensureProjectForOpenFiles*
Info 199  [16:04:41.000] Before ensureProjectForOpenFiles:
Info 200  [16:04:42.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 200  [16:04:43.000] 	Files (3)

Info 200  [16:04:44.000] -----------------------------------------------
Info 200  [16:04:45.000] Open files: 
Info 200  [16:04:46.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 200  [16:04:47.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 200  [16:04:48.000] After ensureProjectForOpenFiles:
Info 201  [16:04:49.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 201  [16:04:50.000] 	Files (3)

Info 201  [16:04:51.000] -----------------------------------------------
Info 201  [16:04:52.000] Open files: 
Info 201  [16:04:53.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 201  [16:04:54.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 201  [16:04:55.000] got projects updated in background, updating diagnostics for /user/username/projects/myproject/src/main.ts
Info 202  [16:04:56.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/user/username/projects/myproject/src/main.ts"]}}
Info 203  [16:04:57.000] request:
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
//// [/user/username/projects/myproject/node_modules/.staging/@angular/cli-c1e44b05/models/analytics.d.ts] deleted
//// [/user/username/projects/myproject/node_modules/.staging/@angular/core-0963aebf/index.d.ts] deleted

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
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

Info 204  [16:04:58.000] response:
    {
      "responseRequired": false
    }
Info 205  [16:04:59.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 206  [16:05:00.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 207  [16:05:01.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 208  [16:05:02.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":5}}