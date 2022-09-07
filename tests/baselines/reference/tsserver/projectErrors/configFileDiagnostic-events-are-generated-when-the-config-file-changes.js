Info 0    [16:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:16.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      }
    }
//// [/a/b/app.ts]
let x = 10

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
{
                    "compilerOptions": {}
                }


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:17.000] Search path: /a/b
Info 3    [16:00:18.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 4    [16:00:19.000] Creating configuration project /a/b/tsconfig.json
Info 5    [16:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [16:00:21.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/app.ts to open"}}
Info 7    [16:00:22.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 8    [16:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:25.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:26.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 12   [16:00:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [16:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [16:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [16:00:30.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [16:00:31.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [16:00:32.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/app.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	app.ts
	  Matched by default include pattern '**/*'

Info 18   [16:00:33.000] -----------------------------------------------
Info 19   [16:00:34.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 20   [16:00:35.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":10,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 21   [16:00:36.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/app.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 22   [16:00:37.000] Project '/a/b/tsconfig.json' (Configured)
Info 22   [16:00:38.000] 	Files (2)

Info 22   [16:00:39.000] -----------------------------------------------
Info 22   [16:00:40.000] Open files: 
Info 22   [16:00:41.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 22   [16:00:42.000] 		Projects: /a/b/tsconfig.json

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 22   [16:00:43.000] response:
    {
      "responseRequired": false
    }
Info 23   [16:00:47.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 24   [16:00:48.000] Scheduled: /a/b/tsconfig.json
Info 25   [16:00:49.000] Scheduled: *ensureProjectForOpenFiles*
Info 26   [16:00:50.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 27   [16:00:51.000] Running: /a/b/tsconfig.json
Info 28   [16:00:52.000] Reloading configured project /a/b/tsconfig.json
Info 29   [16:00:53.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Change in config file detected"}}
Info 30   [16:00:54.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 31   [16:00:55.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 32   [16:00:56.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 33   [16:00:57.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 34   [16:00:58.000] Different program with same set of files
Info 35   [16:00:59.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 36   [16:01:00.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/tsconfig.json","configFile":"/a/b/tsconfig.json","diagnostics":[{"start":{"line":3,"offset":21},"end":{"line":3,"offset":27},"text":"Unknown compiler option 'haha'.","code":5023,"category":"error","fileName":"/a/b/tsconfig.json"}]}}
Info 37   [16:01:01.000] Running: *ensureProjectForOpenFiles*
Info 38   [16:01:02.000] Before ensureProjectForOpenFiles:
Info 39   [16:01:03.000] Project '/a/b/tsconfig.json' (Configured)
Info 39   [16:01:04.000] 	Files (2)

Info 39   [16:01:05.000] -----------------------------------------------
Info 39   [16:01:06.000] Open files: 
Info 39   [16:01:07.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 39   [16:01:08.000] 		Projects: /a/b/tsconfig.json
Info 39   [16:01:09.000] After ensureProjectForOpenFiles:
Info 40   [16:01:10.000] Project '/a/b/tsconfig.json' (Configured)
Info 40   [16:01:11.000] 	Files (2)

Info 40   [16:01:12.000] -----------------------------------------------
Info 40   [16:01:13.000] Open files: 
Info 40   [16:01:14.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 40   [16:01:15.000] 		Projects: /a/b/tsconfig.json
Info 40   [16:01:16.000] got projects updated in background, updating diagnostics for /a/b/app.ts
Info 41   [16:01:17.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/app.ts"]}}
Info 42   [16:01:21.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 43   [16:01:22.000] Scheduled: /a/b/tsconfig.json
Info 44   [16:01:23.000] Scheduled: *ensureProjectForOpenFiles*
Info 45   [16:01:24.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 46   [16:01:25.000] Reloading configured project /a/b/tsconfig.json
Info 47   [16:01:26.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Change in config file detected"}}
Info 48   [16:01:27.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 49   [16:01:28.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 50   [16:01:29.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 51   [16:01:30.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 52   [16:01:31.000] Different program with same set of files
Info 53   [16:01:32.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 54   [16:01:33.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/tsconfig.json","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 55   [16:01:34.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/app.ts","diagnostics":[]}}
Info 56   [16:01:35.000] Running: /a/b/tsconfig.json
Info 57   [16:01:36.000] Running: *ensureProjectForOpenFiles*
Info 58   [16:01:37.000] Before ensureProjectForOpenFiles:
Info 59   [16:01:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 59   [16:01:39.000] 	Files (2)

Info 59   [16:01:40.000] -----------------------------------------------
Info 59   [16:01:41.000] Open files: 
Info 59   [16:01:42.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 59   [16:01:43.000] 		Projects: /a/b/tsconfig.json
Info 59   [16:01:44.000] After ensureProjectForOpenFiles:
Info 60   [16:01:45.000] Project '/a/b/tsconfig.json' (Configured)
Info 60   [16:01:46.000] 	Files (2)

Info 60   [16:01:47.000] -----------------------------------------------
Info 60   [16:01:48.000] Open files: 
Info 60   [16:01:49.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 60   [16:01:50.000] 		Projects: /a/b/tsconfig.json
Info 60   [16:01:51.000] got projects updated in background, updating diagnostics for /a/b/app.ts
Info 61   [16:01:52.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/app.ts"]}}