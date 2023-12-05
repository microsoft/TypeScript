currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/c/d/f0.ts]
import {x} from "f1"

//// [/c/f1.ts]
foo()


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "module": "AMD",
          "noLib": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/c/d/f0.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /c/d
Info seq  [hh:mm:ss:mss] For info: /c/d/f0.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/f1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/c/f1.ts Text-1 "foo()"
	/c/d/f0.ts SVC-1-0 "import {x} from \"f1\""


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /c/d/f0.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/c/f1.ts: *new*
  {}

Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/c/f1.ts Text-1 "foo()"
	/c/d/f0.ts SVC-1-1 "import {x} from \"f1\";\n                 var x: string = 1;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] fileExists:: []
Info seq  [hh:mm:ss:mss] directoryExists:: []
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: []
Info seq  [hh:mm:ss:mss] readDirectory:: []
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/d/f0.ts SVC-1-2 "import {x} from \"f2\""


	f0.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Could not find source file: '/c/f1.ts'.
Info seq  [hh:mm:ss:mss] fileExists:: [
  {
    "key": "/c/d/f2.ts",
    "count": 1
  },
  {
    "key": "/c/d/f2.tsx",
    "count": 1
  },
  {
    "key": "/c/d/f2.d.ts",
    "count": 1
  },
  {
    "key": "/c/f2.ts",
    "count": 1
  },
  {
    "key": "/c/f2.tsx",
    "count": 1
  },
  {
    "key": "/c/f2.d.ts",
    "count": 1
  },
  {
    "key": "/f2.ts",
    "count": 1
  },
  {
    "key": "/f2.tsx",
    "count": 1
  },
  {
    "key": "/f2.d.ts",
    "count": 1
  },
  {
    "key": "/c/d/f2.js",
    "count": 1
  },
  {
    "key": "/c/d/f2.jsx",
    "count": 1
  },
  {
    "key": "/c/f2.js",
    "count": 1
  },
  {
    "key": "/c/f2.jsx",
    "count": 1
  },
  {
    "key": "/f2.js",
    "count": 1
  },
  {
    "key": "/f2.jsx",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] directoryExists:: [
  {
    "key": "/c/d",
    "count": 2
  },
  {
    "key": "/c",
    "count": 2
  },
  {
    "key": "/",
    "count": 2
  },
  {
    "key": "/c/d/node_modules",
    "count": 1
  },
  {
    "key": "/c/node_modules",
    "count": 1
  },
  {
    "key": "/node_modules",
    "count": 1
  },
  {
    "key": "/c/d/node_modules/@types",
    "count": 1
  },
  {
    "key": "/c/node_modules/@types",
    "count": 1
  },
  {
    "key": "/node_modules/@types",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: []
Info seq  [hh:mm:ss:mss] readDirectory:: []
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/c/f1.ts Text-1 "foo()"
	/c/d/f0.ts SVC-1-3 "import {x} from \"f1\""


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] fileExists:: [
  {
    "key": "/c/d/f1.ts",
    "count": 1
  },
  {
    "key": "/c/d/f1.tsx",
    "count": 1
  },
  {
    "key": "/c/d/f1.d.ts",
    "count": 1
  },
  {
    "key": "/c/f1.ts",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] directoryExists:: [
  {
    "key": "/c/d",
    "count": 1
  },
  {
    "key": "/c",
    "count": 1
  },
  {
    "key": "/c/d/node_modules/@types",
    "count": 1
  },
  {
    "key": "/c/node_modules/@types",
    "count": 1
  },
  {
    "key": "/node_modules/@types",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: []
Info seq  [hh:mm:ss:mss] readDirectory:: []
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "module": "AMD",
          "noLib": true,
          "target": "ES5"
        }
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Timeout callback:: count: 2
1: /dev/null/inferredProject1* *new*
2: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/c/f1.ts Text-1 "foo()"
	/c/d/f0.ts SVC-1-3 "import {x} from \"f1\""

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] fileExists:: [
  {
    "key": "/c/d/f1.ts",
    "count": 1
  },
  {
    "key": "/c/d/f1.tsx",
    "count": 1
  },
  {
    "key": "/c/d/f1.d.ts",
    "count": 1
  },
  {
    "key": "/c/f1.ts",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] directoryExists:: [
  {
    "key": "/c/d",
    "count": 1
  },
  {
    "key": "/c",
    "count": 1
  },
  {
    "key": "/c/d/node_modules/@types",
    "count": 1
  },
  {
    "key": "/c/node_modules/@types",
    "count": 1
  },
  {
    "key": "/node_modules/@types",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: []
Info seq  [hh:mm:ss:mss] readDirectory:: []