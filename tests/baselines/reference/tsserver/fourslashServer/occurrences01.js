Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
//// [/home/src/tslibs/TS/Lib/lib.d.ts]
lib.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/occurrences01.ts]
foo: switch (10) {
    case 1:
    case 2:
    case 3:
        break;
        break foo;
        continue;
        continue foo;
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/occurrences01.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/occurrences01.ts SVC-1-0 "foo: switch (10) {\n    case 1:\n    case 2:\n    case 3:\n        break;\n        break foo;\n        continue;\n        continue foo;\n}"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	occurrences01.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/occurrences01.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 0,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
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

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tests/cases/fourslash/server/occurrences01.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/occurrences01.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts",
        "line": 1,
        "offset": 6,
        "filesToSearch": [
          "/tests/cases/fourslash/server/occurrences01.ts"
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
          "file": "/tests/cases/fourslash/server/occurrences01.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 6
              },
              "end": {
                "line": 1,
                "offset": 12
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 3,
                "offset": 5
              },
              "end": {
                "line": 3,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 4,
                "offset": 5
              },
              "end": {
                "line": 4,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 5,
                "offset": 9
              },
              "end": {
                "line": 5,
                "offset": 14
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 6,
                "offset": 9
              },
              "end": {
                "line": 6,
                "offset": 14
              },
              "kind": "none"
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
        "file": "/tests/cases/fourslash/server/occurrences01.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/occurrences01.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts",
        "line": 2,
        "offset": 5,
        "filesToSearch": [
          "/tests/cases/fourslash/server/occurrences01.ts"
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
          "file": "/tests/cases/fourslash/server/occurrences01.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 6
              },
              "end": {
                "line": 1,
                "offset": 12
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 3,
                "offset": 5
              },
              "end": {
                "line": 3,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 4,
                "offset": 5
              },
              "end": {
                "line": 4,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 5,
                "offset": 9
              },
              "end": {
                "line": 5,
                "offset": 14
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 6,
                "offset": 9
              },
              "end": {
                "line": 6,
                "offset": 14
              },
              "kind": "none"
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
        "file": "/tests/cases/fourslash/server/occurrences01.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/occurrences01.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 5,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts",
        "line": 3,
        "offset": 5,
        "filesToSearch": [
          "/tests/cases/fourslash/server/occurrences01.ts"
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
          "file": "/tests/cases/fourslash/server/occurrences01.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 6
              },
              "end": {
                "line": 1,
                "offset": 12
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 3,
                "offset": 5
              },
              "end": {
                "line": 3,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 4,
                "offset": 5
              },
              "end": {
                "line": 4,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 5,
                "offset": 9
              },
              "end": {
                "line": 5,
                "offset": 14
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 6,
                "offset": 9
              },
              "end": {
                "line": 6,
                "offset": 14
              },
              "kind": "none"
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
        "file": "/tests/cases/fourslash/server/occurrences01.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/occurrences01.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 7,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts",
        "line": 4,
        "offset": 5,
        "filesToSearch": [
          "/tests/cases/fourslash/server/occurrences01.ts"
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
          "file": "/tests/cases/fourslash/server/occurrences01.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 6
              },
              "end": {
                "line": 1,
                "offset": 12
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 3,
                "offset": 5
              },
              "end": {
                "line": 3,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 4,
                "offset": 5
              },
              "end": {
                "line": 4,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 5,
                "offset": 9
              },
              "end": {
                "line": 5,
                "offset": 14
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 6,
                "offset": 9
              },
              "end": {
                "line": 6,
                "offset": 14
              },
              "kind": "none"
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/occurrences01.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 9,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts",
        "line": 5,
        "offset": 9,
        "filesToSearch": [
          "/tests/cases/fourslash/server/occurrences01.ts"
        ]
      },
      "command": "documentHighlights"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "documentHighlights",
      "request_seq": 10,
      "success": true,
      "body": [
        {
          "file": "/tests/cases/fourslash/server/occurrences01.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 6
              },
              "end": {
                "line": 1,
                "offset": 12
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 3,
                "offset": 5
              },
              "end": {
                "line": 3,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 4,
                "offset": 5
              },
              "end": {
                "line": 4,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 5,
                "offset": 9
              },
              "end": {
                "line": 5,
                "offset": 14
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 6,
                "offset": 9
              },
              "end": {
                "line": 6,
                "offset": 14
              },
              "kind": "none"
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/occurrences01.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 11,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 12,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/occurrences01.ts",
        "line": 6,
        "offset": 9,
        "filesToSearch": [
          "/tests/cases/fourslash/server/occurrences01.ts"
        ]
      },
      "command": "documentHighlights"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "documentHighlights",
      "request_seq": 12,
      "success": true,
      "body": [
        {
          "file": "/tests/cases/fourslash/server/occurrences01.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 6
              },
              "end": {
                "line": 1,
                "offset": 12
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 3,
                "offset": 5
              },
              "end": {
                "line": 3,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 4,
                "offset": 5
              },
              "end": {
                "line": 4,
                "offset": 9
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 5,
                "offset": 9
              },
              "end": {
                "line": 5,
                "offset": 14
              },
              "kind": "none"
            },
            {
              "start": {
                "line": 6,
                "offset": 9
              },
              "end": {
                "line": 6,
                "offset": 14
              },
              "kind": "none"
            }
          ]
        }
      ]
    }