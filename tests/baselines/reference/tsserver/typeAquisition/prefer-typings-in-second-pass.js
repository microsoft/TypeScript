Info 0    [00:00:27.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]
var x = require('bar')

//// [/a/b/node_modules/bar/index.js]
export let x = 1

//// [/a/typings/node_modules/@types/bar/index.d.ts]
export let y: number

//// [/a/b/jsconfig.json]
{"compilerOptions":{"allowJs":true},"exclude":["node_modules"]}


Info 1    [00:00:28.000] Search path: /a/b
Info 2    [00:00:29.000] For info: /a/b/app.js :: Config file name: /a/b/jsconfig.json
Info 3    [00:00:30.000] Creating configuration project /a/b/jsconfig.json
Info 4    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/jsconfig.json 2000 undefined Project: /a/b/jsconfig.json WatchType: Config file
Info 5    [00:00:32.000] Config: /a/b/jsconfig.json : {
 "rootNames": [
  "/a/b/app.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/a/b/jsconfig.json"
 }
}
Info 6    [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/jsconfig.json WatchType: Wild card directory
Info 7    [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/jsconfig.json WatchType: Wild card directory
Info 8    [00:00:35.000] Starting updateGraphWorker: Project: /a/b/jsconfig.json
Info 9    [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/jsconfig.json WatchType: Failed Lookup Locations
Info 10   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/jsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/jsconfig.json WatchType: Missing file
Info 12   [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/jsconfig.json WatchType: Type roots
Info 13   [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/jsconfig.json WatchType: Type roots
Info 14   [00:00:41.000] Finishing updateGraphWorker: Project: /a/b/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:42.000] Project '/a/b/jsconfig.json' (Configured)
Info 16   [00:00:43.000] 	Files (2)
	/a/typings/node_modules/@types/bar/index.d.ts Text-1 "export let y: number"
	/a/b/app.js SVC-1-0 "var x = require('bar')"


	../typings/node_modules/@types/bar/index.d.ts
	  Imported via 'bar' from file 'app.js'
	app.js
	  Matched by default include pattern '**/*'

Info 17   [00:00:44.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/jsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}
/a/b/node_modules: *new*
  {}

TI:: [00:00:45.000] Global cache location '/a/typings', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:46.000] Processing cache location '/a/typings'
TI:: [00:00:47.000] Trying to find '/a/typings/package.json'...
TI:: [00:00:48.000] Finished processing cache location '/a/typings'
TI:: [00:00:49.000] Npm config file: /a/typings/package.json
TI:: [00:00:50.000] Npm config file: '/a/typings/package.json' is missing, creating new one...
TI:: [00:00:53.000] Updating types-registry npm package...
TI:: [00:00:54.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:59.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/typings/package.json]
{ "private": true }

//// [/a/typings/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:01:00.000] Got install request {"projectName":"/a/b/jsconfig.json","fileNames":["/a/b/app.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/b/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/typings","kind":"discover"}
TI:: [00:01:01.000] Request specifies cache path '/a/typings', loading cached information...
TI:: [00:01:02.000] Processing cache location '/a/typings'
TI:: [00:01:03.000] Cache location was already processed...
TI:: [00:01:04.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:05.000] Explicitly included types: []
TI:: [00:01:06.000] Searching for typing names in /a/b/node_modules; all files: []
TI:: [00:01:07.000]     Found package names: []
TI:: [00:01:08.000] Inferred typings from unresolved imports: []
TI:: [00:01:09.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:10.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:11.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/b/jsconfig.json watcher already invoked: false
TI:: [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/b/jsconfig.json watcher already invoked: false
TI:: [00:01:14.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/jsconfig.json watcher already invoked: false
TI:: [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/jsconfig.json watcher already invoked: false
TI:: [00:01:17.000] Sending response:
    {"projectName":"/a/b/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/b/jsconfig.json","allowNonTsExtensions":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:18.000] No new typings were requested as a result of typings discovery
Info 18   [00:01:19.000] Project '/a/b/jsconfig.json' (Configured)
Info 18   [00:01:20.000] 	Files (2)

Info 18   [00:01:21.000] -----------------------------------------------
Info 18   [00:01:22.000] Open files: 
Info 18   [00:01:23.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 18   [00:01:24.000] 		Projects: /a/b/jsconfig.json