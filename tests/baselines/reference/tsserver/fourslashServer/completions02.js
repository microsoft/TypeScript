currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/completions02.ts]
class Foo {
}
module Foo {
    export var x: number;
}
Foo.


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/completions02.ts :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/completions02.ts SVC-1-0 "class Foo {\n}\nmodule Foo {\n    export var x: number;\n}\nFoo."


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	completions02.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/completions02.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules: *new*
  {}
/tests/cases/fourslash/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/node_modules: *new*
  {}
/tests/cases/fourslash/server/node_modules/@types: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 5
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionInfo",
      "request_seq": 2,
      "success": true,
      "body": {
        "flags": 0,
        "isGlobalCompletion": false,
        "isMemberCompletion": true,
        "isNewIdentifierLocation": false,
        "entries": [
          {
            "name": "apply",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "arguments",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "bind",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "call",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "caller",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "length",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "prototype",
            "kind": "property",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "toString",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "x",
            "kind": "var",
            "kindModifiers": "export",
            "sortText": "11"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 5,
        "entryNames": [
          {
            "name": "arguments"
          }
        ]
      },
      "command": "completionEntryDetails-full"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionEntryDetails-full",
      "request_seq": 3,
      "success": true,
      "body": [
        {
          "name": "arguments",
          "kindModifiers": "declare",
          "kind": "property",
          "displayParts": [
            {
              "text": "(",
              "kind": "punctuation"
            },
            {
              "text": "property",
              "kind": "text"
            },
            {
              "text": ")",
              "kind": "punctuation"
            },
            {
              "text": " ",
              "kind": "space"
            },
            {
              "text": "Function",
              "kind": "localName"
            },
            {
              "text": ".",
              "kind": "punctuation"
            },
            {
              "text": "arguments",
              "kind": "propertyName"
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
              "text": "any",
              "kind": "keyword"
            }
          ],
          "documentation": [],
          "tags": []
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 5,
        "entryNames": [
          {
            "name": "x"
          }
        ]
      },
      "command": "completionEntryDetails-full"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionEntryDetails-full",
      "request_seq": 4,
      "success": true,
      "body": [
        {
          "name": "x",
          "kindModifiers": "export",
          "kind": "var",
          "displayParts": [
            {
              "text": "var",
              "kind": "keyword"
            },
            {
              "text": " ",
              "kind": "space"
            },
            {
              "text": "Foo",
              "kind": "className"
            },
            {
              "text": ".",
              "kind": "punctuation"
            },
            {
              "text": "x",
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
              "text": "number",
              "kind": "keyword"
            }
          ],
          "documentation": [],
          "tags": []
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 5,
        "endLine": 6,
        "endOffset": 5,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 5,
        "endLine": 6,
        "endOffset": 5,
        "insertString": "a"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 6,
        "key": "a"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 7,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 5,
        "endLine": 6,
        "endOffset": 6,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 9,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 5
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/completions02.ts SVC-1-3 "class Foo {\n}\nmodule Foo {\n    export var x: number;\n}\nFoo."

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionInfo",
      "request_seq": 10,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": {
        "flags": 0,
        "isGlobalCompletion": false,
        "isMemberCompletion": true,
        "isNewIdentifierLocation": false,
        "entries": [
          {
            "name": "apply",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "arguments",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "bind",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "call",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "caller",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "length",
            "kind": "property",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "prototype",
            "kind": "property",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "toString",
            "kind": "method",
            "kindModifiers": "declare",
            "sortText": "11"
          },
          {
            "name": "x",
            "kind": "var",
            "kindModifiers": "export",
            "sortText": "11"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 5,
        "entryNames": [
          {
            "name": "arguments"
          }
        ]
      },
      "command": "completionEntryDetails-full"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionEntryDetails-full",
      "request_seq": 11,
      "success": true,
      "body": [
        {
          "name": "arguments",
          "kindModifiers": "declare",
          "kind": "property",
          "displayParts": [
            {
              "text": "(",
              "kind": "punctuation"
            },
            {
              "text": "property",
              "kind": "text"
            },
            {
              "text": ")",
              "kind": "punctuation"
            },
            {
              "text": " ",
              "kind": "space"
            },
            {
              "text": "Function",
              "kind": "localName"
            },
            {
              "text": ".",
              "kind": "punctuation"
            },
            {
              "text": "arguments",
              "kind": "propertyName"
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
              "text": "any",
              "kind": "keyword"
            }
          ],
          "documentation": [],
          "tags": []
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 12,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/completions02.ts",
        "line": 6,
        "offset": 5,
        "entryNames": [
          {
            "name": "x"
          }
        ]
      },
      "command": "completionEntryDetails-full"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionEntryDetails-full",
      "request_seq": 12,
      "success": true,
      "body": [
        {
          "name": "x",
          "kindModifiers": "export",
          "kind": "var",
          "displayParts": [
            {
              "text": "var",
              "kind": "keyword"
            },
            {
              "text": " ",
              "kind": "space"
            },
            {
              "text": "Foo",
              "kind": "className"
            },
            {
              "text": ".",
              "kind": "punctuation"
            },
            {
              "text": "x",
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
              "text": "number",
              "kind": "keyword"
            }
          ],
          "documentation": [],
          "tags": []
        }
      ]
    }