currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/file1.js]
var t = require("test"); t.

//// [/a/b/node_modules/test/index.js]
var v = 10; module.exports = v;


Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] Search path: /a/b
Info 3    [00:00:18.000] For info: /a/b/file1.js :: No config files found.
Info 4    [00:00:19.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 6    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 7    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 8    [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 9    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 10   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:27.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:28.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:29.000] 	Files (2)
	/a/b/node_modules/test/index.js Text-1 "var v = 10; module.exports = v;"
	/a/b/file1.js SVC-1-0 "var t = require(\"test\"); t."


	node_modules/test/index.js
	  Imported via "test" from file 'file1.js'
	file1.js
	  Root file specified for compilation

Info 15   [00:00:30.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatchesRecursive::
/a/b/node_modules: *new*
  {}

TI:: [00:00:31.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:32.000] Processing cache location '/a/data/'
TI:: [00:00:33.000] Trying to find '/a/data/package.json'...
TI:: [00:00:34.000] Finished processing cache location '/a/data/'
TI:: [00:00:35.000] Npm config file: /a/data/package.json
TI:: [00:00:36.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:41.000] Updating types-registry npm package...
TI:: [00:00:42.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:49.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:50.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/file1.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":["test"],"projectRootPath":"/a/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:51.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:52.000] Processing cache location '/a/data/'
TI:: [00:00:53.000] Cache location was already processed...
TI:: [00:00:54.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:55.000] Explicitly included types: []
TI:: [00:00:56.000] Searching for typing names in /a/b/node_modules; all files: []
TI:: [00:00:57.000]     Found package names: []
TI:: [00:00:58.000] Inferred typings from unresolved imports: ["test"]
TI:: [00:00:59.000] Result: {"cachedTypingPaths":[],"newTypingNames":["test"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:00.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["test"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:07.000] Installing typings ["test"]
TI:: [00:01:08.000] 'test':: Entry for package 'test' does not exist in local types registry - skipping...
TI:: [00:01:09.000] All typings are known to be missing or invalid - no need to install more typings
TI:: [00:01:10.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":["test"],"kind":"action::set"}
Info 16   [00:01:11.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:01:12.000] 	Files (2)

Info 16   [00:01:13.000] -----------------------------------------------
Info 16   [00:01:14.000] Open files: 
Info 16   [00:01:15.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 16   [00:01:16.000] 		Projects: /dev/null/inferredProject1*
Info 16   [00:01:17.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}

FsWatchesRecursive::
/a/b/node_modules:
  {}

maxNodeModuleJsDepth: 2
Before request

Info 17   [00:01:18.000] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "target": 3
        }
      },
      "seq": 2,
      "type": "request"
    }
Info 18   [00:01:19.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 19   [00:01:20.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 20   [00:01:21.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 21   [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:01:23.000] Scheduled: /dev/null/inferredProject1*
Info 23   [00:01:24.000] Scheduled: *ensureProjectForOpenFiles*
Info 24   [00:01:25.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatchesRecursive::
/a/b/node_modules:
  {}

maxNodeModuleJsDepth: 2