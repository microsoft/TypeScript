TI:: [00:00:11.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:12.000] Processing cache location '/a/data/'
TI:: [00:00:13.000] Trying to find '/a/data/package.json'...
TI:: [00:00:14.000] Finished processing cache location '/a/data/'
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:16.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "project1",
        "rootFiles": [
          {
            "fileName": "/a/b/file1.js"
          },
          {
            "fileName": "/a/b/file2.d.ts"
          }
        ],
        "options": {
          "skipLibCheck": false
        }
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/file1.js]
let x =1;

//// [/a/b/file2.d.ts]

                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };


Info 2    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/file1.js 500 undefined WatchType: Closed Script info
Info 3    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.d.ts 500 undefined WatchType: Closed Script info
Info 4    [00:00:19.000] Starting updateGraphWorker: Project: project1
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project1 WatchType: Missing file
Info 6    [00:00:21.000] Finishing updateGraphWorker: Project: project1 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:22.000] Project 'project1' (External)
Info 8    [00:00:23.000] 	Files (2)
	/a/b/file1.js
	/a/b/file2.d.ts


	a/b/file1.js
	  Root file specified for compilation
	a/b/file2.d.ts
	  Root file specified for compilation

Info 9    [00:00:24.000] -----------------------------------------------
TI:: [00:00:25.000] Got install request {"projectName":"project1","fileNames":["/a/b/file1.js","/a/b/file2.d.ts"],"compilerOptions":{"skipLibCheck":false,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":[],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:26.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:27.000] Processing cache location '/a/data/'
TI:: [00:00:28.000] Cache location was already processed...
TI:: [00:00:29.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:30.000] Explicitly included types: []
TI:: [00:00:31.000] Inferred typings from unresolved imports: []
TI:: [00:00:32.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:00:33.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/bower_components","/node_modules"]}
TI:: [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a
TI:: [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project1 watcher already invoked: false
TI:: [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project1 watcher already invoked: false
TI:: [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: project1 watcher already invoked: false
TI:: [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: project1 watcher already invoked: false
TI:: [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project1 watcher already invoked: false
TI:: [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project1 watcher already invoked: false
TI:: [00:00:43.000] Sending response:
    {"projectName":"project1","typeAcquisition":{"include":[],"exclude":[],"enable":true},"compilerOptions":{"skipLibCheck":false,"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:00:44.000] No new typings were requested as a result of typings discovery
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file1.js: *new*
  {}
/a/b/file2.d.ts: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Info 10   [00:00:45.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 11   [00:00:46.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request

Info 12   [00:00:47.000] response:
    {
      "response": [],
      "responseRequired": true
    }