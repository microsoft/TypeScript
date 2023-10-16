currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/jsDocTypedef_form1.js]

/** @typedef {(string | number)} */
var NumberLike;

NumberLike = 10;

/** @type {NumberLike} */
var numberLike;


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsDocTypedef_form1.js"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/jsDocTypedef_form1.js :: No config files found.
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
	/tests/cases/fourslash/server/jsDocTypedef_form1.js SVC-1-0 "\n/** @typedef {(string | number)} */\nvar NumberLike;\n\nNumberLike = 10;\n\n/** @type {NumberLike} */\nvar numberLike;"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	jsDocTypedef_form1.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/jsDocTypedef_form1.js ProjectRootPath: undefined
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
        "preferences": {
          "providePrefixAndSuffixTextForRename": true,
          "quotePreference": "double"
        }
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
        "file": "/tests/cases/fourslash/server/jsDocTypedef_form1.js",
        "line": 3,
        "offset": 5,
        "findInStrings": false,
        "findInComments": true
      },
      "command": "rename"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "rename",
      "request_seq": 2,
      "success": true,
      "body": {
        "info": {
          "canRename": true,
          "displayName": "NumberLike",
          "fullDisplayName": "NumberLike",
          "kind": "var",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 3,
              "offset": 5
            },
            "end": {
              "line": 3,
              "offset": 15
            }
          }
        },
        "locs": [
          {
            "file": "/tests/cases/fourslash/server/jsDocTypedef_form1.js",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 5
                },
                "end": {
                  "line": 3,
                  "offset": 15
                },
                "contextStart": {
                  "line": 3,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 3,
                  "offset": 16
                }
              },
              {
                "start": {
                  "line": 5,
                  "offset": 1
                },
                "end": {
                  "line": 5,
                  "offset": 11
                }
              },
              {
                "start": {
                  "line": 7,
                  "offset": 12
                },
                "end": {
                  "line": 7,
                  "offset": 22
                }
              }
            ]
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
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
      "request_seq": 3,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "preferences": {
          "providePrefixAndSuffixTextForRename": true,
          "quotePreference": "double"
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 4,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsDocTypedef_form1.js",
        "line": 5,
        "offset": 1,
        "findInStrings": false,
        "findInComments": true
      },
      "command": "rename"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "rename",
      "request_seq": 5,
      "success": true,
      "body": {
        "info": {
          "canRename": true,
          "displayName": "NumberLike",
          "fullDisplayName": "NumberLike",
          "kind": "var",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 5,
              "offset": 1
            },
            "end": {
              "line": 5,
              "offset": 11
            }
          }
        },
        "locs": [
          {
            "file": "/tests/cases/fourslash/server/jsDocTypedef_form1.js",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 5
                },
                "end": {
                  "line": 3,
                  "offset": 15
                },
                "contextStart": {
                  "line": 3,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 3,
                  "offset": 16
                }
              },
              {
                "start": {
                  "line": 5,
                  "offset": 1
                },
                "end": {
                  "line": 5,
                  "offset": 11
                }
              },
              {
                "start": {
                  "line": 7,
                  "offset": 12
                },
                "end": {
                  "line": 7,
                  "offset": 22
                }
              }
            ]
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
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
      "request_seq": 6,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "preferences": {
          "providePrefixAndSuffixTextForRename": true,
          "quotePreference": "double"
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 7,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsDocTypedef_form1.js",
        "line": 7,
        "offset": 12,
        "findInStrings": false,
        "findInComments": true
      },
      "command": "rename"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "rename",
      "request_seq": 8,
      "success": true,
      "body": {
        "info": {
          "canRename": true,
          "displayName": "NumberLike",
          "fullDisplayName": "NumberLike",
          "kind": "var",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 7,
              "offset": 12
            },
            "end": {
              "line": 7,
              "offset": 22
            }
          }
        },
        "locs": [
          {
            "file": "/tests/cases/fourslash/server/jsDocTypedef_form1.js",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 5
                },
                "end": {
                  "line": 3,
                  "offset": 15
                },
                "contextStart": {
                  "line": 3,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 3,
                  "offset": 16
                }
              },
              {
                "start": {
                  "line": 5,
                  "offset": 1
                },
                "end": {
                  "line": 5,
                  "offset": 11
                }
              },
              {
                "start": {
                  "line": 7,
                  "offset": 12
                },
                "end": {
                  "line": 7,
                  "offset": 22
                }
              }
            ]
          }
        ]
      }
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