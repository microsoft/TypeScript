Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/a/b/workspace/projects/config/tsconfig.json]


//// [/a/b/workspace/projects/config/file.ts]
import {a} from "../files/file1"; export let b = a;

//// [/a/b/workspace/projects/files/file1.ts]
export let a = 10;

//// [/a/b/workspace/projects/files/file2.ts]
export let aa = 10;

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
      "command": "open",
      "arguments": {
        "file": "/a/b/workspace/projects/config/file.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/workspace/projects/config/file.ts ProjectRootPath: undefined:: Result: /a/b/workspace/projects/config/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /a/b/workspace/projects/config/tsconfig.json, currentDirectory: /a/b/workspace/projects/config
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/workspace/projects/config/tsconfig.json 2000 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /a/b/workspace/projects/config/tsconfig.json : {
 "rootNames": [
  "/a/b/workspace/projects/config/file.ts"
 ],
 "options": {
  "configFilePath": "/a/b/workspace/projects/config/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/workspace/projects/config/tsconfig.json",
        "reason": "Creating possible configured project for /a/b/workspace/projects/config/file.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/config 1 undefined Config: /a/b/workspace/projects/config/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/config 1 undefined Config: /a/b/workspace/projects/config/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/workspace/projects/config/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/workspace/projects/files/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/config/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/config/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/workspace/projects/config/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/workspace/projects/config/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/a/b/workspace/projects/files/file1.ts Text-1 "export let a = 10;"
	/a/b/workspace/projects/config/file.ts SVC-1-0 "import {a} from \"../files/file1\"; export let b = a;"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../files/file1.ts
	  Imported via "../files/file1" from file 'file.ts'
	file.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/b/workspace/projects/config/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "8ced45f36d3adc19a04fa1258e594862f99e1ed04ea9267af23cc067e09d54a2",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 69,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a/b/workspace/projects/config/file.ts",
        "configFile": "/a/b/workspace/projects/config/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/a/b/workspace/projects/config/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/config/file.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/workspace/projects/config/tsconfig.json
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
After request

PolledWatches::
/a/b/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/workspace/projects/config/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/workspace/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/workspace/projects/config/tsconfig.json: *new*
  {}
/a/b/workspace/projects/files/file1.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b/workspace/projects/config: *new*
  {}

Projects::
/a/b/workspace/projects/config/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/workspace/projects/config/file.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /a/b/workspace/projects/config/tsconfig.json *default*
/a/b/workspace/projects/files/file1.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/workspace/projects/config/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/workspace/projects/config/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/workspace/projects/files/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/workspace/projects/files/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/workspace/projects/files/file1.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/a/b/workspace/projects/config/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/config/file.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/workspace/projects/config/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/files/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/workspace/projects/config/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true
    }
After request

PolledWatches::
/a/b/workspace/node_modules/@types:
  {"pollingInterval":500}
/a/b/workspace/projects/config/node_modules/@types:
  {"pollingInterval":500}
/a/b/workspace/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/workspace/projects/config/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/workspace/projects/files/file1.ts:
  {}

FsWatchesRecursive::
/a/b/workspace/projects/config:
  {}

ScriptInfos::
/a/b/workspace/projects/config/file.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/b/workspace/projects/config/tsconfig.json *default*
/a/b/workspace/projects/files/file1.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /a/b/workspace/projects/config/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/b/workspace/projects/config/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/workspace/projects/config/file.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/workspace/projects/config/file.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/a/b/workspace/projects/config/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/files/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/workspace/projects/config/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 3,
      "success": true
    }
After request

PolledWatches::
/a/b/workspace/node_modules/@types:
  {"pollingInterval":500}
/a/b/workspace/projects/config/node_modules/@types:
  {"pollingInterval":500}
/a/b/workspace/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/workspace/projects/config/file.ts: *new*
  {}
/a/b/workspace/projects/config/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/workspace/projects/config:
  {}

Projects::
/a/b/workspace/projects/config/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/a/b/workspace/projects/config/file.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 1
        /a/b/workspace/projects/config/tsconfig.json
/a/b/workspace/projects/files/file1.ts (Open)
    version: Text-1
    containingProjects: 1
        /a/b/workspace/projects/config/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/b/workspace/projects/config/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/workspace/projects/files/file2.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/workspace/projects/files/file2.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /a/b/workspace/projects/files
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/workspace/projects/files/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/workspace/projects/files/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/workspace/projects/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/workspace/projects/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/a/b/workspace/projects/files/file2.ts SVC-1-0 "export let aa = 10;"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/b/workspace/projects/config/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/a/b/workspace/projects/files/file1.ts
	/a/b/workspace/projects/config/file.ts


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../files/file1.ts
	  Imported via "../files/file1" from file 'file.ts'
	file.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/workspace/projects/config 1 undefined Config: /a/b/workspace/projects/config/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/workspace/projects/config 1 undefined Config: /a/b/workspace/projects/config/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/workspace/projects/config/tsconfig.json 2000 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/workspace/projects/config/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/workspace/projects/config/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/workspace/projects/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/workspace/projects/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a/b/workspace/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/workspace/node_modules/@types 1 undefined Project: /a/b/workspace/projects/config/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/workspace/projects/config/file.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/files/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/files/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/a/b/workspace/node_modules/@types:
  {"pollingInterval":500}
/a/b/workspace/projects/files/jsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/workspace/projects/files/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/workspace/projects/files/tsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/workspace/projects/jsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/workspace/projects/node_modules/@types:
  {"pollingInterval":500}
/a/b/workspace/projects/tsconfig.json: *new*
  {"pollingInterval":2000}

PolledWatches *deleted*::
/a/b/workspace/projects/config/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/workspace/projects/config/file.ts:
  {}
/a/b/workspace/projects/config/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/a/b/workspace/projects/config:
  {}

Projects::
/a/b/workspace/projects/config/tsconfig.json (Configured) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
    noOpenRef: true
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/workspace/projects/config/file.ts *deleted*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /a/b/workspace/projects/config/tsconfig.json *deleted*
/a/b/workspace/projects/files/file1.ts (Open) *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /a/b/workspace/projects/config/tsconfig.json *deleted*
/a/b/workspace/projects/files/file2.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject1* *new*
        /a/b/workspace/projects/config/tsconfig.json *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "documentHighlights",
      "arguments": {
        "file": "/a/b/workspace/projects/files/file1.ts",
        "line": 1,
        "offset": 11,
        "filesToSearch": [
          "/a/b/workspace/projects/files/file1.ts"
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/files/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/files/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject2*, currentDirectory: /a/b/workspace/projects/files
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/files/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/workspace/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/a/b/workspace/projects/files/file1.ts Text-1 "export let a = 10;"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/files/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/workspace/projects/files/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/workspace/projects/files/file1.ts (Open) *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *default* *new*
/a/b/workspace/projects/files/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
