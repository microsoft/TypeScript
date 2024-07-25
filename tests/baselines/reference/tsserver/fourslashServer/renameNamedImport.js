currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib/index.ts]
const unrelatedLocalVariable = 123;
export const someExportedVariable = unrelatedLocalVariable;

//// [/lib/tsconfig.json]
{}

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/src/index.ts]
import { someExportedVariable } from '../lib/index';
someExportedVariable;

//// [/src/tsconfig.json]
{}

//// [/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/lib/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /lib/tsconfig.json ProjectRootPath: undefined:: Result: /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib/tsconfig.json 2000 undefined Project: /lib/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/lib/tsconfig.json",
        "reason": "Creating possible configured project for /lib/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /lib/tsconfig.json : {
 "rootNames": [
  "/lib/index.ts"
 ],
 "options": {
  "configFilePath": "/lib/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /lib 1 undefined Config: /lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /lib 1 undefined Config: /lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /lib/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/lib/index.ts Text-1 "const unrelatedLocalVariable = 123;\nexport const someExportedVariable = unrelatedLocalVariable;"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/lib/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/lib/tsconfig.json",
        "configFile": "/lib/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /lib/tsconfig.json ProjectRootPath: undefined:: Result: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tsconfig.json",
        "reason": "Creating possible configured project for /lib/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts",
  "/lib/index.ts",
  "/src/index.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib/index.ts Text-1 "const unrelatedLocalVariable = 123;\nexport const someExportedVariable = unrelatedLocalVariable;"
	/src/index.ts Text-1 "import { someExportedVariable } from '../lib/index';\nsomeExportedVariable;"


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.d.ts
	  Matched by default include pattern '**/*'
	lib/index.ts
	  Matched by default include pattern '**/*'
	  Imported via '../lib/index' from file 'src/index.ts'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/lib/tsconfig.json",
        "configFile": "/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/lib/tsconfig.json",
        "configFile": "/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/lib/tsconfig.json SVC-1-0 "{}"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /lib/tsconfig.json ProjectRootPath: undefined
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
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/lib/index.ts: *new*
  {"pollingInterval":500}
/lib/tsconfig.json: *new*
  {"pollingInterval":2000}
/src/index.ts: *new*
  {"pollingInterval":500}
/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
: *new*
  {}
/lib: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/lib/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true
/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/lib.d.ts *new*
    version: Text-1
    containingProjects: 3
        /lib/tsconfig.json
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 3
        /lib/tsconfig.json
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 3
        /lib/tsconfig.json
        /tsconfig.json
        /dev/null/inferredProject1*
/lib/index.ts *new*
    version: Text-1
    containingProjects: 2
        /lib/tsconfig.json
        /tsconfig.json
/lib/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/lib/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /lib/index.ts ProjectRootPath: undefined:: Result: /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts
	/lib.decorators.legacy.d.ts
	/lib.d.ts
	/lib/index.ts
	/src/index.ts


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.d.ts
	  Matched by default include pattern '**/*'
	lib/index.ts
	  Matched by default include pattern '**/*'
	  Imported via '../lib/index' from file 'src/index.ts'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /lib/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /lib/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /lib/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true
    }
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/lib/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/lib/index.ts:
  {"pollingInterval":500}
/src/index.ts:
  {"pollingInterval":500}
/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/lib:
  {}

watchedDirectoriesRecursive *deleted*::
:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/lib/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*
/tsconfig.json (Configured) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
    noOpenRef: true

ScriptInfos::
/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /lib/tsconfig.json
        /dev/null/inferredProject1*
        /tsconfig.json *deleted*
/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /lib/tsconfig.json
        /dev/null/inferredProject1*
        /tsconfig.json *deleted*
/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /lib/tsconfig.json
        /dev/null/inferredProject1*
        /tsconfig.json *deleted*
/lib/index.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /lib/tsconfig.json *default*
        /tsconfig.json *deleted*
/lib/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/src/index.ts *deleted*
    version: Text-1
    containingProjects: 0 *changed*
        /tsconfig.json *deleted*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/src/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /src/index.ts ProjectRootPath: undefined:: Result: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/tsconfig.json 2000 undefined Project: /src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/src/tsconfig.json",
        "reason": "Creating possible configured project for /src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /src/tsconfig.json : {
 "rootNames": [
  "/src/index.ts"
 ],
 "options": {
  "configFilePath": "/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /src/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/lib/index.ts Text-1 "const unrelatedLocalVariable = 123;\nexport const someExportedVariable = unrelatedLocalVariable;"
	/src/index.ts SVC-2-0 "import { someExportedVariable } from '../lib/index';\nsomeExportedVariable;"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	../lib/index.ts
	  Imported via '../lib/index' from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/src/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/src/index.ts",
        "configFile": "/src/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /lib/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /lib/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /lib/tsconfig.json,/src/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /src/tsconfig.json
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
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/lib/tsconfig.json:
  {"pollingInterval":2000}
/src/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/lib:
  {}
/src: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/lib/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
/src/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/lib.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /lib/tsconfig.json
        /dev/null/inferredProject1*
        /src/tsconfig.json *new*
/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /lib/tsconfig.json
        /dev/null/inferredProject1*
        /src/tsconfig.json *new*
/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /lib/tsconfig.json
        /dev/null/inferredProject1*
        /src/tsconfig.json *new*
/lib/index.ts (Open) *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /lib/tsconfig.json *default*
        /src/tsconfig.json *new*
/lib/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/src/index.ts (Open) *new*
    version: SVC-2-0
    containingProjects: 1
        /src/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
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
      "request_seq": 3,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/src/index.ts",
        "line": 1,
        "offset": 10,
        "findInStrings": false,
        "findInComments": false
      },
      "command": "rename"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "rename",
      "request_seq": 4,
      "success": true,
      "body": {
        "info": {
          "canRename": true,
          "displayName": "someExportedVariable",
          "fullDisplayName": "someExportedVariable",
          "kind": "alias",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 30
            }
          }
        },
        "locs": [
          {
            "file": "/src/index.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 10
                },
                "end": {
                  "line": 1,
                  "offset": 30
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 53
                },
                "prefixText": "someExportedVariable as "
              },
              {
                "start": {
                  "line": 2,
                  "offset": 1
                },
                "end": {
                  "line": 2,
                  "offset": 21
                }
              }
            ]
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
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
      "request_seq": 5,
      "success": true
    }