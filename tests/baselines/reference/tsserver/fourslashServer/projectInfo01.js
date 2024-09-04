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

//// [/tests/cases/fourslash/server/a.ts]
export var test = "test String"

//// [/tests/cases/fourslash/server/b.ts]
import test from "./a"

//// [/tests/cases/fourslash/server/c.ts]
/// <reference path="a.ts"/>
/// <reference path="b.ts"/>

//// [/tests/cases/fourslash/server/d.ts]
console.log("nothing");


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined:: Result: undefined
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
	/tests/cases/fourslash/server/a.ts SVC-1-0 "export var test = \"test String\""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	a.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
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
/tests/cases/fourslash/server/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/a.ts",
        "needFileNameList": true
      },
      "command": "projectInfo"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "projectInfo",
      "request_seq": 2,
      "success": true,
      "body": {
        "configFileName": "/dev/null/inferredProject1*",
        "languageServiceDisabled": false,
        "fileNames": [
          "/home/src/tslibs/TS/Lib/lib.d.ts",
          "/home/src/tslibs/TS/Lib/lib.decorators.d.ts",
          "/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts",
          "/tests/cases/fourslash/server/a.ts"
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/b.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/b.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject2*, currentDirectory: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/a.ts SVC-1-0 "export var test = \"test String\""
	/tests/cases/fourslash/server/b.ts SVC-1-0 "import test from \"./a\""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	a.ts
	  Imported via "./a" from file 'b.ts'
	b.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	/tests/cases/fourslash/server/a.ts


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	a.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tests/cases/fourslash/server/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules:
  {} *new*
/tests/cases/fourslash/node_modules/@types:
  {} *new*
/tests/cases/fourslash/server/node_modules:
  {} *new*
/tests/cases/fourslash/server/node_modules/@types:
  {} *new*

watchedDirectoriesRecursive *deleted*::
/tests/cases/fourslash/node_modules:
  {}
/tests/cases/fourslash/node_modules/@types:
  {}
/tests/cases/fourslash/server/node_modules:
  {}
/tests/cases/fourslash/server/node_modules/@types:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *deleted*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isClosed: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *new*
        /dev/null/inferredProject1* *deleted*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *new*
        /dev/null/inferredProject1* *deleted*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *new*
        /dev/null/inferredProject1* *deleted*
/tests/cases/fourslash/server/a.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *default* *new*
        /dev/null/inferredProject1* *deleted*
/tests/cases/fourslash/server/b.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/b.ts",
        "needFileNameList": true
      },
      "command": "projectInfo"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "projectInfo",
      "request_seq": 4,
      "success": true,
      "body": {
        "configFileName": "/dev/null/inferredProject2*",
        "languageServiceDisabled": false,
        "fileNames": [
          "/home/src/tslibs/TS/Lib/lib.d.ts",
          "/home/src/tslibs/TS/Lib/lib.decorators.d.ts",
          "/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts",
          "/tests/cases/fourslash/server/a.ts",
          "/tests/cases/fourslash/server/b.ts"
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/c.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/c.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject3*, currentDirectory: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/a.ts SVC-1-0 "export var test = \"test String\""
	/tests/cases/fourslash/server/b.ts SVC-1-0 "import test from \"./a\""
	/tests/cases/fourslash/server/c.ts SVC-1-0 "/// <reference path=\"a.ts\"/>\n/// <reference path=\"b.ts\"/>"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	a.ts
	  Referenced via 'a.ts' from file 'c.ts'
	  Imported via "./a" from file 'b.ts'
	b.ts
	  Referenced via 'b.ts' from file 'c.ts'
	c.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	/tests/cases/fourslash/server/a.ts
	/tests/cases/fourslash/server/b.ts


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	a.ts
	  Imported via "./a" from file 'b.ts'
	b.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/c.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 5,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tests/cases/fourslash/server/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules:
  {} *new*
/tests/cases/fourslash/node_modules/@types:
  {} *new*
/tests/cases/fourslash/server/node_modules:
  {} *new*
/tests/cases/fourslash/server/node_modules/@types:
  {} *new*

watchedDirectoriesRecursive *deleted*::
/tests/cases/fourslash/node_modules:
  {}
/tests/cases/fourslash/node_modules/@types:
  {}
/tests/cases/fourslash/server/node_modules:
  {}
/tests/cases/fourslash/server/node_modules/@types:
  {}

Projects::
/dev/null/inferredProject2* (Inferred) *deleted*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isClosed: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject3* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject3* *new*
        /dev/null/inferredProject2* *deleted*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject3* *new*
        /dev/null/inferredProject2* *deleted*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject3* *new*
        /dev/null/inferredProject2* *deleted*
/tests/cases/fourslash/server/a.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /dev/null/inferredProject3* *default* *new*
        /dev/null/inferredProject2* *deleted*
/tests/cases/fourslash/server/b.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /dev/null/inferredProject3* *default* *new*
        /dev/null/inferredProject2* *deleted*
/tests/cases/fourslash/server/c.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/c.ts",
        "needFileNameList": true
      },
      "command": "projectInfo"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "projectInfo",
      "request_seq": 6,
      "success": true,
      "body": {
        "configFileName": "/dev/null/inferredProject3*",
        "languageServiceDisabled": false,
        "fileNames": [
          "/home/src/tslibs/TS/Lib/lib.d.ts",
          "/home/src/tslibs/TS/Lib/lib.decorators.d.ts",
          "/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts",
          "/tests/cases/fourslash/server/a.ts",
          "/tests/cases/fourslash/server/b.ts",
          "/tests/cases/fourslash/server/c.ts"
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/d.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/d.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject4*, currentDirectory: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject4* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/d.ts SVC-1-0 "console.log(\"nothing\");"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/c.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 7,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tests/cases/fourslash/server/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules:
  {}
  {} *new*
/tests/cases/fourslash/node_modules/@types:
  {}
  {} *new*
/tests/cases/fourslash/server/node_modules:
  {}
  {} *new*
/tests/cases/fourslash/server/node_modules/@types:
  {}
  {} *new*

Projects::
/dev/null/inferredProject3* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject4* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject3*
        /dev/null/inferredProject4* *new*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject3*
        /dev/null/inferredProject4* *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject3*
        /dev/null/inferredProject4* *new*
/tests/cases/fourslash/server/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
/tests/cases/fourslash/server/b.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
/tests/cases/fourslash/server/c.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
/tests/cases/fourslash/server/d.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject4* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/d.ts",
        "needFileNameList": true
      },
      "command": "projectInfo"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "projectInfo",
      "request_seq": 8,
      "success": true,
      "body": {
        "configFileName": "/dev/null/inferredProject4*",
        "languageServiceDisabled": false,
        "fileNames": [
          "/home/src/tslibs/TS/Lib/lib.d.ts",
          "/home/src/tslibs/TS/Lib/lib.decorators.d.ts",
          "/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts",
          "/tests/cases/fourslash/server/d.ts"
        ]
      }
    }