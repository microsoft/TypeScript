currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app.ts.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/app.ts Text-1 "let x = 1"


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /b/app.ts.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /b/app.ts.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/b/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/app.ts Text-1 "let x = 1"


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
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
/a/app.ts: *new*
  {}
/b/app.ts: *new*
  {}

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
            },
            "typeAcquisition": {
              "include": [],
              "exclude": [],
              "enable": false
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app.ts.csproj Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /c/app.ts.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /c/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /c/app.ts.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/c/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/app.ts Text-1 "let x = 1"


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/b/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/app.ts


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
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
            },
            "typeAcquisition": {
              "include": [],
              "exclude": [],
              "enable": false
            }
          }
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /b/app.ts.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/app.ts.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /b/app.ts.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/b/app.ts.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/app.ts Text-1 "let x = 1"


	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
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
/a/app.ts:
  {}
/b/app.ts:
  {}
/c/app.ts:
  {}
