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


PolledWatches::

FsWatches::

FsWatchesRecursive::

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
Info 8    [00:00:31.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [00:00:32.000] Starting updateGraphWorker: Project: /a/b/projects/project/src/tsconfig.json
Info 10   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 12   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 13   [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 14   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 15   [00:00:38.000] Finishing updateGraphWorker: Project: /a/b/projects/project/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:39.000] Project '/a/b/projects/project/src/tsconfig.json' (Configured)
Info 17   [00:00:40.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/file1.ts


	../../../../lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:41.000] -----------------------------------------------
Info 19   [00:00:42.000] Project '/a/b/projects/project/src/tsconfig.json' (Configured)
Info 19   [00:00:43.000] 	Files (2)

Info 19   [00:00:44.000] -----------------------------------------------
Info 19   [00:00:45.000] Open files: 
Info 19   [00:00:46.000] 	FileName: /a/b/projects/project/src/file1.ts ProjectRootPath: /a/b/projects/project
Info 19   [00:00:47.000] 		Projects: /a/b/projects/project/src/tsconfig.json
Info 19   [00:00:49.000] FileWatcher:: Triggered with /a/b/projects/project/src/tsconfig.json 2:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Config file
Info 20   [00:00:50.000] `remove Project::
Info 21   [00:00:51.000] Project '/a/b/projects/project/src/tsconfig.json' (Configured)
Info 22   [00:00:52.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/file1.ts


	../../../../lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'

Info 23   [00:00:53.000] -----------------------------------------------
Info 24   [00:00:54.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/src 1 undefined Config: /a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Info 25   [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/src 1 undefined Config: /a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Info 26   [00:00:56.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Config file
Info 27   [00:00:57.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 28   [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 29   [00:00:59.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 30   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info 31   [00:01:01.000] Search path: /a/b/projects/project/src
Info 32   [00:01:02.000] For info: /a/b/projects/project/src/file1.ts :: No config files found.
Info 33   [00:01:03.000] Scheduled: *ensureProjectForOpenFiles*
Info 34   [00:01:04.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/src/tsconfig.json 2:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined Project: /a/b/projects/project/src/tsconfig.json WatchType: Config file
Before running timeout callbacks
//// [/a/b/projects/project/src/tsconfig.json] deleted

PolledWatches::

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 35   [00:01:05.500] Running: *ensureProjectForOpenFiles*
Info 36   [00:01:06.500] Before ensureProjectForOpenFiles:
Info 37   [00:01:07.500] Open files: 
Info 37   [00:01:08.500] 	FileName: /a/b/projects/project/src/file1.ts ProjectRootPath: /a/b/projects/project
Info 37   [00:01:09.500] 		Projects: 
Info 37   [00:01:10.500] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 38   [00:01:11.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 39   [00:01:12.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 40   [00:01:13.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 41   [00:01:14.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 42   [00:01:15.500] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 43   [00:01:16.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 44   [00:01:17.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 45   [00:01:18.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 46   [00:01:19.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 47   [00:01:20.500] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 48   [00:01:21.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 49   [00:01:22.500] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/file1.ts


	../../../../lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Root file specified for compilation

Info 50   [00:01:23.500] -----------------------------------------------
Info 51   [00:01:24.500] After ensureProjectForOpenFiles:
Info 52   [00:01:25.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 52   [00:01:26.500] 	Files (2)

Info 52   [00:01:27.500] -----------------------------------------------
Info 52   [00:01:28.500] Open files: 
Info 52   [00:01:29.500] 	FileName: /a/b/projects/project/src/file1.ts ProjectRootPath: /a/b/projects/project
Info 52   [00:01:30.500] 		Projects: /dev/null/inferredProject1*
After running timeout callbacks

PolledWatches::
/a/b/projects/project/src/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/src/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
