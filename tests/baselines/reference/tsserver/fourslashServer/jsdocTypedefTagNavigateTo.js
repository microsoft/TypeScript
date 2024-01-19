currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/jsDocTypedef_form2.js]

/** @typedef {(string | number)} NumberLike */
/** @typedef {(string | number | string[])} */
var NumberLike2;

/** @type {NumberLike} */
var numberLike;


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsDocTypedef_form2.js"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/jsDocTypedef_form2.js :: No config files found.
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
	/tests/cases/fourslash/server/jsDocTypedef_form2.js SVC-1-0 "\n/** @typedef {(string | number)} NumberLike */\n/** @typedef {(string | number | string[])} */\nvar NumberLike2;\n\n/** @type {NumberLike} */\nvar numberLike;"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	jsDocTypedef_form2.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/jsDocTypedef_form2.js ProjectRootPath: undefined
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
        "file": "/tests/cases/fourslash/server/jsDocTypedef_form2.js"
      },
      "command": "navtree"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "navtree",
      "request_seq": 1,
      "success": true,
      "body": {
        "text": "<global>",
        "kind": "script",
        "kindModifiers": "",
        "spans": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 7,
              "offset": 16
            }
          }
        ],
        "childItems": [
          {
            "text": "numberLike",
            "kind": "var",
            "kindModifiers": "",
            "spans": [
              {
                "start": {
                  "line": 7,
                  "offset": 5
                },
                "end": {
                  "line": 7,
                  "offset": 15
                }
              }
            ],
            "nameSpan": {
              "start": {
                "line": 7,
                "offset": 5
              },
              "end": {
                "line": 7,
                "offset": 15
              }
            }
          },
          {
            "text": "NumberLike",
            "kind": "type",
            "kindModifiers": "",
            "spans": [
              {
                "start": {
                  "line": 2,
                  "offset": 5
                },
                "end": {
                  "line": 2,
                  "offset": 44
                }
              }
            ],
            "nameSpan": {
              "start": {
                "line": 2,
                "offset": 34
              },
              "end": {
                "line": 2,
                "offset": 44
              }
            }
          },
          {
            "text": "NumberLike2",
            "kind": "var",
            "kindModifiers": "",
            "spans": [
              {
                "start": {
                  "line": 4,
                  "offset": 5
                },
                "end": {
                  "line": 4,
                  "offset": 16
                }
              }
            ],
            "nameSpan": {
              "start": {
                "line": 4,
                "offset": 5
              },
              "end": {
                "line": 4,
                "offset": 16
              }
            }
          },
          {
            "text": "NumberLike2",
            "kind": "type",
            "kindModifiers": "",
            "spans": [
              {
                "start": {
                  "line": 3,
                  "offset": 5
                },
                "end": {
                  "line": 3,
                  "offset": 44
                }
              }
            ],
            "nameSpan": {
              "start": {
                "line": 4,
                "offset": 5
              },
              "end": {
                "line": 4,
                "offset": 16
              }
            }
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/jsDocTypedef_form2.js"
      },
      "command": "navbar"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "navbar",
      "request_seq": 2,
      "success": true,
      "body": [
        {
          "text": "<global>",
          "kind": "script",
          "kindModifiers": "",
          "spans": [
            {
              "start": {
                "line": 1,
                "offset": 1
              },
              "end": {
                "line": 7,
                "offset": 16
              }
            }
          ],
          "childItems": [
            {
              "text": "numberLike",
              "kind": "var",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 7,
                    "offset": 5
                  },
                  "end": {
                    "line": 7,
                    "offset": 15
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "NumberLike",
              "kind": "type",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 2,
                    "offset": 5
                  },
                  "end": {
                    "line": 2,
                    "offset": 44
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "NumberLike2",
              "kind": "var",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 4,
                    "offset": 5
                  },
                  "end": {
                    "line": 4,
                    "offset": 16
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "NumberLike2",
              "kind": "type",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 3,
                    "offset": 5
                  },
                  "end": {
                    "line": 3,
                    "offset": 44
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            }
          ],
          "indent": 0
        },
        {
          "text": "NumberLike",
          "kind": "type",
          "kindModifiers": "",
          "spans": [
            {
              "start": {
                "line": 2,
                "offset": 5
              },
              "end": {
                "line": 2,
                "offset": 44
              }
            }
          ],
          "childItems": [],
          "indent": 1
        },
        {
          "text": "NumberLike2",
          "kind": "type",
          "kindModifiers": "",
          "spans": [
            {
              "start": {
                "line": 3,
                "offset": 5
              },
              "end": {
                "line": 3,
                "offset": 44
              }
            }
          ],
          "childItems": [],
          "indent": 1
        }
      ]
    }