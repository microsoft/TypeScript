currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
let x = 1

//// [/a/f2.ts]
let x = 1

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

//// [/a/b/tsconfig.json]
{"compilerOptions":{}}


Info 1    [00:00:18.000] Search path: /a/b
Info 2    [00:00:19.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:20.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:22.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:25.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:29.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:30.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:31.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.ts SVC-1-0 "let x = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:32.000] -----------------------------------------------
Info 16   [00:00:33.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:34.000] 	Files (2)

Info 16   [00:00:35.000] -----------------------------------------------
Info 16   [00:00:36.000] Open files: 
Info 16   [00:00:37.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 16   [00:00:38.000] 		Projects: /a/b/tsconfig.json
Info 16   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:40.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:41.000] 	Files (2)

Info 17   [00:00:42.000] -----------------------------------------------
Info 17   [00:00:43.000] Open files: 
Info 17   [00:00:44.000] Search path: /a
Info 18   [00:00:45.000] For info: /a/f2.ts :: No config files found.
Info 19   [00:00:46.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 21   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:00:49.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:50.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 24   [00:00:51.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/f2.ts SVC-1-0 "let x = 1"


	lib/lib.d.ts
	  Default library for target 'es5'
	f2.ts
	  Root file specified for compilation

Info 25   [00:00:52.000] -----------------------------------------------
Info 26   [00:00:53.000] `remove Project::
Info 27   [00:00:54.000] Project '/a/b/tsconfig.json' (Configured)
Info 28   [00:00:55.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/f1.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by default include pattern '**/*'

Info 29   [00:00:56.000] -----------------------------------------------
Info 30   [00:00:57.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 31   [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 32   [00:00:59.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 33   [00:01:00.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 34   [00:01:01.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 35   [00:01:02.000] FileWatcher:: Close:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 36   [00:01:03.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 36   [00:01:04.000] 	Files (2)

Info 36   [00:01:05.000] -----------------------------------------------
Info 36   [00:01:06.000] Open files: 
Info 36   [00:01:07.000] 	FileName: /a/f2.ts ProjectRootPath: undefined
Info 36   [00:01:08.000] 		Projects: /dev/null/inferredProject1*