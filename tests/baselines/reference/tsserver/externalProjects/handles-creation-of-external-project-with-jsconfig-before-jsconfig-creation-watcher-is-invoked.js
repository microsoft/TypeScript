currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
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

//// [/user/username/projects/myproject/tsconfig.json]
{}


Info 1    [00:00:20.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 2    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 3    [00:00:22.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 4    [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 5    [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 6    [00:00:25.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 7    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 8    [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 9    [00:00:28.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:29.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 11   [00:00:30.000] 	Files (0)

Info 12   [00:00:31.000] -----------------------------------------------
Info 13   [00:00:34.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/javascript.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:35.000] Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/javascript.js
Info 15   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/javascript.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 16   [00:00:37.000] Search path: /user/username/projects/myproject
Info 17   [00:00:38.000] For info: /user/username/projects/myproject/javascript.js :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 18   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 19   [00:00:40.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:00:44.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:45.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:46.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/javascript.js SVC-1-0 ""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	javascript.js
	  Root file specified for compilation

Info 26   [00:00:47.000] -----------------------------------------------
Info 27   [00:00:48.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 27   [00:00:49.000] 	Files (0)

Info 27   [00:00:50.000] -----------------------------------------------
Info 27   [00:00:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:00:52.000] 	Files (2)

Info 27   [00:00:53.000] -----------------------------------------------
Info 27   [00:00:54.000] Open files: 
Info 27   [00:00:55.000] 	FileName: /user/username/projects/myproject/javascript.js ProjectRootPath: undefined
Info 27   [00:00:56.000] 		Projects: /dev/null/inferredProject1*
Info 27   [00:00:59.000] Creating configuration project /user/username/projects/myproject/jsconfig.json
Info 28   [00:01:00.000] Config: /user/username/projects/myproject/jsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/javascript.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/user/username/projects/myproject/jsconfig.json"
 }
}
Info 29   [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/jsconfig.json WatchType: Wild card directory
Info 30   [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/jsconfig.json WatchType: Wild card directory
Info 31   [00:01:03.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 32   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 33   [00:01:05.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/jsconfig.json
Info 34   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/jsconfig.json WatchType: Type roots
Info 35   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/jsconfig.json WatchType: Type roots
Info 36   [00:01:08.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 37   [00:01:09.000] Project '/user/username/projects/myproject/jsconfig.json' (Configured)
Info 38   [00:01:10.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/javascript.js SVC-1-0 ""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	javascript.js
	  Matched by default include pattern '**/*'

Info 39   [00:01:11.000] -----------------------------------------------
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false