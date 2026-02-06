Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "options": {
          "lib": [
            "es5"
          ],
          "target": "es2025",
          "newLine": "crlf",
          "skipDefaultLibCheck": true
        }
      },
      "command": "compilerOptionsForInferredProjects"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "compilerOptionsForInferredProjects",
      "request_seq": 0,
      "success": true,
      "body": true
    }
//// [/home/src/workspaces/project/lib/index.ts]
const unrelatedLocalVariable = 123;
export const someExportedVariable = unrelatedLocalVariable;

//// [/home/src/workspaces/project/lib/tsconfig.json]
{ "compilerOptions": { "lib": ["es5"] } }

//// [/home/src/workspaces/project/src/index.ts]
import * as lib from '../lib/index';
lib.someExportedVariable;

//// [/home/src/workspaces/project/src/tsconfig.json]
{ "compilerOptions": { "lib": ["es5"] } }

//// [/home/src/workspaces/project/tsconfig.json]
{ "compilerOptions": { "lib": ["es5"] } }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/lib/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/lib/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/lib/tsconfig.json, currentDirectory: /home/src/workspaces/project/lib
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/lib/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/lib/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/lib/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/lib/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "configFilePath": "/home/src/workspaces/project/lib/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/lib/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/lib/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/lib 1 undefined Config: /home/src/workspaces/project/lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/lib 1 undefined Config: /home/src/workspaces/project/lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/lib/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/lib/index.ts Text-1 "const unrelatedLocalVariable = 123;\nexport const someExportedVariable = unrelatedLocalVariable;"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/lib/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/lib/tsconfig.json",
        "configFile": "/home/src/workspaces/project/lib/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/lib/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/lib/index.ts",
  "/home/src/workspaces/project/src/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/lib/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/lib/index.ts Text-1 "const unrelatedLocalVariable = 123;\nexport const someExportedVariable = unrelatedLocalVariable;"
	/home/src/workspaces/project/src/index.ts Text-1 "import * as lib from '../lib/index';\nlib.someExportedVariable;"


	../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
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
        "projectName": "/home/src/workspaces/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/lib/tsconfig.json",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project/lib
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/lib/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/lib/tsconfig.json SVC-1-0 "{ \"compilerOptions\": { \"lib\": [\"es5\"] } }"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/lib/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/lib/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/lib/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/lib/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/project: *new*
  {}
/home/src/workspaces/project/lib: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/lib/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/lib/tsconfig.json
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/lib/tsconfig.json
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *new*
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/lib/tsconfig.json
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/lib/index.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/lib/tsconfig.json
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/lib/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/lib/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/lib/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	/home/src/workspaces/project/lib/index.ts
	/home/src/workspaces/project/src/index.ts


	../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	lib/index.ts
	  Matched by default include pattern '**/*'
	  Imported via '../lib/index' from file 'src/index.ts'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/lib/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/lib/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/lib/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/lib/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/home/src/workspaces/project/lib/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/src/index.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/project/lib:
  {}

watchedDirectoriesRecursive *deleted*::
/home/src/workspaces/project:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/lib/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*
/home/src/workspaces/project/tsconfig.json (Configured) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/lib/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/lib/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/lib/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/lib/index.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/workspaces/project/lib/tsconfig.json *default*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/lib/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/src/index.ts *deleted*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/workspaces/project/tsconfig.json *deleted*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/src/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/src/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/src/tsconfig.json, currentDirectory: /home/src/workspaces/project/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/src/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/src/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "configFilePath": "/home/src/workspaces/project/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/src/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src 1 undefined Config: /home/src/workspaces/project/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src 1 undefined Config: /home/src/workspaces/project/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/lib/index.ts Text-1 "const unrelatedLocalVariable = 123;\nexport const someExportedVariable = unrelatedLocalVariable;"
	/home/src/workspaces/project/src/index.ts SVC-2-0 "import * as lib from '../lib/index';\nlib.someExportedVariable;"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
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
        "projectName": "/home/src/workspaces/project/src/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/src/index.ts",
        "configFile": "/home/src/workspaces/project/src/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/lib/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/lib/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/lib/tsconfig.json,/home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
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
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/lib/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/lib/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/project/lib:
  {}
/home/src/workspaces/project/src: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/lib/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/src/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/lib/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/src/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/lib/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/src/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/lib/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/src/tsconfig.json *new*
/home/src/workspaces/project/lib/index.ts (Open) *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/lib/tsconfig.json *default*
        /home/src/workspaces/project/src/tsconfig.json *new*
/home/src/workspaces/project/lib/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/src/index.ts (Open) *new*
    version: SVC-2-0
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json *default*

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
        "file": "/home/src/workspaces/project/src/index.ts",
        "line": 1,
        "offset": 13,
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
      "request_seq": 5,
      "success": true,
      "body": {
        "info": {
          "canRename": true,
          "displayName": "lib",
          "fullDisplayName": "lib",
          "kind": "alias",
          "kindModifiers": "",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 13
            },
            "end": {
              "line": 1,
              "offset": 16
            }
          }
        },
        "locs": [
          {
            "file": "/home/src/workspaces/project/src/index.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 13
                },
                "end": {
                  "line": 1,
                  "offset": 16
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 37
                }
              },
              {
                "start": {
                  "line": 2,
                  "offset": 1
                },
                "end": {
                  "line": 2,
                  "offset": 4
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