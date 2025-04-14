Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/c/d/f0.ts]
import {x} from "f1"

//// [/user/username/projects/project/c/f1.ts]
foo()

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


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
        "file": "/user/username/projects/project/c/d/f0.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/c/d/f0.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /user/username/projects/project/c/d
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/d/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/d/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/f1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/user/username/projects/project/c/f1.ts Text-1 "foo()"
	/user/username/projects/project/c/d/f0.ts SVC-1-0 "import {x} from \"f1\""


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/d/f0.ts ProjectRootPath: undefined
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

PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/c/d/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/c/d/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/c/d/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/c/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/c/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/project/c/d: *new*
  {}
/user/username/projects/project/c/f1.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/user/username/projects/project/c/d/f0.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/c/f1.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /user/username/projects/project/c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/user/username/projects/project/c/f1.ts Text-1 "foo()"
	/user/username/projects/project/c/d/f0.ts SVC-1-1 "import {x} from \"f1\";\n                 var x: string = 1;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /user/username/projects/project/c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] fileExists:: []
Info seq  [hh:mm:ss:mss] directoryExists:: []
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: []
Info seq  [hh:mm:ss:mss] readDirectory:: []
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 3 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/user/username/projects/project/c/d/f0.ts SVC-1-2 "import {x} from \"f2\""


	f0.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Could not find source file: '/user/username/projects/project/c/f1.ts'.
Info seq  [hh:mm:ss:mss] fileExists:: [
  {
    "key": "/user/username/projects/project/c/d/f2.ts",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/f2.tsx",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/f2.d.ts",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/f2.ts",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/f2.tsx",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/f2.d.ts",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/f2.ts",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/f2.tsx",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/f2.d.ts",
    "count": 1
  },
  {
    "key": "/user/username/projects/f2.ts",
    "count": 1
  },
  {
    "key": "/user/username/projects/f2.tsx",
    "count": 1
  },
  {
    "key": "/user/username/projects/f2.d.ts",
    "count": 1
  },
  {
    "key": "/user/username/f2.ts",
    "count": 1
  },
  {
    "key": "/user/username/f2.tsx",
    "count": 1
  },
  {
    "key": "/user/username/f2.d.ts",
    "count": 1
  },
  {
    "key": "/user/f2.ts",
    "count": 1
  },
  {
    "key": "/user/f2.tsx",
    "count": 1
  },
  {
    "key": "/user/f2.d.ts",
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
    "key": "/user/username/projects/project/c/d/f2.js",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/f2.jsx",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/f2.js",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/f2.jsx",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/f2.js",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/f2.jsx",
    "count": 1
  },
  {
    "key": "/user/username/projects/f2.js",
    "count": 1
  },
  {
    "key": "/user/username/projects/f2.jsx",
    "count": 1
  },
  {
    "key": "/user/username/f2.js",
    "count": 1
  },
  {
    "key": "/user/username/f2.jsx",
    "count": 1
  },
  {
    "key": "/user/f2.js",
    "count": 1
  },
  {
    "key": "/user/f2.jsx",
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
    "key": "/user/username/projects/project/c/d",
    "count": 2
  },
  {
    "key": "/user/username/projects/project/c",
    "count": 3
  },
  {
    "key": "/user/username/projects/project",
    "count": 3
  },
  {
    "key": "/user/username/projects",
    "count": 3
  },
  {
    "key": "/user/username",
    "count": 2
  },
  {
    "key": "/user",
    "count": 2
  },
  {
    "key": "/",
    "count": 2
  },
  {
    "key": "/user/username/projects/project/c/d/node_modules",
    "count": 2
  },
  {
    "key": "/user/username/projects/project/c/node_modules",
    "count": 2
  },
  {
    "key": "/user/username/projects/project/node_modules",
    "count": 2
  },
  {
    "key": "/user/username/projects/node_modules",
    "count": 2
  },
  {
    "key": "/user/username/node_modules",
    "count": 1
  },
  {
    "key": "/user/node_modules",
    "count": 1
  },
  {
    "key": "/node_modules",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/projects/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/node_modules/@types",
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
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 4 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/user/username/projects/project/c/f1.ts Text-1 "foo()"
	/user/username/projects/project/c/d/f0.ts SVC-1-3 "import {x} from \"f1\""


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /user/username/projects/project/c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] fileExists:: [
  {
    "key": "/user/username/projects/project/c/d/f1.ts",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/f1.tsx",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/f1.d.ts",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] directoryExists:: [
  {
    "key": "/user/username/projects/project/c/d",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/projects/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/node_modules/@types",
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

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/c/d/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/d/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/c/d/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/project/c/d:
  {}
/user/username/projects/project/c/f1.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3 *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/user/username/projects/project/c/d/f0.ts (Open) *changed*
    version: SVC-1-3 *changed*
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/c/f1.ts
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
	/user/username/projects/project/c/f1.ts Text-1 "foo()"
	/user/username/projects/project/c/d/f0.ts SVC-1-3 "import {x} from \"f1\""

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /user/username/projects/project/c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] fileExists:: [
  {
    "key": "/user/username/projects/project/c/d/f1.ts",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/f1.tsx",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/f1.d.ts",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] directoryExists:: [
  {
    "key": "/user/username/projects/project/c/d",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/d/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/c/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/projects/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/username/node_modules/@types",
    "count": 1
  },
  {
    "key": "/user/node_modules/@types",
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