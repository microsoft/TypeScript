Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/a.ts]


//// [/home/src/projects/project/b.ts]


//// [/home/src/projects/project/a/tsconfig.json]
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
        "file": "/home/src/projects/project/a/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/a.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/a/tsconfig.json, currentDirectory: /home/src/projects/project/a
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/tsconfig.json 2000 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/a/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/a/a.ts"
 ],
 "options": {
  "configFilePath": "/home/src/projects/project/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/a/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/a/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Config: /home/src/projects/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Config: /home/src/projects/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/a.ts SVC-1-0 ""


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/a/tsconfig.json"
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
          "projectId": "46252e13e72e315e6b1dedef64ce02f5003545991770234f0ee355610cb28667",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 0,
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
        "triggerFile": "/home/src/projects/project/a/a.ts",
        "configFile": "/home/src/projects/project/a/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/a/tsconfig.json
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
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/a: *new*
  {}

Projects::
/home/src/projects/project/a/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/a/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/home/src/projects/project/a/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 2,
      "success": true
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/a.ts: *new*
  {}
/home/src/projects/project/a/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/a:
  {}

Projects::
/home/src/projects/project/a/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/a.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/a/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/b.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/b.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/b.ts SVC-1-0 ""


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	b.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/home/src/projects/project/a/a.ts


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/a 1 undefined Config: /home/src/projects/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/a 1 undefined Config: /home/src/projects/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/a/tsconfig.json 2000 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/a/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

PolledWatches *deleted*::
/home/src/projects/project/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project/a/a.ts:
  {}
/home/src/projects/project/a/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/home/src/projects/project/a:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/projects/project/a/tsconfig.json (Configured) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
    noOpenRef: true
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/projects/project/a/a.ts *deleted*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /home/src/projects/project/a/tsconfig.json *deleted*
/home/src/projects/project/b.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /dev/null/inferredProject1* *new*
        /home/src/projects/project/a/tsconfig.json *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/a/a.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/a.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/a/tsconfig.json, currentDirectory: /home/src/projects/project/a
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/tsconfig.json 2000 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/a/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/a/a.ts"
 ],
 "options": {
  "configFilePath": "/home/src/projects/project/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/a/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/a/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Config: /home/src/projects/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Config: /home/src/projects/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/a.ts SVC-2-0 ""


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/a/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/projects/project/a/a.ts",
        "configFile": "/home/src/projects/project/a/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/a/tsconfig.json
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
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/a/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/a: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/projects/project/a/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/a.ts (Open) *new*
    version: SVC-2-0
    containingProjects: 1
        /home/src/projects/project/a/tsconfig.json *default*
/home/src/projects/project/b.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/projects/project/a/tsconfig.json *new*
