currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/src/node_modules/module1/index.ts]
export function module1() {}

//// [/user/username/projects/myproject/node_modules/module2/index.ts]
export function module2() {}

//// [/user/username/projects/myproject/src/file1.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"traceResolution":true}}

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


Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/file1.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'module1' from '/user/username/projects/myproject/src/file1.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1/index.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/user/username/projects/myproject/src/node_modules/module1/index.ts', result '/user/username/projects/myproject/src/node_modules/module1/index.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module 'module2' from '/user/username/projects/myproject/src/file1.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module2.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module2.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module2.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/user/username/projects/myproject/src/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2/index.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/user/username/projects/myproject/node_modules/module2/index.ts', result '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/node_modules/module1/index.ts Text-1 "export function module1() {}"
	/user/username/projects/myproject/node_modules/module2/index.ts Text-1 "export function module2() {}"
	/user/username/projects/myproject/src/file1.ts SVC-1-0 "import { module1 } from \"module1\";import { module2 } from \"module2\";"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/node_modules/module1/index.ts
	  Imported via "module1" from file 'src/file1.ts'
	node_modules/module2/index.ts
	  Imported via "module2" from file 'src/file1.ts'
	src/file1.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/file1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/src/file1.ts] file changed its modified time

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/src/node_modules: *new*
  {}

After running Timeout callback:: count: 0
