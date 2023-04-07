currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let xyz = 1;


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
ServerCancellationToken:: Cancellation Request id:: 1
Info seq  [hh:mm:ss:mss] Search path: /a/b
Info seq  [hh:mm:ss:mss] For info: /a/b/app.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/app.ts SVC-1-0 "let xyz = 1;"


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/a/b/app.ts"
        ],
        "delay": 0
      },
      "seq": 2,
      "type": "request"
    }
ServerCancellationToken:: Cancellation Request id:: 2
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "documentHighlights",
      "arguments": {
        "file": "/a/b/app.ts",
        "line": 1,
        "offset": 6,
        "filesToSearch": [
          "/a/b/app.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
ServerCancellationToken:: Cancellation Request id:: 3
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/a/b/app.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 5
              },
              "end": {
                "line": 1,
                "offset": 8
              },
              "contextStart": {
                "line": 1,
                "offset": 1
              },
              "contextEnd": {
                "line": 1,
                "offset": 13
              },
              "kind": "writtenReference"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Before running Timeout callback:: count: 1
1: checkOne

ServerCancellationToken:: Cancellation Request id:: 2
Info seq  [hh:mm:ss:mss] Session does not support events: ignored event: {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/app.ts","diagnostics":[]}}
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
1: semanticCheck

ServerCancellationToken:: Cancellation Request id:: 2
Info seq  [hh:mm:ss:mss] Session does not support events: ignored event: {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/b/app.ts","diagnostics":[]}}
After running Immedidate callback:: count: 1
2: suggestionCheck

Before running Immedidate callback:: count: 1
2: suggestionCheck

ServerCancellationToken:: Cancellation Request id:: 2
Info seq  [hh:mm:ss:mss] Session does not support events: ignored event: {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/a/b/app.ts","diagnostics":[]}}
Info seq  [hh:mm:ss:mss] Session does not support events: ignored event: {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
After running Immedidate callback:: count: 0
