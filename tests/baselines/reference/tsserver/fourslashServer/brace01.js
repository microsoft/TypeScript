currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/brace01.ts]
//curly braces
module Foo {
    class Bar {
        private f() {
        }

        private f2() {
            if (true) { } { };
        }
    }
}

//parenthesis
class FooBar {
    private f() {
        return ((1 + 1));
    }

    private f2() {
        if (true) { }
    }
}

//square brackets
class Baz {
    private f() {
        var a: any[] = [[1, 2], [3, 4], 5];
    }
}

// angular brackets
class TemplateTest <T1, T2 extends Array> {
    public foo(a, b) {
        return <any> a;
    }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/brace01.ts :: No config files found.
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
	/tests/cases/fourslash/server/brace01.ts SVC-1-0 "//curly braces\nmodule Foo {\n    class Bar {\n        private f() {\n        }\n\n        private f2() {\n            if (true) { } { };\n        }\n    }\n}\n\n//parenthesis\nclass FooBar {\n    private f() {\n        return ((1 + 1));\n    }\n\n    private f2() {\n        if (true) { }\n    }\n}\n\n//square brackets\nclass Baz {\n    private f() {\n        var a: any[] = [[1, 2], [3, 4], 5];\n    }\n}\n\n// angular brackets\nclass TemplateTest <T1, T2 extends Array> {\n    public foo(a, b) {\n        return <any> a;\n    }\n}"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	brace01.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/brace01.ts ProjectRootPath: undefined
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
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 2,
        "offset": 12
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 1,
      "success": true,
      "body": [
        {
          "start": {
            "line": 2,
            "offset": 12
          },
          "end": {
            "line": 2,
            "offset": 13
          }
        },
        {
          "start": {
            "line": 11,
            "offset": 1
          },
          "end": {
            "line": 11,
            "offset": 2
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 11,
        "offset": 1
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 2,
      "success": true,
      "body": [
        {
          "start": {
            "line": 2,
            "offset": 12
          },
          "end": {
            "line": 2,
            "offset": 13
          }
        },
        {
          "start": {
            "line": 11,
            "offset": 1
          },
          "end": {
            "line": 11,
            "offset": 2
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 3,
        "offset": 15
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 3,
      "success": true,
      "body": [
        {
          "start": {
            "line": 3,
            "offset": 15
          },
          "end": {
            "line": 3,
            "offset": 16
          }
        },
        {
          "start": {
            "line": 10,
            "offset": 5
          },
          "end": {
            "line": 10,
            "offset": 6
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 10,
        "offset": 5
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 4,
      "success": true,
      "body": [
        {
          "start": {
            "line": 3,
            "offset": 15
          },
          "end": {
            "line": 3,
            "offset": 16
          }
        },
        {
          "start": {
            "line": 10,
            "offset": 5
          },
          "end": {
            "line": 10,
            "offset": 6
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 4,
        "offset": 21
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 5,
      "success": true,
      "body": [
        {
          "start": {
            "line": 4,
            "offset": 21
          },
          "end": {
            "line": 4,
            "offset": 22
          }
        },
        {
          "start": {
            "line": 5,
            "offset": 9
          },
          "end": {
            "line": 5,
            "offset": 10
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 5,
        "offset": 9
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 6,
      "success": true,
      "body": [
        {
          "start": {
            "line": 4,
            "offset": 21
          },
          "end": {
            "line": 4,
            "offset": 22
          }
        },
        {
          "start": {
            "line": 5,
            "offset": 9
          },
          "end": {
            "line": 5,
            "offset": 10
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 7,
        "offset": 22
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 7,
      "success": true,
      "body": [
        {
          "start": {
            "line": 7,
            "offset": 22
          },
          "end": {
            "line": 7,
            "offset": 23
          }
        },
        {
          "start": {
            "line": 9,
            "offset": 9
          },
          "end": {
            "line": 9,
            "offset": 10
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 9,
        "offset": 9
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 8,
      "success": true,
      "body": [
        {
          "start": {
            "line": 7,
            "offset": 22
          },
          "end": {
            "line": 7,
            "offset": 23
          }
        },
        {
          "start": {
            "line": 9,
            "offset": 9
          },
          "end": {
            "line": 9,
            "offset": 10
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 8,
        "offset": 23
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 9,
      "success": true,
      "body": [
        {
          "start": {
            "line": 8,
            "offset": 23
          },
          "end": {
            "line": 8,
            "offset": 24
          }
        },
        {
          "start": {
            "line": 8,
            "offset": 25
          },
          "end": {
            "line": 8,
            "offset": 26
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 8,
        "offset": 25
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 10,
      "success": true,
      "body": [
        {
          "start": {
            "line": 8,
            "offset": 23
          },
          "end": {
            "line": 8,
            "offset": 24
          }
        },
        {
          "start": {
            "line": 8,
            "offset": 25
          },
          "end": {
            "line": 8,
            "offset": 26
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 8,
        "offset": 27
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 11,
      "success": true,
      "body": [
        {
          "start": {
            "line": 8,
            "offset": 27
          },
          "end": {
            "line": 8,
            "offset": 28
          }
        },
        {
          "start": {
            "line": 8,
            "offset": 29
          },
          "end": {
            "line": 8,
            "offset": 30
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 12,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 8,
        "offset": 29
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 12,
      "success": true,
      "body": [
        {
          "start": {
            "line": 8,
            "offset": 27
          },
          "end": {
            "line": 8,
            "offset": 28
          }
        },
        {
          "start": {
            "line": 8,
            "offset": 29
          },
          "end": {
            "line": 8,
            "offset": 30
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 13,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 15,
        "offset": 14
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 13,
      "success": true,
      "body": [
        {
          "start": {
            "line": 15,
            "offset": 14
          },
          "end": {
            "line": 15,
            "offset": 15
          }
        },
        {
          "start": {
            "line": 15,
            "offset": 15
          },
          "end": {
            "line": 15,
            "offset": 16
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 14,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 15,
        "offset": 15
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 14,
      "success": true,
      "body": [
        {
          "start": {
            "line": 15,
            "offset": 14
          },
          "end": {
            "line": 15,
            "offset": 15
          }
        },
        {
          "start": {
            "line": 15,
            "offset": 15
          },
          "end": {
            "line": 15,
            "offset": 16
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 15,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 16,
        "offset": 16
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 15,
      "success": true,
      "body": [
        {
          "start": {
            "line": 16,
            "offset": 16
          },
          "end": {
            "line": 16,
            "offset": 17
          }
        },
        {
          "start": {
            "line": 16,
            "offset": 24
          },
          "end": {
            "line": 16,
            "offset": 25
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 16,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 16,
        "offset": 24
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 16,
      "success": true,
      "body": [
        {
          "start": {
            "line": 16,
            "offset": 16
          },
          "end": {
            "line": 16,
            "offset": 17
          }
        },
        {
          "start": {
            "line": 16,
            "offset": 24
          },
          "end": {
            "line": 16,
            "offset": 25
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 17,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 16,
        "offset": 17
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 17,
      "success": true,
      "body": [
        {
          "start": {
            "line": 16,
            "offset": 17
          },
          "end": {
            "line": 16,
            "offset": 18
          }
        },
        {
          "start": {
            "line": 16,
            "offset": 23
          },
          "end": {
            "line": 16,
            "offset": 24
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 18,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 16,
        "offset": 23
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 18,
      "success": true,
      "body": [
        {
          "start": {
            "line": 16,
            "offset": 17
          },
          "end": {
            "line": 16,
            "offset": 18
          }
        },
        {
          "start": {
            "line": 16,
            "offset": 23
          },
          "end": {
            "line": 16,
            "offset": 24
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 19,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 19,
        "offset": 15
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 19,
      "success": true,
      "body": [
        {
          "start": {
            "line": 19,
            "offset": 15
          },
          "end": {
            "line": 19,
            "offset": 16
          }
        },
        {
          "start": {
            "line": 19,
            "offset": 16
          },
          "end": {
            "line": 19,
            "offset": 17
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 20,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 19,
        "offset": 16
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 20,
      "success": true,
      "body": [
        {
          "start": {
            "line": 19,
            "offset": 15
          },
          "end": {
            "line": 19,
            "offset": 16
          }
        },
        {
          "start": {
            "line": 19,
            "offset": 16
          },
          "end": {
            "line": 19,
            "offset": 17
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 21,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 20,
        "offset": 12
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 21,
      "success": true,
      "body": [
        {
          "start": {
            "line": 20,
            "offset": 12
          },
          "end": {
            "line": 20,
            "offset": 13
          }
        },
        {
          "start": {
            "line": 20,
            "offset": 17
          },
          "end": {
            "line": 20,
            "offset": 18
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 22,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 20,
        "offset": 17
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 22,
      "success": true,
      "body": [
        {
          "start": {
            "line": 20,
            "offset": 12
          },
          "end": {
            "line": 20,
            "offset": 13
          }
        },
        {
          "start": {
            "line": 20,
            "offset": 17
          },
          "end": {
            "line": 20,
            "offset": 18
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 23,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 27,
        "offset": 19
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 23,
      "success": true,
      "body": [
        {
          "start": {
            "line": 27,
            "offset": 19
          },
          "end": {
            "line": 27,
            "offset": 20
          }
        },
        {
          "start": {
            "line": 27,
            "offset": 20
          },
          "end": {
            "line": 27,
            "offset": 21
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 24,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 27,
        "offset": 20
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 24,
      "success": true,
      "body": [
        {
          "start": {
            "line": 27,
            "offset": 19
          },
          "end": {
            "line": 27,
            "offset": 20
          }
        },
        {
          "start": {
            "line": 27,
            "offset": 20
          },
          "end": {
            "line": 27,
            "offset": 21
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 25,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 27,
        "offset": 24
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 25,
      "success": true,
      "body": [
        {
          "start": {
            "line": 27,
            "offset": 24
          },
          "end": {
            "line": 27,
            "offset": 25
          }
        },
        {
          "start": {
            "line": 27,
            "offset": 42
          },
          "end": {
            "line": 27,
            "offset": 43
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 26,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 27,
        "offset": 42
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 26,
      "success": true,
      "body": [
        {
          "start": {
            "line": 27,
            "offset": 24
          },
          "end": {
            "line": 27,
            "offset": 25
          }
        },
        {
          "start": {
            "line": 27,
            "offset": 42
          },
          "end": {
            "line": 27,
            "offset": 43
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 27,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 27,
        "offset": 25
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 27,
      "success": true,
      "body": [
        {
          "start": {
            "line": 27,
            "offset": 25
          },
          "end": {
            "line": 27,
            "offset": 26
          }
        },
        {
          "start": {
            "line": 27,
            "offset": 30
          },
          "end": {
            "line": 27,
            "offset": 31
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 28,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 27,
        "offset": 30
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 28,
      "success": true,
      "body": [
        {
          "start": {
            "line": 27,
            "offset": 25
          },
          "end": {
            "line": 27,
            "offset": 26
          }
        },
        {
          "start": {
            "line": 27,
            "offset": 30
          },
          "end": {
            "line": 27,
            "offset": 31
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 29,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 27,
        "offset": 33
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 29,
      "success": true,
      "body": [
        {
          "start": {
            "line": 27,
            "offset": 33
          },
          "end": {
            "line": 27,
            "offset": 34
          }
        },
        {
          "start": {
            "line": 27,
            "offset": 38
          },
          "end": {
            "line": 27,
            "offset": 39
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 30,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 27,
        "offset": 38
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 30,
      "success": true,
      "body": [
        {
          "start": {
            "line": 27,
            "offset": 33
          },
          "end": {
            "line": 27,
            "offset": 34
          }
        },
        {
          "start": {
            "line": 27,
            "offset": 38
          },
          "end": {
            "line": 27,
            "offset": 39
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 31,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 32,
        "offset": 20
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 31,
      "success": true,
      "body": [
        {
          "start": {
            "line": 32,
            "offset": 20
          },
          "end": {
            "line": 32,
            "offset": 21
          }
        },
        {
          "start": {
            "line": 32,
            "offset": 41
          },
          "end": {
            "line": 32,
            "offset": 42
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 32,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 32,
        "offset": 41
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 32,
      "success": true,
      "body": [
        {
          "start": {
            "line": 32,
            "offset": 20
          },
          "end": {
            "line": 32,
            "offset": 21
          }
        },
        {
          "start": {
            "line": 32,
            "offset": 41
          },
          "end": {
            "line": 32,
            "offset": 42
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 33,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 34,
        "offset": 16
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 33,
      "success": true,
      "body": [
        {
          "start": {
            "line": 34,
            "offset": 16
          },
          "end": {
            "line": 34,
            "offset": 17
          }
        },
        {
          "start": {
            "line": 34,
            "offset": 20
          },
          "end": {
            "line": 34,
            "offset": 21
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 34,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/brace01.ts",
        "line": 34,
        "offset": 20
      },
      "command": "brace"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "brace",
      "request_seq": 34,
      "success": true,
      "body": [
        {
          "start": {
            "line": 34,
            "offset": 16
          },
          "end": {
            "line": 34,
            "offset": 17
          }
        },
        {
          "start": {
            "line": 34,
            "offset": 20
          },
          "end": {
            "line": 34,
            "offset": 21
          }
        }
      ]
    }