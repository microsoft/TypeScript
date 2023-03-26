Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file1.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/file1.js]
class C {}

//// [/file2.js]


//// [/file3.mts]


//// [/file4.ts]


//// [/file5.js]


//// [/tsconfig.json]
{"files":["./file1.js","./file2.js","./file3.mts","./file4.ts","./file5.js"]}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:17.000] Search path: /
Info 3    [00:00:18.000] For info: /file1.js :: Config file name: /tsconfig.json
Info 4    [00:00:19.000] Creating configuration project /tsconfig.json
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:21.000] Config: /tsconfig.json : {
 "rootNames": [
  "/file1.js",
  "/file2.js",
  "/file3.mts",
  "/file4.ts",
  "/file5.js"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /file2.js 500 undefined WatchType: Closed Script info
Info 8    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /file3.mts 500 undefined WatchType: Closed Script info
Info 9    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /file4.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:25.000] FileWatcher:: Added:: WatchInfo: /file5.js 500 undefined WatchType: Closed Script info
Info 11   [00:00:26.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 12   [00:00:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 13   [00:00:28.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:29.000] Project '/tsconfig.json' (Configured)
Info 15   [00:00:30.000] 	Files (5)
	/file1.js
	/file2.js
	/file3.mts
	/file4.ts
	/file5.js


	file1.js
	  Part of 'files' list in tsconfig.json
	file2.js
	  Part of 'files' list in tsconfig.json
	file3.mts
	  Part of 'files' list in tsconfig.json
	file4.ts
	  Part of 'files' list in tsconfig.json
	file5.js
	  Part of 'files' list in tsconfig.json

Info 16   [00:00:31.000] -----------------------------------------------
Info 17   [00:00:32.000] Project '/tsconfig.json' (Configured)
Info 17   [00:00:33.000] 	Files (5)

Info 17   [00:00:34.000] -----------------------------------------------
Info 17   [00:00:35.000] Open files: 
Info 17   [00:00:36.000] 	FileName: /file1.js ProjectRootPath: undefined
Info 17   [00:00:37.000] 		Projects: /tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/file2.js:
  {}
/file3.mts:
  {}
/file4.ts:
  {}
/file5.js:
  {}

FsWatchesRecursive::

Info 17   [00:00:38.000] response:
    {
      "responseRequired": false
    }
Info 18   [00:00:39.000] request:
    {
      "command": "getMoveToRefactoringFileSuggestions",
      "arguments": {
        "file": "/file1.js",
        "line": 1,
        "offset": 7
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/file2.js:
  {}
/file3.mts:
  {}
/file4.ts:
  {}
/file5.js:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/file2.js:
  {}
/file3.mts:
  {}
/file4.ts:
  {}
/file5.js:
  {}

FsWatchesRecursive::

Info 19   [00:00:40.000] response:
    {
      "response": {
        "newFilename": "/C.js",
        "files": [
          "/file1.js",
          "/file2.js",
          "/file5.js"
        ]
      },
      "responseRequired": true
    }