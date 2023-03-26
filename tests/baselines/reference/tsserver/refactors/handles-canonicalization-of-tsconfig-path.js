currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/Foo/a.ts]
const x = 0;

//// [/Foo/tsconfig.json]
{ "files": ["./a.ts"] }


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/Foo/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /Foo
Info 3    [00:00:12.000] For info: /Foo/a.ts :: Config file name: /Foo/tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /Foo/tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /Foo/tsconfig.json 2000 undefined Project: /Foo/tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /Foo/tsconfig.json : {
 "rootNames": [
  "/Foo/a.ts"
 ],
 "options": {
  "configFilePath": "/Foo/tsconfig.json"
 }
}
Info 7    [00:00:16.000] Starting updateGraphWorker: Project: /Foo/tsconfig.json
Info 8    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /Foo/tsconfig.json WatchType: Missing file
Info 9    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /Foo/node_modules/@types 1 undefined Project: /Foo/tsconfig.json WatchType: Type roots
Info 10   [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Foo/node_modules/@types 1 undefined Project: /Foo/tsconfig.json WatchType: Type roots
Info 11   [00:00:20.000] Finishing updateGraphWorker: Project: /Foo/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:21.000] Project '/Foo/tsconfig.json' (Configured)
Info 13   [00:00:22.000] 	Files (1)
	/Foo/a.ts SVC-1-0 "const x = 0;"


	a.ts
	  Part of 'files' list in tsconfig.json

Info 14   [00:00:23.000] -----------------------------------------------
Info 15   [00:00:24.000] Project '/Foo/tsconfig.json' (Configured)
Info 15   [00:00:25.000] 	Files (1)

Info 15   [00:00:26.000] -----------------------------------------------
Info 15   [00:00:27.000] Open files: 
Info 15   [00:00:28.000] 	FileName: /Foo/a.ts ProjectRootPath: undefined
Info 15   [00:00:29.000] 		Projects: /Foo/tsconfig.json
Info 15   [00:00:30.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/foo/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/foo/tsconfig.json: *new*
  {}

Before request

Info 16   [00:00:31.000] request:
    {
      "command": "getEditsForRefactor",
      "arguments": {
        "file": "/Foo/a.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 2,
        "endOffset": 12,
        "refactor": "Move to a new file",
        "action": "Move to a new file"
      },
      "seq": 2,
      "type": "request"
    }
Info 17   [00:00:32.000] response:
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
            "fileName": "/Foo/tsconfig.json",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 21
                },
                "end": {
                  "line": 1,
                  "offset": 21
                },
                "newText": ", \"./x.ts\""
              }
            ]
          },
          {
            "fileName": "/Foo/x.ts",
            "textChanges": [
              {
                "start": {
                  "line": 0,
                  "offset": 0
                },
                "end": {
                  "line": 0,
                  "offset": 0
                },
                "newText": "const x = 0;\n"
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request
