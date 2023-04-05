currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
class c { prop = "hello"; foo() { const x = 0; } }

//// [/tsconfig.json]
{"compilerOptions":{"plugins":[{"name":"myplugin"}]}}


Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:09.000] Search path: /
Info 3    [00:00:10.000] For info: /a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:11.000] Creating configuration project /tsconfig.json
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:13.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts"
 ],
 "options": {
  "plugins": [
   {
    "name": "myplugin"
   }
  ],
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:14.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:16.000] Enabling plugin myplugin from candidate paths: /a/lib/tsc.js/../../..
Info 10   [00:00:17.000] Loading myplugin from /a/lib/tsc.js/../../.. (resolved to /a/lib/tsc.js/../../../node_modules)
Info 11   [00:00:18.000] Plugin validation succeeded
Info 12   [00:00:19.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 13   [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 14   [00:00:21.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:22.000] Project '/tsconfig.json' (Configured)
Info 16   [00:00:23.000] 	Files (1)
	/a.ts SVC-1-0 "class c { prop = \"hello\"; foo() { const x = 0; } }"


	a.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:24.000] -----------------------------------------------
Info 18   [00:00:25.000] Project '/tsconfig.json' (Configured)
Info 18   [00:00:26.000] 	Files (1)

Info 18   [00:00:27.000] -----------------------------------------------
Info 18   [00:00:28.000] Open files: 
Info 18   [00:00:29.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 18   [00:00:30.000] 		Projects: /tsconfig.json
Info 18   [00:00:31.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

Before request

Info 19   [00:00:32.000] request:
    {
      "command": "completions",
      "arguments": {
        "file": "/a.ts",
        "line": 1,
        "offset": 41
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:33.000] getCompletionData: Get current token: *
Info 21   [00:00:34.000] getCompletionData: Is inside comment: *
Info 22   [00:00:35.000] getCompletionData: Get previous token: *
Info 23   [00:00:36.000] getCompletionsAtPosition: isCompletionListBlocker: *
Info 24   [00:00:37.000] Returning an empty list because completion was requested in an invalid position.
Info 25   [00:00:38.000] response:
    {
      "responseRequired": true
    }
After request
