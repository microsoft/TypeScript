currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:23.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/proj/foo/boo/app.ts]
import * as debug from "debug"

//// [/proj/foo/boo/moo/app.ts]
import * as debug from "debug"

//// [/proj/tsconfig.json]
{"files":["foo/boo/app.ts","foo/boo/moo/app.ts"],"moduleResolution":"Node"}

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


Info 1    [00:00:24.000] Search path: /proj/foo/boo
Info 2    [00:00:25.000] For info: /proj/foo/boo/app.ts :: Config file name: /proj/tsconfig.json
Info 3    [00:00:26.000] Creating configuration project /proj/tsconfig.json
Info 4    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /proj/tsconfig.json 2000 undefined Project: /proj/tsconfig.json WatchType: Config file
Info 5    [00:00:28.000] Config: /proj/tsconfig.json : {
 "rootNames": [
  "/proj/foo/boo/app.ts",
  "/proj/foo/boo/moo/app.ts"
 ],
 "options": {
  "configFilePath": "/proj/tsconfig.json"
 }
}
Info 6    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /proj/foo/boo/moo/app.ts 500 undefined WatchType: Closed Script info
Info 7    [00:00:30.000] Starting updateGraphWorker: Project: /proj/tsconfig.json
Info 8    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /proj/foo 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 10   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/foo 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /proj/tsconfig.json WatchType: Type roots
Info 14   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /proj/tsconfig.json WatchType: Type roots
Info 15   [00:00:38.000] Finishing updateGraphWorker: Project: /proj/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:39.000] Project '/proj/tsconfig.json' (Configured)
Info 17   [00:00:40.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/proj/foo/boo/app.ts SVC-1-0 "import * as debug from \"debug\""
	/proj/foo/boo/moo/app.ts Text-1 "import * as debug from \"debug\""


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	foo/boo/app.ts
	  Part of 'files' list in tsconfig.json
	foo/boo/moo/app.ts
	  Part of 'files' list in tsconfig.json

Info 18   [00:00:41.000] -----------------------------------------------
Info 19   [00:00:42.000] Project '/proj/tsconfig.json' (Configured)
Info 19   [00:00:43.000] 	Files (3)

Info 19   [00:00:44.000] -----------------------------------------------
Info 19   [00:00:45.000] Open files: 
Info 19   [00:00:46.000] 	FileName: /proj/foo/boo/app.ts ProjectRootPath: undefined
Info 19   [00:00:47.000] 		Projects: /proj/tsconfig.json
Info 19   [00:00:48.000] getSemanticDiagnostics:: /proj/foo/boo/app.ts:: 1
Info 20   [00:00:49.000] foo/boo/app.ts(1,24): error TS2307: Cannot find module 'debug' or its corresponding type declarations.

Info 21   [00:00:50.000] getSemanticDiagnostics:: /proj/foo/boo/moo/app.ts:: 1
Info 22   [00:00:51.000] foo/boo/moo/app.ts(1,24): error TS2307: Cannot find module 'debug' or its corresponding type declarations.

Info 23   [00:00:55.000] DirectoryWatcher:: Triggered with /proj/node_modules :: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 24   [00:00:56.000] Scheduled: /proj/tsconfig.jsonFailedLookupInvalidation
Info 25   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /proj/node_modules :: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 26   [00:00:58.000] DirectoryWatcher:: Triggered with /proj/node_modules :: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [00:00:59.000] Scheduled: /proj/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 28   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /proj/node_modules :: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 29   [00:01:03.000] DirectoryWatcher:: Triggered with /proj/node_modules/debug :: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 30   [00:01:04.000] Scheduled: /proj/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 31   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /proj/node_modules/debug :: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 32   [00:01:08.000] DirectoryWatcher:: Triggered with /proj/node_modules/debug/index.d.ts :: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Info 33   [00:01:09.000] Scheduled: /proj/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 34   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /proj/node_modules/debug/index.d.ts :: WatchInfo: /proj/node_modules 1 undefined Project: /proj/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 1
4: /proj/tsconfig.jsonFailedLookupInvalidation
//// [/proj/node_modules/debug/index.d.ts]
export {}


PolledWatches::
/proj/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/proj/tsconfig.json: *new*
  {}
/proj/foo/boo/moo/app.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/proj/foo: *new*
  {}
/proj/node_modules: *new*
  {}

Info 35   [00:01:11.000] Running: /proj/tsconfig.jsonFailedLookupInvalidation
Info 36   [00:01:12.000] Scheduled: /proj/tsconfig.json
Info 37   [00:01:13.000] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2
5: /proj/tsconfig.json
6: *ensureProjectForOpenFiles*

Before running Timeout callback:: count: 2
5: /proj/tsconfig.json
6: *ensureProjectForOpenFiles*

Info 38   [00:01:14.000] Running: /proj/tsconfig.json
Info 39   [00:01:15.000] Starting updateGraphWorker: Project: /proj/tsconfig.json
Info 40   [00:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 41   [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 42   [00:01:18.000] Finishing updateGraphWorker: Project: /proj/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 43   [00:01:19.000] Project '/proj/tsconfig.json' (Configured)
Info 44   [00:01:20.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/proj/node_modules/debug/index.d.ts Text-1 "export {}"
	/proj/foo/boo/app.ts SVC-1-0 "import * as debug from \"debug\""
	/proj/foo/boo/moo/app.ts Text-1 "import * as debug from \"debug\""


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/debug/index.d.ts
	  Imported via "debug" from file 'foo/boo/app.ts'
	  Imported via "debug" from file 'foo/boo/moo/app.ts'
	foo/boo/app.ts
	  Part of 'files' list in tsconfig.json
	foo/boo/moo/app.ts
	  Part of 'files' list in tsconfig.json

Info 45   [00:01:21.000] -----------------------------------------------
Info 46   [00:01:22.000] Running: *ensureProjectForOpenFiles*
Info 47   [00:01:23.000] Before ensureProjectForOpenFiles:
Info 48   [00:01:24.000] Project '/proj/tsconfig.json' (Configured)
Info 48   [00:01:25.000] 	Files (4)

Info 48   [00:01:26.000] -----------------------------------------------
Info 48   [00:01:27.000] Open files: 
Info 48   [00:01:28.000] 	FileName: /proj/foo/boo/app.ts ProjectRootPath: undefined
Info 48   [00:01:29.000] 		Projects: /proj/tsconfig.json
Info 48   [00:01:30.000] After ensureProjectForOpenFiles:
Info 49   [00:01:31.000] Project '/proj/tsconfig.json' (Configured)
Info 49   [00:01:32.000] 	Files (4)

Info 49   [00:01:33.000] -----------------------------------------------
Info 49   [00:01:34.000] Open files: 
Info 49   [00:01:35.000] 	FileName: /proj/foo/boo/app.ts ProjectRootPath: undefined
Info 49   [00:01:36.000] 		Projects: /proj/tsconfig.json
After running Timeout callback:: count: 0

Info 49   [00:01:37.000] getSemanticDiagnostics:: /proj/foo/boo/app.ts:: 0
Info 50   [00:01:38.000] getSemanticDiagnostics:: /proj/foo/boo/moo/app.ts:: 0