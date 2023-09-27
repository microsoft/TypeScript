currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
export const foo = 0;

//// [/b.ts]
foo

//// [/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /a.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts",
  "/b.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a.ts SVC-1-0 "export const foo = 0;"
	/b.ts Text-1 "foo"


	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/b.ts: *new*
  {}
/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /b.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatches *deleted*::
/b.ts:
  {}

FsWatchesRecursive::
/:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/b.ts",
        "line": 1,
        "offset": 3,
        "includeExternalModuleExports": true,
        "prefix": "foo"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 1 from cache
Info seq  [hh:mm:ss:mss] collectAutoImports: response is incomplete
Info seq  [hh:mm:ss:mss] collectAutoImports: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "optionalReplacementSpan": {
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 4
          }
        },
        "entries": [
          {
            "name": "foo",
            "kind": "const",
            "kindModifiers": "export",
            "sortText": "16",
            "hasAction": true,
            "source": "/a",
            "data": {
              "exportName": "foo",
              "exportMapKey": "3 * foo ",
              "fileName": "/a.ts"
            }
          }
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionEntryDetails",
      "arguments": {
        "file": "/b.ts",
        "line": 1,
        "offset": 3,
        "entryNames": [
          {
            "name": "foo",
            "source": "/a",
            "data": {
              "exportName": "foo",
              "fileName": "/a.ts",
              "exportMapKey": "3 * foo "
            }
          }
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache hit
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "name": "foo",
          "kindModifiers": "export",
          "kind": "const",
          "displayParts": [
            {
              "text": "const",
              "kind": "keyword"
            },
            {
              "text": " ",
              "kind": "space"
            },
            {
              "text": "foo",
              "kind": "localName"
            },
            {
              "text": ":",
              "kind": "punctuation"
            },
            {
              "text": " ",
              "kind": "space"
            },
            {
              "text": "0",
              "kind": "stringLiteral"
            }
          ],
          "documentation": [],
          "tags": [],
          "codeActions": [
            {
              "description": "Add import from \"./a\"",
              "changes": [
                {
                  "fileName": "/b.ts",
                  "textChanges": [
                    {
                      "start": {
                        "line": 1,
                        "offset": 1
                      },
                      "end": {
                        "line": 1,
                        "offset": 1
                      },
                      "newText": "import { foo } from \"./a\";\n\n"
                    }
                  ]
                }
              ]
            }
          ],
          "source": [
            {
              "text": "./a",
              "kind": "text"
            }
          ],
          "sourceDisplay": [
            {
              "text": "./a",
              "kind": "text"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionEntryDetails-full",
      "arguments": {
        "file": "/b.ts",
        "line": 1,
        "offset": 3,
        "entryNames": [
          {
            "name": "foo",
            "source": "/a",
            "data": {
              "exportName": "foo",
              "fileName": "/a.ts",
              "exportMapKey": "3 * foo "
            }
          }
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache hit
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "name": "foo",
          "kindModifiers": "export",
          "kind": "const",
          "displayParts": [
            {
              "text": "const",
              "kind": "keyword"
            },
            {
              "text": " ",
              "kind": "space"
            },
            {
              "text": "foo",
              "kind": "localName"
            },
            {
              "text": ":",
              "kind": "punctuation"
            },
            {
              "text": " ",
              "kind": "space"
            },
            {
              "text": "0",
              "kind": "stringLiteral"
            }
          ],
          "documentation": [],
          "tags": [],
          "codeActions": [
            {
              "description": "Add import from \"./a\"",
              "changes": [
                {
                  "fileName": "/b.ts",
                  "textChanges": [
                    {
                      "span": {
                        "start": 0,
                        "length": 0
                      },
                      "newText": "import { foo } from \"./a\";\n\n"
                    }
                  ]
                }
              ]
            }
          ],
          "source": [
            {
              "text": "./a",
              "kind": "text"
            }
          ],
          "sourceDisplay": [
            {
              "text": "./a",
              "kind": "text"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
