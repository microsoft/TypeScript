Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/a/b/projects/project/src/index.ts]
let y = 10

//// [/a/b/projects/project/tsconfig.json]
{}

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
        "file": "/a/b/projects/project/src/index.ts",
        "projectRootPath": "/a/b/projects/proj"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj:: Result: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /a/b/projects/project/tsconfig.json, currentDirectory: /a/b/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /a/b/projects/project/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/b/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /a/b/projects/project/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/a/b/projects/project/src/index.ts SVC-1-0 "let y = 10"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/b/projects/project/tsconfig.json"
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
          "projectId": "dc820134a28a9a8eb7dcb1d2ef1d3404511a6f70f3504a4f248857e2a0071661",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 10,
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
        "triggerFile": "/a/b/projects/project/src/index.ts",
        "configFile": "/a/b/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/projects/project/tsconfig.json
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
/a/b/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b/projects/project: *new*
  {}

Projects::
/a/b/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/projects/project/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /a/b/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/projects/project/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 2:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj:: Result: undefined
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 2:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/b/projects/project/tsconfig.json :: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /a/b/projects/project/tsconfig.json Detected file add/remove of non supported extension: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/project/tsconfig.json :: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 1
1: *ensureProjectForOpenFiles*
//// [/a/b/projects/project/tsconfig.json] deleted

Timeout callback:: count: 1
1: *ensureProjectForOpenFiles* *new*

Projects::
/a/b/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    isOrphan: true *changed*
    deferredClose: true *changed*
    autoImportProviderHost: undefined *changed*

Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /a/b/projects/project/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/a/b/projects/project/src/index.ts SVC-1-0 "let y = 10"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*,/a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /a/b/projects/project/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/a/b/projects/project/src/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/a/b/projects/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/projects/project/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/src/jsconfig.json: *new*
  {"pollingInterval":2000}
/a/b/projects/project/src/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/projects/project/src/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/b/projects/project/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/project:
  {}

Projects::
/a/b/projects/project/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    isOrphan: true
    deferredClose: true
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/projects/project/src/index.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 2 *changed*
        /dev/null/inferredProject1* *default* *new*
        /a/b/projects/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /a/b/projects/project/tsconfig.json
        /dev/null/inferredProject1* *new*

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj:: Result: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/b/projects/project/tsconfig.json :: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /a/b/projects/project/tsconfig.json Detected file add/remove of non supported extension: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/project/tsconfig.json :: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
2: /a/b/projects/project/tsconfig.json
3: *ensureProjectForOpenFiles*
//// [/a/b/projects/project/tsconfig.json]
{}


Timeout callback:: count: 2
2: /a/b/projects/project/tsconfig.json *new*
3: *ensureProjectForOpenFiles* *new*

Projects::
/a/b/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: false *changed*
    deferredClose: undefined *changed*
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

Info seq  [hh:mm:ss:mss] Running: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/projects/project/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/b/projects/project/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/b/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/projects/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/b/projects/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a/b/projects/project/tsconfig.json",
        "configFile": "/a/b/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*,/a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /a/b/projects/project/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/a/b/projects/project/src/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/a/b/projects/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/src/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/src/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/src/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/b/projects/project/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/project:
  {}

Projects::
/a/b/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 2 *changed*
    isOrphan: true *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/a/b/projects/project/src/index.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /a/b/projects/project/tsconfig.json *default*
        /dev/null/inferredProject1* *deleted*
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /a/b/projects/project/tsconfig.json
        /dev/null/inferredProject1* *deleted*
