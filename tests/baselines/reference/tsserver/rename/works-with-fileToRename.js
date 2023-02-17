TI:: Creating typing installer
//// [/a.ts]
export const a = 0;

//// [/b.ts]
import { a } from "./a";


TI:: [00:00:07.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:08.000] Processing cache location '/a/data/'
TI:: [00:00:09.000] Trying to find '/a/data/package.json'...
TI:: [00:00:10.000] Finished processing cache location '/a/data/'
TI:: [00:00:11.000] Npm config file: /a/data/package.json
TI:: [00:00:12.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:19.000] Updating types-registry npm package...
TI:: [00:00:20.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:27.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:28.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:29.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:30.000] Search path: /
Info 3    [00:00:31.000] For info: /b.ts :: No config files found.
Info 4    [00:00:32.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:35.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:37.000] 	Files (2)
	/a.ts
	/b.ts


	a.ts
	  Imported via "./a" from file 'b.ts'
	b.ts
	  Root file specified for compilation

Info 10   [00:00:38.000] -----------------------------------------------
Info 11   [00:00:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:40.000] 	Files (2)

Info 11   [00:00:41.000] -----------------------------------------------
Info 11   [00:00:42.000] Open files: 
Info 11   [00:00:43.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 11   [00:00:44.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a.ts: *new*
  {}

Info 11   [00:00:45.000] response:
    {
      "responseRequired": false
    }
Info 12   [00:00:46.000] request:
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

After request

Info 13   [00:00:47.000] response:
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
Info 14   [00:00:48.000] request:
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

Info 15   [00:00:49.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":3,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

Info 16   [00:00:50.000] response:
    {
      "responseRequired": false
    }
Info 17   [00:00:51.000] request:
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

After request

Info 18   [00:00:52.000] response:
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
Info 19   [00:00:53.000] request:
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

Info 20   [00:00:54.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":5,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

Info 21   [00:00:55.000] response:
    {
      "responseRequired": false
    }
Info 22   [00:00:56.000] request:
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

Info 23   [00:00:57.000] Host configuration update for file /b.ts
Info 24   [00:00:58.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":6,"success":true,"performanceData":{"updateGraphDurationMs":*}}
After request

Info 25   [00:00:59.000] response:
    {
      "responseRequired": false
    }
Info 26   [00:01:00.000] request:
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

After request

Info 27   [00:01:01.000] response:
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