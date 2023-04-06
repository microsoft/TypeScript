currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/a.ts]


//// [/b.ts]


//// [/a/tsconfig.json]
{}


Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] Search path: /a
Info 3    [00:00:14.000] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info 4    [00:00:15.000] Creating configuration project /a/tsconfig.json
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [00:00:17.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/tsconfig.json","reason":"Creating possible configured project for /a/a.ts to open"}}
Info 7    [00:00:18.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/a.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 8    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:21.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 11   [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 12   [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 14   [00:00:25.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:26.000] Project '/a/tsconfig.json' (Configured)
Info 16   [00:00:27.000] 	Files (1)
	/a/a.ts SVC-1-0 ""


	a.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:28.000] -----------------------------------------------
Info 18   [00:00:29.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/tsconfig.json"}}
Info 19   [00:00:30.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"bcbb3eb9a7f46ab3b8f574ad3733f3e5a7ce50557c14c0c6192f1203aedcacca","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":0,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 20   [00:00:31.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/a.ts","configFile":"/a/tsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
Info 21   [00:00:32.000] Project '/a/tsconfig.json' (Configured)
Info 21   [00:00:33.000] 	Files (1)

Info 21   [00:00:34.000] -----------------------------------------------
Info 21   [00:00:35.000] Open files: 
Info 21   [00:00:36.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 21   [00:00:37.000] 		Projects: /a/tsconfig.json
Info 21   [00:00:38.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Before request

Info 22   [00:00:39.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 23   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /a/a.ts 500 undefined WatchType: Closed Script info
Info 24   [00:00:41.000] Project '/a/tsconfig.json' (Configured)
Info 24   [00:00:42.000] 	Files (1)

Info 24   [00:00:43.000] -----------------------------------------------
Info 24   [00:00:44.000] Open files: 
Info 24   [00:00:45.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/a.ts: *new*
  {}

FsWatchesRecursive::
/a:
  {}

Before request

Info 25   [00:00:46.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 26   [00:00:47.000] Search path: /
Info 27   [00:00:48.000] For info: /b.ts :: No config files found.
Info 28   [00:00:49.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 29   [00:00:50.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 30   [00:00:51.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 31   [00:00:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:00:53.000] 	Files (1)
	/b.ts SVC-1-0 ""


	b.ts
	  Root file specified for compilation

Info 33   [00:00:54.000] -----------------------------------------------
Info 34   [00:00:55.000] `remove Project::
Info 35   [00:00:56.000] Project '/a/tsconfig.json' (Configured)
Info 36   [00:00:57.000] 	Files (1)
	/a/a.ts


	a.ts
	  Matched by default include pattern '**/*'

Info 37   [00:00:58.000] -----------------------------------------------
Info 38   [00:00:59.000] DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 39   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 40   [00:01:01.000] FileWatcher:: Close:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 41   [00:01:02.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 42   [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 43   [00:01:04.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 44   [00:01:05.000] FileWatcher:: Close:: WatchInfo: /a/a.ts 500 undefined WatchType: Closed Script info
Info 45   [00:01:06.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 45   [00:01:07.000] 	Files (1)

Info 45   [00:01:08.000] -----------------------------------------------
Info 45   [00:01:09.000] Open files: 
Info 45   [00:01:10.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 45   [00:01:11.000] 		Projects: /dev/null/inferredProject1*
Info 45   [00:01:12.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/tsconfig.json:
  {}
/a/a.ts:
  {}

FsWatchesRecursive *deleted*::
/a:
  {}

Before request

Info 46   [00:01:13.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 47   [00:01:14.000] Search path: /a
Info 48   [00:01:15.000] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info 49   [00:01:16.000] Creating configuration project /a/tsconfig.json
Info 50   [00:01:17.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 51   [00:01:18.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/tsconfig.json","reason":"Creating possible configured project for /a/a.ts to open"}}
Info 52   [00:01:19.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/a.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 53   [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 54   [00:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 55   [00:01:22.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 56   [00:01:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 57   [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 58   [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 59   [00:01:26.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 60   [00:01:27.000] Project '/a/tsconfig.json' (Configured)
Info 61   [00:01:28.000] 	Files (1)
	/a/a.ts SVC-2-0 ""


	a.ts
	  Matched by default include pattern '**/*'

Info 62   [00:01:29.000] -----------------------------------------------
Info 63   [00:01:30.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/tsconfig.json"}}
Info 64   [00:01:31.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/a.ts","configFile":"/a/tsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
Info 65   [00:01:32.000] Project '/a/tsconfig.json' (Configured)
Info 65   [00:01:33.000] 	Files (1)

Info 65   [00:01:34.000] -----------------------------------------------
Info 65   [00:01:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 65   [00:01:36.000] 	Files (1)

Info 65   [00:01:37.000] -----------------------------------------------
Info 65   [00:01:38.000] Open files: 
Info 65   [00:01:39.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 65   [00:01:40.000] 		Projects: /dev/null/inferredProject1*
Info 65   [00:01:41.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 65   [00:01:42.000] 		Projects: /a/tsconfig.json
Info 65   [00:01:43.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}
