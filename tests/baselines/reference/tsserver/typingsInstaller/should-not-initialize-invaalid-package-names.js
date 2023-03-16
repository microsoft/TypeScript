Info 0    [00:00:11.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]
let x = 1

//// [/a/b/package.json]
{"dependencies":{"; say ‘Hello from TypeScript!’ #":"0.0.x"}}


Info 1    [00:00:12.000] Search path: /a/b
Info 2    [00:00:13.000] For info: /a/b/app.js :: No config files found.
Info 3    [00:00:14.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 5    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:18.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:20.000] 	Files (1)
	/a/b/app.js SVC-1-0 "let x = 1"


	app.js
	  Root file specified for compilation

Info 10   [00:00:21.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

TI:: [00:00:22.000] Global cache location '/tmp', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:23.000] Processing cache location '/tmp'
TI:: [00:00:24.000] Trying to find '/tmp/package.json'...
TI:: [00:00:25.000] Finished processing cache location '/tmp'
TI:: [00:00:26.000] Npm config file: /tmp/package.json
TI:: [00:00:27.000] Npm config file: '/tmp/package.json' is missing, creating new one...
TI:: [00:00:32.000] Updating types-registry npm package...
TI:: [00:00:33.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:40.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/tmp/package.json]
{ "private": true }

//// [/tmp/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:41.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:00:42.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:00:43.000] Processing cache location '/tmp'
TI:: [00:00:44.000] Cache location was already processed...
TI:: [00:00:45.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:46.000] Explicitly included types: []
TI:: [00:00:47.000] Typing names in '/a/b/package.json' dependencies: ["; say ‘Hello from TypeScript!’ #"]
TI:: [00:00:48.000] Inferred typings from unresolved imports: []
TI:: [00:00:49.000] Result: {"cachedTypingPaths":[],"newTypingNames":["; say ‘Hello from TypeScript!’ #"],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules"]}
TI:: [00:00:50.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["; say ‘Hello from TypeScript!’ #"],"filesToWatch":["/a/b/bower_components","/a/b/package.json","/a/b/node_modules"]}
TI:: [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:54.000] FileWatcher:: Added:: WatchInfo: /a/b/package.json
TI:: [00:00:55.000] FileWatcher:: Added:: WatchInfo: /a/b/package.json 2000 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:59.000] Installing typings ["; say ‘Hello from TypeScript!’ #"]
TI:: [00:01:00.000] '; say ‘Hello from TypeScript!’ #':: Package name '; say ‘Hello from TypeScript!’ #' contains non URI safe characters
TI:: [00:01:01.000] All typings are known to be missing or invalid - no need to install more typings
TI:: [00:01:02.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
Info 11   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /a/b/package.json 250 undefined WatchType: package.json file
Info 12   [00:01:04.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:01:05.000] 	Files (1)

Info 12   [00:01:06.000] -----------------------------------------------
Info 12   [00:01:07.000] Open files: 
Info 12   [00:01:08.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 12   [00:01:09.000] 		Projects: /dev/null/inferredProject1*