Info 0    [16:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:22.000] request:{"command":"open","arguments":{"file":"/a/b/projects/myproject/bar/app.ts"},"seq":1,"type":"request"}
Info 2    [16:00:23.000] Search path: /a/b/projects/myproject/bar
Info 3    [16:00:24.000] For info: /a/b/projects/myproject/bar/app.ts :: Config file name: /a/b/projects/myproject/tsconfig.json
Info 4    [16:00:25.000] Creating configuration project /a/b/projects/myproject/tsconfig.json
Info 5    [16:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/myproject/tsconfig.json 2000 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [16:00:27.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /a/b/projects/myproject/bar/app.ts to open"}}
Info 7    [16:00:28.000] Config: /a/b/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/myproject/bar/app.ts",
  "/a/b/projects/myproject/foo/foo.ts"
 ],
 "options": {
  "module": 0,
  "configFilePath": "/a/b/projects/myproject/tsconfig.json"
 }
}
Info 8    [16:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:31.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:32.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:33.000] Starting updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json
Info 13   [16:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Missing file
Info 14   [16:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject/node_modules/@types 1 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [16:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject/node_modules/@types 1 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Type roots
Info 16   [16:00:37.000] Finishing updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [16:00:38.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 18   [16:00:39.000] 	Files (2)
	/a/b/projects/myproject/bar/app.ts
	/a/b/projects/myproject/foo/foo.ts


	bar/app.ts
	  Matched by default include pattern '**/*'
	foo/foo.ts
	  Matched by default include pattern '**/*'

Info 19   [16:00:40.000] -----------------------------------------------
Info 20   [16:00:41.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/projects/myproject/tsconfig.json"}}
Info 21   [16:00:42.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"c56abb8c7c51bef5953613f05226da8e72cd9eafe09ab58ca2ccd81b65ba193a","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":154,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{"module":"none"},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":true,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 22   [16:00:43.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/projects/myproject/bar/app.ts","configFile":"/a/b/projects/myproject/tsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es3'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"},{"start":{"line":1,"offset":37},"end":{"line":1,"offset":45},"text":"Unknown compiler option 'targer'. Did you mean 'target'?","code":5025,"category":"error","fileName":"/a/b/projects/myproject/tsconfig.json"}]}}
Info 23   [16:00:44.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 23   [16:00:45.000] 	Files (2)

Info 23   [16:00:46.000] -----------------------------------------------
Info 23   [16:00:47.000] Open files: 
Info 23   [16:00:48.000] 	FileName: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined
Info 23   [16:00:49.000] 		Projects: /a/b/projects/myproject/tsconfig.json
Info 23   [16:00:50.000] response:{"responseRequired":false}
Info 24   [16:00:51.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/a/b/projects/myproject/bar/app.ts"]},"seq":2,"type":"request"}
Info 25   [16:00:52.000] response:{"responseRequired":false}
Info 26   [16:00:53.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Info 27   [16:00:54.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Info 28   [16:00:55.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Info 29   [16:00:56.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Info 30   [16:00:58.000] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 31   [16:00:59.000] Scheduled: /a/b/projects/myproject/tsconfig.json
Info 32   [16:01:00.000] Scheduled: *ensureProjectForOpenFiles*
Info 33   [16:01:01.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 34   [16:01:04.000] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2 :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 35   [16:01:05.000] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info 36   [16:01:06.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 37   [16:01:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2 :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 38   [16:01:08.000] FileWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts 2:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info 39   [16:01:09.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info 40   [16:01:10.000] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info 41   [16:01:11.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 42   [16:01:12.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts 2:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info 43   [16:01:13.000] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 44   [16:01:14.000] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info 45   [16:01:15.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 46   [16:01:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 47   [16:01:17.000] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 48   [16:01:18.000] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info 49   [16:01:19.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 50   [16:01:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 51   [16:01:21.000] Running: /a/b/projects/myproject/tsconfig.json
Info 52   [16:01:22.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/myproject/foo2/foo.ts 500 undefined WatchType: Closed Script info
Info 53   [16:01:23.000] Starting updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json
Info 54   [16:01:24.000] Finishing updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 55   [16:01:25.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 56   [16:01:26.000] 	Files (2)
	/a/b/projects/myproject/bar/app.ts
	/a/b/projects/myproject/foo2/foo.ts


	bar/app.ts
	  Matched by default include pattern '**/*'
	foo2/foo.ts
	  Matched by default include pattern '**/*'

Info 57   [16:01:27.000] -----------------------------------------------
Info 58   [16:01:28.000] Running: *ensureProjectForOpenFiles*
Info 59   [16:01:29.000] Before ensureProjectForOpenFiles:
Info 60   [16:01:30.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 60   [16:01:31.000] 	Files (2)

Info 60   [16:01:32.000] -----------------------------------------------
Info 60   [16:01:33.000] Open files: 
Info 60   [16:01:34.000] 	FileName: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined
Info 60   [16:01:35.000] 		Projects: /a/b/projects/myproject/tsconfig.json
Info 60   [16:01:36.000] After ensureProjectForOpenFiles:
Info 61   [16:01:37.000] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info 61   [16:01:38.000] 	Files (2)

Info 61   [16:01:39.000] -----------------------------------------------
Info 61   [16:01:40.000] Open files: 
Info 61   [16:01:41.000] 	FileName: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined
Info 61   [16:01:42.000] 		Projects: /a/b/projects/myproject/tsconfig.json
Info 61   [16:01:43.000] got projects updated in background, updating diagnostics for /a/b/projects/myproject/bar/app.ts
Info 62   [16:01:44.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/projects/myproject/bar/app.ts"]}}
Info 63   [16:01:45.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Info 64   [16:01:46.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/a/b/projects/myproject/bar/app.ts"]},"seq":3,"type":"request"}
Info 65   [16:01:47.000] response:{"responseRequired":false}
Info 66   [16:01:48.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Info 67   [16:01:49.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Info 68   [16:01:50.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/a/b/projects/myproject/bar/app.ts","diagnostics":[]}}
Info 69   [16:01:51.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}