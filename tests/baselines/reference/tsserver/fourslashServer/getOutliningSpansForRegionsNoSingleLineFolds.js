currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/getOutliningSpansForRegionsNoSingleLineFolds.ts]
//#region
function foo() {

}
//these
//should
//#endregion not you
// be
// together

//#region bla bla bla

function bar() { }

//#endregion


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/getOutliningSpansForRegionsNoSingleLineFolds.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/getOutliningSpansForRegionsNoSingleLineFolds.ts :: No config files found.
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
	/tests/cases/fourslash/server/getOutliningSpansForRegionsNoSingleLineFolds.ts SVC-1-0 "//#region\nfunction foo() {\n\n}\n//these\n//should\n//#endregion not you\n// be\n// together\n\n//#region bla bla bla\n\nfunction bar() { }\n\n//#endregion"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	getOutliningSpansForRegionsNoSingleLineFolds.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/getOutliningSpansForRegionsNoSingleLineFolds.ts ProjectRootPath: undefined
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
        "file": "/tests/cases/fourslash/server/getOutliningSpansForRegionsNoSingleLineFolds.ts"
      },
      "command": "getOutliningSpans"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getOutliningSpans",
      "request_seq": 1,
      "success": true,
      "body": [
        {
          "textSpan": {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 7,
              "offset": 21
            }
          },
          "hintSpan": {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 7,
              "offset": 21
            }
          },
          "bannerText": "#region",
          "autoCollapse": false,
          "kind": "region"
        },
        {
          "textSpan": {
            "start": {
              "line": 2,
              "offset": 15
            },
            "end": {
              "line": 4,
              "offset": 2
            }
          },
          "hintSpan": {
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 4,
              "offset": 2
            }
          },
          "bannerText": "...",
          "autoCollapse": true,
          "kind": "code"
        },
        {
          "textSpan": {
            "start": {
              "line": 5,
              "offset": 1
            },
            "end": {
              "line": 6,
              "offset": 9
            }
          },
          "hintSpan": {
            "start": {
              "line": 5,
              "offset": 1
            },
            "end": {
              "line": 6,
              "offset": 9
            }
          },
          "bannerText": "...",
          "autoCollapse": false,
          "kind": "comment"
        },
        {
          "textSpan": {
            "start": {
              "line": 8,
              "offset": 1
            },
            "end": {
              "line": 9,
              "offset": 12
            }
          },
          "hintSpan": {
            "start": {
              "line": 8,
              "offset": 1
            },
            "end": {
              "line": 9,
              "offset": 12
            }
          },
          "bannerText": "...",
          "autoCollapse": false,
          "kind": "comment"
        },
        {
          "textSpan": {
            "start": {
              "line": 11,
              "offset": 1
            },
            "end": {
              "line": 15,
              "offset": 13
            }
          },
          "hintSpan": {
            "start": {
              "line": 11,
              "offset": 1
            },
            "end": {
              "line": 15,
              "offset": 13
            }
          },
          "bannerText": "bla bla bla",
          "autoCollapse": false,
          "kind": "region"
        },
        {
          "textSpan": {
            "start": {
              "line": 13,
              "offset": 15
            },
            "end": {
              "line": 13,
              "offset": 19
            }
          },
          "hintSpan": {
            "start": {
              "line": 13,
              "offset": 1
            },
            "end": {
              "line": 13,
              "offset": 19
            }
          },
          "bannerText": "...",
          "autoCollapse": true,
          "kind": "code"
        }
      ]
    }