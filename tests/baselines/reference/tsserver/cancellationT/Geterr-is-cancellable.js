currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
let x = 1

//// [/a/tsconfig.json]
{
  "compilerOptions": {}
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 1
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/app.ts :: Config file name: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/tsconfig.json",
        "reason": "Creating possible configured project for /a/app.ts to open"
      }
    }
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
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "bcbb3eb9a7f46ab3b8f574ad3733f3e5a7ce50557c14c0c6192f1203aedcacca",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 9,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a/app.ts",
        "configFile": "/a/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
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
TestServerCancellationToken:: Cancellation Request id:: 2
TestServerCancellationToken:: resetRequest:: 2 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 1
1: checkOne *new*

Before running Timeout callback:: count: 1
1: checkOne

TestServerCancellationToken:: Cancellation Request id:: 2
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
TestServerCancellationToken:: Cancellation Request id:: 3
TestServerCancellationToken:: resetRequest:: 3 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 1
2: checkOne *new*

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
TestServerCancellationToken:: Cancellation Request id:: 4
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

TestServerCancellationToken:: Cancellation Request id:: 3
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
TestServerCancellationToken:: Cancellation Request id:: 5
TestServerCancellationToken:: resetRequest:: 5 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 1
3: checkOne *new*

Before running Timeout callback:: count: 1
3: checkOne

TestServerCancellationToken:: Cancellation Request id:: 5
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

Immedidate callback:: count: 1
1: semanticCheck *new*

TestServerCancellationToken:: Setting request to cancel:: 5
Before running Immedidate callback:: count: 1
1: semanticCheck

TestServerCancellationToken:: Cancellation Request id:: 5
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
TestServerCancellationToken:: Cancellation Request id:: 6
TestServerCancellationToken:: resetRequest:: 6 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 1
4: checkOne *new*

Before running Timeout callback:: count: 1
4: checkOne

TestServerCancellationToken:: Cancellation Request id:: 6
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

Immedidate callback:: count: 1
2: semanticCheck *new*

Before running Immedidate callback:: count: 1
2: semanticCheck

TestServerCancellationToken:: Cancellation Request id:: 6
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

Immedidate callback:: count: 1
3: suggestionCheck *new*

Before running Immedidate callback:: count: 1
3: suggestionCheck

TestServerCancellationToken:: Cancellation Request id:: 6
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
TestServerCancellationToken:: Cancellation Request id:: 7
TestServerCancellationToken:: resetRequest:: 7 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 1
5: checkOne *new*

Before running Timeout callback:: count: 1
5: checkOne

TestServerCancellationToken:: Cancellation Request id:: 7
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

Immedidate callback:: count: 1
4: semanticCheck *new*

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
TestServerCancellationToken:: Cancellation Request id:: 8
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

Timeout callback:: count: 1
6: checkOne *new*

Immedidate callback:: count: 0
4: semanticCheck *deleted*
