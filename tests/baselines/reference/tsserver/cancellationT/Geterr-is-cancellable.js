currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
let x = 1

//// [/a/tsconfig.json]
{"compilerOptions":{}}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/app.ts :: Config file name: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/app.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/app.ts SVC-1-0 "let x = 1"


	app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json
TestServerCancellationToken:: resetRequest:: 1 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 2
     }
    }
TestServerCancellationToken:: resetRequest:: 2 is as expected
After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] response:
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
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 3
     }
    }
TestServerCancellationToken:: resetRequest:: 3 is as expected
After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
3: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/a/app.ts",
      "diagnostics": []
     }
    }
TestServerCancellationToken:: resetRequest:: 5 is as expected
After running Timeout callback:: count: 0

TestServerCancellationToken:: Setting request to cancel:: 5
Before running Immedidate callback:: count: 1
1: semanticCheck

TestServerCancellationToken:: Cancellation is requested
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 5
     }
    }
TestServerCancellationToken:: resetRequest:: 5 is as expected
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
4: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/a/app.ts",
      "diagnostics": []
     }
    }
TestServerCancellationToken:: resetRequest:: 6 is as expected
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
2: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "semanticDiag",
     "body": {
      "file": "/a/app.ts",
      "diagnostics": []
     }
    }
TestServerCancellationToken:: resetRequest:: 6 is as expected
After running Immedidate callback:: count: 1
3: suggestionCheck

Before running Immedidate callback:: count: 1
3: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "suggestionDiag",
     "body": {
      "file": "/a/app.ts",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 6
     }
    }
TestServerCancellationToken:: resetRequest:: 6 is as expected
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
5: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/a/app.ts",
      "diagnostics": []
     }
    }
TestServerCancellationToken:: resetRequest:: 7 is as expected
After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 7
     }
    }
TestServerCancellationToken:: resetRequest:: 8 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request
