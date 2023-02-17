TI:: Creating typing installer
//// [/a.ts]
const x = 0; const o = { x };


TI:: [00:00:05.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:06.000] Processing cache location '/a/data/'
TI:: [00:00:07.000] Trying to find '/a/data/package.json'...
TI:: [00:00:08.000] Finished processing cache location '/a/data/'
TI:: [00:00:09.000] Npm config file: /a/data/package.json
TI:: [00:00:10.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:17.000] Updating types-registry npm package...
TI:: [00:00:18.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:25.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:26.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:28.000] Search path: /
Info 3    [00:00:29.000] For info: /a.ts :: No config files found.
Info 4    [00:00:30.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:32.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:34.000] 	Files (1)
	/a.ts


	a.ts
	  Root file specified for compilation

Info 9    [00:00:35.000] -----------------------------------------------
Info 10   [00:00:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:37.000] 	Files (1)

Info 10   [00:00:38.000] -----------------------------------------------
Info 10   [00:00:39.000] Open files: 
Info 10   [00:00:40.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 10   [00:00:41.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Info 10   [00:00:42.000] response:
    {
      "responseRequired": false
    }
Info 11   [00:00:43.000] request:
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
Before request

After request

Info 12   [00:00:44.000] response:
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
Info 13   [00:00:45.000] request:
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
Before request

Info 14   [00:00:46.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":3,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

Info 15   [00:00:47.000] response:
    {
      "responseRequired": false
    }
Info 16   [00:00:48.000] request:
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
Before request

After request

Info 17   [00:00:49.000] response:
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
Info 18   [00:00:50.000] request:
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
Before request

Info 19   [00:00:51.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":5,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

Info 20   [00:00:52.000] response:
    {
      "responseRequired": false
    }
Info 21   [00:00:53.000] request:
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
Before request

Info 22   [00:00:54.000] Host configuration update for file /a.ts
Info 23   [00:00:55.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":6,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

Info 24   [00:00:56.000] response:
    {
      "responseRequired": false
    }
Info 25   [00:00:57.000] request:
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
Before request

After request

Info 26   [00:00:58.000] response:
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