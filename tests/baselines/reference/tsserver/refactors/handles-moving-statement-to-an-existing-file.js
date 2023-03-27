currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/Foo/a.ts]
const x = 0;

//// [/Foo/b.ts]
import {} from "./bar";
const a = 1;

//// [/Foo/tsconfig.json]
{ "files": ["./a.ts", "./b.ts"] }


Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/Foo/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] Search path: /Foo
Info 3    [00:00:14.000] For info: /Foo/a.ts :: Config file name: /Foo/tsconfig.json
Info 4    [00:00:15.000] Creating configuration project /Foo/tsconfig.json
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /Foo/tsconfig.json 2000 undefined Project: /Foo/tsconfig.json WatchType: Config file
Info 6    [00:00:17.000] Config: /Foo/tsconfig.json : {
 "rootNames": [
  "/Foo/a.ts",
  "/Foo/b.ts"
 ],
 "options": {
  "configFilePath": "/Foo/tsconfig.json"
 }
}
Info 7    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /Foo/b.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:19.000] Starting updateGraphWorker: Project: /Foo/tsconfig.json
Info 9    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /Foo/bar 1 undefined Project: /Foo/tsconfig.json WatchType: Failed Lookup Locations
Info 10   [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Foo/bar 1 undefined Project: /Foo/tsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /Foo 0 undefined Project: /Foo/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Foo 0 undefined Project: /Foo/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /Foo/tsconfig.json WatchType: Missing file
Info 14   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /Foo/node_modules/@types 1 undefined Project: /Foo/tsconfig.json WatchType: Type roots
Info 15   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Foo/node_modules/@types 1 undefined Project: /Foo/tsconfig.json WatchType: Type roots
Info 16   [00:00:27.000] Finishing updateGraphWorker: Project: /Foo/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:28.000] Project '/Foo/tsconfig.json' (Configured)
Info 18   [00:00:29.000] 	Files (2)
	/Foo/a.ts SVC-1-0 "const x = 0;"
	/Foo/b.ts Text-1 "import {} from \"./bar\";\nconst a = 1;"


	a.ts
	  Part of 'files' list in tsconfig.json
	b.ts
	  Part of 'files' list in tsconfig.json

Info 19   [00:00:30.000] -----------------------------------------------
Info 20   [00:00:31.000] Project '/Foo/tsconfig.json' (Configured)
Info 20   [00:00:32.000] 	Files (2)

Info 20   [00:00:33.000] -----------------------------------------------
Info 20   [00:00:34.000] Open files: 
Info 20   [00:00:35.000] 	FileName: /Foo/a.ts ProjectRootPath: undefined
Info 20   [00:00:36.000] 		Projects: /Foo/tsconfig.json
Info 20   [00:00:37.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/foo/bar: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/foo/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/foo/tsconfig.json: *new*
  {}
/foo/b.ts: *new*
  {}
/foo: *new*
  {}

Before request

Info 21   [00:00:38.000] request:
    {
      "command": "getEditsForMoveToFileRefactor",
      "arguments": {
        "file": "/Foo/a.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 2,
        "endOffset": 12,
        "refactor": "Move to file",
        "action": "Move to file",
        "filepath": "/Foo/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 22   [00:00:39.000] response:
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
          }
        ]
      },
      "responseRequired": true
    }
After request
