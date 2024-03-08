currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]


//// [/a/lib/lib.d.ts]
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/test.csproj",
        "options": {},
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          },
          {
            "fileName": "/a/b/applib.ts"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/test.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts Text-1 ""


	../lib/lib.d.ts
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
          "projectId": "d68dc94b373a808a0811d3a75a89059832e9aee6c4c266dc78a03cf30f1e3380",
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
            "dtsSize": 334,
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
Info seq  [hh:mm:ss:mss] Project '/a/b/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/applib.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Projects::
/a/b/test.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/b/app.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/test.csproj
/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/test.csproj

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/test.csproj"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "message": "File '/a/b/applib.ts' not found.\n  The file is in the program because:\n    Root file specified for compilation",
          "category": "error",
          "code": 6053
        }
      ],
      "responseRequired": true
    }
After request

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /a/b/app.ts 2:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/test.csproj
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /a/b/app.ts 2:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /a/b/applib.ts 0:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/test.csproj, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /a/b/applib.ts 0:: WatchInfo: /a/b/applib.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Before request
//// [/a/b/applib.ts]


//// [/a/b/app.ts] deleted

PolledWatches *deleted*::
/a/b/applib.ts:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/app.ts:
  {}

Timeout callback:: count: 1
2: /a/b/test.csproj *new*

Projects::
/a/b/test.csproj (External) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

ScriptInfos::
/a/b/app.ts *deleted*
    version: Text-1
    containingProjects: 0 *changed*
        /a/b/test.csproj *deleted*
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/b/test.csproj

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/test.csproj"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/applib.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/test.csproj projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/applib.ts Text-1 ""


	../lib/lib.d.ts
	  Default library for target 'es5'
	applib.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "message": "File '/a/b/app.ts' not found.\n  The file is in the program because:\n    Root file specified for compilation",
          "category": "error",
          "code": 6053
        }
      ],
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/app.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/applib.ts: *new*
  {}
/a/lib/lib.d.ts:
  {}

Projects::
/a/b/test.csproj (External) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
/a/b/applib.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/test.csproj
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/b/test.csproj

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /a/b/app.ts 0:: WatchInfo: /a/b/app.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/test.csproj, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /a/b/app.ts 0:: WatchInfo: /a/b/app.ts 500 undefined Project: /a/b/test.csproj WatchType: Missing file
Before request
//// [/a/b/app.ts]



PolledWatches *deleted*::
/a/b/app.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/applib.ts:
  {}
/a/lib/lib.d.ts:
  {}

Timeout callback:: count: 1
2: /a/b/test.csproj *deleted*
3: /a/b/test.csproj *new*

Projects::
/a/b/test.csproj (External) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/test.csproj"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/test.csproj projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/applib.ts Text-1 ""
	/a/b/app.ts Text-2 ""


	../lib/lib.d.ts
	  Default library for target 'es5'
	applib.ts
	  Root file specified for compilation
	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

FsWatches::
/a/b/app.ts: *new*
  {}
/a/b/applib.ts:
  {}
/a/lib/lib.d.ts:
  {}

Projects::
/a/b/test.csproj (External) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

ScriptInfos::
/a/b/app.ts *new*
    version: Text-2
    containingProjects: 1
        /a/b/test.csproj
/a/b/applib.ts
    version: Text-1
    containingProjects: 1
        /a/b/test.csproj
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/b/test.csproj
