currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/file1.ts]
let t1 = "div";
let t2 = "div";
let t3 = { "div": 123 };
let t4 = t3["div"];


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a/b
Info seq  [hh:mm:ss:mss] For info: /a/b/file1.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/file1.ts SVC-1-0 "let t1 = \"div\";\nlet t2 = \"div\";\nlet t3 = { \"div\": 123 };\nlet t4 = t3[\"div\"];"


	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "documentHighlights",
      "arguments": {
        "file": "/a/b/file1.ts",
        "line": 1,
        "offset": 11,
        "filesToSearch": [
          "/a/b/file1.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/a/b/file1.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 11
              },
              "end": {
                "line": 1,
                "offset": 14
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 11
              },
              "end": {
                "line": 2,
                "offset": 14
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 3,
                "offset": 13
              },
              "end": {
                "line": 3,
                "offset": 16
              },
              "contextStart": {
                "line": 3,
                "offset": 12
              },
              "contextEnd": {
                "line": 3,
                "offset": 22
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 4,
                "offset": 14
              },
              "end": {
                "line": 4,
                "offset": 17
              },
              "kind": "reference"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "documentHighlights",
      "arguments": {
        "file": "/a/b/file1.ts",
        "line": 3,
        "offset": 13,
        "filesToSearch": [
          "/a/b/file1.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/a/b/file1.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 3,
                "offset": 13
              },
              "end": {
                "line": 3,
                "offset": 16
              },
              "contextStart": {
                "line": 3,
                "offset": 12
              },
              "contextEnd": {
                "line": 3,
                "offset": 22
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 4,
                "offset": 14
              },
              "end": {
                "line": 4,
                "offset": 17
              },
              "kind": "reference"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "documentHighlights",
      "arguments": {
        "file": "/a/b/file1.ts",
        "line": 4,
        "offset": 14,
        "filesToSearch": [
          "/a/b/file1.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/a/b/file1.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 3,
                "offset": 13
              },
              "end": {
                "line": 3,
                "offset": 16
              },
              "contextStart": {
                "line": 3,
                "offset": 12
              },
              "contextEnd": {
                "line": 3,
                "offset": 22
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 4,
                "offset": 14
              },
              "end": {
                "line": 4,
                "offset": 17
              },
              "kind": "reference"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
