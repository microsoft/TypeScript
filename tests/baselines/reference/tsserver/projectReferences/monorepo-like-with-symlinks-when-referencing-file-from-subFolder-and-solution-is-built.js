Info 0    [16:01:16.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:01:17.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/packages/A/src/test.ts"}}
Info 2    [16:01:18.000] Search path: /user/username/projects/myproject/packages/A/src
Info 3    [16:01:19.000] For info: /user/username/projects/myproject/packages/A/src/test.ts :: Config file name: /user/username/projects/myproject/packages/A/tsconfig.json
Info 4    [16:01:20.000] Creating configuration project /user/username/projects/myproject/packages/A/tsconfig.json
Info 5    [16:01:21.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Config file
Info 6    [16:01:22.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/packages/A/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/packages/A/src/test.ts to open"}}
Info 7    [16:01:23.000] Config: /user/username/projects/myproject/packages/A/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/A/src/test.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/packages/A/lib",
  "rootDir": "/user/username/projects/myproject/packages/A/src",
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/packages/A/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/packages/B",
   "originalPath": "../B"
  }
 ]
}
Info 8    [16:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/a/src 1 undefined Config: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Wild card directory
Info 9    [16:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/a/src 1 undefined Config: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Wild card directory
Info 10   [16:01:26.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:01:27.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json
Info 12   [16:01:28.000] Config: /user/username/projects/myproject/packages/B/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/B/src/foo.ts",
  "/user/username/projects/myproject/packages/B/src/bar/foo.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/packages/B/lib",
  "rootDir": "/user/username/projects/myproject/packages/B/src",
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/packages/B/tsconfig.json"
 }
}
Info 13   [16:01:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Config file
Info 14   [16:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/b/src 1 undefined Config: /user/username/projects/myproject/packages/B/tsconfig.json WatchType: Wild card directory
Info 15   [16:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/b/src 1 undefined Config: /user/username/projects/myproject/packages/B/tsconfig.json WatchType: Wild card directory
Info 16   [16:01:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/src/foo.ts 500 undefined WatchType: Closed Script info
Info 17   [16:01:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/src/bar/foo.ts 500 undefined WatchType: Closed Script info
Info 18   [16:01:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 19   [16:01:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/src 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [16:01:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/src 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [16:01:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 22   [16:01:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 23   [16:01:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 24   [16:01:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 25   [16:01:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 26   [16:01:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [16:01:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/B/package.json 2000 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: File location affecting resolution
Info 28   [16:01:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 29   [16:01:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/A/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 30   [16:01:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 31   [16:01:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 32   [16:01:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 33   [16:01:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/A/tsconfig.json WatchType: Type roots
Info 34   [16:01:50.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 35   [16:01:51.000] Project '/user/username/projects/myproject/packages/A/tsconfig.json' (Configured)
Info 36   [16:01:52.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/packages/B/src/foo.ts
	/user/username/projects/myproject/packages/B/src/bar/foo.ts
	/user/username/projects/myproject/packages/A/src/test.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../B/src/foo.ts
	  Imported via 'b/lib/foo' from file 'src/test.ts'
	../B/src/bar/foo.ts
	  Imported via 'b/lib/bar/foo' from file 'src/test.ts'
	src/test.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 37   [16:01:53.000] -----------------------------------------------
Info 38   [16:01:54.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/packages/A/tsconfig.json"}}
Info 39   [16:01:55.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"8c5cfb88fb6a6125ddaca4c198af63d261c8feb2786e348cbf3223fcf8461e16","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":134,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"outDir":"","rootDir":"","composite":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 40   [16:01:56.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/packages/A/src/test.ts","configFile":"/user/username/projects/myproject/packages/A/tsconfig.json","diagnostics":[]}}
Info 41   [16:01:57.000] Search path: /user/username/projects/myproject/packages/A
Info 42   [16:01:58.000] For info: /user/username/projects/myproject/packages/A/tsconfig.json :: No config files found.
Info 43   [16:01:59.000] Project '/user/username/projects/myproject/packages/A/tsconfig.json' (Configured)
Info 43   [16:02:00.000] 	Files (4)

Info 43   [16:02:01.000] -----------------------------------------------
Info 43   [16:02:02.000] Open files: 
Info 43   [16:02:03.000] 	FileName: /user/username/projects/myproject/packages/A/src/test.ts ProjectRootPath: undefined
Info 43   [16:02:04.000] 		Projects: /user/username/projects/myproject/packages/A/tsconfig.json
Info 43   [16:02:05.000] response:{"responseRequired":false}
Info 44   [16:02:06.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/packages/A/src/test.ts"]},"seq":1,"type":"request"}
Info 45   [16:02:07.000] response:{"responseRequired":false}
Info 46   [16:02:08.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
Info 47   [16:02:09.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
Info 48   [16:02:10.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
Info 49   [16:02:11.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Info 50   [16:02:12.000] request:{"command":"updateOpen","arguments":{"changedFiles":[{"fileName":"/user/username/projects/myproject/packages/A/src/test.ts","textChanges":[{"newText":"\n","start":{"line":5,"offset":1},"end":{"line":5,"offset":1}}]}]},"seq":2,"type":"request"}
Info 51   [16:02:13.000] response:{"response":true,"responseRequired":true}
Info 52   [16:02:14.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/packages/A/src/test.ts"]},"seq":3,"type":"request"}
Info 53   [16:02:15.000] response:{"responseRequired":false}
Info 54   [16:02:16.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json
Info 55   [16:02:17.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/A/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 56   [16:02:18.000] Different program with same set of files
Info 57   [16:02:19.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
Info 58   [16:02:20.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
Info 59   [16:02:21.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/packages/A/src/test.ts","diagnostics":[]}}
Info 60   [16:02:22.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}