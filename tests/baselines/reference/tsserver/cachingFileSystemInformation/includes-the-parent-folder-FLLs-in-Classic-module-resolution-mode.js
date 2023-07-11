currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/users/username/projects/proj/foo/boo/app.ts]
import * as debug from "debug"

//// [/users/username/projects/proj/foo/boo/moo/app.ts]
import * as debug from "debug"

//// [/users/username/projects/proj/tsconfig.json]
{"files":["foo/boo/app.ts","foo/boo/moo/app.ts"],"moduleResolution":"Classic"}

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


Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/proj/foo/boo
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/proj/foo/boo/app.ts :: Config file name: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/proj/tsconfig.json 2000 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/proj/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/proj/foo/boo/app.ts",
  "/users/username/projects/proj/foo/boo/moo/app.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/proj/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/proj/foo/boo/moo/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/foo 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/foo 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules/@types 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules/@types 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/proj/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/proj/foo/boo/app.ts SVC-1-0 "import * as debug from \"debug\""
	/users/username/projects/proj/foo/boo/moo/app.ts Text-1 "import * as debug from \"debug\""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	foo/boo/app.ts
	  Part of 'files' list in tsconfig.json
	foo/boo/moo/app.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/proj/foo/boo/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /users/username/projects/proj/foo/boo/app.ts:: 1
Info seq  [hh:mm:ss:mss] foo/boo/app.ts(1,24): error TS2307: Cannot find module 'debug' or its corresponding type declarations.

Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /users/username/projects/proj/foo/boo/moo/app.ts:: 1
Info seq  [hh:mm:ss:mss] foo/boo/moo/app.ts(1,24): error TS2307: Cannot find module 'debug' or its corresponding type declarations.

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules/debug :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules/debug :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules/debug/index.d.ts :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/proj/node_modules/debug/index.d.ts :: WatchInfo: /users/username/projects/proj/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 1
4: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation
//// [/users/username/projects/proj/node_modules/debug/index.d.ts]
export {}


PolledWatches::
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/proj/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/proj/foo/boo/moo/app.ts: *new*
  {}
/users/username/projects/proj/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/proj/foo: *new*
  {}
/users/username/projects/proj/node_modules: *new*
  {}

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/proj/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2
5: /users/username/projects/proj/tsconfig.json
6: *ensureProjectForOpenFiles*

Before running Timeout callback:: count: 2
5: /users/username/projects/proj/tsconfig.json
6: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/proj/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/proj/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/proj/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/proj/node_modules/debug/index.d.ts Text-1 "export {}"
	/users/username/projects/proj/foo/boo/app.ts SVC-1-0 "import * as debug from \"debug\""
	/users/username/projects/proj/foo/boo/moo/app.ts Text-1 "import * as debug from \"debug\""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/debug/index.d.ts
	  Imported via "debug" from file 'foo/boo/app.ts'
	  Imported via "debug" from file 'foo/boo/moo/app.ts'
	foo/boo/app.ts
	  Part of 'files' list in tsconfig.json
	foo/boo/moo/app.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/proj/foo/boo/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/proj/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/proj/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/proj/foo/boo/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/proj/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/proj/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/proj/foo/boo/moo/app.ts:
  {}
/users/username/projects/proj/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/projects/proj/foo:
  {}
/users/username/projects/proj/node_modules:
  {}

Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /users/username/projects/proj/foo/boo/app.ts:: 0
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /users/username/projects/proj/foo/boo/moo/app.ts:: 0