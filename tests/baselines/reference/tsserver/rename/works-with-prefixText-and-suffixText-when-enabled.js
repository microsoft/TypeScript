Info 0    [00:00:05.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:06.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a.ts]
const x = 0; const o = { x };


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:07.000] Search path: /
Info 3    [00:00:08.000] For info: /a.ts :: No config files found.
Info 4    [00:00:09.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:10.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:11.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:13.000] 	Files (1)
	/a.ts


	a.ts
	  Root file specified for compilation

Info 9    [00:00:14.000] -----------------------------------------------
Info 10   [00:00:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:16.000] 	Files (1)

Info 10   [00:00:17.000] -----------------------------------------------
Info 10   [00:00:18.000] Open files: 
Info 10   [00:00:19.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 10   [00:00:20.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 10   [00:00:21.000] response:
    {
      "responseRequired": false
    }
Info 11   [00:00:22.000] request:
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

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 12   [00:00:23.000] response:
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
Info 13   [00:00:24.000] request:
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

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 14   [00:00:25.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":3,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 15   [00:00:26.000] response:
    {
      "responseRequired": false
    }
Info 16   [00:00:27.000] request:
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

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 17   [00:00:28.000] response:
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
Info 18   [00:00:29.000] request:
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

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 19   [00:00:30.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":5,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 20   [00:00:31.000] response:
    {
      "responseRequired": false
    }
Info 21   [00:00:32.000] request:
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

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 22   [00:00:33.000] Host configuration update for file /a.ts
Info 23   [00:00:34.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":6,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 24   [00:00:35.000] response:
    {
      "responseRequired": false
    }
Info 25   [00:00:36.000] request:
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

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 26   [00:00:37.000] response:
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