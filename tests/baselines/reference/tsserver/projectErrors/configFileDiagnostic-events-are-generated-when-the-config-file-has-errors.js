Info 0    [16:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:16.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/app.ts"}}
Info 2    [16:00:17.000] Search path: /a/b
Info 3    [16:00:18.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 4    [16:00:19.000] Creating configuration project /a/b/tsconfig.json
Info 5    [16:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [16:00:21.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/app.ts to open"}}
Info 7    [16:00:22.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 8    [16:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:25.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:26.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 12   [16:00:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [16:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [16:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [16:00:30.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [16:00:31.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [16:00:32.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/app.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	app.ts
	  Matched by default include pattern '**/*'

Info 18   [16:00:33.000] -----------------------------------------------
Info 19   [16:00:34.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 20   [16:00:35.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":10,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 21   [16:00:36.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/app.ts","configFile":"/a/b/tsconfig.json","diagnostics":[{"start":{"line":3,"offset":25},"end":{"line":3,"offset":30},"text":"Unknown compiler option 'foo'.","code":5023,"category":"error","fileName":"/a/b/tsconfig.json"},{"start":{"line":4,"offset":25},"end":{"line":4,"offset":34},"text":"Unknown compiler option 'allowJS'. Did you mean 'allowJs'?","code":5025,"category":"error","fileName":"/a/b/tsconfig.json"}]}}
Info 22   [16:00:37.000] Project '/a/b/tsconfig.json' (Configured)
Info 22   [16:00:38.000] 	Files (2)

Info 22   [16:00:39.000] -----------------------------------------------
Info 22   [16:00:40.000] Open files: 
Info 22   [16:00:41.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 22   [16:00:42.000] 		Projects: /a/b/tsconfig.json
Info 22   [16:00:43.000] response:{"responseRequired":false}