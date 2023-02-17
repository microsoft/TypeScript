TI:: Creating typing installer
//// [/a/b/app.js]


//// [/node_modules/@types/node/index.d.ts]
declare var node;


TI:: [00:00:17.000] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:18.000] Processing cache location '/a/data'
TI:: [00:00:19.000] Trying to find '/a/data/package.json'...
TI:: [00:00:20.000] Finished processing cache location '/a/data'
TI:: [00:00:21.000] Npm config file: /a/data/package.json
TI:: [00:00:22.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:27.000] Updating types-registry npm package...
TI:: [00:00:28.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:35.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {
  "node": {
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


Info 0    [00:00:36.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service

Info 1    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/b/app.js 500 undefined WatchType: Closed Script info
Info 2    [00:00:38.000] Starting updateGraphWorker: Project: /a/app/test.csproj
Info 3    [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 4    [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 5    [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info 6    [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 7    [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules/@types 1 undefined Project: /a/app/test.csproj WatchType: Type roots
Info 8    [00:00:44.000] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:45.000] Project '/a/app/test.csproj' (External)
Info 10   [00:00:46.000] 	Files (2)
	/a/b/app.js
	/node_modules/@types/node/index.d.ts


	../b/app.js
	  Root file specified for compilation
	../../node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'

Info 11   [00:00:47.000] -----------------------------------------------
TI:: [00:00:48.000] Got install request {"projectName":"/a/app/test.csproj","fileNames":["/a/b/app.js"],"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/app","cachePath":"/a/data","kind":"discover"}
TI:: [00:00:49.000] Request specifies cache path '/a/data', loading cached information...
TI:: [00:00:50.000] Processing cache location '/a/data'
TI:: [00:00:51.000] Cache location was already processed...
TI:: [00:00:52.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:53.000] Explicitly included types: []
TI:: [00:00:54.000] Inferred typings from unresolved imports: []
TI:: [00:00:55.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:56.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/app/bower_components","/a/app/node_modules"]}
TI:: [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules
TI:: [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj watcher already invoked: false
TI:: [00:01:09.000] Sending response:
    {"projectName":"/a/app/test.csproj","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:10.000] No new typings were requested as a result of typings discovery