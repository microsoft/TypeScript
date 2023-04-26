currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/app.js]
const c = require('./config');

//// [/a/config.js]
export let x = 1

//// [/a/jsconfig.json]
{"compilerOptions":{"moduleResolution":"commonjs"},"typeAcquisition":{"enable":true}}

//// [/cache/node_modules/@types/config/index.d.ts]
export let y: number;


Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/app.js :: Config file name: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /a/jsconfig.json : {
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
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/config.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/jsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/config.js Text-1 "export let x = 1"
	/a/app.js SVC-1-0 "const c = require('./config');"


	config.js
	  Imported via './config' from file 'app.js'
	  Matched by default include pattern '**/*'
	app.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json: *new*
  {}
/a/config.js: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

TI:: [hh:mm:ss:mss] Global cache location '/cache', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/cache'
TI:: [hh:mm:ss:mss] Trying to find '/cache/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/cache'
TI:: [hh:mm:ss:mss] Npm config file: /cache/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/cache/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] TI:: Updated types-registry npm package
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


TI:: [hh:mm:ss:mss] Got install request {"projectName":"/a/jsconfig.json","fileNames":["/a/config.js","/a/app.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/cache","kind":"discover"}
TI:: [hh:mm:ss:mss] Request specifies cache path '/cache', loading cached information...
TI:: [hh:mm:ss:mss] Processing cache location '/cache'
TI:: [hh:mm:ss:mss] Cache location was already processed...
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [hh:mm:ss:mss] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [hh:mm:ss:mss] Sending response:
    {"kind":"action::watchTypingLocations","projectName":"/a/jsconfig.json","files":["/a/bower_components","/a/node_modules"]}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {"projectName":"/a/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/jsconfig.json","allowNonTsExtensions":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/a/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/jsconfig.json