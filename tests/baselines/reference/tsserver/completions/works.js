Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
export const foo = 0;

//// [/b.ts]
foo

//// [/tsconfig.json]
{}


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /
Info 3    [00:00:12.000] For info: /a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts",
  "/b.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:19.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 11   [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 12   [00:00:21.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:22.000] Project '/tsconfig.json' (Configured)
Info 14   [00:00:23.000] 	Files (2)
	/a.ts SVC-1-0 "export const foo = 0;"
	/b.ts Text-1 "foo"


	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:24.000] -----------------------------------------------
Info 16   [00:00:25.000] Project '/tsconfig.json' (Configured)
Info 16   [00:00:26.000] 	Files (2)

Info 16   [00:00:27.000] -----------------------------------------------
Info 16   [00:00:28.000] Open files: 
Info 16   [00:00:29.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 16   [00:00:30.000] 		Projects: /tsconfig.json
Info 16   [00:00:31.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/b.ts: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

Before request

Info 17   [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 18   [00:00:33.000] FileWatcher:: Close:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:34.000] Search path: /
Info 20   [00:00:35.000] For info: /b.ts :: Config file name: /tsconfig.json
Info 21   [00:00:36.000] Project '/tsconfig.json' (Configured)
Info 21   [00:00:37.000] 	Files (2)

Info 21   [00:00:38.000] -----------------------------------------------
Info 21   [00:00:39.000] Open files: 
Info 21   [00:00:40.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 21   [00:00:41.000] 		Projects: /tsconfig.json
Info 21   [00:00:42.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 21   [00:00:43.000] 		Projects: /tsconfig.json
Info 21   [00:00:44.000] response:
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

Info 22   [00:00:45.000] request:
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
Info 23   [00:00:46.000] getCompletionData: Get current token: *
Info 24   [00:00:47.000] getCompletionData: Is inside comment: *
Info 25   [00:00:48.000] getCompletionData: Get previous token: *
Info 26   [00:00:49.000] getExportInfoMap: cache miss or empty; calculating new results
Info 27   [00:00:50.000] getExportInfoMap: done in * ms
Info 28   [00:00:51.000] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 1 from cache
Info 29   [00:00:52.000] collectAutoImports: response is incomplete
Info 30   [00:00:53.000] collectAutoImports: *
Info 31   [00:00:54.000] getCompletionData: Semantic work: *
Info 32   [00:00:55.000] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info 33   [00:00:56.000] response:
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
              "exportMapKey": "foo|*|",
              "fileName": "/a.ts"
            }
          }
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info 34   [00:00:57.000] request:
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
              "exportMapKey": "foo|*|"
            }
          }
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info 35   [00:00:58.000] getExportInfoMap: cache hit
Info 36   [00:00:59.000] response:
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

Info 37   [00:01:00.000] request:
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
              "exportMapKey": "foo|*|"
            }
          }
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info 38   [00:01:01.000] getExportInfoMap: cache hit
Info 39   [00:01:02.000] response:
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
