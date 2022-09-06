Info 0    [16:01:03.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:01:04.000] Search path: /user/username/projects/myproject/src
Info 2    [16:01:05.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [16:01:06.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [16:01:07.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [16:01:08.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 6    [16:01:09.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/indirect1",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  }
 ]
}
Info 7    [16:01:10.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [16:01:11.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 9    [16:01:12.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 10   [16:01:13.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 11   [16:01:14.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 12   [16:01:15.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 13   [16:01:16.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 14   [16:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 15   [16:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 16   [16:01:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 17   [16:01:20.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 18   [16:01:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 19   [16:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 20   [16:01:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 21   [16:01:24.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [16:01:25.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 23   [16:01:26.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 24   [16:01:27.000] -----------------------------------------------
Info 25   [16:01:28.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 26   [16:01:29.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":4,"tsSize":166,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 27   [16:01:30.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect1.json
Info 28   [16:01:31.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 29   [16:01:32.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 30   [16:01:33.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json
Info 31   [16:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 32   [16:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 33   [16:01:36.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [16:01:37.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 35   [16:01:38.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Part of 'files' list in tsconfig.json

Info 36   [16:01:39.000] -----------------------------------------------
Info 37   [16:01:40.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json"}}
Info 38   [16:01:41.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"9ccc3aed1af08832ccb25ea453f7b771199f56af238b53cc428549dbd2d59246","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":134,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":"","disableReferencedProjectLoad":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 39   [16:01:42.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 40   [16:01:43.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 40   [16:01:44.000] 	Files (5)

Info 40   [16:01:45.000] -----------------------------------------------
Info 40   [16:01:46.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 40   [16:01:47.000] 	Files (4)

Info 40   [16:01:48.000] -----------------------------------------------
Info 40   [16:01:49.000] Open files: 
Info 40   [16:01:50.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 40   [16:01:51.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-indirect1.json

getDefaultProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig.json
findDefaultConfiguredProject for /user/username/projects/myproject/src/main.ts: undefined

Info 40   [16:01:52.000] Search path: /dummy
Info 41   [16:01:53.000] For info: /dummy/dummy.ts :: No config files found.
Info 42   [16:01:54.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 43   [16:01:55.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 44   [16:01:56.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 45   [16:01:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 46   [16:01:58.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 47   [16:01:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 48   [16:02:00.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 49   [16:02:01.000] -----------------------------------------------
Info 50   [16:02:02.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 50   [16:02:03.000] 	Files (5)

Info 50   [16:02:04.000] -----------------------------------------------
Info 50   [16:02:05.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 50   [16:02:06.000] 	Files (4)

Info 50   [16:02:07.000] -----------------------------------------------
Info 50   [16:02:08.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 50   [16:02:09.000] 	Files (2)

Info 50   [16:02:10.000] -----------------------------------------------
Info 50   [16:02:11.000] Open files: 
Info 50   [16:02:12.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 50   [16:02:13.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-indirect1.json
Info 50   [16:02:14.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 50   [16:02:15.000] 		Projects: /dev/null/inferredProject1*
Info 50   [16:02:16.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 51   [16:02:17.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 51   [16:02:18.000] 	Files (5)

Info 51   [16:02:19.000] -----------------------------------------------
Info 51   [16:02:20.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 51   [16:02:21.000] 	Files (4)

Info 51   [16:02:22.000] -----------------------------------------------
Info 51   [16:02:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 51   [16:02:24.000] 	Files (2)

Info 51   [16:02:25.000] -----------------------------------------------
Info 51   [16:02:26.000] Open files: 
Info 51   [16:02:27.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 51   [16:02:28.000] 		Projects: /dev/null/inferredProject1*
Info 51   [16:02:29.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 52   [16:02:30.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 52   [16:02:31.000] 	Files (5)

Info 52   [16:02:32.000] -----------------------------------------------
Info 52   [16:02:33.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 52   [16:02:34.000] 	Files (4)

Info 52   [16:02:35.000] -----------------------------------------------
Info 52   [16:02:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 52   [16:02:37.000] 	Files (2)

Info 52   [16:02:38.000] -----------------------------------------------
Info 52   [16:02:39.000] Open files: 
Info 52   [16:02:40.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 53   [16:02:41.000] Search path: /dummy
Info 54   [16:02:42.000] For info: /dummy/dummy.ts :: No config files found.
Info 55   [16:02:43.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 56   [16:02:44.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 57   [16:02:45.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 58   [16:02:46.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 59   [16:02:47.000] -----------------------------------------------
Info 60   [16:02:48.000] `remove Project::
Info 61   [16:02:49.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 62   [16:02:50.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 63   [16:02:51.000] -----------------------------------------------
Info 64   [16:02:52.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 65   [16:02:53.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 66   [16:02:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 67   [16:02:55.000] `remove Project::
Info 68   [16:02:56.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 69   [16:02:57.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Part of 'files' list in tsconfig.json

Info 70   [16:02:58.000] -----------------------------------------------
Info 71   [16:02:59.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 72   [16:03:00.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 73   [16:03:01.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 74   [16:03:02.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 75   [16:03:03.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 76   [16:03:04.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 77   [16:03:05.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 78   [16:03:06.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 79   [16:03:07.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 80   [16:03:08.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 81   [16:03:09.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 81   [16:03:10.000] 	Files (2)

Info 81   [16:03:11.000] -----------------------------------------------
Info 81   [16:03:12.000] Open files: 
Info 81   [16:03:13.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 81   [16:03:14.000] 		Projects: /dev/null/inferredProject1*
Info 81   [16:03:15.000] Search path: /user/username/projects/myproject/src
Info 82   [16:03:16.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 83   [16:03:17.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 84   [16:03:18.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 85   [16:03:19.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 86   [16:03:20.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/indirect1",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  }
 ]
}
Info 87   [16:03:21.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 88   [16:03:22.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 89   [16:03:23.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 90   [16:03:24.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 91   [16:03:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 92   [16:03:26.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 93   [16:03:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 94   [16:03:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 95   [16:03:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 96   [16:03:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 97   [16:03:31.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 98   [16:03:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 99   [16:03:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 100  [16:03:34.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 101  [16:03:35.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 102  [16:03:36.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 103  [16:03:37.000] -----------------------------------------------
Info 104  [16:03:38.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 105  [16:03:39.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect1.json
Info 106  [16:03:40.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 107  [16:03:41.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 108  [16:03:42.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json
Info 109  [16:03:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 110  [16:03:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 111  [16:03:45.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 112  [16:03:46.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 113  [16:03:47.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Part of 'files' list in tsconfig.json

Info 114  [16:03:48.000] -----------------------------------------------
Info 115  [16:03:49.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json"}}
Info 116  [16:03:50.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 117  [16:03:51.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 117  [16:03:52.000] 	Files (5)

Info 117  [16:03:53.000] -----------------------------------------------
Info 117  [16:03:54.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 117  [16:03:55.000] 	Files (4)

Info 117  [16:03:56.000] -----------------------------------------------
Info 117  [16:03:57.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 117  [16:03:58.000] 	Files (2)

Info 117  [16:03:59.000] -----------------------------------------------
Info 117  [16:04:00.000] Open files: 
Info 117  [16:04:01.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 117  [16:04:02.000] 		Projects: /dev/null/inferredProject1*
Info 117  [16:04:03.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 117  [16:04:04.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-indirect1.json
Info 117  [16:04:05.000] reload projects.
Info 118  [16:04:06.000] Scheduled: /dev/null/inferredProject1*
Info 119  [16:04:07.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 120  [16:04:08.000] Scheduled: /user/username/projects/myproject/tsconfig-indirect1.json
Info 121  [16:04:09.000] Scheduled: *ensureProjectForOpenFiles*
Info 122  [16:04:10.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 123  [16:04:11.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 124  [16:04:12.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 125  [16:04:13.000] Scheduled: /user/username/projects/myproject/tsconfig-indirect1.json, Cancelled earlier one
Info 126  [16:04:14.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 127  [16:04:15.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 128  [16:04:16.000] Scheduled: /user/username/projects/myproject/tsconfig-indirect1.json, Cancelled earlier one
Info 129  [16:04:17.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 130  [16:04:18.000] Search path: /dummy
Info 131  [16:04:19.000] For info: /dummy/dummy.ts :: No config files found.
Info 132  [16:04:20.000] Search path: /user/username/projects/myproject/src
Info 133  [16:04:21.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 134  [16:04:22.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 135  [16:04:23.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 136  [16:04:24.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 137  [16:04:25.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"User requested reload projects"}}
Info 138  [16:04:26.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/indirect1",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  }
 ]
}
Info 139  [16:04:27.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 140  [16:04:28.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 141  [16:04:29.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 142  [16:04:30.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 143  [16:04:31.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 144  [16:04:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 145  [16:04:33.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 146  [16:04:34.000] Different program with same set of files
Info 147  [16:04:35.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 148  [16:04:36.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig.json","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 149  [16:04:37.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 150  [16:04:38.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 151  [16:04:39.000] Reloading configured project /user/username/projects/myproject/tsconfig-indirect1.json
Info 152  [16:04:40.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json","reason":"User requested reload projects"}}
Info 153  [16:04:41.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 154  [16:04:42.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json
Info 155  [16:04:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 156  [16:04:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 157  [16:04:45.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 158  [16:04:46.000] Different program with same set of files
Info 159  [16:04:47.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json"}}
Info 160  [16:04:48.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig-indirect1.json","configFile":"/user/username/projects/myproject/tsconfig-indirect1.json","diagnostics":[]}}
Info 161  [16:04:49.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 162  [16:04:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 163  [16:04:51.000] Before ensureProjectForOpenFiles:
Info 164  [16:04:52.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 164  [16:04:53.000] 	Files (5)

Info 164  [16:04:54.000] -----------------------------------------------
Info 164  [16:04:55.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 164  [16:04:56.000] 	Files (4)

Info 164  [16:04:57.000] -----------------------------------------------
Info 164  [16:04:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 164  [16:04:59.000] 	Files (2)

Info 164  [16:05:00.000] -----------------------------------------------
Info 164  [16:05:01.000] Open files: 
Info 164  [16:05:02.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 164  [16:05:03.000] 		Projects: /dev/null/inferredProject1*
Info 164  [16:05:04.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 164  [16:05:05.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-indirect1.json
Info 164  [16:05:06.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 165  [16:05:07.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 166  [16:05:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 167  [16:05:09.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 168  [16:05:10.000] Different program with same set of files
Info 169  [16:05:11.000] After ensureProjectForOpenFiles:
Info 170  [16:05:12.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 170  [16:05:13.000] 	Files (5)

Info 170  [16:05:14.000] -----------------------------------------------
Info 170  [16:05:15.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 170  [16:05:16.000] 	Files (4)

Info 170  [16:05:17.000] -----------------------------------------------
Info 170  [16:05:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 170  [16:05:19.000] 	Files (2)

Info 170  [16:05:20.000] -----------------------------------------------
Info 170  [16:05:21.000] Open files: 
Info 170  [16:05:22.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 170  [16:05:23.000] 		Projects: /dev/null/inferredProject1*
Info 170  [16:05:24.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 170  [16:05:25.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-indirect1.json