currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let x = 1


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "externalProject",
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          }
        ],
        "options": {}
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: externalProject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: externalProject WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: externalProject Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'externalProject' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/app.ts Text-1 "let x = 1"


	a/b/app.ts
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
          "projectId": "5e52ad9a243e7fdd1977e70ea53e77e20e341aa0bedc54313d7d48c84221c47f",
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
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/app.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts",
        "fileContent": ""
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: externalProject
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: externalProject Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'externalProject' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/app.ts SVC-2-0 ""

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project 'externalProject' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: externalProject
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/b/app.ts:
  {}
