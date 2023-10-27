currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
{ let x = 1; } var foo = "foo"; var bar = "bar"; var fooBar = "fooBar";

//// [/a/tsconfig.json]
{
  "compilerOptions": {}
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/app.ts :: Config file name: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/app.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/app.ts SVC-1-0 "{ let x = 1; } var foo = \"foo\"; var bar = \"bar\"; var fooBar = \"fooBar\";"


	app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json
TestServerCancellationToken:: resetRequest:: 1 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "navbar",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 2 is as expected
Info seq  [hh:mm:ss:mss] response:
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

Info seq  [hh:mm:ss:mss] request:
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

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "outliningSpans",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 4,
      "type": "request"
    }
TestServerCancellationToken:: resetRequest:: 4 is as expected
Info seq  [hh:mm:ss:mss] response:
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

Info seq  [hh:mm:ss:mss] request:
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