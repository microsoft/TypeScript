currentDirectory:: /home/src/vscode/projects/bin useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/b/file1.ts]
let t1 = "div";
let t2 = "div";
let t3 = { "div": 123 };
let t4 = t3["div"];


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/a/b/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/b/file1.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/ts/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/home/src/projects/project/a/b/file1.ts SVC-1-0 "let t1 = \"div\";\nlet t2 = \"div\";\nlet t3 = { \"div\": 123 };\nlet t4 = t3[\"div\"];"


	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a/b/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/b/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/b/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/ts/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/b/file1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "documentHighlights",
      "arguments": {
        "file": "/home/src/projects/project/a/b/file1.ts",
        "line": 1,
        "offset": 11,
        "filesToSearch": [
          "/home/src/projects/project/a/b/file1.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/home/src/projects/project/a/b/file1.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 1,
                "offset": 11
              },
              "end": {
                "line": 1,
                "offset": 14
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 2,
                "offset": 11
              },
              "end": {
                "line": 2,
                "offset": 14
              },
              "kind": "reference"
            },
            {
              "start": {
                "line": 3,
                "offset": 13
              },
              "end": {
                "line": 3,
                "offset": 16
              },
              "contextStart": {
                "line": 3,
                "offset": 12
              },
              "contextEnd": {
                "line": 3,
                "offset": 22
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 4,
                "offset": 14
              },
              "end": {
                "line": 4,
                "offset": 17
              },
              "kind": "reference"
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
      "command": "documentHighlights",
      "arguments": {
        "file": "/home/src/projects/project/a/b/file1.ts",
        "line": 3,
        "offset": 13,
        "filesToSearch": [
          "/home/src/projects/project/a/b/file1.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/home/src/projects/project/a/b/file1.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 3,
                "offset": 13
              },
              "end": {
                "line": 3,
                "offset": 16
              },
              "contextStart": {
                "line": 3,
                "offset": 12
              },
              "contextEnd": {
                "line": 3,
                "offset": 22
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 4,
                "offset": 14
              },
              "end": {
                "line": 4,
                "offset": 17
              },
              "kind": "reference"
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
      "command": "documentHighlights",
      "arguments": {
        "file": "/home/src/projects/project/a/b/file1.ts",
        "line": 4,
        "offset": 14,
        "filesToSearch": [
          "/home/src/projects/project/a/b/file1.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/home/src/projects/project/a/b/file1.ts",
          "highlightSpans": [
            {
              "start": {
                "line": 3,
                "offset": 13
              },
              "end": {
                "line": 3,
                "offset": 16
              },
              "contextStart": {
                "line": 3,
                "offset": 12
              },
              "contextEnd": {
                "line": 3,
                "offset": 22
              },
              "kind": "writtenReference"
            },
            {
              "start": {
                "line": 4,
                "offset": 14
              },
              "end": {
                "line": 4,
                "offset": 17
              },
              "kind": "reference"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
