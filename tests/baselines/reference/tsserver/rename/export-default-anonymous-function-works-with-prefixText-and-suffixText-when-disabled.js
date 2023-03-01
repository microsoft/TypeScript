Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
export default function() {}

//// [/b.ts]
import aTest from "./a"; function test() { return aTest(); }


Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:09.000] Search path: /
Info 3    [00:00:10.000] For info: /b.ts :: No config files found.
Info 4    [00:00:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:16.000] 	Files (2)
	/a.ts Text-1 "export default function() {}"
	/b.ts SVC-1-0 "import aTest from \"./a\"; function test() { return aTest(); }"


	a.ts
	  Imported via "./a" from file 'b.ts'
	b.ts
	  Root file specified for compilation

Info 10   [00:00:17.000] -----------------------------------------------
Info 11   [00:00:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:19.000] 	Files (2)

Info 11   [00:00:20.000] -----------------------------------------------
Info 11   [00:00:21.000] Open files: 
Info 11   [00:00:22.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 11   [00:00:23.000] 		Projects: /dev/null/inferredProject1*
Info 11   [00:00:24.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a.ts: *new*
  {}

Before request

Info 12   [00:00:25.000] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "providePrefixAndSuffixTextForRename": false
        }
      },
      "seq": 2,
      "type": "request"
    }
Info 13   [00:00:26.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":2,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 14   [00:00:27.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 15   [00:00:28.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/b.ts",
        "line": 1,
        "offset": 51
      },
      "seq": 3,
      "type": "request"
    }
Info 16   [00:00:29.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "aTest",
          "fullDisplayName": "aTest",
          "kind": "alias",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 51
            },
            "end": {
              "line": 1,
              "offset": 56
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
                  "offset": 8
                },
                "end": {
                  "line": 1,
                  "offset": 13
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
                  "offset": 51
                },
                "end": {
                  "line": 1,
                  "offset": 56
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request
