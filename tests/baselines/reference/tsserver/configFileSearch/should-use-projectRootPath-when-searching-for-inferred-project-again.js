currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:23.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/projects/project/src/file1.ts]


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

//// [/a/b/projects/project/src/tsconfig.json]
{}

//// [/a/b/projects/tsconfig.json]
{}


Info 1    [00:00:24.000] Search path: /a/b/projects/project/src
Info 2    [00:00:25.000] For info: /a/b/projects/project/src/file1.ts :: Config file name: /a/b/projects/project/src/tsconfig.json
Info 3    [00:00:26.000] Creating configuration project /a/b/projects/project/src/tsconfig.json
Info 4    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Config file
Info 5    [00:00:28.000] Config: /a/b/projects/project/src/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/project/src/file1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/projects/project/src/tsconfig.json"
 }
}
Info 6    [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src 1 undefined Config: /a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src 1 undefined Config: /a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:31.000] Starting updateGraphWorker: Project: /a/b/projects/project/src/tsconfig.json
Info 9    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 11   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 12   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 13   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 14   [00:00:37.000] Finishing updateGraphWorker: Project: /a/b/projects/project/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:38.000] Project '/a/b/projects/project/src/tsconfig.json' (Configured)
Info 16   [00:00:39.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/projects/project/src/file1.ts SVC-1-0 ""


	../../../../lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:40.000] -----------------------------------------------
Info 18   [00:00:41.000] Project '/a/b/projects/project/src/tsconfig.json' (Configured)
Info 18   [00:00:42.000] 	Files (2)

Info 18   [00:00:43.000] -----------------------------------------------
Info 18   [00:00:44.000] Open files: 
Info 18   [00:00:45.000] 	FileName: /a/b/projects/project/src/file1.ts ProjectRootPath: /a/b/projects/project
Info 18   [00:00:46.000] 		Projects: /a/b/projects/project/src/tsconfig.json
Info 18   [00:00:48.000] FileWatcher:: Triggered with /a/b/projects/project/src/tsconfig.json 2:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Config file
Info 19   [00:00:49.000] `remove Project::
Info 20   [00:00:50.000] Project '/a/b/projects/project/src/tsconfig.json' (Configured)
Info 21   [00:00:51.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/file1.ts


	../../../../lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'

Info 22   [00:00:52.000] -----------------------------------------------
Info 23   [00:00:53.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/src 1 undefined Config: /a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Info 24   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/src 1 undefined Config: /a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Info 25   [00:00:55.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Config file
Info 26   [00:00:56.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 27   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 28   [00:00:58.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 29   [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 30   [00:01:00.000] Search path: /a/b/projects/project/src
Info 31   [00:01:01.000] For info: /a/b/projects/project/src/file1.ts :: No config files found.
Info 32   [00:01:02.000] Scheduled: *ensureProjectForOpenFiles*
Info 33   [00:01:03.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/src/tsconfig.json 2:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Config file
Before running timeout callbacks
//// [/a/b/projects/project/src/tsconfig.json] deleted

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

Info 34   [00:01:04.500] Running: *ensureProjectForOpenFiles*
Info 35   [00:01:05.500] Before ensureProjectForOpenFiles:
Info 36   [00:01:06.500] Open files: 
Info 36   [00:01:07.500] 	FileName: /a/b/projects/project/src/file1.ts ProjectRootPath: /a/b/projects/project
Info 36   [00:01:08.500] 		Projects: 
Info 36   [00:01:09.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 37   [00:01:10.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 38   [00:01:11.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 39   [00:01:12.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 40   [00:01:13.500] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 41   [00:01:14.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 42   [00:01:15.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 43   [00:01:16.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 44   [00:01:17.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 45   [00:01:18.500] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 46   [00:01:19.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 47   [00:01:20.500] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/projects/project/src/file1.ts SVC-1-0 ""


	../../../../lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Root file specified for compilation

Info 48   [00:01:21.500] -----------------------------------------------
Info 49   [00:01:22.500] After ensureProjectForOpenFiles:
Info 50   [00:01:23.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 50   [00:01:24.500] 	Files (2)

Info 50   [00:01:25.500] -----------------------------------------------
Info 50   [00:01:26.500] Open files: 
Info 50   [00:01:27.500] 	FileName: /a/b/projects/project/src/file1.ts ProjectRootPath: /a/b/projects/project
Info 50   [00:01:28.500] 		Projects: /dev/null/inferredProject1*
After running timeout callbacks

PolledWatches::
/a/b/projects/project/src/tsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/projects/project/src/jsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/projects/project/src/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
