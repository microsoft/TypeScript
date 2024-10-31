Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/b/app.ts]


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
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/home/src/projects/project/a/b/test.csproj",
        "options": {},
        "rootFiles": [
          {
            "fileName": "/home/src/projects/project/a/b/app.ts"
          },
          {
            "fileName": "/home/src/projects/project/a/b/applib.ts"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /home/src/projects/project/a/b/test.csproj, currentDirectory: /home/src/projects/project/a/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/b/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/applib.ts 500 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/b/test.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/b/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/b/app.ts Text-1 ""


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "40b689b7a53b389e06cd1dee760441874cf94cbde9e4b08375636489724d1cc6",
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
          "compileOnSave": true,
          "configFileName": "other",
          "projectType": "external",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/b/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/b/applib.ts: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/b/app.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/home/src/projects/project/a/b/test.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/projects/project/a/b/app.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/test.csproj
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/test.csproj

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/home/src/projects/project/a/b/test.csproj"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "message": "File '/home/src/projects/project/a/b/applib.ts' not found.\n  The file is in the program because:\n    Root file specified for compilation",
          "category": "error",
          "code": 6053
        }
      ],
      "responseRequired": true
    }
After request

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project/a/b/app.ts 2:: WatchInfo: /home/src/projects/project/a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/a/b/test.csproj
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/a/b/app.ts 2:: WatchInfo: /home/src/projects/project/a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project/a/b/applib.ts 0:: WatchInfo: /home/src/projects/project/a/b/applib.ts 500 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/a/b/applib.ts 500 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/a/b/test.csproj, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/a/b/applib.ts 0:: WatchInfo: /home/src/projects/project/a/b/applib.ts 500 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Missing file
Before request
//// [/home/src/projects/project/a/b/applib.ts]


//// [/home/src/projects/project/a/b/app.ts] deleted

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/project/a/b/applib.ts:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/b/app.ts:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

Timeout callback:: count: 1
2: /home/src/projects/project/a/b/test.csproj *new*

Projects::
/home/src/projects/project/a/b/test.csproj (External) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

ScriptInfos::
/home/src/projects/project/a/b/app.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/project/a/b/test.csproj *deleted*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/test.csproj

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/home/src/projects/project/a/b/test.csproj"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/b/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/applib.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/app.ts 500 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/b/test.csproj projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/b/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/b/applib.ts Text-1 ""


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	applib.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "message": "File '/home/src/projects/project/a/b/app.ts' not found.\n  The file is in the program because:\n    Root file specified for compilation",
          "category": "error",
          "code": 6053
        }
      ],
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/b/app.ts:
  {}
/home/src/projects/project/a/b/applib.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

Projects::
/home/src/projects/project/a/b/test.csproj (External) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/projects/project/a/b/app.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project/a/b/applib.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/test.csproj
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/test.csproj

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project/a/b/app.ts 0:: WatchInfo: /home/src/projects/project/a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/a/b/app.ts 0:: WatchInfo: /home/src/projects/project/a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project/a/b/app.ts 0:: WatchInfo: /home/src/projects/project/a/b/app.ts 500 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/a/b/app.ts 500 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/a/b/test.csproj, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/a/b/app.ts 0:: WatchInfo: /home/src/projects/project/a/b/app.ts 500 undefined Project: /home/src/projects/project/a/b/test.csproj WatchType: Missing file
Before request
//// [/home/src/projects/project/a/b/app.ts]



Timeout callback:: count: 1
2: /home/src/projects/project/a/b/test.csproj *deleted*
3: /home/src/projects/project/a/b/test.csproj *new*

Projects::
/home/src/projects/project/a/b/test.csproj (External) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/projects/project/a/b/app.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0
/home/src/projects/project/a/b/applib.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/test.csproj
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/test.csproj

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/home/src/projects/project/a/b/test.csproj"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/b/test.csproj
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/b/test.csproj projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/b/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/b/applib.ts Text-1 ""
	/home/src/projects/project/a/b/app.ts Text-1 ""


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	applib.ts
	  Root file specified for compilation
	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
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
/home/src/projects/project/a/b/test.csproj (External) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/projects/project/a/b/app.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /home/src/projects/project/a/b/test.csproj *new*
/home/src/projects/project/a/b/applib.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/test.csproj
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/test.csproj
