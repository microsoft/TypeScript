Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a.ts]
export const a = 0;

//// [/b.ts]
import { a } from "./a";


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:09.000] Search path: /
Info 3    [00:00:10.000] For info: /b.ts :: No config files found.
Info 4    [00:00:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:16.000] 	Files (2)
	/a.ts
	/b.ts


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
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

Info 11   [00:00:24.000] response:
    {
      "responseRequired": false
    }
Info 12   [00:00:25.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/b.ts",
        "line": 1,
        "offset": 22
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

Info 13   [00:00:26.000] response:
    {
      "response": {
        "info": {
          "canRename": false,
          "localizedErrorMessage": "You cannot rename this element."
        },
        "locs": []
      },
      "responseRequired": true
    }
Info 14   [00:00:27.000] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "allowRenameOfImportPath": true
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
/a.ts:
  {}

FsWatchesRecursive::

Info 15   [00:00:28.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":3,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

Info 16   [00:00:29.000] response:
    {
      "responseRequired": false
    }
Info 17   [00:00:30.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/b.ts",
        "line": 1,
        "offset": 22
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

Info 18   [00:00:31.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "fileToRename": "/a.ts",
          "displayName": "/a.ts",
          "fullDisplayName": "/a.ts",
          "kind": "module",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 22
            },
            "end": {
              "line": 1,
              "offset": 23
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
                  "offset": 20
                },
                "end": {
                  "line": 1,
                  "offset": 23
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 25
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 19   [00:00:32.000] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "allowRenameOfImportPath": false
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
/a.ts:
  {}

FsWatchesRecursive::

Info 20   [00:00:33.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":5,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

Info 21   [00:00:34.000] response:
    {
      "responseRequired": false
    }
Info 22   [00:00:35.000] request:
    {
      "command": "configure",
      "arguments": {
        "file": "/b.ts",
        "formatOptions": {},
        "preferences": {
          "allowRenameOfImportPath": true
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
/a.ts:
  {}

FsWatchesRecursive::

Info 23   [00:00:36.000] Host configuration update for file /b.ts
Info 24   [00:00:37.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":6,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

Info 25   [00:00:38.000] response:
    {
      "responseRequired": false
    }
Info 26   [00:00:39.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/b.ts",
        "line": 1,
        "offset": 22
      },
      "seq": 7,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

FsWatchesRecursive::

Info 27   [00:00:40.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "fileToRename": "/a.ts",
          "displayName": "/a.ts",
          "fullDisplayName": "/a.ts",
          "kind": "module",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 22
            },
            "end": {
              "line": 1,
              "offset": 23
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
                  "offset": 20
                },
                "end": {
                  "line": 1,
                  "offset": 23
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 25
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }