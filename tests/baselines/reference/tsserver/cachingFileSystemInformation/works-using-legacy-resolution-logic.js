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
          "module": "amd",
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
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /c/d/f0.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/f1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
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
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

FsWatches::
/c/f1.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/c/d/f0.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/c/f1.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 3 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 4 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
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

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3 *changed*

ScriptInfos::
/c/d/f0.ts (Open) *changed*
    version: SVC-1-3 *changed*
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/c/f1.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "module": "amd",
          "noLib": true,
          "target": "es5"
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

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 5 projectProgramVersion: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
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