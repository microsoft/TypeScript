currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: true
Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/tsconfig.json]
{}

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


Info 1    [00:00:20.000] Search path: 
Info 2    [00:00:21.000] For info: untitled:^Untitled-1 :: No config files found.
Info 3    [00:00:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:28.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	untitled:^Untitled-1 SVC-1-0 "const x = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	untitled:^Untitled-1
	  Root file specified for compilation

Info 10   [00:00:29.000] -----------------------------------------------
Info 11   [00:00:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:31.000] 	Files (2)

Info 11   [00:00:32.000] -----------------------------------------------
Info 11   [00:00:33.000] Open files: 
Info 11   [00:00:34.000] 	FileName: untitled:^Untitled-1 ProjectRootPath: /user/username/projects/myproject
Info 11   [00:00:35.000] 		Projects: /dev/null/inferredProject1*
/user/username/projects/myproject/untitled:^Untitled-1 isDynamic:: true
Timeout callback:: count: 0
Immedidate callback:: count: 0
//// [/user/username/projects/myproject/Untitled-1.ts]
const x = 10;


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

Info 11   [00:00:38.000] Search path: /user/username/projects/myproject
Info 12   [00:00:39.000] For info: /user/username/projects/myproject/Untitled-1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 13   [00:00:40.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 14   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 15   [00:00:42.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/Untitled-1.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 16   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 17   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 18   [00:00:45.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 19   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 20   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 21   [00:00:48.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:49.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 23   [00:00:50.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/Untitled-1.ts SVC-1-0 "const x = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	Untitled-1.ts
	  Matched by default include pattern '**/*'

Info 24   [00:00:51.000] -----------------------------------------------
Info 25   [00:00:52.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 25   [00:00:53.000] 	Files (2)

Info 25   [00:00:54.000] -----------------------------------------------
Info 25   [00:00:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:56.000] 	Files (2)

Info 25   [00:00:57.000] -----------------------------------------------
Info 25   [00:00:58.000] Open files: 
Info 25   [00:00:59.000] 	FileName: untitled:^Untitled-1 ProjectRootPath: /user/username/projects/myproject
Info 25   [00:01:00.000] 		Projects: /dev/null/inferredProject1*
Info 25   [00:01:01.000] 	FileName: /user/username/projects/myproject/Untitled-1.ts ProjectRootPath: /user/username/projects/myproject
Info 25   [00:01:02.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 25   [00:01:03.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 25   [00:01:04.000] 	Files (2)

Info 25   [00:01:05.000] -----------------------------------------------
Info 25   [00:01:06.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:01:07.000] 	Files (2)

Info 25   [00:01:08.000] -----------------------------------------------
Info 25   [00:01:09.000] Open files: 
Info 25   [00:01:10.000] 	FileName: /user/username/projects/myproject/Untitled-1.ts ProjectRootPath: /user/username/projects/myproject
Info 25   [00:01:11.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 25   [00:01:12.000] Search path: 
Info 26   [00:01:13.000] For info: untitled:^Untitled-1 :: No config files found.
Info 27   [00:01:14.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 28   [00:01:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 29   [00:01:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:01:17.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	untitled:^Untitled-1 SVC-2-0 "const x = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	untitled:^Untitled-1
	  Root file specified for compilation

Info 31   [00:01:18.000] -----------------------------------------------
Info 32   [00:01:19.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 32   [00:01:20.000] 	Files (2)

Info 32   [00:01:21.000] -----------------------------------------------
Info 32   [00:01:22.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:23.000] 	Files (2)

Info 32   [00:01:24.000] -----------------------------------------------
Info 32   [00:01:25.000] Open files: 
Info 32   [00:01:26.000] 	FileName: /user/username/projects/myproject/Untitled-1.ts ProjectRootPath: /user/username/projects/myproject
Info 32   [00:01:27.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 32   [00:01:28.000] 	FileName: untitled:^Untitled-1 ProjectRootPath: /user/username/projects/myproject
Info 32   [00:01:29.000] 		Projects: /dev/null/inferredProject1*
/user/username/projects/myproject/untitled:^Untitled-1 isDynamic:: true