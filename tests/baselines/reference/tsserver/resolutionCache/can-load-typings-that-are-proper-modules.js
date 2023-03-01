Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]
var x = require("lib")

//// [/a/cache/node_modules/@types/lib/index.d.ts]
export let x = 1


Info 1    [00:00:20.000] Search path: /a/b
Info 2    [00:00:21.000] For info: /a/b/app.js :: No config files found.
Info 3    [00:00:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:23.000] ======== Resolving module 'lib' from '/a/b/app.js'. ========
Info 5    [00:00:24.000] Module resolution kind is not specified, using 'Node10'.
Info 6    [00:00:25.000] Loading module 'lib' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 7    [00:00:26.000] Directory '/a/b/node_modules' does not exist, skipping all lookups in it.
Info 8    [00:00:27.000] Directory '/a/node_modules' does not exist, skipping all lookups in it.
Info 9    [00:00:28.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 10   [00:00:29.000] Loading module 'lib' from 'node_modules' folder, target file types: JavaScript.
Info 11   [00:00:30.000] Directory '/a/b/node_modules' does not exist, skipping all lookups in it.
Info 12   [00:00:31.000] Directory '/a/node_modules' does not exist, skipping all lookups in it.
Info 13   [00:00:32.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 14   [00:00:33.000] ======== Module name 'lib' was not resolved. ========
Info 15   [00:00:34.000] Auto discovery for typings is enabled in project '/dev/null/inferredProject1*'. Running extra resolution pass for module 'lib' using cache location '/a/cache'.
Info 16   [00:00:35.000] File '/a/cache/node_modules/lib.d.ts' does not exist.
Info 17   [00:00:36.000] File '/a/cache/node_modules/@types/lib/package.json' does not exist.
Info 18   [00:00:37.000] File '/a/cache/node_modules/@types/lib.d.ts' does not exist.
Info 19   [00:00:38.000] File '/a/cache/node_modules/@types/lib/index.d.ts' exists - use it as a name resolution result.
Info 20   [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 21   [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 22   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 23   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 24   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 25   [00:00:44.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 26   [00:00:45.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:00:46.000] 	Files (2)
	/a/cache/node_modules/@types/lib/index.d.ts Text-1 "export let x = 1"
	/a/b/app.js SVC-1-0 "var x = require(\"lib\")"


	../cache/node_modules/@types/lib/index.d.ts
	  Imported via "lib" from file 'app.js'
	app.js
	  Root file specified for compilation

Info 28   [00:00:47.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/b/node_modules: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

TI:: [00:00:48.000] Global cache location '/a/cache', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:49.000] Processing cache location '/a/cache'
TI:: [00:00:50.000] Trying to find '/a/cache/package.json'...
TI:: [00:00:51.000] Finished processing cache location '/a/cache'
TI:: [00:00:52.000] Npm config file: /a/cache/package.json
TI:: [00:00:53.000] Npm config file: '/a/cache/package.json' is missing, creating new one...
TI:: [00:00:56.000] Updating types-registry npm package...
TI:: [00:00:57.000] npm install --ignore-scripts types-registry@latest
TI:: [00:01:02.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/cache/package.json]
{ "private": true }

//// [/a/cache/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:01:03.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js"],"compilerOptions":{"traceResolution":true,"allowJs":true,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/cache","kind":"discover"}
TI:: [00:01:04.000] Request specifies cache path '/a/cache', loading cached information...
TI:: [00:01:05.000] Processing cache location '/a/cache'
TI:: [00:01:06.000] Cache location was already processed...
TI:: [00:01:07.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:08.000] Explicitly included types: []
TI:: [00:01:09.000] Inferred typings from unresolved imports: []
TI:: [00:01:10.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:11.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:18.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"traceResolution":true,"allowJs":true,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:19.000] No new typings were requested as a result of typings discovery
Info 29   [00:01:20.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:01:21.000] 	Files (2)

Info 29   [00:01:22.000] -----------------------------------------------
Info 29   [00:01:23.000] Open files: 
Info 29   [00:01:24.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 29   [00:01:25.000] 		Projects: /dev/null/inferredProject1*