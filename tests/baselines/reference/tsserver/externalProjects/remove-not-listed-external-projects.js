currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
let x = 1

//// [/b/app.ts]
let x = 1

//// [/c/app.ts]
let x = 1


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProjects",
      "arguments": {
        "projects": [
          {
            "projectFileName": "/a/app.ts.csproj",
            "rootFiles": [
              {
                "fileName": "/a/app.ts"
              }
            ],
            "options": {}
          },
          {
            "projectFileName": "/b/app.ts.csproj",
            "rootFiles": [
              {
                "fileName": "/b/app.ts"
              }
            ],
            "options": {}
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app.ts.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app.ts.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/app.ts Text-1 "let x = 1"


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
          "projectId": "b5e911ad2d774738e739568939157f1414e5668f0103383726b38675c673dae9",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 9,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /b/app.ts.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /b/app.ts.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/b/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/app.ts Text-1 "let x = 1"


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
          "projectId": "d35ac039e33108446107a2edec3cba0e0af7abea4ae91ddceb96f50651258987",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 9,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
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
Info seq  [hh:mm:ss:mss] Project '/a/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/b/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

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
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/app.ts: *new*
  {}
/b/app.ts: *new*
  {}

Projects::
/a/app.ts.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/b/app.ts.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/app.ts *new*
    version: Text-1
    containingProjects: 1
        /a/app.ts.csproj
/b/app.ts *new*
    version: Text-1
    containingProjects: 1
        /b/app.ts.csproj

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProjects",
      "arguments": {
        "projects": [
          {
            "projectFileName": "/a/app.ts.csproj",
            "rootFiles": [
              {
                "fileName": "/a/app.ts"
              }
            ],
            "options": {
              "allowNonTsExtensions": true,
              "noEmitForJsFiles": true
            }
          },
          {
            "projectFileName": "/c/app.ts.csproj",
            "rootFiles": [
              {
                "fileName": "/c/app.ts"
              }
            ],
            "options": {}
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app.ts.csproj
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app.ts.csproj projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /c/app.ts.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /c/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /c/app.ts.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/c/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/app.ts Text-1 "let x = 1"


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
          "projectId": "fcb05a41826f42bf4c88e47909dd7e6871d62627c2a042724986c50fc7d98630",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 9,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
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
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/b/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/app.ts


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Project '/a/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/c/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

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
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/app.ts:
  {}
/b/app.ts:
  {}
/c/app.ts: *new*
  {}

Projects::
/a/app.ts.csproj (External) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
/b/app.ts.csproj (External) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
/c/app.ts.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/app.ts
    version: Text-1
    containingProjects: 1
        /a/app.ts.csproj
/b/app.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /b/app.ts.csproj *deleted*
/c/app.ts *new*
    version: Text-1
    containingProjects: 1
        /c/app.ts.csproj

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProjects",
      "arguments": {
        "projects": []
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/a/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/app.ts


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/c/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/app.ts


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /c/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches *deleted*::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/app.ts:
  {}
/b/app.ts:
  {}
/c/app.ts:
  {}

Projects::
/a/app.ts.csproj (External) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    isClosed: true *changed*
/c/app.ts.csproj (External) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*

ScriptInfos::
/a/app.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /a/app.ts.csproj *deleted*
/b/app.ts
    version: Text-1
    containingProjects: 0
/c/app.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /c/app.ts.csproj *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProjects",
      "arguments": {
        "projects": [
          {
            "projectFileName": "/b/app.ts.csproj",
            "rootFiles": [
              {
                "fileName": "/b/app.ts"
              }
            ],
            "options": {
              "allowNonTsExtensions": true,
              "noEmitForJsFiles": true
            }
          }
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /b/app.ts.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /b/app.ts.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/b/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/app.ts Text-1 "let x = 1"


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/b/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

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
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/app.ts:
  {}
/b/app.ts:
  {}
/c/app.ts:
  {}

Projects::
/b/app.ts.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/app.ts
    version: Text-1
    containingProjects: 0
/b/app.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /b/app.ts.csproj *new*
/c/app.ts
    version: Text-1
    containingProjects: 0
