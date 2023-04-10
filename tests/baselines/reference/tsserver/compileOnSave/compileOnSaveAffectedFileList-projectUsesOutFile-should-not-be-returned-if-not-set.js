Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:12.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/a/a.ts"
      }
    }
Before request
//// [/a/a.ts]
let x = 1

//// [/a/b.ts]
let y = 1

//// [/a/tsconfig.json]
{"compilerOptions":{},"compileOnSave":true}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:13.000] Search path: /a
Info 3    [00:00:14.000] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info 4    [00:00:15.000] Creating configuration project /a/tsconfig.json
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [00:00:17.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/a.ts",
  "/a/b.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 7    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:21.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 11   [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 12   [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 14   [00:00:25.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:26.000] Project '/a/tsconfig.json' (Configured)
Info 16   [00:00:27.000] 	Files (2)
	/a/a.ts
	/a/b.ts


	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:28.000] -----------------------------------------------
Info 18   [00:00:29.000] Project '/a/tsconfig.json' (Configured)
Info 18   [00:00:30.000] 	Files (2)

Info 18   [00:00:31.000] -----------------------------------------------
Info 18   [00:00:32.000] Open files: 
Info 18   [00:00:33.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 18   [00:00:34.000] 		Projects: /a/tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/b.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Info 18   [00:00:35.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:00:36.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/b.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Info 20   [00:00:37.000] Before ensureProjectForOpenFiles:
Info 21   [00:00:38.000] Project '/a/tsconfig.json' (Configured)
Info 21   [00:00:39.000] 	Files (2)

Info 21   [00:00:40.000] -----------------------------------------------
Info 21   [00:00:41.000] Open files: 
Info 21   [00:00:42.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 21   [00:00:43.000] 		Projects: /a/tsconfig.json
Info 21   [00:00:44.000] After ensureProjectForOpenFiles:
Info 22   [00:00:45.000] Project '/a/tsconfig.json' (Configured)
Info 22   [00:00:46.000] 	Files (2)

Info 22   [00:00:47.000] -----------------------------------------------
Info 22   [00:00:48.000] Open files: 
Info 22   [00:00:49.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 22   [00:00:50.000] 		Projects: /a/tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/b.ts:
  {}

FsWatchesRecursive::
/a:
  {}

Info 22   [00:00:51.000] response:
    {
      "response": [
        {
          "projectFileName": "/a/tsconfig.json",
          "fileNames": [
            "/a/a.ts",
            "/a/b.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }