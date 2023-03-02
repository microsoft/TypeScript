Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/app.js]
const c = require('./config');

//// [/a/config.js]
export let x = 1

//// [/a/jsconfig.json]
{"compilerOptions":{"moduleResolution":"commonjs"},"typeAcquisition":{"enable":true}}

//// [/cache/node_modules/@types/config/index.d.ts]
export let y: number;


Info 1    [00:00:22.000] Search path: /a
Info 2    [00:00:23.000] For info: /a/app.js :: Config file name: /a/jsconfig.json
Info 3    [00:00:24.000] Creating configuration project /a/jsconfig.json
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info 5    [00:00:26.000] Config: /a/jsconfig.json : {
 "rootNames": [
  "/a/app.js",
  "/a/config.js"
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
Info 6    [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 7    [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/config.js 500 undefined WatchType: Closed Script info
Info 9    [00:00:30.000] Starting updateGraphWorker: Project: /a/jsconfig.json
Info 10   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /a/config 1 undefined Project: /a/jsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/config 1 undefined Project: /a/jsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a 0 undefined Project: /a/jsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 0 undefined Project: /a/jsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/jsconfig.json WatchType: Missing file
Info 15   [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/jsconfig.json WatchType: Type roots
Info 16   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/jsconfig.json WatchType: Type roots
Info 17   [00:00:38.000] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:00:39.000] Project '/a/jsconfig.json' (Configured)
Info 19   [00:00:40.000] 	Files (2)
	/a/config.js Text-1 "export let x = 1"
	/a/app.js SVC-1-0 "const c = require('./config');"


	config.js
	  Imported via './config' from file 'app.js'
	  Matched by default include pattern '**/*'
	app.js
	  Matched by default include pattern '**/*'

Info 20   [00:00:41.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/config: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json: *new*
  {}
/a/config.js: *new*
  {}
/a: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

TI:: [00:00:42.000] Global cache location '/cache', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:43.000] Processing cache location '/cache'
TI:: [00:00:44.000] Trying to find '/cache/package.json'...
TI:: [00:00:45.000] Finished processing cache location '/cache'
TI:: [00:00:46.000] Npm config file: /cache/package.json
TI:: [00:00:47.000] Npm config file: '/cache/package.json' is missing, creating new one...
TI:: [00:00:50.000] Updating types-registry npm package...
TI:: [00:00:51.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:56.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/cache/package.json]
{ "private": true }

//// [/cache/node_modules/types-registry/index.json]
{
 "entries": {
  "config": {
   "latest": "1.3.0",
   "ts2.0": "1.0.0",
   "ts2.1": "1.0.0",
   "ts2.2": "1.2.0",
   "ts2.3": "1.3.0",
   "ts2.4": "1.3.0",
   "ts2.5": "1.3.0",
   "ts2.6": "1.3.0",
   "ts2.7": "1.3.0"
  }
 }
}


TI:: [00:00:57.000] Got install request {"projectName":"/a/jsconfig.json","fileNames":["/a/config.js","/a/app.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/cache","kind":"discover"}
TI:: [00:00:58.000] Request specifies cache path '/cache', loading cached information...
TI:: [00:00:59.000] Processing cache location '/cache'
TI:: [00:01:00.000] Cache location was already processed...
TI:: [00:01:01.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:02.000] Explicitly included types: []
TI:: [00:01:03.000] Inferred typings from unresolved imports: []
TI:: [00:01:04.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:05.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components
TI:: [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:09.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules
TI:: [00:01:10.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json watcher already invoked: false
TI:: [00:01:12.000] Sending response:
    {"projectName":"/a/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:13.000] No new typings were requested as a result of typings discovery
Info 21   [00:01:14.000] Project '/a/jsconfig.json' (Configured)
Info 21   [00:01:15.000] 	Files (2)

Info 21   [00:01:16.000] -----------------------------------------------
Info 21   [00:01:17.000] Open files: 
Info 21   [00:01:18.000] 	FileName: /a/app.js ProjectRootPath: undefined
Info 21   [00:01:19.000] 		Projects: /a/jsconfig.json