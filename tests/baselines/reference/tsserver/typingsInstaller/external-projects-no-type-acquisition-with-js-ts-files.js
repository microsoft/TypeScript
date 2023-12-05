currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/jquery.js]


//// [/a/b/file2.ts]



Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/app/test.csproj",
        "options": {
          "allowJS": true,
          "moduleResolution": 2
        },
        "rootFiles": [
          {
            "fileName": "/a/b/jquery.js"
          },
          {
            "fileName": "/a/b/file2.ts"
          }
        ],
        "typeAcquisition": {}
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/jquery.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app/test.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/b/jquery.js Text-1 ""
	/a/b/file2.ts Text-1 ""


	../b/jquery.js
	  Root file specified for compilation
	../b/file2.ts
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
          "projectId": "6011e60969d97dd67a30c213a0f84e4df5372512e4d76256ab889fe749192088",
          "fileStats": {
            "js": 1,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "allowJS": true,
            "moduleResolution": "node10"
          },
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
/a/b/file2.ts: *new*
  {}
/a/b/jquery.js: *new*
  {}
