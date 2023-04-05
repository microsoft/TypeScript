currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/app.js]
let x = 1;

//// [/a/largefile.js]


//// [/a/jsconfig.json]
{}


Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] Search path: /a
Info 3    [00:00:14.000] For info: /a/app.js :: Config file name: /a/jsconfig.json
Info 4    [00:00:15.000] Creating configuration project /a/jsconfig.json
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info 6    [00:00:17.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/jsconfig.json","reason":"Creating possible configured project for /a/app.js to open"}}
Info 7    [00:00:18.000] Config: /a/jsconfig.json : {
 "rootNames": [
  "/a/app.js",
  "/a/largefile.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/a/jsconfig.json"
 }
}
Info 8    [00:00:19.000] Non TS file size exceeded limit (20971531). Largest files: /a/largefile.js:20971521, /a/app.js:10
Info 9    [00:00:20.000] event:
    {"seq":0,"type":"event","event":"projectLanguageServiceState","body":{"projectName":"/a/jsconfig.json","languageServiceEnabled":false}}
Info 10   [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/largefile.js 500 undefined WatchType: Closed Script info
Info 11   [00:00:22.000] Starting updateGraphWorker: Project: /a/jsconfig.json
Info 12   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/jsconfig.json WatchType: Missing file
Info 13   [00:00:24.000] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:25.000] Project '/a/jsconfig.json' (Configured)
Info 15   [00:00:26.000] 	Files (1)
	/a/app.js SVC-1-0 "let x = 1;"


	app.js
	  Matched by default include pattern '**/*'

Info 16   [00:00:27.000] -----------------------------------------------
Info 17   [00:00:28.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/jsconfig.json"}}
Info 18   [00:00:29.000] Skipped loading contents of large file /a/largefile.js for info /a/largefile.js: fileSize: 20971521
Info 19   [00:00:30.000] event:
    {"seq":0,"type":"event","event":"largeFileReferenced","body":{"file":"/a/largefile.js","fileSize":20971521,"maxFileSize":4194304}}
Info 20   [00:00:31.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"d0d8dad6731288ecaafd815d288fca9793f4a55553e712b664ec18e525950982","fileStats":{"js":2,"jsSize":10,"jsx":0,"jsxSize":0,"ts":0,"tsSize":0,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true},"typeAcquisition":{"enable":true,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"jsconfig.json","projectType":"configured","languageServiceEnabled":false,"version":"FakeVersion"}}}
Info 21   [00:00:32.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/app.js","configFile":"/a/jsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
Info 22   [00:00:33.000] Project '/a/jsconfig.json' (Configured)
Info 22   [00:00:34.000] 	Files (1)

Info 22   [00:00:35.000] -----------------------------------------------
Info 22   [00:00:36.000] Open files: 
Info 22   [00:00:37.000] 	FileName: /a/app.js ProjectRootPath: undefined
Info 22   [00:00:38.000] 		Projects: /a/jsconfig.json
Info 22   [00:00:39.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json: *new*
  {}
/a/largefile.js: *new*
  {}

Language service enabled: false
Info 23   [00:00:43.000] FileWatcher:: Triggered with /a/jsconfig.json 1:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info 24   [00:00:44.000] Scheduled: /a/jsconfig.json
Info 25   [00:00:45.000] Scheduled: *ensureProjectForOpenFiles*
Info 26   [00:00:46.000] Elapsed:: *ms FileWatcher:: Triggered with /a/jsconfig.json 1:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /a/jsconfig.json
2: *ensureProjectForOpenFiles*
//// [/a/jsconfig.json]
{"exclude":["largefile.js"]}


Info 27   [00:00:47.000] Running: /a/jsconfig.json
Info 28   [00:00:48.000] Reloading configured project /a/jsconfig.json
Info 29   [00:00:49.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/jsconfig.json","reason":"Change in config file detected"}}
Info 30   [00:00:50.000] Config: /a/jsconfig.json : {
 "rootNames": [
  "/a/app.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/a/jsconfig.json"
 }
}
Info 31   [00:00:51.000] event:
    {"seq":0,"type":"event","event":"projectLanguageServiceState","body":{"projectName":"/a/jsconfig.json","languageServiceEnabled":true}}
Info 32   [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 33   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 34   [00:00:54.000] Starting updateGraphWorker: Project: /a/jsconfig.json
Info 35   [00:00:55.000] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 36   [00:00:56.000] Project '/a/jsconfig.json' (Configured)
Info 37   [00:00:57.000] 	Files (1)
	/a/app.js SVC-1-0 "let x = 1;"


	app.js
	  Matched by default include pattern '**/*'

Info 38   [00:00:58.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json:
  {}
/a/largefile.js:
  {}

FsWatchesRecursive::
/a: *new*
  {}

TI:: [00:00:59.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:01:00.000] Processing cache location '/a/data/'
TI:: [00:01:01.000] Trying to find '/a/data/package.json'...
TI:: [00:01:02.000] Finished processing cache location '/a/data/'
TI:: [00:01:03.000] Npm config file: /a/data/package.json
TI:: [00:01:04.000] Npm config file: '/a/data/package.json' is missing, creating new one...
Info 39   [00:01:07.000] DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 40   [00:01:08.000] Scheduled: /a/jsconfig.json
Info 41   [00:01:09.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 42   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 43   [00:01:13.000] DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 44   [00:01:14.000] Config: /a/jsconfig.json Detected new package.json: /a/data/package.json
Info 45   [00:01:15.000] FileWatcher:: Added:: WatchInfo: /a/data/package.json 250 undefined WatchType: package.json file
Info 46   [00:01:16.000] Project: /a/jsconfig.json Detected file add/remove of non supported extension: /a/data/package.json
Info 47   [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
TI:: [00:01:18.000] Updating types-registry npm package...
TI:: [00:01:19.000] npm install --ignore-scripts types-registry@latest
Info 48   [00:01:24.000] DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 49   [00:01:25.000] Scheduled: /a/jsconfig.json, Cancelled earlier one
Info 50   [00:01:26.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 51   [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 52   [00:01:29.000] DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 53   [00:01:30.000] Scheduled: /a/jsconfig.json, Cancelled earlier one
Info 54   [00:01:31.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 55   [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 56   [00:01:34.000] DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry/index.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 57   [00:01:35.000] Project: /a/jsconfig.json Detected file add/remove of non supported extension: /a/data/node_modules/types-registry/index.json
Info 58   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry/index.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
TI:: [00:01:37.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json:
  {}
/a/largefile.js:
  {}
/a/data/package.json: *new*
  {}

FsWatchesRecursive::
/a:
  {}

TI:: [00:01:38.000] Got install request {"projectName":"/a/jsconfig.json","fileNames":["/a/app.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:39.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:40.000] Processing cache location '/a/data/'
TI:: [00:01:41.000] Cache location was already processed...
TI:: [00:01:42.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:43.000] Explicitly included types: []
TI:: [00:01:44.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:45.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:46.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components
TI:: [00:01:47.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:49.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules
TI:: [00:01:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:52.000] Sending response:
    {"projectName":"/a/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typings":[],"kind":"action::set"}
TI:: [00:01:53.000] No new typings were requested as a result of typings discovery
Info 59   [00:01:54.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/jsconfig.json"}}
Info 60   [00:01:55.000] Starting updateGraphWorker: Project: /a/jsconfig.json
Info 61   [00:01:56.000] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 62   [00:01:57.000] Same program as before
Info 63   [00:01:58.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/jsconfig.json","configFile":"/a/jsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
After running Timeout callback:: count: 2
7: /a/jsconfig.json
8: *ensureProjectForOpenFiles*

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/bower_components: *new*
  {"pollingInterval":500}
/a/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json:
  {}
/a/largefile.js:
  {}
/a/data/package.json:
  {}

FsWatchesRecursive::
/a:
  {}

Language service enabled: true