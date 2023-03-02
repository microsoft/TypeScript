Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/projects/myproject/bar/app.ts]
class Bar implements foo.Foo { getFoo() { return ''; } get2() { return 1; } }

//// [/a/b/projects/myproject/foo/foo.ts]
declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }

//// [/a/b/projects/myproject/tsconfig.json]
{"compilerOptions":{"module":"none","targer":"es5"},"exclude":["node_modules"]}


Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/projects/myproject/bar/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Search path: /a/b/projects/myproject/bar
Info 3    [00:00:24.000] For info: /a/b/projects/myproject/bar/app.ts :: Config file name: /a/b/projects/myproject/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /a/b/projects/myproject/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/myproject/tsconfig.json 2000 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /a/b/projects/myproject/bar/app.ts to open"}}
Info 7    [00:00:28.000] Config: /a/b/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/myproject/bar/app.ts",
  "/a/b/projects/myproject/foo/foo.ts"
 ],
 "options": {
  "module": 0,
  "configFilePath": "/a/b/projects/myproject/tsconfig.json"
 }
}
Info 8    [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:32.000] Starting updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json
Info 12   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Missing file
Info 13   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject/node_modules/@types 1 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject/node_modules/@types 1 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [00:00:36.000] Finishing updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:37.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:38.000] 	Files (2)
	/a/b/projects/myproject/bar/app.ts SVC-1-0 "class Bar implements foo.Foo { getFoo() { return ''; } get2() { return 1; } }"
	/a/b/projects/myproject/foo/foo.ts Text-1 "declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }"


	bar/app.ts
	  Matched by default include pattern '**/*'
	foo/foo.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:39.000] -----------------------------------------------
Info 19   [00:00:40.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/projects/myproject/tsconfig.json"}}
Info 20   [00:00:41.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"c56abb8c7c51bef5953613f05226da8e72cd9eafe09ab58ca2ccd81b65ba193a","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":154,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{"module":"none"},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":true,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 21   [00:00:42.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/projects/myproject/bar/app.ts","configFile":"/a/b/projects/myproject/tsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"},{"start":{"line":1,"offset":37},"end":{"line":1,"offset":45},"text":"Unknown compiler option 'targer'. Did you mean 'target'?","code":5025,"category":"error","fileName":"/a/b/projects/myproject/tsconfig.json"}]}}
Info 22   [00:00:43.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 22   [00:00:44.000] 	Files (2)

Info 22   [00:00:45.000] -----------------------------------------------
Info 22   [00:00:46.000] Open files: 
Info 22   [00:00:47.000] 	FileName: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined
Info 22   [00:00:48.000] 		Projects: /a/b/projects/myproject/tsconfig.json
Info 22   [00:00:49.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/projects/myproject/tsconfig.json: *new*
  {}
/a/b/projects/myproject/foo/foo.ts: *new*
  {}

FsWatchesRecursive::
/a/b/projects/myproject: *new*
  {}

Before request

Info 23   [00:00:50.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/a/b/projects/myproject/bar/app.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info 24   [00:00:51.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 25   [00:00:52.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 26   [00:00:53.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 27   [00:00:54.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Info 28   [00:00:55.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)

Info 29   [00:00:57.000] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 30   [00:00:58.000] Scheduled: /a/b/projects/myproject/tsconfig.json
Info 31   [00:00:59.000] Scheduled: *ensureProjectForOpenFiles*
Info 32   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 33   [00:01:03.000] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2 :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 34   [00:01:04.000] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info 35   [00:01:05.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 36   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2 :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 37   [00:01:07.000] FileWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts 2:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info 38   [00:01:08.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info 39   [00:01:09.000] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info 40   [00:01:10.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 41   [00:01:11.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts 2:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info 42   [00:01:12.000] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 43   [00:01:13.000] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info 44   [00:01:14.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 45   [00:01:15.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 46   [00:01:16.000] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 47   [00:01:17.000] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info 48   [00:01:18.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 49   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/a/b/projects/myproject/foo2/foo.ts]
declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }

//// [/a/b/projects/myproject/foo/foo.ts] deleted

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/projects/myproject/tsconfig.json:
  {}

FsWatches *deleted*::
/a/b/projects/myproject/foo/foo.ts:
  {}

FsWatchesRecursive::
/a/b/projects/myproject:
  {}

Info 50   [00:01:20.000] Running: /a/b/projects/myproject/tsconfig.json
Info 51   [00:01:21.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/myproject/foo2/foo.ts 500 undefined WatchType: Closed Script info
Info 52   [00:01:22.000] Starting updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json
Info 53   [00:01:23.000] Finishing updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 54   [00:01:24.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 55   [00:01:25.000] 	Files (2)
	/a/b/projects/myproject/bar/app.ts SVC-1-0 "class Bar implements foo.Foo { getFoo() { return ''; } get2() { return 1; } }"
	/a/b/projects/myproject/foo2/foo.ts Text-1 "declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }"


	bar/app.ts
	  Matched by default include pattern '**/*'
	foo2/foo.ts
	  Matched by default include pattern '**/*'

Info 56   [00:01:26.000] -----------------------------------------------
Info 57   [00:01:27.000] Running: *ensureProjectForOpenFiles*
Info 58   [00:01:28.000] Before ensureProjectForOpenFiles:
Info 59   [00:01:29.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 59   [00:01:30.000] 	Files (2)

Info 59   [00:01:31.000] -----------------------------------------------
Info 59   [00:01:32.000] Open files: 
Info 59   [00:01:33.000] 	FileName: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined
Info 59   [00:01:34.000] 		Projects: /a/b/projects/myproject/tsconfig.json
Info 59   [00:01:35.000] After ensureProjectForOpenFiles:
Info 60   [00:01:36.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 60   [00:01:37.000] 	Files (2)

Info 60   [00:01:38.000] -----------------------------------------------
Info 60   [00:01:39.000] Open files: 
Info 60   [00:01:40.000] 	FileName: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined
Info 60   [00:01:41.000] 		Projects: /a/b/projects/myproject/tsconfig.json
Info 60   [00:01:42.000] got projects updated in background, updating diagnostics for /a/b/projects/myproject/bar/app.ts
Info 61   [00:01:43.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/projects/myproject/bar/app.ts"]}}
After running timeout callbacks

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/projects/myproject/tsconfig.json:
  {}
/a/b/projects/myproject/foo2/foo.ts: *new*
  {}

FsWatchesRecursive::
/a/b/projects/myproject:
  {}

Before running timeout callbacks

Info 62   [00:01:44.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
After running timeout callbacks

Before request

Info 63   [00:01:45.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/a/b/projects/myproject/bar/app.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 64   [00:01:46.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 65   [00:01:47.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 66   [00:01:48.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 67   [00:01:49.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Info 68   [00:01:50.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)
