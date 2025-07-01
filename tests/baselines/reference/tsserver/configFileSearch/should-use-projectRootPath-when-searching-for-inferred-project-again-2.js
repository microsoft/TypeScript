Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/a/b/projects/project/src/file1.ts]


//// [/home/a/b/projects/project/src/tsconfig.json]
{}

//// [/home/a/b/projects/tsconfig.json]
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
        "file": "/home/a/b/projects/project/src/file1.ts",
        "projectRootPath": "/home/a/b/projects/project"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/a/b/projects/project/src/file1.ts ProjectRootPath: /home/a/b/projects/project:: Result: /home/a/b/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/a/b/projects/project/src/tsconfig.json, currentDirectory: /home/a/b/projects/project/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/a/b/projects/project/src/tsconfig.json 2000 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/a/b/projects/project/src/tsconfig.json : {
 "rootNames": [
  "/home/a/b/projects/project/src/file1.ts"
 ],
 "options": {
  "configFilePath": "/home/a/b/projects/project/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/a/b/projects/project/src/tsconfig.json",
        "reason": "Creating possible configured project for /home/a/b/projects/project/src/file1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/project/src 1 undefined Config: /home/a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/project/src 1 undefined Config: /home/a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/a/b/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/project/src/node_modules/@types 1 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/project/src/node_modules/@types 1 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/project/node_modules/@types 1 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/project/node_modules/@types 1 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/node_modules/@types 1 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/node_modules/@types 1 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/a/b/node_modules/@types 1 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/a/b/node_modules/@types 1 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/a/b/projects/project/src/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/a/b/projects/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/a/b/projects/project/src/file1.ts SVC-1-0 ""


	../../../../../src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/a/b/projects/project/src/tsconfig.json"
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
          "projectId": "c5ce0657e5f6666fa3dd6d4eb184aeda48955201ad8ce3b3e344e55f7a15ac04",
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
        "triggerFile": "/home/a/b/projects/project/src/file1.ts",
        "configFile": "/home/a/b/projects/project/src/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/a/b/projects/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/a/b/projects/project/src/file1.ts ProjectRootPath: /home/a/b/projects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/a/b/projects/project/src/tsconfig.json
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
/home/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/a/b/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/a/b/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/a/b/projects/project/src/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/a/b/projects/project/src/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/a/b/projects/project/src: *new*
  {}

Projects::
/home/a/b/projects/project/src/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/a/b/projects/project/src/file1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/a/b/projects/project/src/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/a/b/projects/project/src/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/a/b/projects/project/src/tsconfig.json 2:: WatchInfo: /home/a/b/projects/project/src/tsconfig.json 2000 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/a/b/projects/project/src/file1.ts ProjectRootPath: /home/a/b/projects/project:: Result: undefined
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/a/b/projects/project/src/tsconfig.json 2:: WatchInfo: /home/a/b/projects/project/src/tsconfig.json 2000 undefined Project: /home/a/b/projects/project/src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/a/b/projects/project/src/tsconfig.json :: WatchInfo: /home/a/b/projects/project/src 1 undefined Config: /home/a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /home/a/b/projects/project/src/tsconfig.json Detected file add/remove of non supported extension: /home/a/b/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/a/b/projects/project/src/tsconfig.json :: WatchInfo: /home/a/b/projects/project/src 1 undefined Config: /home/a/b/projects/project/src/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 1
1: *ensureProjectForOpenFiles*
//// [/home/a/b/projects/project/src/tsconfig.json] deleted

Timeout callback:: count: 1
1: *ensureProjectForOpenFiles* *new*

Projects::
/home/a/b/projects/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    isOrphan: true *changed*
    deferredClose: true *changed*
    autoImportProviderHost: undefined *changed*

Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/a/b/projects/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/a/b/projects/project/src/file1.ts ProjectRootPath: /home/a/b/projects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/a/b/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/a/b/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/a/b/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/a/b/projects/project/src/file1.ts SVC-1-0 ""


	../../../../src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/a/b/projects/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/a/b/projects/project/src/file1.ts ProjectRootPath: /home/a/b/projects/project
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*,/home/a/b/projects/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/a/b/projects/project/src/file1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/a/b/projects/project/src/file1.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/a/b/node_modules/@types:
  {"pollingInterval":500}
/home/a/b/projects/node_modules/@types:
  {"pollingInterval":500}
/home/a/b/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/a/b/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/a/b/projects/project/src/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/a/b/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/home/a/b/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/a/b/projects/project/src/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/a/b/projects/project/src:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/a/b/projects/project/src/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    isOrphan: true
    deferredClose: true

ScriptInfos::
/home/a/b/projects/project/src/file1.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 2 *changed*
        /dev/null/inferredProject1* *default* *new*
        /home/a/b/projects/project/src/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/a/b/projects/project/src/tsconfig.json
        /dev/null/inferredProject1* *new*
