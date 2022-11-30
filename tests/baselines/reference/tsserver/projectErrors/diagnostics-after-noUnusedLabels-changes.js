Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a.ts]
label: while (1) {}

//// [/tsconfig.json]
{ "compilerOptions": { "allowUnusedLabels": true } }


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:09.000] Search path: /
Info 3    [00:00:10.000] For info: /a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:11.000] Creating configuration project /tsconfig.json
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:13.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts"
 ],
 "options": {
  "allowUnusedLabels": true,
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:14.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:16.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 10   [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 11   [00:00:18.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:19.000] Project '/tsconfig.json' (Configured)
Info 13   [00:00:20.000] 	Files (1)
	/a.ts


	a.ts
	  Matched by default include pattern '**/*'

Info 14   [00:00:21.000] -----------------------------------------------
Info 15   [00:00:22.000] Project '/tsconfig.json' (Configured)
Info 15   [00:00:23.000] 	Files (1)

Info 15   [00:00:24.000] -----------------------------------------------
Info 15   [00:00:25.000] Open files: 
Info 15   [00:00:26.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 15   [00:00:27.000] 		Projects: /tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::
/:
  {}

Info 15   [00:00:28.000] response:
    {
      "responseRequired": false
    }
Info 16   [00:00:31.000] FileWatcher:: Triggered with /tsconfig.json 1:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 17   [00:00:32.000] Scheduled: /tsconfig.json
Info 18   [00:00:33.000] Scheduled: *ensureProjectForOpenFiles*
Info 19   [00:00:34.000] Elapsed:: *ms FileWatcher:: Triggered with /tsconfig.json 1:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Before running timeout callbacks
//// [/tsconfig.json]
{ "compilerOptions": { "allowUnusedLabels": false } }


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::
/:
  {}

Info 20   [00:00:35.000] Running: /tsconfig.json
Info 21   [00:00:36.000] Reloading configured project /tsconfig.json
Info 22   [00:00:37.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts"
 ],
 "options": {
  "allowUnusedLabels": false,
  "configFilePath": "/tsconfig.json"
 }
}
Info 23   [00:00:38.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 24   [00:00:39.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 25   [00:00:40.000] Different program with same set of files
Info 26   [00:00:41.000] Running: *ensureProjectForOpenFiles*
Info 27   [00:00:42.000] Before ensureProjectForOpenFiles:
Info 28   [00:00:43.000] Project '/tsconfig.json' (Configured)
Info 28   [00:00:44.000] 	Files (1)

Info 28   [00:00:45.000] -----------------------------------------------
Info 28   [00:00:46.000] Open files: 
Info 28   [00:00:47.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 28   [00:00:48.000] 		Projects: /tsconfig.json
Info 28   [00:00:49.000] After ensureProjectForOpenFiles:
Info 29   [00:00:50.000] Project '/tsconfig.json' (Configured)
Info 29   [00:00:51.000] 	Files (1)

Info 29   [00:00:52.000] -----------------------------------------------
Info 29   [00:00:53.000] Open files: 
Info 29   [00:00:54.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 29   [00:00:55.000] 		Projects: /tsconfig.json
After running timeout callbacks

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::
/:
  {}

Info 29   [00:00:56.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a.ts"
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

FsWatchesRecursive::
/:
  {}

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::
/:
  {}

Info 30   [00:00:57.000] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 6
          },
          "text": "Unused label.",
          "code": 7028,
          "category": "error",
          "reportsUnnecessary": true
        }
      ],
      "responseRequired": true
    }