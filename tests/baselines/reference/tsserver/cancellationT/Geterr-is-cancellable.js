currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
let x = 1

//// [/a/tsconfig.json]
{"compilerOptions":{}}


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /a
Info 3    [00:00:12.000] For info: /a/app.ts :: Config file name: /a/tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /a/tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/app.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 7    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:18.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 10   [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 11   [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 12   [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [00:00:22.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:23.000] Project '/a/tsconfig.json' (Configured)
Info 15   [00:00:24.000] 	Files (1)
	/a/app.ts SVC-1-0 "let x = 1"


	app.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:25.000] -----------------------------------------------
Info 17   [00:00:26.000] Project '/a/tsconfig.json' (Configured)
Info 17   [00:00:27.000] 	Files (1)

Info 17   [00:00:28.000] -----------------------------------------------
Info 17   [00:00:29.000] Open files: 
Info 17   [00:00:30.000] 	FileName: /a/app.ts ProjectRootPath: undefined
Info 17   [00:00:31.000] 		Projects: /a/tsconfig.json
TestServerCancellationToken:: resetRequest:: 1 is as expected
Info 17   [00:00:32.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Before request

Info 18   [00:00:33.000] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/a/missing"
        ],
        "delay": 0
      },
      "seq": 2,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 2 is as expected
Info 19   [00:00:34.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
1: checkOne

Info 20   [00:00:35.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
TestServerCancellationToken:: resetRequest:: 2 is as expected
After running Timeout callback:: count: 0

Before request

Info 21   [00:00:36.000] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/a/app.ts"
        ],
        "delay": 0
      },
      "seq": 3,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 3 is as expected
Info 22   [00:00:37.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 23   [00:00:38.000] request:
    {
      "command": "projectInfo",
      "arguments": {
        "file": "/a/app.ts",
        "needFileNameList": false
      },
      "seq": 4,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 4 is as expected
Info 24   [00:00:39.000] response:
    {
      "response": {
        "configFileName": "/a/tsconfig.json",
        "languageServiceDisabled": false
      },
      "responseRequired": true
    }
After request

TestServerCancellationToken:: Setting request to cancel:: 3
Before running Timeout callback:: count: 1
2: checkOne

TestServerCancellationToken:: Cancellation is requested
Info 25   [00:00:40.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
TestServerCancellationToken:: resetRequest:: 3 is as expected
After running Timeout callback:: count: 0

Before request

Info 26   [00:00:41.000] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/a/app.ts"
        ],
        "delay": 0
      },
      "seq": 5,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 5 is as expected
Info 27   [00:00:42.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
3: checkOne

Info 28   [00:00:43.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/app.ts","diagnostics":[]}}
TestServerCancellationToken:: resetRequest:: 5 is as expected
After running Timeout callback:: count: 0

TestServerCancellationToken:: Setting request to cancel:: 5
Before running Immedidate callback:: count: 1
1: semanticCheck

TestServerCancellationToken:: Cancellation is requested
Info 29   [00:00:44.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":5}}
TestServerCancellationToken:: resetRequest:: 5 is as expected
After running Immedidate callback:: count: 0

Before request

Info 30   [00:00:45.000] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/a/app.ts"
        ],
        "delay": 0
      },
      "seq": 6,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 6 is as expected
Info 31   [00:00:46.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
4: checkOne

Info 32   [00:00:47.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/app.ts","diagnostics":[]}}
TestServerCancellationToken:: resetRequest:: 6 is as expected
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
2: semanticCheck

Info 33   [00:00:48.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/app.ts","diagnostics":[]}}
TestServerCancellationToken:: resetRequest:: 6 is as expected
After running Immedidate callback:: count: 1
3: suggestionCheck

Before running Immedidate callback:: count: 1
3: suggestionCheck

Info 34   [00:00:49.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/a/app.ts","diagnostics":[]}}
Info 35   [00:00:50.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":6}}
TestServerCancellationToken:: resetRequest:: 6 is as expected
After running Immedidate callback:: count: 0

Before request

Info 36   [00:00:51.000] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/a/app.ts"
        ],
        "delay": 0
      },
      "seq": 7,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 7 is as expected
Info 37   [00:00:52.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
5: checkOne

Info 38   [00:00:53.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/app.ts","diagnostics":[]}}
TestServerCancellationToken:: resetRequest:: 7 is as expected
After running Timeout callback:: count: 0

Before request

Info 39   [00:00:54.000] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/a/app.ts"
        ],
        "delay": 0
      },
      "seq": 8,
      "type": "request"
    }
Info 40   [00:00:55.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":7}}
TestServerCancellationToken:: resetRequest:: 8 is as expected
Info 41   [00:00:56.000] response:
    {
      "responseRequired": false
    }
After request
