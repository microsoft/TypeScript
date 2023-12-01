currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a.ts]
const x = 0; const o = { x };


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /a.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a.ts SVC-1-0 "const x = 0; const o = { x };"


	a.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a.ts ProjectRootPath: undefined
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
      "command": "rename",
      "arguments": {
        "file": "/a.ts",
        "line": 1,
        "offset": 7
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "x",
          "fullDisplayName": "x",
          "kind": "const",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 7
            },
            "end": {
              "line": 1,
              "offset": 8
            }
          }
        },
        "locs": [
          {
            "file": "/a.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 7
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
                }
              },
              {
                "start": {
                  "line": 1,
                  "offset": 26
                },
                "end": {
                  "line": 1,
                  "offset": 27
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "providePrefixAndSuffixTextForRename": true
        }
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/a.ts",
        "line": 1,
        "offset": 7
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "x",
          "fullDisplayName": "x",
          "kind": "const",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 7
            },
            "end": {
              "line": 1,
              "offset": 8
            }
          }
        },
        "locs": [
          {
            "file": "/a.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 7
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
                }
              },
              {
                "start": {
                  "line": 1,
                  "offset": 26
                },
                "end": {
                  "line": 1,
                  "offset": 27
                },
                "prefixText": "x: "
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "providePrefixAndSuffixTextForRename": false
        }
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 5,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configure",
      "arguments": {
        "file": "/a.ts",
        "formatOptions": {},
        "preferences": {
          "providePrefixAndSuffixTextForRename": true
        }
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Host configuration update for file /a.ts
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 6,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/a.ts",
        "line": 1,
        "offset": 7
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "x",
          "fullDisplayName": "x",
          "kind": "const",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 7
            },
            "end": {
              "line": 1,
              "offset": 8
            }
          }
        },
        "locs": [
          {
            "file": "/a.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 7
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
                }
              },
              {
                "start": {
                  "line": 1,
                  "offset": 26
                },
                "end": {
                  "line": 1,
                  "offset": 27
                },
                "prefixText": "x: "
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request
