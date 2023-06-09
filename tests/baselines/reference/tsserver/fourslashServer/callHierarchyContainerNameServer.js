currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts]
function f() {}

class A {
  static sameName() {
    f();
  }
}

class B {
  sameName() {
    A.sameName();
  }
}

const Obj = {
  get sameName() {
    return new B().sameName;
  }
};

namespace Foo {
  function sameName() {
    return Obj.sameName;
  }

  export class C {
    constructor() {
      sameName();
    }
  }
}

module Foo.Bar {
  const sameName = () => new Foo.C();
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/callHierarchyContainerNameServer.ts :: No config files found.
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
	/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts SVC-1-0 "function f() {}\n\nclass A {\n  static sameName() {\n    f();\n  }\n}\n\nclass B {\n  sameName() {\n    A.sameName();\n  }\n}\n\nconst Obj = {\n  get sameName() {\n    return new B().sameName;\n  }\n};\n\nnamespace Foo {\n  function sameName() {\n    return Obj.sameName;\n  }\n\n  export class C {\n    constructor() {\n      sameName();\n    }\n  }\n}\n\nmodule Foo.Bar {\n  const sameName = () => new Foo.C();\n}"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	callHierarchyContainerNameServer.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/callHierarchyContainerNameServer.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts","line":1,"offset":10},"command":"prepareCallHierarchy"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "prepareCallHierarchy",
     "request_seq": 1,
     "success": true,
     "body": {
      "name": "f",
      "kind": "function",
      "kindModifiers": "",
      "file": "/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts",
      "span": {
       "start": {
        "line": 1,
        "offset": 1
       },
       "end": {
        "line": 1,
        "offset": 16
       }
      },
      "selectionSpan": {
       "start": {
        "line": 1,
        "offset": 10
       },
       "end": {
        "line": 1,
        "offset": 11
       }
      }
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts","line":1,"offset":10},"command":"provideCallHierarchyIncomingCalls"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "provideCallHierarchyIncomingCalls",
     "request_seq": 2,
     "success": true,
     "body": [
      {
       "from": {
        "name": "sameName",
        "kind": "method",
        "kindModifiers": "static",
        "file": "/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts",
        "containerName": "A",
        "span": {
         "start": {
          "line": 4,
          "offset": 3
         },
         "end": {
          "line": 6,
          "offset": 4
         }
        },
        "selectionSpan": {
         "start": {
          "line": 4,
          "offset": 10
         },
         "end": {
          "line": 4,
          "offset": 18
         }
        }
       },
       "fromSpans": [
        {
         "start": {
          "line": 5,
          "offset": 5
         },
         "end": {
          "line": 5,
          "offset": 6
         }
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts","line":1,"offset":10},"command":"provideCallHierarchyOutgoingCalls"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "provideCallHierarchyOutgoingCalls",
     "request_seq": 3,
     "success": true,
     "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts","line":4,"offset":10},"command":"provideCallHierarchyIncomingCalls"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "provideCallHierarchyIncomingCalls",
     "request_seq": 4,
     "success": true,
     "body": [
      {
       "from": {
        "name": "sameName",
        "kind": "method",
        "kindModifiers": "",
        "file": "/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts",
        "containerName": "B",
        "span": {
         "start": {
          "line": 10,
          "offset": 3
         },
         "end": {
          "line": 12,
          "offset": 4
         }
        },
        "selectionSpan": {
         "start": {
          "line": 10,
          "offset": 3
         },
         "end": {
          "line": 10,
          "offset": 11
         }
        }
       },
       "fromSpans": [
        {
         "start": {
          "line": 11,
          "offset": 7
         },
         "end": {
          "line": 11,
          "offset": 15
         }
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts","line":10,"offset":3},"command":"provideCallHierarchyIncomingCalls"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "provideCallHierarchyIncomingCalls",
     "request_seq": 5,
     "success": true,
     "body": [
      {
       "from": {
        "name": "sameName",
        "kind": "getter",
        "kindModifiers": "",
        "file": "/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts",
        "containerName": "Obj",
        "span": {
         "start": {
          "line": 16,
          "offset": 3
         },
         "end": {
          "line": 18,
          "offset": 4
         }
        },
        "selectionSpan": {
         "start": {
          "line": 16,
          "offset": 7
         },
         "end": {
          "line": 16,
          "offset": 15
         }
        }
       },
       "fromSpans": [
        {
         "start": {
          "line": 17,
          "offset": 20
         },
         "end": {
          "line": 17,
          "offset": 28
         }
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts","line":16,"offset":7},"command":"provideCallHierarchyIncomingCalls"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "provideCallHierarchyIncomingCalls",
     "request_seq": 6,
     "success": true,
     "body": [
      {
       "from": {
        "name": "sameName",
        "kind": "function",
        "kindModifiers": "",
        "file": "/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts",
        "containerName": "Foo",
        "span": {
         "start": {
          "line": 22,
          "offset": 3
         },
         "end": {
          "line": 24,
          "offset": 4
         }
        },
        "selectionSpan": {
         "start": {
          "line": 22,
          "offset": 12
         },
         "end": {
          "line": 22,
          "offset": 20
         }
        }
       },
       "fromSpans": [
        {
         "start": {
          "line": 23,
          "offset": 16
         },
         "end": {
          "line": 23,
          "offset": 24
         }
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts","line":22,"offset":12},"command":"provideCallHierarchyIncomingCalls"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "provideCallHierarchyIncomingCalls",
     "request_seq": 7,
     "success": true,
     "body": [
      {
       "from": {
        "name": "C",
        "kind": "class",
        "kindModifiers": "export",
        "file": "/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts",
        "containerName": "Foo",
        "span": {
         "start": {
          "line": 26,
          "offset": 3
         },
         "end": {
          "line": 30,
          "offset": 4
         }
        },
        "selectionSpan": {
         "start": {
          "line": 26,
          "offset": 16
         },
         "end": {
          "line": 26,
          "offset": 17
         }
        }
       },
       "fromSpans": [
        {
         "start": {
          "line": 28,
          "offset": 7
         },
         "end": {
          "line": 28,
          "offset": 15
         }
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":8,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts","line":26,"offset":16},"command":"provideCallHierarchyIncomingCalls"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "provideCallHierarchyIncomingCalls",
     "request_seq": 8,
     "success": true,
     "body": [
      {
       "from": {
        "name": "sameName",
        "kind": "function",
        "kindModifiers": "",
        "file": "/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts",
        "containerName": "Bar",
        "span": {
         "start": {
          "line": 34,
          "offset": 20
         },
         "end": {
          "line": 34,
          "offset": 37
         }
        },
        "selectionSpan": {
         "start": {
          "line": 34,
          "offset": 9
         },
         "end": {
          "line": 34,
          "offset": 17
         }
        }
       },
       "fromSpans": [
        {
         "start": {
          "line": 34,
          "offset": 34
         },
         "end": {
          "line": 34,
          "offset": 35
         }
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":9,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/callHierarchyContainerNameServer.ts","line":34,"offset":9},"command":"provideCallHierarchyIncomingCalls"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "provideCallHierarchyIncomingCalls",
     "request_seq": 9,
     "success": true,
     "body": []
    }