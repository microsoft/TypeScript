Info 0    [00:00:33.000] Provided types map file "/typesMap.json" doesn't exist
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [00:00:34.000] Search path: /Users/someuser/work/applications/frontend/src/app/utils
Info 2    [00:00:35.000] For info: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts :: Config file name: /Users/someuser/work/applications/frontend/tsconfig.json
Info 3    [00:00:36.000] Creating configuration project /Users/someuser/work/applications/frontend/tsconfig.json
Info 4    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/tsconfig.json 2000 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Config file
Info 5    [00:00:38.000] Config: /Users/someuser/work/applications/frontend/tsconfig.json : {
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
Info 6    [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:41.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [00:00:42.000] FileWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:43.000] Starting updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json
Info 11   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/types 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/types 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/node_modules 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/node_modules 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/node_modules 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/node_modules 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:00:51.000] Finishing updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:00:52.000] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info 20   [00:00:53.000] 	Files (3)
	/a/lib/lib.es2016.full.d.ts
	/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts
	/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts


	../../../../../a/lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	src/app/redux/configureStore.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'
	src/app/utils/Analytic.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'

Info 21   [00:00:54.000] -----------------------------------------------
Info 22   [00:00:55.000] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info 22   [00:00:56.000] 	Files (3)

Info 22   [00:00:57.000] -----------------------------------------------
Info 22   [00:00:58.000] Open files: 
Info 22   [00:00:59.000] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info 22   [00:01:00.000] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info 22   [00:01:03.000] DirectoryWatcher:: Triggered with /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts :: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Info 23   [00:01:04.000] Scheduled: /Users/someuser/work/applications/frontend/tsconfig.json
Info 24   [00:01:05.000] Scheduled: *ensureProjectForOpenFiles*
Info 25   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts :: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts]
export class Cookie { }


PolledWatches::
/Users/someuser/work/applications/frontend/types:
  {"pollingInterval":500}
/Users/someuser/work/applications/frontend/node_modules:
  {"pollingInterval":500}
/Users/someuser/work/applications/node_modules:
  {"pollingInterval":500}

FsWatches::
/Users/someuser/work/applications/frontend/tsconfig.json:
  {}
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}

FsWatchesRecursive::
/Users/someuser/work/applications/frontend/src:
  {}

Info 26   [00:01:07.000] Running: /Users/someuser/work/applications/frontend/tsconfig.json
Info 27   [00:01:08.000] FileWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts 500 undefined WatchType: Closed Script info
Info 28   [00:01:09.000] Starting updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json
Info 29   [00:01:10.000] Finishing updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:01:11.000] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info 31   [00:01:12.000] 	Files (4)
	/a/lib/lib.es2016.full.d.ts
	/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts
	/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts
	/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts


	../../../../../a/lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	src/app/redux/configureStore.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'
	src/app/utils/Analytic.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'
	src/app/utils/Cookie.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'

Info 32   [00:01:13.000] -----------------------------------------------
Info 33   [00:01:14.000] Running: *ensureProjectForOpenFiles*
Info 34   [00:01:15.000] Before ensureProjectForOpenFiles:
Info 35   [00:01:16.000] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info 35   [00:01:17.000] 	Files (4)

Info 35   [00:01:18.000] -----------------------------------------------
Info 35   [00:01:19.000] Open files: 
Info 35   [00:01:20.000] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info 35   [00:01:21.000] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info 35   [00:01:22.000] After ensureProjectForOpenFiles:
Info 36   [00:01:23.000] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info 36   [00:01:24.000] 	Files (4)

Info 36   [00:01:25.000] -----------------------------------------------
Info 36   [00:01:26.000] Open files: 
Info 36   [00:01:27.000] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info 36   [00:01:28.000] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
After running timeout callbacks

PolledWatches::
/Users/someuser/work/applications/frontend/types:
  {"pollingInterval":500}
/Users/someuser/work/applications/frontend/node_modules:
  {"pollingInterval":500}
/Users/someuser/work/applications/node_modules:
  {"pollingInterval":500}

FsWatches::
/Users/someuser/work/applications/frontend/tsconfig.json:
  {}
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts:
  {}
/a/lib/lib.es2016.full.d.ts:
  {}
/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts:
  {}

FsWatchesRecursive::
/Users/someuser/work/applications/frontend/src:
  {}

Info 36   [00:01:29.000] fileExists:: [{"key":"/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts","count":2}]
Info 37   [00:01:30.000] directoryExists:: [{"key":"/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts","count":1}]
Info 38   [00:01:31.000] getDirectories:: []
Info 39   [00:01:32.000] readFile:: [{"key":"/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts","count":1}]
Info 40   [00:01:33.000] readDirectory:: []
Info 41   [00:01:34.000] FileWatcher:: Close:: WatchInfo: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts 500 undefined WatchType: Closed Script info
Info 42   [00:01:35.000] Search path: /Users/someuser/work/applications/frontend/src/app/utils
Info 43   [00:01:36.000] For info: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts :: Config file name: /Users/someuser/work/applications/frontend/tsconfig.json
Info 44   [00:01:37.000] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info 44   [00:01:38.000] 	Files (4)

Info 44   [00:01:39.000] -----------------------------------------------
Info 44   [00:01:40.000] Open files: 
Info 44   [00:01:41.000] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info 44   [00:01:42.000] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info 44   [00:01:43.000] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts ProjectRootPath: undefined
Info 44   [00:01:44.000] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info 44   [00:01:45.000] fileExists:: []
Info 45   [00:01:46.000] directoryExists:: []
Info 46   [00:01:47.000] getDirectories:: []
Info 47   [00:01:48.000] readFile:: []
Info 48   [00:01:49.000] readDirectory:: []