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

//// [/tests/cases/fourslash/server/getOutliningSpansForRegions.ts]
// region without label
// #region

// #endregion

// region without label with trailing spaces
// #region

// #endregion

// region with label
// #region label1

// #endregion

// region with extra whitespace in all valid locations
             //              #region          label2    label3

        //        #endregion

// No space before directive
//#region label4

//#endregion

// Nested regions
// #region outer

// #region inner

// #endregion inner

// #endregion outer

// region delimiters not valid when there is preceding text on line
 test // #region invalid1

test // #endregion

// region delimiters not valid when in multiline comment
/*
// #region invalid2
*/

/*
// #endregion
*/


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/getOutliningSpansForRegions.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/getOutliningSpansForRegions.ts ProjectRootPath: undefined:: Result: undefined
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
	/tests/cases/fourslash/server/getOutliningSpansForRegions.ts SVC-1-0 "// region without label\n// #region\n\n// #endregion\n\n// region without label with trailing spaces\n// #region\n\n// #endregion\n\n// region with label\n// #region label1\n\n// #endregion\n\n// region with extra whitespace in all valid locations\n             //              #region          label2    label3\n\n        //        #endregion\n\n// No space before directive\n//#region label4\n\n//#endregion\n\n// Nested regions\n// #region outer\n\n// #region inner\n\n// #endregion inner\n\n// #endregion outer\n\n// region delimiters not valid when there is preceding text on line\n test // #region invalid1\n\ntest // #endregion\n\n// region delimiters not valid when in multiline comment\n/*\n// #region invalid2\n*/\n\n/*\n// #endregion\n*/"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	getOutliningSpansForRegions.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/getOutliningSpansForRegions.ts ProjectRootPath: undefined
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
/tests/cases/fourslash/server/getOutliningSpansForRegions.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/getOutliningSpansForRegions.ts"
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
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 4,
              "offset": 14
            }
          },
          "hintSpan": {
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 4,
              "offset": 14
            }
          },
          "bannerText": "#region",
          "autoCollapse": false,
          "kind": "region"
        },
        {
          "textSpan": {
            "start": {
              "line": 7,
              "offset": 1
            },
            "end": {
              "line": 9,
              "offset": 14
            }
          },
          "hintSpan": {
            "start": {
              "line": 7,
              "offset": 1
            },
            "end": {
              "line": 9,
              "offset": 14
            }
          },
          "bannerText": "#region",
          "autoCollapse": false,
          "kind": "region"
        },
        {
          "textSpan": {
            "start": {
              "line": 12,
              "offset": 1
            },
            "end": {
              "line": 14,
              "offset": 14
            }
          },
          "hintSpan": {
            "start": {
              "line": 12,
              "offset": 1
            },
            "end": {
              "line": 14,
              "offset": 14
            }
          },
          "bannerText": "label1",
          "autoCollapse": false,
          "kind": "region"
        },
        {
          "textSpan": {
            "start": {
              "line": 17,
              "offset": 14
            },
            "end": {
              "line": 19,
              "offset": 29
            }
          },
          "hintSpan": {
            "start": {
              "line": 17,
              "offset": 14
            },
            "end": {
              "line": 19,
              "offset": 29
            }
          },
          "bannerText": "label2    label3",
          "autoCollapse": false,
          "kind": "region"
        },
        {
          "textSpan": {
            "start": {
              "line": 22,
              "offset": 1
            },
            "end": {
              "line": 24,
              "offset": 13
            }
          },
          "hintSpan": {
            "start": {
              "line": 22,
              "offset": 1
            },
            "end": {
              "line": 24,
              "offset": 13
            }
          },
          "bannerText": "label4",
          "autoCollapse": false,
          "kind": "region"
        },
        {
          "textSpan": {
            "start": {
              "line": 27,
              "offset": 1
            },
            "end": {
              "line": 33,
              "offset": 20
            }
          },
          "hintSpan": {
            "start": {
              "line": 27,
              "offset": 1
            },
            "end": {
              "line": 33,
              "offset": 20
            }
          },
          "bannerText": "outer",
          "autoCollapse": false,
          "kind": "region"
        },
        {
          "textSpan": {
            "start": {
              "line": 29,
              "offset": 1
            },
            "end": {
              "line": 31,
              "offset": 20
            }
          },
          "hintSpan": {
            "start": {
              "line": 29,
              "offset": 1
            },
            "end": {
              "line": 31,
              "offset": 20
            }
          },
          "bannerText": "inner",
          "autoCollapse": false,
          "kind": "region"
        },
        {
          "textSpan": {
            "start": {
              "line": 41,
              "offset": 1
            },
            "end": {
              "line": 43,
              "offset": 3
            }
          },
          "hintSpan": {
            "start": {
              "line": 41,
              "offset": 1
            },
            "end": {
              "line": 43,
              "offset": 3
            }
          },
          "bannerText": "...",
          "autoCollapse": false,
          "kind": "comment"
        },
        {
          "textSpan": {
            "start": {
              "line": 45,
              "offset": 1
            },
            "end": {
              "line": 47,
              "offset": 3
            }
          },
          "hintSpan": {
            "start": {
              "line": 45,
              "offset": 1
            },
            "end": {
              "line": 47,
              "offset": 3
            }
          },
          "bannerText": "...",
          "autoCollapse": false,
          "kind": "comment"
        }
      ]
    }