Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
const x = 1; export { x };

//// [/b.ts]
import { x } from "./a"; const y = x + 1;


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
Info 3    [00:00:10.000] For info: /a.ts :: No config files found.
Info 4    [00:00:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:13.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:17.000] 	Files (1)
	/a.ts SVC-1-0 "const x = 1; export { x };"


	a.ts
	  Root file specified for compilation

Info 11   [00:00:18.000] -----------------------------------------------
Info 12   [00:00:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:20.000] 	Files (1)

Info 12   [00:00:21.000] -----------------------------------------------
Info 12   [00:00:22.000] Open files: 
Info 12   [00:00:23.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 12   [00:00:24.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:00:25.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types: *new*
  {"pollingInterval":500}

Before request

Info 13   [00:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:27.000] Search path: /
Info 15   [00:00:28.000] For info: /b.ts :: No config files found.
Info 16   [00:00:29.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 17   [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 18   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 19   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 20   [00:00:33.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:00:34.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 22   [00:00:35.000] 	Files (2)
	/a.ts SVC-1-0 "const x = 1; export { x };"
	/b.ts SVC-1-0 "import { x } from \"./a\"; const y = x + 1;"


	a.ts
	  Imported via "./a" from file 'b.ts'
	b.ts
	  Root file specified for compilation

Info 23   [00:00:36.000] -----------------------------------------------
Info 24   [00:00:37.000] `remove Project::
Info 25   [00:00:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 26   [00:00:39.000] 	Files (1)
	/a.ts


	a.ts
	  Root file specified for compilation

Info 27   [00:00:40.000] -----------------------------------------------
Info 28   [00:00:41.000] DirectoryWatcher:: Close:: WatchInfo: /node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 29   [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 30   [00:00:43.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 31   [00:00:44.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 31   [00:00:45.000] 	Files (2)

Info 31   [00:00:46.000] -----------------------------------------------
Info 31   [00:00:47.000] Open files: 
Info 31   [00:00:48.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 31   [00:00:49.000] 		Projects: /dev/null/inferredProject2*
Info 31   [00:00:50.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 31   [00:00:51.000] 		Projects: /dev/null/inferredProject2*
Info 31   [00:00:52.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 32   [00:00:53.000] request:
    {
      "command": "configure",
      "arguments": {
        "file": "/a.ts",
        "formatOptions": {},
        "preferences": {
          "providePrefixAndSuffixTextForRename": true
        }
      },
      "seq": 3,
      "type": "request"
    }
Info 33   [00:00:54.000] Host configuration update for file /a.ts
Info 34   [00:00:55.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":3,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 35   [00:00:56.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 36   [00:00:57.000] request:
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
Info 37   [00:00:58.000] response:
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
                  "offset": 23
                },
                "end": {
                  "line": 1,
                  "offset": 24
                },
                "contextStart": {
                  "line": 1,
                  "offset": 14
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 27
                },
                "suffixText": " as x"
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info 38   [00:00:59.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/b.ts",
        "line": 1,
        "offset": 10
      },
      "seq": 5,
      "type": "request"
    }
Info 39   [00:01:00.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "x",
          "fullDisplayName": "x",
          "kind": "alias",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 11
            }
          }
        },
        "locs": [
          {
            "file": "/b.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 10
                },
                "end": {
                  "line": 1,
                  "offset": 11
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 25
                }
              },
              {
                "start": {
                  "line": 1,
                  "offset": 36
                },
                "end": {
                  "line": 1,
                  "offset": 37
                }
              }
            ]
          },
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
                  "offset": 23
                },
                "end": {
                  "line": 1,
                  "offset": 24
                },
                "contextStart": {
                  "line": 1,
                  "offset": 14
                },
                "contextEnd": {
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
