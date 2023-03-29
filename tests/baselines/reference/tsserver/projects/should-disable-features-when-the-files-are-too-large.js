currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.js]
let x =1;

//// [/a/b/f2.js]
let y =1;

//// [/a/b/f3.js]
let y =1;


Info 1    [00:00:14.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a/b/f1.js"
          }
        ],
        "options": {},
        "projectFileName": "proj1"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.js 500 undefined WatchType: Closed Script info
Info 3    [00:00:16.000] Starting updateGraphWorker: Project: proj1
Info 4    [00:00:17.000] Skipped loading contents of large file /a/b/f1.js for info /a/b/f1.js: fileSize: 10485760
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: proj1 WatchType: Missing file
Info 6    [00:00:19.000] Finishing updateGraphWorker: Project: proj1 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:20.000] Project 'proj1' (External)
Info 8    [00:00:21.000] 	Files (1)
	/a/b/f1.js Text-1 ""


	a/b/f1.js
	  Root file specified for compilation

Info 9    [00:00:22.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js: *new*
  {}

TI:: [00:00:23.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:24.000] Processing cache location '/a/data/'
TI:: [00:00:25.000] Trying to find '/a/data/package.json'...
TI:: [00:00:26.000] Finished processing cache location '/a/data/'
TI:: [00:00:27.000] Npm config file: /a/data/package.json
TI:: [00:00:28.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:33.000] Updating types-registry npm package...
TI:: [00:00:34.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:41.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:42.000] Got install request {"projectName":"proj1","fileNames":["/a/b/f1.js"],"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":[],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:43.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:44.000] Processing cache location '/a/data/'
TI:: [00:00:45.000] Cache location was already processed...
TI:: [00:00:46.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:47.000] Explicitly included types: []
TI:: [00:00:48.000] Inferred typings from unresolved imports: []
TI:: [00:00:49.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:00:50.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /a
TI:: [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: proj1 watcher already invoked: false
TI:: [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: proj1 watcher already invoked: false
TI:: [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: proj1 watcher already invoked: false
TI:: [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: proj1 watcher already invoked: false
TI:: [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: proj1 watcher already invoked: false
TI:: [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: proj1 watcher already invoked: false
TI:: [00:01:00.000] Sending response:
    {"projectName":"proj1","typeAcquisition":{"include":[],"exclude":[],"enable":true},"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:01.000] No new typings were requested as a result of typings discovery
Info 10   [00:01:02.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js:
  {}

FsWatchesRecursive::
/a: *new*
  {}

Before request

Info 11   [00:01:03.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a/b/f2.js"
          }
        ],
        "options": {},
        "projectFileName": "proj2"
      },
      "seq": 2,
      "type": "request"
    }
Info 12   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.js 500 undefined WatchType: Closed Script info
Info 13   [00:01:05.000] Starting updateGraphWorker: Project: proj2
Info 14   [00:01:06.000] Skipped loading contents of large file /a/b/f2.js for info /a/b/f2.js: fileSize: 6291456
Info 15   [00:01:07.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: proj2 WatchType: Missing file
Info 16   [00:01:08.000] Finishing updateGraphWorker: Project: proj2 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:01:09.000] Project 'proj2' (External)
Info 18   [00:01:10.000] 	Files (1)
	/a/b/f2.js Text-1 ""


	a/b/f2.js
	  Root file specified for compilation

Info 19   [00:01:11.000] -----------------------------------------------
TI:: [00:01:12.000] Got install request {"projectName":"proj2","fileNames":["/a/b/f2.js"],"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":[],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:13.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:14.000] Processing cache location '/a/data/'
TI:: [00:01:15.000] Cache location was already processed...
TI:: [00:01:16.000] Explicitly included types: []
TI:: [00:01:17.000] Inferred typings from unresolved imports: []
TI:: [00:01:18.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:01:19.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /a
TI:: [00:01:21.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: proj2 watcher already invoked: false
TI:: [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: proj2 watcher already invoked: false
TI:: [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: proj2 watcher already invoked: false
TI:: [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: proj2 watcher already invoked: false
TI:: [00:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:01:27.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: proj2 watcher already invoked: false
TI:: [00:01:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: proj2 watcher already invoked: false
TI:: [00:01:29.000] Sending response:
    {"projectName":"proj2","typeAcquisition":{"include":[],"exclude":[],"enable":true},"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:30.000] No new typings were requested as a result of typings discovery
Info 20   [00:01:31.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js:
  {}
/a/b/f2.js: *new*
  {}

FsWatchesRecursive::
/a:
  {}

Before request

Info 21   [00:01:32.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a/b/f3.js"
          }
        ],
        "options": {},
        "projectFileName": "proj3"
      },
      "seq": 3,
      "type": "request"
    }
Info 22   [00:01:33.000] Non TS file size exceeded limit (6291456). Largest files: /a/b/f3.js:6291456
Info 23   [00:01:34.000] FileWatcher:: Added:: WatchInfo: /a/b/f3.js 500 undefined WatchType: Closed Script info
Info 24   [00:01:35.000] Starting updateGraphWorker: Project: proj3
Info 25   [00:01:36.000] Finishing updateGraphWorker: Project: proj3 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 26   [00:01:37.000] Project 'proj3' (External)
Info 27   [00:01:38.000] 	Files (0)



Info 28   [00:01:39.000] -----------------------------------------------
Info 29   [00:01:40.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js:
  {}
/a/b/f2.js:
  {}
/a/b/f3.js: *new*
  {}

FsWatchesRecursive::
/a:
  {}
