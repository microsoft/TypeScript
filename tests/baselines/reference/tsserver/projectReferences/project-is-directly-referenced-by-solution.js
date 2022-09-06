Info 0    [16:00:53.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:54.000] Search path: /user/username/projects/myproject/src
Info 2    [16:00:55.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [16:00:56.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [16:00:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [16:00:58.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 6    [16:00:59.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 7    [16:01:00.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [16:01:01.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 9    [16:01:02.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info 10   [16:01:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 11   [16:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 12   [16:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 13   [16:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [16:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [16:01:08.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [16:01:09.000] Different program with same set of files
Info 17   [16:01:10.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 18   [16:01:11.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":0,"tsSize":0,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 19   [16:01:12.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 20   [16:01:13.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 21   [16:01:14.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 22   [16:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 23   [16:01:16.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 24   [16:01:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 25   [16:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 26   [16:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 27   [16:01:20.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [16:01:21.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 29   [16:01:22.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 30   [16:01:23.000] -----------------------------------------------
Info 31   [16:01:24.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 32   [16:01:25.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"75d5ba36c0a162a329bf40235b10e96d2d129b95469e1f02c08da775fb38a2b4","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":77,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 33   [16:01:26.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 34   [16:01:27.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 34   [16:01:28.000] 	Files (0)

Info 34   [16:01:29.000] -----------------------------------------------
Info 34   [16:01:30.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 34   [16:01:31.000] 	Files (3)

Info 34   [16:01:32.000] -----------------------------------------------
Info 34   [16:01:33.000] Open files: 
Info 34   [16:01:34.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 34   [16:01:35.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json

getDefaultProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
findDefaultConfiguredProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json

Info 34   [16:01:36.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/src/main.ts"]},"seq":1,"type":"request"}
Info 35   [16:01:37.000] response:{"responseRequired":false}
Info 36   [16:01:38.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 37   [16:01:39.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 38   [16:01:40.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 39   [16:01:41.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Info 40   [16:01:42.000] Search path: /dummy
Info 41   [16:01:43.000] For info: /dummy/dummy.ts :: No config files found.
Info 42   [16:01:44.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 43   [16:01:45.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 44   [16:01:46.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 45   [16:01:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 46   [16:01:48.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 47   [16:01:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 48   [16:01:50.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 49   [16:01:51.000] -----------------------------------------------
Info 50   [16:01:52.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 50   [16:01:53.000] 	Files (0)

Info 50   [16:01:54.000] -----------------------------------------------
Info 50   [16:01:55.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 50   [16:01:56.000] 	Files (3)

Info 50   [16:01:57.000] -----------------------------------------------
Info 50   [16:01:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 50   [16:01:59.000] 	Files (2)

Info 50   [16:02:00.000] -----------------------------------------------
Info 50   [16:02:01.000] Open files: 
Info 50   [16:02:02.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 50   [16:02:03.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 50   [16:02:04.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 50   [16:02:05.000] 		Projects: /dev/null/inferredProject1*
Info 50   [16:02:06.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 51   [16:02:07.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 51   [16:02:08.000] 	Files (0)

Info 51   [16:02:09.000] -----------------------------------------------
Info 51   [16:02:10.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 51   [16:02:11.000] 	Files (3)

Info 51   [16:02:12.000] -----------------------------------------------
Info 51   [16:02:13.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 51   [16:02:14.000] 	Files (2)

Info 51   [16:02:15.000] -----------------------------------------------
Info 51   [16:02:16.000] Open files: 
Info 51   [16:02:17.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 51   [16:02:18.000] 		Projects: /dev/null/inferredProject1*
Info 51   [16:02:19.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 52   [16:02:20.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 52   [16:02:21.000] 	Files (0)

Info 52   [16:02:22.000] -----------------------------------------------
Info 52   [16:02:23.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 52   [16:02:24.000] 	Files (3)

Info 52   [16:02:25.000] -----------------------------------------------
Info 52   [16:02:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 52   [16:02:27.000] 	Files (2)

Info 52   [16:02:28.000] -----------------------------------------------
Info 52   [16:02:29.000] Open files: 
Info 52   [16:02:30.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 53   [16:02:31.000] Search path: /dummy
Info 54   [16:02:32.000] For info: /dummy/dummy.ts :: No config files found.
Info 55   [16:02:33.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 56   [16:02:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 57   [16:02:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 58   [16:02:36.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 59   [16:02:37.000] -----------------------------------------------
Info 60   [16:02:38.000] `remove Project::
Info 61   [16:02:39.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 62   [16:02:40.000] 	Files (0)



Info 63   [16:02:41.000] -----------------------------------------------
Info 64   [16:02:42.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 65   [16:02:43.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 66   [16:02:44.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 67   [16:02:45.000] `remove Project::
Info 68   [16:02:46.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 69   [16:02:47.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 70   [16:02:48.000] -----------------------------------------------
Info 71   [16:02:49.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 72   [16:02:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 73   [16:02:51.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 74   [16:02:52.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 75   [16:02:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 76   [16:02:54.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 77   [16:02:55.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 78   [16:02:56.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 78   [16:02:57.000] 	Files (2)

Info 78   [16:02:58.000] -----------------------------------------------
Info 78   [16:02:59.000] Open files: 
Info 78   [16:03:00.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 78   [16:03:01.000] 		Projects: /dev/null/inferredProject1*
Info 78   [16:03:02.000] Search path: /user/username/projects/myproject/src
Info 79   [16:03:03.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 80   [16:03:04.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 81   [16:03:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 82   [16:03:06.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 83   [16:03:07.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 84   [16:03:08.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 85   [16:03:09.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 86   [16:03:10.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info 87   [16:03:11.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 88   [16:03:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 89   [16:03:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 90   [16:03:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 91   [16:03:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 92   [16:03:16.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 93   [16:03:17.000] Different program with same set of files
Info 94   [16:03:18.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 95   [16:03:19.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 96   [16:03:20.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 97   [16:03:21.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 98   [16:03:22.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 99   [16:03:23.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 100  [16:03:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 101  [16:03:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 102  [16:03:26.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 103  [16:03:27.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 104  [16:03:28.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 105  [16:03:29.000] -----------------------------------------------
Info 106  [16:03:30.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 107  [16:03:31.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 108  [16:03:32.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 108  [16:03:33.000] 	Files (0)

Info 108  [16:03:34.000] -----------------------------------------------
Info 108  [16:03:35.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 108  [16:03:36.000] 	Files (3)

Info 108  [16:03:37.000] -----------------------------------------------
Info 108  [16:03:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 108  [16:03:39.000] 	Files (2)

Info 108  [16:03:40.000] -----------------------------------------------
Info 108  [16:03:41.000] Open files: 
Info 108  [16:03:42.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 108  [16:03:43.000] 		Projects: /dev/null/inferredProject1*
Info 108  [16:03:44.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 108  [16:03:45.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 108  [16:03:46.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 109  [16:03:47.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 109  [16:03:48.000] 	Files (0)

Info 109  [16:03:49.000] -----------------------------------------------
Info 109  [16:03:50.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 109  [16:03:51.000] 	Files (3)

Info 109  [16:03:52.000] -----------------------------------------------
Info 109  [16:03:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 109  [16:03:54.000] 	Files (2)

Info 109  [16:03:55.000] -----------------------------------------------
Info 109  [16:03:56.000] Open files: 
Info 109  [16:03:57.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 109  [16:03:58.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 109  [16:03:59.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 110  [16:04:00.000] Search path: /dummy
Info 111  [16:04:01.000] For info: /dummy/dummy.ts :: No config files found.
Info 112  [16:04:02.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 113  [16:04:03.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 114  [16:04:04.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 115  [16:04:05.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 116  [16:04:06.000] -----------------------------------------------
Info 117  [16:04:07.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 117  [16:04:08.000] 	Files (0)

Info 117  [16:04:09.000] -----------------------------------------------
Info 117  [16:04:10.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 117  [16:04:11.000] 	Files (3)

Info 117  [16:04:12.000] -----------------------------------------------
Info 117  [16:04:13.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 117  [16:04:14.000] 	Files (2)

Info 117  [16:04:15.000] -----------------------------------------------
Info 117  [16:04:16.000] Open files: 
Info 117  [16:04:17.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 117  [16:04:18.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 117  [16:04:19.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 117  [16:04:20.000] 		Projects: /dev/null/inferredProject1*
Info 117  [16:04:21.000] reload projects.
Info 118  [16:04:22.000] Scheduled: /dev/null/inferredProject1*
Info 119  [16:04:23.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json
Info 120  [16:04:24.000] Scheduled: *ensureProjectForOpenFiles*
Info 121  [16:04:25.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json, Cancelled earlier one
Info 122  [16:04:26.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 123  [16:04:27.000] Search path: /user/username/projects/myproject/src
Info 124  [16:04:28.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 125  [16:04:29.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 126  [16:04:30.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 127  [16:04:31.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 128  [16:04:32.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"User requested reload projects"}}
Info 129  [16:04:33.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 130  [16:04:34.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 131  [16:04:35.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 132  [16:04:36.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info 133  [16:04:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 134  [16:04:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 135  [16:04:39.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 136  [16:04:40.000] Different program with same set of files
Info 137  [16:04:41.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 138  [16:04:42.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig.json","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 139  [16:04:43.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 140  [16:04:44.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 141  [16:04:45.000] Reloading configured project /user/username/projects/myproject/tsconfig-src.json
Info 142  [16:04:46.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"User requested reload projects"}}
Info 143  [16:04:47.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 144  [16:04:48.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 145  [16:04:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 146  [16:04:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 147  [16:04:51.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 148  [16:04:52.000] Different program with same set of files
Info 149  [16:04:53.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 150  [16:04:54.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig-src.json","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 151  [16:04:55.000] Search path: /dummy
Info 152  [16:04:56.000] For info: /dummy/dummy.ts :: No config files found.
Info 153  [16:04:57.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 154  [16:04:58.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 155  [16:04:59.000] Before ensureProjectForOpenFiles:
Info 156  [16:05:00.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 156  [16:05:01.000] 	Files (0)

Info 156  [16:05:02.000] -----------------------------------------------
Info 156  [16:05:03.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 156  [16:05:04.000] 	Files (3)

Info 156  [16:05:05.000] -----------------------------------------------
Info 156  [16:05:06.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 156  [16:05:07.000] 	Files (2)

Info 156  [16:05:08.000] -----------------------------------------------
Info 156  [16:05:09.000] Open files: 
Info 156  [16:05:10.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 156  [16:05:11.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 156  [16:05:12.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 156  [16:05:13.000] 		Projects: /dev/null/inferredProject1*
Info 156  [16:05:14.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 157  [16:05:15.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 158  [16:05:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 159  [16:05:17.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 160  [16:05:18.000] Different program with same set of files
Info 161  [16:05:19.000] After ensureProjectForOpenFiles:
Info 162  [16:05:20.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 162  [16:05:21.000] 	Files (0)

Info 162  [16:05:22.000] -----------------------------------------------
Info 162  [16:05:23.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 162  [16:05:24.000] 	Files (3)

Info 162  [16:05:25.000] -----------------------------------------------
Info 162  [16:05:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 162  [16:05:27.000] 	Files (2)

Info 162  [16:05:28.000] -----------------------------------------------
Info 162  [16:05:29.000] Open files: 
Info 162  [16:05:30.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 162  [16:05:31.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 162  [16:05:32.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 162  [16:05:33.000] 		Projects: /dev/null/inferredProject1*
Info 162  [16:05:34.000] request:{"command":"references","arguments":{"file":"/user/username/projects/myproject/src/main.ts","line":2,"offset":10},"seq":2,"type":"request"}
Info 163  [16:05:35.000] Finding references to /user/username/projects/myproject/src/main.ts position 50 in project /user/username/projects/myproject/tsconfig-src.json
Info 164  [16:05:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts 500 undefined WatchType: Closed Script info
Info 165  [16:05:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts.map 500 undefined WatchType: Closed Script info
Info 166  [16:05:38.000] response:{"response":{"refs":[{"file":"/user/username/projects/myproject/src/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":41},"lineText":"import { foo } from 'helpers/functions';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/src/main.ts","start":{"line":2,"offset":10},"end":{"line":2,"offset":13},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":16},"lineText":"export { foo };","isWriteAccess":true,"isDefinition":true},{"file":"/user/username/projects/myproject/src/helpers/functions.ts","start":{"line":1,"offset":14},"end":{"line":1,"offset":17},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":22},"lineText":"export const foo = 1;","isWriteAccess":true,"isDefinition":false}],"symbolName":"foo","symbolStartOffset":10,"symbolDisplayString":"(alias) const foo: 1\nexport foo"},"responseRequired":true}
Info 167  [16:05:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 168  [16:05:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 168  [16:05:41.000] 	Files (0)

Info 168  [16:05:42.000] -----------------------------------------------
Info 168  [16:05:43.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 168  [16:05:44.000] 	Files (3)

Info 168  [16:05:45.000] -----------------------------------------------
Info 168  [16:05:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 168  [16:05:47.000] 	Files (2)

Info 168  [16:05:48.000] -----------------------------------------------
Info 168  [16:05:49.000] Open files: 
Info 168  [16:05:50.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 168  [16:05:51.000] 		Projects: /dev/null/inferredProject1*
Info 168  [16:05:52.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 169  [16:05:53.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 169  [16:05:54.000] 	Files (0)

Info 169  [16:05:55.000] -----------------------------------------------
Info 169  [16:05:56.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 169  [16:05:57.000] 	Files (3)

Info 169  [16:05:58.000] -----------------------------------------------
Info 169  [16:05:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 169  [16:06:00.000] 	Files (2)

Info 169  [16:06:01.000] -----------------------------------------------
Info 169  [16:06:02.000] Open files: 
Info 169  [16:06:03.000] Search path: /user/username/projects/myproject/indirect3
Info 170  [16:06:04.000] For info: /user/username/projects/myproject/indirect3/main.ts :: Config file name: /user/username/projects/myproject/indirect3/tsconfig.json
Info 171  [16:06:05.000] Creating configuration project /user/username/projects/myproject/indirect3/tsconfig.json
Info 172  [16:06:06.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Config file
Info 173  [16:06:07.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/indirect3/main.ts to open"}}
Info 174  [16:06:08.000] Config: /user/username/projects/myproject/indirect3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect3/main.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/target/src",
  "configFilePath": "/user/username/projects/myproject/indirect3/tsconfig.json"
 }
}
Info 175  [16:06:09.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 176  [16:06:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 177  [16:06:11.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 178  [16:06:12.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json
Info 179  [16:06:13.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts 500 undefined WatchType: Closed Script info
Info 180  [16:06:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 181  [16:06:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 182  [16:06:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 183  [16:06:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 184  [16:06:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 185  [16:06:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 186  [16:06:20.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 187  [16:06:21.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 188  [16:06:22.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/target/src/helpers/functions.d.ts
	/user/username/projects/myproject/target/src/main.d.ts
	/user/username/projects/myproject/indirect3/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../target/src/helpers/functions.d.ts
	  Imported via 'helpers/functions' from file '../target/src/main.d.ts'
	../target/src/main.d.ts
	  Imported via 'main' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 189  [16:06:23.000] -----------------------------------------------
Info 190  [16:06:24.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json"}}
Info 191  [16:06:25.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5b0817f69b6871821661b976aa73f4f2533b37c5f4b920541094c2d727d0dc39","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":57,"tsx":0,"tsxSize":0,"dts":3,"dtsSize":494,"deferred":0,"deferredSize":0},"compilerOptions":{"baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 192  [16:06:26.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/indirect3/main.ts","configFile":"/user/username/projects/myproject/indirect3/tsconfig.json","diagnostics":[]}}
Info 193  [16:06:27.000] `remove Project::
Info 194  [16:06:28.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 195  [16:06:29.000] 	Files (0)



Info 196  [16:06:30.000] -----------------------------------------------
Info 197  [16:06:31.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 198  [16:06:32.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 199  [16:06:33.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 200  [16:06:34.000] `remove Project::
Info 201  [16:06:35.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 202  [16:06:36.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 203  [16:06:37.000] -----------------------------------------------
Info 204  [16:06:38.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 205  [16:06:39.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 206  [16:06:40.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 207  [16:06:41.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 208  [16:06:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 209  [16:06:43.000] `remove Project::
Info 210  [16:06:44.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 211  [16:06:45.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 212  [16:06:46.000] -----------------------------------------------
Info 213  [16:06:47.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 214  [16:06:48.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 215  [16:06:49.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 216  [16:06:50.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 217  [16:06:51.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 217  [16:06:52.000] 	Files (4)

Info 217  [16:06:53.000] -----------------------------------------------
Info 217  [16:06:54.000] Open files: 
Info 217  [16:06:55.000] 	FileName: /user/username/projects/myproject/indirect3/main.ts ProjectRootPath: undefined
Info 217  [16:06:56.000] 		Projects: /user/username/projects/myproject/indirect3/tsconfig.json
Info 217  [16:06:57.000] request:{"command":"references","arguments":{"file":"/user/username/projects/myproject/indirect3/main.ts","line":1,"offset":10},"seq":3,"type":"request"}
Info 218  [16:06:58.000] Finding references to /user/username/projects/myproject/indirect3/main.ts position 9 in project /user/username/projects/myproject/indirect3/tsconfig.json
Info 219  [16:06:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts.map 500 undefined WatchType: Closed Script info
Info 220  [16:07:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 221  [16:07:01.000] Search path: /user/username/projects/myproject/src
Info 222  [16:07:02.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 223  [16:07:03.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 224  [16:07:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 225  [16:07:05.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 226  [16:07:06.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 227  [16:07:07.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 228  [16:07:08.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 229  [16:07:09.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info 230  [16:07:10.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 231  [16:07:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 232  [16:07:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 233  [16:07:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 234  [16:07:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 235  [16:07:15.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 236  [16:07:16.000] Different program with same set of files
Info 237  [16:07:17.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 238  [16:07:18.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 239  [16:07:19.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 240  [16:07:20.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 241  [16:07:21.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 242  [16:07:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 243  [16:07:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 244  [16:07:24.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 245  [16:07:25.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 246  [16:07:26.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 247  [16:07:27.000] -----------------------------------------------
Info 248  [16:07:28.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 249  [16:07:29.000] Search path: /user/username/projects/myproject/src
Info 250  [16:07:30.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 251  [16:07:31.000] Search path: /user/username/projects/myproject/src
Info 252  [16:07:32.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 253  [16:07:33.000] Search path: /user/username/projects/myproject/src/helpers
Info 254  [16:07:34.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 255  [16:07:35.000] Search path: /user/username/projects/myproject/src/helpers
Info 256  [16:07:36.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 257  [16:07:37.000] Finding references to /user/username/projects/myproject/src/main.ts position 9 in project /user/username/projects/myproject/tsconfig-src.json
Info 258  [16:07:38.000] response:{"response":{"refs":[{"file":"/user/username/projects/myproject/indirect3/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":28},"lineText":"import { foo } from 'main';","isWriteAccess":true,"isDefinition":true},{"file":"/user/username/projects/myproject/indirect3/main.ts","start":{"line":2,"offset":1},"end":{"line":2,"offset":4},"lineText":"foo;","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/myproject/src/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":41},"lineText":"import { foo } from 'helpers/functions';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/src/main.ts","start":{"line":2,"offset":10},"end":{"line":2,"offset":13},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":16},"lineText":"export { foo };","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/src/helpers/functions.ts","start":{"line":1,"offset":14},"end":{"line":1,"offset":17},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":22},"lineText":"export const foo = 1;","isWriteAccess":true,"isDefinition":false}],"symbolName":"foo","symbolStartOffset":10,"symbolDisplayString":"(alias) const foo: 1\nimport foo"},"responseRequired":true}