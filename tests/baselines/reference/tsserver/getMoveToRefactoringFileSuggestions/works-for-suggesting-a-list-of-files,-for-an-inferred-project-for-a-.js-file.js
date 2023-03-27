currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/file1.js]
import {} from "./file.js";

//// [/file2.js]
class C {}

//// [/jsconfig.json]
{"files":["./file1.js","./file.js"]}


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file2.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /
Info 3    [00:00:12.000] For info: /file2.js :: Config file name: /jsconfig.json
Info 4    [00:00:13.000] Creating configuration project /jsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /jsconfig.json 2000 undefined Project: /jsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /jsconfig.json : {
 "rootNames": [
  "/file1.js",
  "/file.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/jsconfig.json"
 }
}
Info 7    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /file1.js 500 undefined WatchType: Closed Script info
Info 8    [00:00:17.000] Starting updateGraphWorker: Project: /jsconfig.json
Info 9    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /file.js 1 undefined Project: /jsconfig.json WatchType: Failed Lookup Locations
Info 10   [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /file.js 1 undefined Project: /jsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo:  0 undefined Project: /jsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  0 undefined Project: /jsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:22.000] FileWatcher:: Added:: WatchInfo: /file.js 500 undefined Project: /jsconfig.json WatchType: Missing file
Info 14   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /jsconfig.json WatchType: Missing file
Info 15   [00:00:24.000] Finishing updateGraphWorker: Project: /jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:25.000] Project '/jsconfig.json' (Configured)
Info 17   [00:00:26.000] 	Files (1)
	/file1.js Text-1 "import {} from \"./file.js\";"


	file1.js
	  Part of 'files' list in tsconfig.json

Info 18   [00:00:27.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/file.js: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/jsconfig.json: *new*
  {}
/file1.js: *new*
  {}
/: *new*
  {}

TI:: [00:00:28.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:29.000] Processing cache location '/a/data/'
TI:: [00:00:30.000] Trying to find '/a/data/package.json'...
TI:: [00:00:31.000] Finished processing cache location '/a/data/'
TI:: [00:00:32.000] Npm config file: /a/data/package.json
TI:: [00:00:33.000] Npm config file: '/a/data/package.json' is missing, creating new one...
Info 19   [00:00:36.000] DirectoryWatcher:: Triggered with a :: WatchInfo:  0 undefined Project: /jsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with a :: WatchInfo:  0 undefined Project: /jsconfig.json WatchType: Failed Lookup Locations
TI:: [00:00:42.000] Updating types-registry npm package...
TI:: [00:00:43.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:50.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:51.000] Got install request {"projectName":"/jsconfig.json","fileNames":["/file1.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:52.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:53.000] Processing cache location '/a/data/'
TI:: [00:00:54.000] Cache location was already processed...
TI:: [00:00:55.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:56.000] Explicitly included types: []
TI:: [00:00:57.000] Inferred typings from unresolved imports: []
TI:: [00:00:58.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:00:59.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /jsconfig.json watcher already invoked: false
TI:: [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /jsconfig.json watcher already invoked: false
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /jsconfig.json watcher already invoked: false
TI:: [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /jsconfig.json watcher already invoked: false
TI:: [00:01:06.000] Sending response:
    {"projectName":"/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/jsconfig.json","allowNonTsExtensions":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:07.000] No new typings were requested as a result of typings discovery
Info 21   [00:01:08.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 22   [00:01:09.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 23   [00:01:10.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:01:11.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:01:12.000] 	Files (1)
	/file2.js SVC-1-0 "class C {}"


	file2.js
	  Root file specified for compilation

Info 26   [00:01:13.000] -----------------------------------------------
TI:: [00:01:14.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/file2.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:15.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:16.000] Processing cache location '/a/data/'
TI:: [00:01:17.000] Cache location was already processed...
TI:: [00:01:18.000] Explicitly included types: []
TI:: [00:01:19.000] Inferred typings from unresolved imports: []
TI:: [00:01:20.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:01:21.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:25.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:28.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:29.000] No new typings were requested as a result of typings discovery
Info 27   [00:01:30.000] Project '/jsconfig.json' (Configured)
Info 27   [00:01:31.000] 	Files (1)

Info 27   [00:01:32.000] -----------------------------------------------
Info 27   [00:01:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:01:34.000] 	Files (1)

Info 27   [00:01:35.000] -----------------------------------------------
Info 27   [00:01:36.000] Open files: 
Info 27   [00:01:37.000] 	FileName: /file2.js ProjectRootPath: undefined
Info 27   [00:01:38.000] 		Projects: /dev/null/inferredProject1*
Info 27   [00:01:39.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/file.js:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/jsconfig.json:
  {}
/file1.js:
  {}
/:
  {}

Before request

Info 28   [00:01:40.000] request:
    {
      "command": "getMoveToRefactoringFileSuggestions",
      "arguments": {
        "file": "/file2.js",
        "line": 1,
        "offset": 7
      },
      "seq": 2,
      "type": "request"
    }
Info 29   [00:01:41.000] response:
    {
      "response": {
        "newFilename": "/C.js",
        "files": [
          "/file2.js"
        ]
      },
      "responseRequired": true
    }
After request
