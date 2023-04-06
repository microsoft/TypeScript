currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let x = 1;


Info 1    [00:00:10.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/proj.csproj",
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          }
        ],
        "options": {}
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:12.000] Starting updateGraphWorker: Project: /a/b/proj.csproj
Info 4    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/proj.csproj WatchType: Missing file
Info 5    [00:00:14.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj.csproj WatchType: Type roots
Info 6    [00:00:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj.csproj WatchType: Type roots
Info 7    [00:00:16.000] Finishing updateGraphWorker: Project: /a/b/proj.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:17.000] Project '/a/b/proj.csproj' (External)
Info 9    [00:00:18.000] 	Files (1)
	/a/b/app.ts Text-1 "let x = 1;"


	app.ts
	  Root file specified for compilation

Info 10   [00:00:19.000] -----------------------------------------------
Info 11   [00:00:20.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}

Before request

Info 12   [00:00:21.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts",
        "fileContent": "let x = 1;\nlet y = 2;"
      },
      "seq": 2,
      "type": "request"
    }
Info 13   [00:00:22.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:23.000] Starting updateGraphWorker: Project: /a/b/proj.csproj
Info 15   [00:00:24.000] Finishing updateGraphWorker: Project: /a/b/proj.csproj Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 16   [00:00:25.000] Project '/a/b/proj.csproj' (External)
Info 17   [00:00:26.000] 	Files (1)
	/a/b/app.ts SVC-2-0 "let x = 1;\nlet y = 2;"

Info 18   [00:00:27.000] -----------------------------------------------
Info 19   [00:00:28.000] Project '/a/b/proj.csproj' (External)
Info 19   [00:00:29.000] 	Files (1)

Info 19   [00:00:30.000] -----------------------------------------------
Info 19   [00:00:31.000] Open files: 
Info 19   [00:00:32.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 19   [00:00:33.000] 		Projects: /a/b/proj.csproj
Info 19   [00:00:34.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/b/app.ts:
  {}

Before request

Info 20   [00:00:35.000] request:
    {
      "command": "navbar",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 21   [00:00:36.000] response:
    {
      "response": [
        {
          "text": "<global>",
          "kind": "script",
          "kindModifiers": "",
          "spans": [
            {
              "start": {
                "line": 1,
                "offset": 1
              },
              "end": {
                "line": 2,
                "offset": 11
              }
            }
          ],
          "childItems": [
            {
              "text": "x",
              "kind": "let",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 5
                  },
                  "end": {
                    "line": 1,
                    "offset": 10
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "y",
              "kind": "let",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 2,
                    "offset": 5
                  },
                  "end": {
                    "line": 2,
                    "offset": 10
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            }
          ],
          "indent": 0
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 22   [00:00:37.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 23   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 24   [00:00:39.000] Project '/a/b/proj.csproj' (External)
Info 24   [00:00:40.000] 	Files (1)

Info 24   [00:00:41.000] -----------------------------------------------
Info 24   [00:00:42.000] Open files: 
Info 24   [00:00:43.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}

Before request

Info 25   [00:00:44.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 26   [00:00:45.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 27   [00:00:46.000] Starting updateGraphWorker: Project: /a/b/proj.csproj
Info 28   [00:00:47.000] Finishing updateGraphWorker: Project: /a/b/proj.csproj Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 29   [00:00:48.000] Project '/a/b/proj.csproj' (External)
Info 30   [00:00:49.000] 	Files (1)
	/a/b/app.ts SVC-3-0 "let x = 1;"

Info 31   [00:00:50.000] -----------------------------------------------
Info 32   [00:00:51.000] Project '/a/b/proj.csproj' (External)
Info 32   [00:00:52.000] 	Files (1)

Info 32   [00:00:53.000] -----------------------------------------------
Info 32   [00:00:54.000] Open files: 
Info 32   [00:00:55.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 32   [00:00:56.000] 		Projects: /a/b/proj.csproj
Info 32   [00:00:57.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/b/app.ts:
  {}

Before request

Info 33   [00:00:58.000] request:
    {
      "command": "navbar",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info 34   [00:00:59.000] response:
    {
      "response": [
        {
          "text": "<global>",
          "kind": "script",
          "kindModifiers": "",
          "spans": [
            {
              "start": {
                "line": 1,
                "offset": 1
              },
              "end": {
                "line": 1,
                "offset": 11
              }
            }
          ],
          "childItems": [
            {
              "text": "x",
              "kind": "let",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 5
                  },
                  "end": {
                    "line": 1,
                    "offset": 10
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            }
          ],
          "indent": 0
        }
      ],
      "responseRequired": true
    }
After request
