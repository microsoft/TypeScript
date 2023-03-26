Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file2.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/file1.js]
import {} from "./file.js";

//// [/file2.js]
class C {}

//// [/jsconfig.json]
{"files":["./file1.js","./file.js"]}


PolledWatches::

FsWatches::

FsWatchesRecursive::

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
	/file1.js


	file1.js
	  Part of 'files' list in tsconfig.json

Info 18   [00:00:27.000] -----------------------------------------------
Info 19   [00:00:28.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 21   [00:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:00:32.000] 	Files (1)
	/file2.js


	file2.js
	  Root file specified for compilation

Info 24   [00:00:33.000] -----------------------------------------------
Info 25   [00:00:34.000] Project '/jsconfig.json' (Configured)
Info 25   [00:00:35.000] 	Files (1)

Info 25   [00:00:36.000] -----------------------------------------------
Info 25   [00:00:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:38.000] 	Files (1)

Info 25   [00:00:39.000] -----------------------------------------------
Info 25   [00:00:40.000] Open files: 
Info 25   [00:00:41.000] 	FileName: /file2.js ProjectRootPath: undefined
Info 25   [00:00:42.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/file.js:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/jsconfig.json:
  {}
/file1.js:
  {}
/:
  {}

FsWatchesRecursive::

Info 25   [00:00:43.000] response:
    {
      "responseRequired": false
    }
Info 26   [00:00:44.000] request:
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
Before request

PolledWatches::
/file.js:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/jsconfig.json:
  {}
/file1.js:
  {}
/:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/file.js:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/jsconfig.json:
  {}
/file1.js:
  {}
/:
  {}

FsWatchesRecursive::

Info 27   [00:00:45.000] response:
    {
      "response": {
        "newFilename": "/C.js",
        "files": [
          "/file2.js"
        ]
      },
      "responseRequired": true
    }