currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/Foo/a.ts]
const x = 0;

//// [/Foo/b.ts]
import {} from "./bar";
const a = 1;

//// [/Foo/tsconfig.json]
{ "files": ["./a.ts", "./b.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/Foo/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /Foo
Info seq  [hh:mm:ss:mss] For info: /Foo/a.ts :: Config file name: /Foo/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /Foo/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Foo/tsconfig.json 2000 undefined Project: /Foo/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /Foo/tsconfig.json : {
 "rootNames": [
  "/Foo/a.ts",
  "/Foo/b.ts"
 ],
 "options": {
  "configFilePath": "/Foo/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Foo/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Foo/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /Foo/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Foo/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/Foo/a.ts SVC-1-0 "const x = 0;"
	/Foo/b.ts Text-1 "import {} from \"./bar\";\nconst a = 1;"


	a.ts
	  Part of 'files' list in tsconfig.json
	b.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/Foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Foo/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Foo/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/foo/tsconfig.json: *new*
  {}
/foo/b.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getEditsForRefactor",
      "arguments": {
        "file": "/Foo/a.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 2,
        "endOffset": 12,
        "refactor": "Move to file",
        "action": "Move to file",
        "interactiveRefactorArguments": {
          "targetFile": "/Foo/b.ts"
        }
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "edits": [
          {
            "fileName": "/Foo/a.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 1
                },
                "end": {
                  "line": 1,
                  "offset": 13
                },
                "newText": ""
              }
            ]
          },
          {
            "fileName": "/Foo/b.ts",
            "textChanges": [
              {
                "start": {
                  "line": 2,
                  "offset": 13
                },
                "end": {
                  "line": 2,
                  "offset": 13
                },
                "newText": "\nconst x = 0;\n"
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request
