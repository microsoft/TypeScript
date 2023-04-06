currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
{ let x = 1; } var foo = "foo"; var bar = "bar"; var fooBar = "fooBar";

//// [/a/tsconfig.json]
{"compilerOptions":{}}


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /a
Info 3    [00:00:12.000] For info: /a/app.ts :: Config file name: /a/tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /a/tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/app.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 7    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:18.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 10   [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 11   [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 12   [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [00:00:22.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:23.000] Project '/a/tsconfig.json' (Configured)
Info 15   [00:00:24.000] 	Files (1)
	/a/app.ts SVC-1-0 "{ let x = 1; } var foo = \"foo\"; var bar = \"bar\"; var fooBar = \"fooBar\";"


	app.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:25.000] -----------------------------------------------
Info 17   [00:00:26.000] Project '/a/tsconfig.json' (Configured)
Info 17   [00:00:27.000] 	Files (1)

Info 17   [00:00:28.000] -----------------------------------------------
Info 17   [00:00:29.000] Open files: 
Info 17   [00:00:30.000] 	FileName: /a/app.ts ProjectRootPath: undefined
Info 17   [00:00:31.000] 		Projects: /a/tsconfig.json
TestServerCancellationToken:: resetRequest:: 1 is as expected
Info 17   [00:00:32.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Before request

Info 18   [00:00:33.000] request:
    {
      "command": "navbar",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 2 is as expected
Info 19   [00:00:34.000] response:
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
                "offset": 72
              }
            }
          ],
          "childItems": [
            {
              "text": "bar",
              "kind": "var",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 37
                  },
                  "end": {
                    "line": 1,
                    "offset": 48
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "foo",
              "kind": "var",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 20
                  },
                  "end": {
                    "line": 1,
                    "offset": 31
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "fooBar",
              "kind": "var",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 54
                  },
                  "end": {
                    "line": 1,
                    "offset": 71
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "x",
              "kind": "let",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 7
                  },
                  "end": {
                    "line": 1,
                    "offset": 12
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

TestServerCancellationToken:: Setting request to cancel:: 3
Before request

Info 20   [00:00:35.000] request:
    {
      "command": "navbar",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 3,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation is requested
TestServerCancellationToken:: resetRequest:: 3 is as expected
Exception is OperationCanceledException: true
Before request

Info 21   [00:00:36.000] request:
    {
      "command": "outliningSpans",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 4,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 4 is as expected
Info 22   [00:00:37.000] response:
    {
      "response": [
        {
          "textSpan": {
            "start": 0,
            "length": 14
          },
          "kind": "code",
          "hintSpan": {
            "start": 0,
            "length": 14
          },
          "bannerText": "...",
          "autoCollapse": false
        }
      ],
      "responseRequired": true
    }
After request

TestServerCancellationToken:: Setting request to cancel:: 5
Before request

Info 23   [00:00:38.000] request:
    {
      "command": "outliningSpans",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 5,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation is requested
TestServerCancellationToken:: resetRequest:: 5 is as expected
Exception is OperationCanceledException: true