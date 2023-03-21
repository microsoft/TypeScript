Info 0    [00:00:57.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:58.000] Search path: /user/username/projects/myproject/src
Info 2    [00:00:59.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:01:00.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:01:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:01:02.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 6    [00:01:03.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 7    [00:01:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 8    [00:01:05.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 9    [00:01:06.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 10   [00:01:07.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 11   [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 12   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 13   [00:01:10.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 14   [00:01:11.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 15   [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 16   [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 17   [00:01:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 18   [00:01:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 19   [00:01:16.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:01:17.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 21   [00:01:18.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-1 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-1-0 "import { foo } from 'helpers/functions';\nexport { foo };"
	/user/username/projects/myproject/own/main.ts Text-1 "import { foo } from 'main';\nfoo;\nexport function bar() {}"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 22   [00:01:19.000] -----------------------------------------------
Info 23   [00:01:20.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 24   [00:01:21.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":134,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"outDir":"","baseUrl":"","disableReferencedProjectLoad":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 25   [00:01:22.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 26   [00:01:23.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 26   [00:01:24.000] 	Files (4)

Info 26   [00:01:25.000] -----------------------------------------------
Info 26   [00:01:26.000] Open files: 
Info 26   [00:01:27.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 26   [00:01:28.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 26   [00:01:29.000] getDefaultProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig.json
Info 26   [00:01:30.000] findDefaultConfiguredProject for /user/username/projects/myproject/src/main.ts: undefined
Info 26   [00:01:31.000] Search path: /dummy
Info 27   [00:01:32.000] For info: /dummy/dummy.ts :: No config files found.
Info 28   [00:01:33.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 29   [00:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 30   [00:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 31   [00:01:36.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 32   [00:01:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 33   [00:01:38.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/dummy/dummy.ts SVC-1-0 "let a = 10;"


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 34   [00:01:39.000] -----------------------------------------------
Info 35   [00:01:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 35   [00:01:41.000] 	Files (4)

Info 35   [00:01:42.000] -----------------------------------------------
Info 35   [00:01:43.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 35   [00:01:44.000] 	Files (2)

Info 35   [00:01:45.000] -----------------------------------------------
Info 35   [00:01:46.000] Open files: 
Info 35   [00:01:47.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 35   [00:01:48.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 35   [00:01:49.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 35   [00:01:50.000] 		Projects: /dev/null/inferredProject1*
Info 35   [00:01:51.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 36   [00:01:52.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 36   [00:01:53.000] 	Files (4)

Info 36   [00:01:54.000] -----------------------------------------------
Info 36   [00:01:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 36   [00:01:56.000] 	Files (2)

Info 36   [00:01:57.000] -----------------------------------------------
Info 36   [00:01:58.000] Open files: 
Info 36   [00:01:59.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 36   [00:02:00.000] 		Projects: /dev/null/inferredProject1*
Info 36   [00:02:01.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 37   [00:02:02.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 37   [00:02:03.000] 	Files (4)

Info 37   [00:02:04.000] -----------------------------------------------
Info 37   [00:02:05.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 37   [00:02:06.000] 	Files (2)

Info 37   [00:02:07.000] -----------------------------------------------
Info 37   [00:02:08.000] Open files: 
Info 37   [00:02:09.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 38   [00:02:10.000] Search path: /dummy
Info 39   [00:02:11.000] For info: /dummy/dummy.ts :: No config files found.
Info 40   [00:02:12.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 41   [00:02:13.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 42   [00:02:14.000] Same program as before
Info 43   [00:02:15.000] `remove Project::
Info 44   [00:02:16.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 45   [00:02:17.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 46   [00:02:18.000] -----------------------------------------------
Info 47   [00:02:19.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 48   [00:02:20.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 49   [00:02:21.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 50   [00:02:22.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 51   [00:02:23.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 52   [00:02:24.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 53   [00:02:25.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 54   [00:02:26.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 55   [00:02:27.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 56   [00:02:28.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 57   [00:02:29.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 58   [00:02:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 58   [00:02:31.000] 	Files (2)

Info 58   [00:02:32.000] -----------------------------------------------
Info 58   [00:02:33.000] Open files: 
Info 58   [00:02:34.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 58   [00:02:35.000] 		Projects: /dev/null/inferredProject1*
Info 58   [00:02:36.000] Search path: /user/username/projects/myproject/src
Info 59   [00:02:37.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 60   [00:02:38.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 61   [00:02:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 62   [00:02:40.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 63   [00:02:41.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 64   [00:02:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 65   [00:02:43.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 66   [00:02:44.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 67   [00:02:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 68   [00:02:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 69   [00:02:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 70   [00:02:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 71   [00:02:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 72   [00:02:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 73   [00:02:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 74   [00:02:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 75   [00:02:53.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 76   [00:02:54.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 77   [00:02:55.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-2-0 "import { foo } from 'helpers/functions';\nexport { foo };"
	/user/username/projects/myproject/own/main.ts Text-2 "import { foo } from 'main';\nfoo;\nexport function bar() {}"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 78   [00:02:56.000] -----------------------------------------------
Info 79   [00:02:57.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 80   [00:02:58.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 81   [00:02:59.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 81   [00:03:00.000] 	Files (4)

Info 81   [00:03:01.000] -----------------------------------------------
Info 81   [00:03:02.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 81   [00:03:03.000] 	Files (2)

Info 81   [00:03:04.000] -----------------------------------------------
Info 81   [00:03:05.000] Open files: 
Info 81   [00:03:06.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 81   [00:03:07.000] 		Projects: /dev/null/inferredProject1*
Info 81   [00:03:08.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 81   [00:03:09.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 81   [00:03:10.000] reload projects.
Info 82   [00:03:11.000] Scheduled: /dev/null/inferredProject1*
Info 83   [00:03:12.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 84   [00:03:13.000] Scheduled: *ensureProjectForOpenFiles*
Info 85   [00:03:14.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 86   [00:03:15.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 87   [00:03:16.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 88   [00:03:17.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 89   [00:03:18.000] Search path: /dummy
Info 90   [00:03:19.000] For info: /dummy/dummy.ts :: No config files found.
Info 91   [00:03:20.000] Search path: /user/username/projects/myproject/src
Info 92   [00:03:21.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 93   [00:03:22.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 94   [00:03:23.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 95   [00:03:24.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 96   [00:03:25.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 97   [00:03:26.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 98   [00:03:27.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"User requested reload projects"}}
Info 99   [00:03:28.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "disableReferencedProjectLoad": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 100  [00:03:29.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 101  [00:03:30.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 102  [00:03:31.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 103  [00:03:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 104  [00:03:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 105  [00:03:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 106  [00:03:35.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 107  [00:03:36.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 108  [00:03:37.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-2-0 "import { foo } from 'helpers/functions';\nexport { foo };"
	/user/username/projects/myproject/own/main.ts Text-2 "import { foo } from 'main';\nfoo;\nexport function bar() {}"

Info 109  [00:03:38.000] -----------------------------------------------
Info 110  [00:03:39.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 111  [00:03:40.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig.json","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 112  [00:03:41.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 113  [00:03:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 114  [00:03:43.000] Before ensureProjectForOpenFiles:
Info 115  [00:03:44.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 115  [00:03:45.000] 	Files (4)

Info 115  [00:03:46.000] -----------------------------------------------
Info 115  [00:03:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 115  [00:03:48.000] 	Files (2)

Info 115  [00:03:49.000] -----------------------------------------------
Info 115  [00:03:50.000] Open files: 
Info 115  [00:03:51.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 115  [00:03:52.000] 		Projects: /dev/null/inferredProject1*
Info 115  [00:03:53.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 115  [00:03:54.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 115  [00:03:55.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 116  [00:03:56.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 117  [00:03:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 118  [00:03:58.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 119  [00:03:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 120  [00:04:00.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/dummy/dummy.ts SVC-1-0 "let a = 10;"

Info 121  [00:04:01.000] -----------------------------------------------
Info 122  [00:04:02.000] After ensureProjectForOpenFiles:
Info 123  [00:04:03.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 123  [00:04:04.000] 	Files (4)

Info 123  [00:04:05.000] -----------------------------------------------
Info 123  [00:04:06.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 123  [00:04:07.000] 	Files (2)

Info 123  [00:04:08.000] -----------------------------------------------
Info 123  [00:04:09.000] Open files: 
Info 123  [00:04:10.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 123  [00:04:11.000] 		Projects: /dev/null/inferredProject1*
Info 123  [00:04:12.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 123  [00:04:13.000] 		Projects: /user/username/projects/myproject/tsconfig.json