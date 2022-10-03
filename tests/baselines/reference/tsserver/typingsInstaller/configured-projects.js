Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]


//// [/a/b/tsconfig.json]
{"compilerOptions":{"allowJs":true},"typeAcquisition":{"enable":true}}

//// [/a/b/package.json]
{"name":"test","dependencies":{"jquery":"^3.1.0"}}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/app.js :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:16.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:18.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.js"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [00:00:22.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 11   [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:26.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:28.000] 	Files (1)
	/a/b/app.js


	app.js
	  Matched by default include pattern '**/*'

Info 16   [00:00:29.000] -----------------------------------------------
Info 17   [00:00:34.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:35.000] 	Files (1)

Info 17   [00:00:36.000] -----------------------------------------------
Info 17   [00:00:37.000] Open files: 
Info 17   [00:00:38.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 17   [00:00:39.000] 		Projects: /a/b/tsconfig.json
Info 17   [00:00:48.000] Scheduled: /a/b/tsconfig.json
Info 18   [00:00:49.000] Scheduled: *ensureProjectForOpenFiles*
Before checking timeout queue length (2) and running
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/@types/jquery/index.d.ts]
declare const $: { x: number }


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/package.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 19   [00:00:50.000] Running: /a/b/tsconfig.json
Info 20   [00:00:51.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 21   [00:00:52.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:53.000] Project '/a/b/tsconfig.json' (Configured)
Info 23   [00:00:54.000] 	Files (2)
	/a/b/app.js
	/a/data/node_modules/@types/jquery/index.d.ts


	app.js
	  Matched by default include pattern '**/*'
	../data/node_modules/@types/jquery/index.d.ts
	  Matched by default include pattern '**/*'

Info 24   [00:00:55.000] -----------------------------------------------
Info 25   [00:00:56.000] Running: *ensureProjectForOpenFiles*
Info 26   [00:00:57.000] Before ensureProjectForOpenFiles:
Info 27   [00:00:58.000] Project '/a/b/tsconfig.json' (Configured)
Info 27   [00:00:59.000] 	Files (2)

Info 27   [00:01:00.000] -----------------------------------------------
Info 27   [00:01:01.000] Open files: 
Info 27   [00:01:02.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 27   [00:01:03.000] 		Projects: /a/b/tsconfig.json
Info 27   [00:01:04.000] After ensureProjectForOpenFiles:
Info 28   [00:01:05.000] Project '/a/b/tsconfig.json' (Configured)
Info 28   [00:01:06.000] 	Files (2)

Info 28   [00:01:07.000] -----------------------------------------------
Info 28   [00:01:08.000] Open files: 
Info 28   [00:01:09.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 28   [00:01:10.000] 		Projects: /a/b/tsconfig.json
After checking timeout queue length (2) and running

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/package.json:
  {}

FsWatchesRecursive::
/a/b:
  {}
