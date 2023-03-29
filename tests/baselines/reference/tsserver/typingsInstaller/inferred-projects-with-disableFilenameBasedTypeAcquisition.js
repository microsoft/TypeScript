currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/jquery.js]



Info 1    [00:00:10.000] Search path: /a/b
Info 2    [00:00:11.000] For info: /a/b/jquery.js :: No config files found.
Info 3    [00:00:12.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 5    [00:00:14.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:16.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:17.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:18.000] 	Files (1)
	/a/b/jquery.js SVC-1-0 ""


	jquery.js
	  Root file specified for compilation

Info 10   [00:00:19.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

TI:: [00:00:20.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:21.000] Processing cache location '/a/data'
TI:: [00:00:22.000] Trying to find '/a/data/package.json'...
TI:: [00:00:23.000] Finished processing cache location '/a/data'
TI:: [00:00:24.000] Npm config file: /a/data/package.json
TI:: [00:00:25.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:30.000] Updating types-registry npm package...
TI:: [00:00:31.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:38.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {
  "jquery": {
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


TI:: [00:00:39.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/jquery.js"],"compilerOptions":{"allowJs":true,"enable":true,"disableFilenameBasedTypeAcquisition":true,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"disableFilenameBasedTypeAcquisition":true},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/data","kind":"discover"}
TI:: [00:00:40.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:00:41.000] Processing cache location '/a/data'
TI:: [00:00:42.000] Cache location was already processed...
TI:: [00:00:43.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:44.000] Inferred typings from unresolved imports: []
TI:: [00:00:45.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:46.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:53.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"disableFilenameBasedTypeAcquisition":true},"compilerOptions":{"allowJs":true,"enable":true,"disableFilenameBasedTypeAcquisition":true,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:00:54.000] No new typings were requested as a result of typings discovery
Info 11   [00:00:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:56.000] 	Files (1)

Info 11   [00:00:57.000] -----------------------------------------------
Info 11   [00:00:58.000] Open files: 
Info 11   [00:00:59.000] 	FileName: /a/b/jquery.js ProjectRootPath: undefined
Info 11   [00:01:00.000] 		Projects: /dev/null/inferredProject1*
Checking timeout queue length: 0

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}
/a/b/node_modules: *new*
  {"pollingInterval":500}
