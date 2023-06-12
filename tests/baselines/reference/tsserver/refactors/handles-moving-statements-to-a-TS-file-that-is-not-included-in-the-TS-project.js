currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/Foo/a.ts]


//// [/Foo/tsconfig.json]
{ "files": ["./a.ts"] }

//// [/Bar/a.ts]
const a = 1;
const b = 2;
console.log(a, b);

//// [/Bar/tsconfig.json]
{ "files": ["./a.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/Bar/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /Bar
Info seq  [hh:mm:ss:mss] For info: /Bar/a.ts :: Config file name: /Bar/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /Bar/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Bar/tsconfig.json 2000 undefined Project: /Bar/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /Bar/tsconfig.json : {
 "rootNames": [
  "/Bar/a.ts"
 ],
 "options": {
  "configFilePath": "/Bar/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Bar/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /Bar/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Bar/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Bar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/Bar/a.ts SVC-1-0 "const a = 1;\nconst b = 2;\nconsole.log(a, b);"


	a.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/Bar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Bar/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Bar/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/bar/tsconfig.json: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getEditsForRefactor",
      "arguments": {
        "file": "/Bar/a.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 13,
        "refactor": "Move to file",
        "action": "Move to file",
        "interactiveRefactorArguments": {
          "targetFile": "/Foo/a.ts"
        }
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "edits": [],
        "notApplicableReason": "Cannot move statements to the selected file"
      },
      "responseRequired": true
    }
After request
