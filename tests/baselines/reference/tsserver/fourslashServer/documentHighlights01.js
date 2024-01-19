currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/a.ts]
function f(x: typeof f) {
    f(f);
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/a.ts :: No config files found.
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
	/tests/cases/fourslash/server/a.ts SVC-1-0 "function f(x: typeof f) {\n    f(f);\n}"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	a.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
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
        "file": "/tests/cases/fourslash/server/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts",
        "line": 1,
        "offset": 10,
        "filesToSearch": [
          "/tests/cases/fourslash/server/a.ts"
        ]
      },
      "command": "documentHighlights"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "documentHighlights",
      "request_seq": 2,
      "success": true,
      "body": [
        {
          "file": "/tests/cases/fourslash/server/a.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 10
              },
              "end": {
                "line": 1,
                "offset": 11
              },
              "contextStart": {
                "line": 1,
                "offset": 1
              },
              "contextEnd": {
                "line": 3,
                "offset": 2
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 1,
                "offset": 22
              },
              "end": {
                "line": 1,
                "offset": 23
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 6
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 7
              },
              "end": {
                "line": 2,
                "offset": 8
              },
              "kind": "reference"
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts",
        "line": 1,
        "offset": 22,
        "filesToSearch": [
          "/tests/cases/fourslash/server/a.ts"
        ]
      },
      "command": "documentHighlights"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "documentHighlights",
      "request_seq": 4,
      "success": true,
      "body": [
        {
          "file": "/tests/cases/fourslash/server/a.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 10
              },
              "end": {
                "line": 1,
                "offset": 11
              },
              "contextStart": {
                "line": 1,
                "offset": 1
              },
              "contextEnd": {
                "line": 3,
                "offset": 2
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 1,
                "offset": 22
              },
              "end": {
                "line": 1,
                "offset": 23
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 6
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 7
              },
              "end": {
                "line": 2,
                "offset": 8
              },
              "kind": "reference"
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts",
        "line": 2,
        "offset": 5,
        "filesToSearch": [
          "/tests/cases/fourslash/server/a.ts"
        ]
      },
      "command": "documentHighlights"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "documentHighlights",
      "request_seq": 6,
      "success": true,
      "body": [
        {
          "file": "/tests/cases/fourslash/server/a.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 10
              },
              "end": {
                "line": 1,
                "offset": 11
              },
              "contextStart": {
                "line": 1,
                "offset": 1
              },
              "contextEnd": {
                "line": 3,
                "offset": 2
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 1,
                "offset": 22
              },
              "end": {
                "line": 1,
                "offset": 23
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 6
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 7
              },
              "end": {
                "line": 2,
                "offset": 8
              },
              "kind": "reference"
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts",
        "line": 2,
        "offset": 7,
        "filesToSearch": [
          "/tests/cases/fourslash/server/a.ts"
        ]
      },
      "command": "documentHighlights"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "documentHighlights",
      "request_seq": 8,
      "success": true,
      "body": [
        {
          "file": "/tests/cases/fourslash/server/a.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 10
              },
              "end": {
                "line": 1,
                "offset": 11
              },
              "contextStart": {
                "line": 1,
                "offset": 1
              },
              "contextEnd": {
                "line": 3,
                "offset": 2
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 1,
                "offset": 22
              },
              "end": {
                "line": 1,
                "offset": 23
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 6
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 7
              },
              "end": {
                "line": 2,
                "offset": 8
              },
              "kind": "reference"
            }
          ]
        }
      ]
    }