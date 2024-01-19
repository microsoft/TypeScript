currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/file1.ts]
let x = [1, 2];


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/proj1.csproj",
        "rootFiles": [
          {
            "fileName": "/a/file1.ts"
          }
        ],
        "options": {}
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Loading global plugin myplugin
Info seq  [hh:mm:ss:mss] Enabling plugin myplugin from candidate paths: /a/lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Loading myplugin from /a/lib/tsc.js/../../.. (resolved to /a/lib/tsc.js/../../../node_modules)
Info seq  [hh:mm:ss:mss] Plugin validation succeeded
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/proj1.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/proj1.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/proj1.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/proj1.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/file1.ts Text-1 "let x = [1, 2];"


	file1.ts
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
          "projectId": "6de66c42d673e2588b28b51b7d7183410c48b2853c20dcd6fba10cd859223e64",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 15,
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
/a/file1.ts: *new*
  {}
