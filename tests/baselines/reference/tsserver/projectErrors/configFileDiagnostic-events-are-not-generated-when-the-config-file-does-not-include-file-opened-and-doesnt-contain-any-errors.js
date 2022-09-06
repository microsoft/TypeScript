Info 0    [16:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:20.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/test.ts"}}
Info 2    [16:00:21.000] Search path: /a/b
Info 3    [16:00:22.000] For info: /a/b/test.ts :: Config file name: /a/b/tsconfig.json
Info 4    [16:00:23.000] Creating configuration project /a/b/tsconfig.json
Info 5    [16:00:24.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [16:00:25.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/test.ts to open"}}
Info 7    [16:00:26.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 8    [16:00:27.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [16:00:28.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 10   [16:00:29.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 11   [16:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [16:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [16:00:33.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [16:00:34.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [16:00:35.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/app.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	app.ts
	  Part of 'files' list in tsconfig.json

Info 17   [16:00:36.000] -----------------------------------------------
Info 18   [16:00:37.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 19   [16:00:38.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":10,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 20   [16:00:39.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/test.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 21   [16:00:40.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 22   [16:00:41.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 23   [16:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 24   [16:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 25   [16:00:44.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 26   [16:00:45.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [16:00:46.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/test.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	test.ts
	  Root file specified for compilation

Info 28   [16:00:47.000] -----------------------------------------------
Info 29   [16:00:48.000] Project '/a/b/tsconfig.json' (Configured)
Info 29   [16:00:49.000] 	Files (2)

Info 29   [16:00:50.000] -----------------------------------------------
Info 29   [16:00:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [16:00:52.000] 	Files (2)

Info 29   [16:00:53.000] -----------------------------------------------
Info 29   [16:00:54.000] Open files: 
Info 29   [16:00:55.000] 	FileName: /a/b/test.ts ProjectRootPath: undefined
Info 29   [16:00:56.000] 		Projects: /dev/null/inferredProject1*
Info 29   [16:00:57.000] response:{"responseRequired":false}
Info 30   [16:00:58.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/app.ts"}}
Info 31   [16:00:59.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 32   [16:01:00.000] Search path: /a/b
Info 33   [16:01:01.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 34   [16:01:02.000] Project '/a/b/tsconfig.json' (Configured)
Info 34   [16:01:03.000] 	Files (2)

Info 34   [16:01:04.000] -----------------------------------------------
Info 34   [16:01:05.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [16:01:06.000] 	Files (2)

Info 34   [16:01:07.000] -----------------------------------------------
Info 34   [16:01:08.000] Open files: 
Info 34   [16:01:09.000] 	FileName: /a/b/test.ts ProjectRootPath: undefined
Info 34   [16:01:10.000] 		Projects: /dev/null/inferredProject1*
Info 34   [16:01:11.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 34   [16:01:12.000] 		Projects: /a/b/tsconfig.json
Info 34   [16:01:13.000] response:{"responseRequired":false}
Info 35   [16:01:14.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/test2.ts"}}
Info 36   [16:01:15.000] Search path: /a/b
Info 37   [16:01:16.000] For info: /a/b/test2.ts :: Config file name: /a/b/tsconfig.json
Info 38   [16:01:17.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/test2.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 39   [16:01:18.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 40   [16:01:19.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 41   [16:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 42   [16:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 43   [16:01:22.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [16:01:23.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 45   [16:01:24.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/test2.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	test2.ts
	  Root file specified for compilation

Info 46   [16:01:25.000] -----------------------------------------------
Info 47   [16:01:26.000] Project '/a/b/tsconfig.json' (Configured)
Info 47   [16:01:27.000] 	Files (2)

Info 47   [16:01:28.000] -----------------------------------------------
Info 47   [16:01:29.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 47   [16:01:30.000] 	Files (2)

Info 47   [16:01:31.000] -----------------------------------------------
Info 47   [16:01:32.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 47   [16:01:33.000] 	Files (2)

Info 47   [16:01:34.000] -----------------------------------------------
Info 47   [16:01:35.000] Open files: 
Info 47   [16:01:36.000] 	FileName: /a/b/test.ts ProjectRootPath: undefined
Info 47   [16:01:37.000] 		Projects: /dev/null/inferredProject1*
Info 47   [16:01:38.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 47   [16:01:39.000] 		Projects: /a/b/tsconfig.json
Info 47   [16:01:40.000] 	FileName: /a/b/test2.ts ProjectRootPath: undefined
Info 47   [16:01:41.000] 		Projects: /dev/null/inferredProject2*
Info 47   [16:01:42.000] response:{"responseRequired":false}