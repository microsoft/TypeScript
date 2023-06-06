currentDirectory:: / useCaseSensitiveFileNames: true
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts]
export class SomeClass { };

//// [/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts]
export class configureStore { }

//// [/a/lib/lib.es2016.full.d.ts]
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

//// [/Users/someuser/work/applications/frontend/tsconfig.json]
{"compilerOptions":{"strict":true,"strictNullChecks":true,"target":"es2016","module":"commonjs","moduleResolution":"node","sourceMap":true,"noEmitOnError":true,"experimentalDecorators":true,"emitDecoratorMetadata":true,"types":["node","jest"],"noUnusedLocals":true,"outDir":"./compiled","typeRoots":["types","node_modules/@types"],"baseUrl":".","paths":{"*":["types/*"]}},"include":["src/**/*"],"exclude":["node_modules","compiled"]}


Info seq  [hh:mm:ss:mss] Search path: /Users/someuser/work/applications/frontend/src/app/utils
Info seq  [hh:mm:ss:mss] For info: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts :: Config file name: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/tsconfig.json 2000 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /Users/someuser/work/applications/frontend/tsconfig.json : {
 "rootNames": [
  "/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts",
  "/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts"
 ],
 "options": {
  "strict": true,
  "strictNullChecks": true,
  "target": 3,
  "module": 1,
  "moduleResolution": 2,
  "sourceMap": true,
  "noEmitOnError": true,
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "types": [
   "node",
   "jest"
  ],
  "noUnusedLocals": true,
  "outDir": "/Users/someuser/work/applications/frontend/compiled",
  "typeRoots": [
   "/Users/someuser/work/applications/frontend/types",
   "/Users/someuser/work/applications/frontend/node_modules/@types"
  ],
  "baseUrl": "/Users/someuser/work/applications/frontend",
  "paths": {
   "*": [
    "types/*"
   ]
  },
  "pathsBasePath": "/Users/someuser/work/applications/frontend",
  "configFilePath": "/Users/someuser/work/applications/frontend/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/types 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/types 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/node_modules 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/node_modules 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts Text-1 "export class configureStore { }"
	/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts SVC-1-0 "export class SomeClass { };"


	../../../../../a/lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	src/app/redux/configureStore.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'
	src/app/utils/Analytic.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts :: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts :: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
1: /Users/someuser/work/applications/frontend/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts]
export class Cookie { }


PolledWatches::
/Users/someuser/work/applications/frontend/node_modules: *new*
  {"pollingInterval":500}
/Users/someuser/work/applications/frontend/types: *new*
  {"pollingInterval":500}

FsWatches::
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts: *new*
  {}
/Users/someuser/work/applications/frontend/tsconfig.json: *new*
  {}
/a/lib/lib.es2016.full.d.ts: *new*
  {}

FsWatchesRecursive::
/Users/someuser/work/applications/frontend/src: *new*
  {}

Info seq  [hh:mm:ss:mss] Running: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts Text-1 "export class configureStore { }"
	/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts SVC-1-0 "export class SomeClass { };"
	/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts Text-1 "export class Cookie { }"


	../../../../../a/lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	src/app/redux/configureStore.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'
	src/app/utils/Analytic.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'
	src/app/utils/Cookie.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/Users/someuser/work/applications/frontend/node_modules:
  {"pollingInterval":500}
/Users/someuser/work/applications/frontend/types:
  {"pollingInterval":500}

FsWatches::
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts:
  {}
/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts: *new*
  {}
/Users/someuser/work/applications/frontend/tsconfig.json:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}

FsWatchesRecursive::
/Users/someuser/work/applications/frontend/src:
  {}

Info seq  [hh:mm:ss:mss] fileExists:: [{"key":"/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts","count":3},{"key":"/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts","count":1},{"key":"/a/lib/lib.es2016.full.d.ts","count":1}]
Info seq  [hh:mm:ss:mss] directoryExists:: [{"key":"/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts","count":1},{"key":"/Users/someuser/work/applications/frontend/types","count":2},{"key":"/Users/someuser/work/applications/frontend/node_modules/@types","count":2}]
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: [{"key":"/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts","count":2},{"key":"/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts","count":1},{"key":"/a/lib/lib.es2016.full.d.ts","count":1}]
Info seq  [hh:mm:ss:mss] readDirectory:: []
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /Users/someuser/work/applications/frontend/src/app/utils
Info seq  [hh:mm:ss:mss] For info: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts :: Config file name: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] fileExists:: []
Info seq  [hh:mm:ss:mss] directoryExists:: []
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: []
Info seq  [hh:mm:ss:mss] readDirectory:: []