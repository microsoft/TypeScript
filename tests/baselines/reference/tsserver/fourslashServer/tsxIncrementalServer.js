currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/tsxIncrementalServer.ts]



Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/tsxIncrementalServer.ts :: No config files found.
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
	/tests/cases/fourslash/server/tsxIncrementalServer.ts SVC-1-0 ""


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	tsxIncrementalServer.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/tsxIncrementalServer.ts ProjectRootPath: undefined
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
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "<"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 2,
        "key": "<"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 3,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 2,
        "endLine": 1,
        "endOffset": 2,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 2,
        "endLine": 1,
        "endOffset": 2,
        "insertString": "d"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 3,
        "key": "d"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 6,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 3,
        "endLine": 1,
        "endOffset": 3,
        "insertString": "i"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 4,
        "key": "i"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 8,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 4,
        "endLine": 1,
        "endOffset": 4,
        "insertString": "v"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 5,
        "key": "v"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 10,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 5,
        "endLine": 1,
        "endOffset": 5,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 12,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 5,
        "endLine": 1,
        "endOffset": 5,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 13,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 6,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 13,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 14,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 6,
        "endLine": 1,
        "endOffset": 6,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 15,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 6,
        "endLine": 1,
        "endOffset": 6,
        "insertString": " "
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 16,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 7,
        "key": " "
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 16,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 17,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 7,
        "endLine": 1,
        "endOffset": 7,
        "insertString": "i"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 18,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 8,
        "key": "i"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 18,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 19,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 8,
        "endLine": 1,
        "endOffset": 8,
        "insertString": "d"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 20,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 9,
        "key": "d"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 20,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 21,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 9,
        "endLine": 1,
        "endOffset": 9,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 22,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 9,
        "endLine": 1,
        "endOffset": 9,
        "insertString": "="
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 23,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 10,
        "key": "="
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 23,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 24,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 10,
        "endLine": 1,
        "endOffset": 10,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 25,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 10,
        "endLine": 1,
        "endOffset": 10,
        "insertString": "\""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 26,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 11,
        "key": "\""
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 26,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 27,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 11,
        "endLine": 1,
        "endOffset": 11,
        "insertString": "f"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 28,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 12,
        "key": "f"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 28,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 29,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 12,
        "endLine": 1,
        "endOffset": 12,
        "insertString": "o"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 30,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 13,
        "key": "o"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 30,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 31,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 13,
        "endLine": 1,
        "endOffset": 13,
        "insertString": "o"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 32,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 14,
        "key": "o"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 32,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 33,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 14,
        "endLine": 1,
        "endOffset": 14,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 34,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 14,
        "endLine": 1,
        "endOffset": 14,
        "insertString": "\""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 35,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 15,
        "key": "\""
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 35,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 36,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 15,
        "endLine": 1,
        "endOffset": 15,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 37,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 15,
        "endLine": 1,
        "endOffset": 15,
        "insertString": ">"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 38,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/tsxIncrementalServer.ts",
        "line": 1,
        "offset": 16,
        "key": ">"
      },
      "command": "formatonkey"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "formatonkey",
      "request_seq": 38,
      "success": true,
      "body": []
    }