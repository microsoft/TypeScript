Info 0    [00:00:03.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request

Info 1    [00:00:04.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [],
        "closedFiles": [],
        "openFiles": [
          {
            "file": "^/untitled/ts-nul-authority/Untitled-1",
            "fileContent": "export function foo<U>() {\r\n    /*$*/return bar<U>;\r\n}\r\n\r\nexport function bar<T>(x: T) {\r\n    return x;\r\n}\r\n\r\nlet x = foo()(42);",
            "scriptKindName": "TS"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:05.000] Search path: ^/untitled/ts-nul-authority
Info 3    [00:00:06.000] For info: ^/untitled/ts-nul-authority/Untitled-1 :: No config files found.
Info 4    [00:00:07.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:08.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:09.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:11.000] 	Files (1)
	^/untitled/ts-nul-authority/Untitled-1 SVC-1-0 "export function foo<U>() {\r\n    /*$*/return bar<U>;\r\n}\r\n\r\nexport function bar<T>(x: T) {\r\n    return x;\r\n}\r\n\r\nlet x = foo()(42);"


	^/untitled/ts-nul-authority/Untitled-1
	  Root file specified for compilation

Info 9    [00:00:12.000] -----------------------------------------------
Info 10   [00:00:13.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:14.000] 	Files (1)

Info 10   [00:00:15.000] -----------------------------------------------
Info 10   [00:00:16.000] Open files: 
Info 10   [00:00:17.000] 	FileName: ^/untitled/ts-nul-authority/Untitled-1 ProjectRootPath: undefined
Info 10   [00:00:18.000] 		Projects: /dev/null/inferredProject1*
Info 10   [00:00:19.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Before request

Info 11   [00:00:20.000] request:
    {
      "command": "encodedSemanticClassifications-full",
      "arguments": {
        "file": "^/untitled/ts-nul-authority/Untitled-1",
        "start": 0,
        "length": 128,
        "format": "2020"
      },
      "seq": 2,
      "type": "request"
    }
Info 12   [00:00:21.000] response:
    {
      "response": {
        "spans": [
          16,
          3,
          2817,
          20,
          1,
          1281,
          44,
          3,
          2816,
          48,
          1,
          1280,
          74,
          3,
          2817,
          78,
          1,
          1281,
          81,
          1,
          1793,
          84,
          1,
          1280,
          101,
          1,
          1792,
          114,
          1,
          2049,
          118,
          3,
          2816
        ],
        "endOfLineState": 0
      },
      "responseRequired": true
    }
After request

Before request

Info 13   [00:00:22.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "^/untitled/ts-nul-authority/Untitled-1"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 14   [00:00:23.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 15   [00:00:24.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"^/untitled/ts-nul-authority/Untitled-1","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 16   [00:00:25.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"^/untitled/ts-nul-authority/Untitled-1","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 17   [00:00:26.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"^/untitled/ts-nul-authority/Untitled-1","diagnostics":[{"start":{"line":9,"offset":5},"end":{"line":9,"offset":6},"text":"'x' is declared but its value is never read.","code":6133,"category":"suggestion","reportsUnnecessary":true}]}}
Info 18   [00:00:27.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)
