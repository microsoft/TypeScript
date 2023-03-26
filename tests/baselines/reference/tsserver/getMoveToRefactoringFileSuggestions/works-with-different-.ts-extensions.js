Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:18.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/file1.ts]
interface ka {
                name: string;
            }
            

//// [/file2.tsx]


//// [/file3.mts]


//// [/file4.cts]


//// [/file5.js]


//// [/file6.d.ts]


//// [/tsconfig.json]
{"files":["./file1.ts","./file2.tsx","./file3.mts","./file4.cts","./file5.js","./file6.d.ts"]}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:19.000] Search path: /
Info 3    [00:00:20.000] For info: /file1.ts :: Config file name: /tsconfig.json
Info 4    [00:00:21.000] Creating configuration project /tsconfig.json
Info 5    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:23.000] Config: /tsconfig.json : {
 "rootNames": [
  "/file1.ts",
  "/file2.tsx",
  "/file3.mts",
  "/file4.cts",
  "/file5.js",
  "/file6.d.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /file2.tsx 500 undefined WatchType: Closed Script info
Info 8    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /file3.mts 500 undefined WatchType: Closed Script info
Info 9    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /file4.cts 500 undefined WatchType: Closed Script info
Info 10   [00:00:27.000] FileWatcher:: Added:: WatchInfo: /file5.js 500 undefined WatchType: Closed Script info
Info 11   [00:00:28.000] FileWatcher:: Added:: WatchInfo: /file6.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:29.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 13   [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 14   [00:00:31.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:32.000] Project '/tsconfig.json' (Configured)
Info 16   [00:00:33.000] 	Files (6)
	/file1.ts
	/file2.tsx
	/file3.mts
	/file4.cts
	/file5.js
	/file6.d.ts


	file1.ts
	  Part of 'files' list in tsconfig.json
	file2.tsx
	  Part of 'files' list in tsconfig.json
	file3.mts
	  Part of 'files' list in tsconfig.json
	file4.cts
	  Part of 'files' list in tsconfig.json
	file5.js
	  Part of 'files' list in tsconfig.json
	file6.d.ts
	  Part of 'files' list in tsconfig.json

Info 17   [00:00:34.000] -----------------------------------------------
Info 18   [00:00:35.000] Project '/tsconfig.json' (Configured)
Info 18   [00:00:36.000] 	Files (6)

Info 18   [00:00:37.000] -----------------------------------------------
Info 18   [00:00:38.000] Open files: 
Info 18   [00:00:39.000] 	FileName: /file1.ts ProjectRootPath: undefined
Info 18   [00:00:40.000] 		Projects: /tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/file2.tsx:
  {}
/file3.mts:
  {}
/file4.cts:
  {}
/file5.js:
  {}
/file6.d.ts:
  {}

FsWatchesRecursive::

Info 18   [00:00:41.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:00:42.000] request:
    {
      "command": "getMoveToRefactoringFileSuggestions",
      "arguments": {
        "file": "/file1.ts",
        "line": 1,
        "offset": 11
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
/file2.tsx:
  {}
/file3.mts:
  {}
/file4.cts:
  {}
/file5.js:
  {}
/file6.d.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/file2.tsx:
  {}
/file3.mts:
  {}
/file4.cts:
  {}
/file5.js:
  {}
/file6.d.ts:
  {}

FsWatchesRecursive::

Info 20   [00:00:43.000] response:
    {
      "response": {
        "newFilename": "/ka.ts",
        "files": [
          "/file1.ts",
          "/file2.tsx",
          "/file3.mts",
          "/file4.cts",
          "/file6.d.ts"
        ]
      },
      "responseRequired": true
    }