Info 0    [16:00:24.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:25.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/Logger.ts",
        "projectRootPath": "/user/username/projects/myproject"
      }
    }
//// [/user/username/projects/myproject/Logger.ts]
export class logger { }

//// [/user/username/projects/myproject/another.ts]
import { logger } from "./Logger"; new logger();

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"forceConsistentCasingInFileNames":true}}

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

Info 2    [16:00:26.000] Search path: /user/username/projects/myproject
Info 3    [16:00:27.000] For info: /user/username/projects/myproject/Logger.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [16:00:28.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [16:00:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [16:00:30.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/Logger.ts to open"}}
Info 7    [16:00:31.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/Logger.ts",
  "/user/username/projects/myproject/another.ts"
 ],
 "options": {
  "forceConsistentCasingInFileNames": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 8    [16:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:34.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/another.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:36.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 13   [16:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [16:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [16:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 16   [16:00:40.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [16:00:41.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 18   [16:00:42.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/Logger.ts
	/user/username/projects/myproject/another.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	Logger.ts
	  Matched by default include pattern '**/*'
	  Imported via "./Logger" from file 'another.ts'
	another.ts
	  Matched by default include pattern '**/*'

Info 19   [16:00:43.000] -----------------------------------------------
Info 20   [16:00:44.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 21   [16:00:45.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":71,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"forceConsistentCasingInFileNames":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 22   [16:00:46.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/Logger.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 23   [16:00:47.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 23   [16:00:48.000] 	Files (3)

Info 23   [16:00:49.000] -----------------------------------------------
Info 23   [16:00:50.000] Open files: 
Info 23   [16:00:51.000] 	FileName: /user/username/projects/myproject/Logger.ts ProjectRootPath: /user/username/projects/myproject
Info 23   [16:00:52.000] 		Projects: /user/username/projects/myproject/tsconfig.json

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/another.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 23   [16:00:53.000] response:
    {
      "responseRequired": false
    }
Info 24   [16:00:54.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/Logger.ts"
        ]
      },
      "seq": 1,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/another.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/another.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 25   [16:00:55.000] response:
    {
      "responseRequired": false
    }
Info 26   [16:00:56.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/Logger.ts","diagnostics":[]}}
Info 27   [16:00:57.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/Logger.ts","diagnostics":[]}}
Info 28   [16:00:58.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/Logger.ts","diagnostics":[]}}
Info 29   [16:00:59.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Info 30   [16:01:01.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/Logger.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 31   [16:01:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/Logger.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 32   [16:01:05.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/logger.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 33   [16:01:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/logger.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 34   [16:01:07.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/Logger.ts"
      }
    }
//// [/user/username/projects/myproject/logger.ts] file was renamed from file /user/username/projects/myproject/Logger.ts

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/another.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 35   [16:01:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/Logger.ts 500 undefined WatchType: Closed Script info
Info 36   [16:01:09.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 36   [16:01:10.000] 	Files (3)

Info 36   [16:01:11.000] -----------------------------------------------
Info 36   [16:01:12.000] Open files: 

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/another.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/logger.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 36   [16:01:13.000] response:
    {
      "responseRequired": false
    }
Info 37   [16:01:14.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/logger.ts",
        "projectRootPath": "/user/username/projects/myproject"
      }
    }

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/another.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/logger.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 38   [16:01:15.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/Logger.ts 500 undefined WatchType: Closed Script info
Info 39   [16:01:16.000] Search path: /user/username/projects/myproject
Info 40   [16:01:17.000] For info: /user/username/projects/myproject/Logger.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 41   [16:01:18.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 42   [16:01:19.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 43   [16:01:20.000] Different program with same set of files
Info 44   [16:01:21.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 44   [16:01:22.000] 	Files (3)

Info 44   [16:01:23.000] -----------------------------------------------
Info 44   [16:01:24.000] Open files: 
Info 44   [16:01:25.000] 	FileName: /user/username/projects/myproject/Logger.ts ProjectRootPath: /user/username/projects/myproject
Info 44   [16:01:26.000] 		Projects: /user/username/projects/myproject/tsconfig.json

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/another.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 44   [16:01:27.000] response:
    {
      "responseRequired": false
    }
Info 45   [16:01:28.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/another.ts",
        "projectRootPath": "/user/username/projects/myproject"
      }
    }

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/another.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 46   [16:01:29.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/another.ts 500 undefined WatchType: Closed Script info
Info 47   [16:01:30.000] Search path: /user/username/projects/myproject
Info 48   [16:01:31.000] For info: /user/username/projects/myproject/another.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 49   [16:01:32.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 49   [16:01:33.000] 	Files (3)

Info 49   [16:01:34.000] -----------------------------------------------
Info 49   [16:01:35.000] Open files: 
Info 49   [16:01:36.000] 	FileName: /user/username/projects/myproject/Logger.ts ProjectRootPath: /user/username/projects/myproject
Info 49   [16:01:37.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 49   [16:01:38.000] 	FileName: /user/username/projects/myproject/another.ts ProjectRootPath: /user/username/projects/myproject
Info 49   [16:01:39.000] 		Projects: /user/username/projects/myproject/tsconfig.json

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

Info 49   [16:01:40.000] response:
    {
      "responseRequired": false
    }
Info 50   [16:01:41.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/user/username/projects/myproject/another.ts",
            "textChanges": [
              {
                "newText": "./logger",
                "start": {
                  "line": 1,
                  "offset": 25
                },
                "end": {
                  "line": 1,
                  "offset": 33
                }
              }
            ]
          }
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

Info 51   [16:01:42.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 52   [16:01:43.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/logger.ts",
          "/user/username/projects/myproject/another.ts"
        ]
      },
      "seq": 3,
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

Info 53   [16:01:44.000] response:
    {
      "responseRequired": false
    }
Info 54   [16:01:45.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 55   [16:01:46.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 56   [16:01:47.000] Different program with same set of files
Info 57   [16:01:48.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/logger.ts","diagnostics":[]}}
Info 58   [16:01:49.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/logger.ts","diagnostics":[]}}
Info 59   [16:01:50.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/logger.ts","diagnostics":[]}}
Info 60   [16:01:51.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/another.ts","diagnostics":[]}}
Info 61   [16:01:52.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/another.ts","diagnostics":[]}}
Info 62   [16:01:53.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/another.ts","diagnostics":[]}}
Info 63   [16:01:54.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}