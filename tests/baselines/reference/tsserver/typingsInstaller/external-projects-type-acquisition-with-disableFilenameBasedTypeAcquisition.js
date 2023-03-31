currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/jquery.js]



Info 1    [00:00:10.000] FileWatcher:: Added:: WatchInfo: /a/b/jquery.js 500 undefined WatchType: Closed Script info
Info 2    [00:00:11.000] Starting updateGraphWorker: Project: /a/app/test.csproj
Info 3    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info 4    [00:00:13.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 5    [00:00:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 6    [00:00:15.000] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:16.000] Project '/a/app/test.csproj' (External)
Info 8    [00:00:17.000] 	Files (1)
	/a/b/jquery.js Text-1 ""


	../b/jquery.js
	  Root file specified for compilation

Info 9    [00:00:18.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/app/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/jquery.js: *new*
  {}

TI:: [00:00:19.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:20.000] Processing cache location '/a/data'
TI:: [00:00:21.000] Trying to find '/a/data/package.json'...
TI:: [00:00:22.000] Finished processing cache location '/a/data'
TI:: [00:00:23.000] Npm config file: /a/data/package.json
TI:: [00:00:24.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:29.000] Updating types-registry npm package...
TI:: [00:00:30.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:37.000] TI:: Updated types-registry npm package
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


TI:: [00:00:38.000] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/jquery.js"],"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"disableFilenameBasedTypeAcquisition":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:00:39.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:00:40.000] Processing cache location '/a/data'
TI:: [00:00:41.000] Cache location was already processed...
TI:: [00:00:42.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:43.000] Explicitly included types: []
TI:: [00:00:44.000] Inferred typings from unresolved imports: []
TI:: [00:00:45.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:46.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components
TI:: [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules
TI:: [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:59.000] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"enable":true,"disableFilenameBasedTypeAcquisition":true,"include":[],"exclude":[]},"compilerOptions":{"allowJS":true,"moduleResolution":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:00.000] No new typings were requested as a result of typings discovery