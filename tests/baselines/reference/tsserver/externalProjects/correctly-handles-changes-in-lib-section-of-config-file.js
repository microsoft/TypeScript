currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/compiler/lib.es5.d.ts]
declare const eval: any

//// [/compiler/lib.es2015.promise.d.ts]
declare class Promise<T> {}

//// [/src/app.ts]
var x: Promise<string>;

//// [/src/tsconfig.json]
{"compilerOptions":{"module":"commonjs","target":"es5","noImplicitAny":true,"sourceMap":false,"lib":["es5"]}}


Info 1    [00:00:16.000] Search path: /src
Info 2    [00:00:17.000] For info: /src/app.ts :: Config file name: /src/tsconfig.json
Info 3    [00:00:18.000] Creating configuration project /src/tsconfig.json
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /src/tsconfig.json 2000 undefined Project: /src/tsconfig.json WatchType: Config file
Info 5    [00:00:20.000] Config: /src/tsconfig.json : {
 "rootNames": [
  "/src/app.ts"
 ],
 "options": {
  "module": 1,
  "target": 1,
  "noImplicitAny": true,
  "sourceMap": false,
  "lib": [
   "lib.es5.d.ts"
  ],
  "configFilePath": "/src/tsconfig.json"
 }
}
Info 6    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /src/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /src/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:23.000] Starting updateGraphWorker: Project: /src/tsconfig.json
Info 9    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /compiler/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /src/node_modules/@types 1 undefined Project: /src/tsconfig.json WatchType: Type roots
Info 11   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/node_modules/@types 1 undefined Project: /src/tsconfig.json WatchType: Type roots
Info 12   [00:00:27.000] Finishing updateGraphWorker: Project: /src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:28.000] Project '/src/tsconfig.json' (Configured)
Info 14   [00:00:29.000] 	Files (2)
	/compiler/lib.es5.d.ts Text-1 "declare const eval: any"
	/src/app.ts SVC-1-0 "var x: Promise<string>;"


	../compiler/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	app.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:30.000] -----------------------------------------------
Info 16   [00:00:31.000] Project '/src/tsconfig.json' (Configured)
Info 16   [00:00:32.000] 	Files (2)

Info 16   [00:00:33.000] -----------------------------------------------
Info 16   [00:00:34.000] Open files: 
Info 16   [00:00:35.000] 	FileName: /src/app.ts ProjectRootPath: undefined
Info 16   [00:00:36.000] 		Projects: /src/tsconfig.json
Info 16   [00:00:40.000] FileWatcher:: Triggered with /src/tsconfig.json 1:: WatchInfo: /src/tsconfig.json 2000 undefined Project: /src/tsconfig.json WatchType: Config file
Info 17   [00:00:41.000] Scheduled: /src/tsconfig.json
Info 18   [00:00:42.000] Scheduled: *ensureProjectForOpenFiles*
Info 19   [00:00:43.000] Elapsed:: *ms FileWatcher:: Triggered with /src/tsconfig.json 1:: WatchInfo: /src/tsconfig.json 2000 undefined Project: /src/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /src/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/src/tsconfig.json]
{"compilerOptions":{"module":"commonjs","target":"es5","noImplicitAny":true,"sourceMap":false,"lib":["es5","es2015.promise"]}}


PolledWatches::
/src/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/src/tsconfig.json: *new*
  {}
/compiler/lib.es5.d.ts: *new*
  {}

FsWatchesRecursive::
/src: *new*
  {}

Info 20   [00:00:44.000] Running: /src/tsconfig.json
Info 21   [00:00:45.000] Reloading configured project /src/tsconfig.json
Info 22   [00:00:46.000] Config: /src/tsconfig.json : {
 "rootNames": [
  "/src/app.ts"
 ],
 "options": {
  "module": 1,
  "target": 1,
  "noImplicitAny": true,
  "sourceMap": false,
  "lib": [
   "lib.es5.d.ts",
   "lib.es2015.promise.d.ts"
  ],
  "configFilePath": "/src/tsconfig.json"
 }
}
Info 23   [00:00:47.000] Starting updateGraphWorker: Project: /src/tsconfig.json
Info 24   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /compiler/lib.es2015.promise.d.ts 500 undefined WatchType: Closed Script info
Info 25   [00:00:49.000] Finishing updateGraphWorker: Project: /src/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 26   [00:00:50.000] Project '/src/tsconfig.json' (Configured)
Info 27   [00:00:51.000] 	Files (3)
	/compiler/lib.es5.d.ts Text-1 "declare const eval: any"
	/compiler/lib.es2015.promise.d.ts Text-1 "declare class Promise<T> {}"
	/src/app.ts SVC-1-0 "var x: Promise<string>;"


	../compiler/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../compiler/lib.es2015.promise.d.ts
	  Library 'lib.es2015.promise.d.ts' specified in compilerOptions
	app.ts
	  Matched by default include pattern '**/*'

Info 28   [00:00:52.000] -----------------------------------------------
Info 29   [00:00:53.000] Running: *ensureProjectForOpenFiles*
Info 30   [00:00:54.000] Before ensureProjectForOpenFiles:
Info 31   [00:00:55.000] Project '/src/tsconfig.json' (Configured)
Info 31   [00:00:56.000] 	Files (3)

Info 31   [00:00:57.000] -----------------------------------------------
Info 31   [00:00:58.000] Open files: 
Info 31   [00:00:59.000] 	FileName: /src/app.ts ProjectRootPath: undefined
Info 31   [00:01:00.000] 		Projects: /src/tsconfig.json
Info 31   [00:01:01.000] After ensureProjectForOpenFiles:
Info 32   [00:01:02.000] Project '/src/tsconfig.json' (Configured)
Info 32   [00:01:03.000] 	Files (3)

Info 32   [00:01:04.000] -----------------------------------------------
Info 32   [00:01:05.000] Open files: 
Info 32   [00:01:06.000] 	FileName: /src/app.ts ProjectRootPath: undefined
Info 32   [00:01:07.000] 		Projects: /src/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/tsconfig.json:
  {}
/compiler/lib.es5.d.ts:
  {}
/compiler/lib.es2015.promise.d.ts: *new*
  {}

FsWatchesRecursive::
/src:
  {}
