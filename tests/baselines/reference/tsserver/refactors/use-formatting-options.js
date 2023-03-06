Info 0    [00:00:05.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
function f() {
  1;
}


Info 1    [00:00:06.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:07.000] Search path: /
Info 3    [00:00:08.000] For info: /a.ts :: No config files found.
Info 4    [00:00:09.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:10.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:11.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:13.000] 	Files (1)
	/a.ts SVC-1-0 "function f() {\n  1;\n}"


	a.ts
	  Root file specified for compilation

Info 9    [00:00:14.000] -----------------------------------------------
Info 10   [00:00:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:16.000] 	Files (1)

Info 10   [00:00:17.000] -----------------------------------------------
Info 10   [00:00:18.000] Open files: 
Info 10   [00:00:19.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 10   [00:00:20.000] 		Projects: /dev/null/inferredProject1*
Info 10   [00:00:21.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Before request

Info 11   [00:00:22.000] request:
    {
      "command": "configure",
      "arguments": {
        "formatOptions": {
          "indentSize": 2
        }
      },
      "seq": 2,
      "type": "request"
    }
Info 12   [00:00:23.000] Format host information updated
Info 13   [00:00:24.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":2,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 14   [00:00:25.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 15   [00:00:26.000] request:
    {
      "command": "getEditsForRefactor",
      "arguments": {
        "refactor": "Extract Symbol",
        "action": "function_scope_1",
        "file": "/a.ts",
        "startLine": 2,
        "startOffset": 3,
        "endLine": 2,
        "endOffset": 4
      },
      "seq": 3,
      "type": "request"
    }
Info 16   [00:00:27.000] response:
    {
      "response": {
        "renameLocation": {
          "line": 2,
          "offset": 3
        },
        "renameFilename": "/a.ts",
        "edits": [
          {
            "fileName": "/a.ts",
            "textChanges": [
              {
                "start": {
                  "line": 2,
                  "offset": 3
                },
                "end": {
                  "line": 2,
                  "offset": 5
                },
                "newText": "newFunction();"
              },
              {
                "start": {
                  "line": 3,
                  "offset": 2
                },
                "end": {
                  "line": 3,
                  "offset": 2
                },
                "newText": "\n\nfunction newFunction() {\n  1;\n}\n"
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request
