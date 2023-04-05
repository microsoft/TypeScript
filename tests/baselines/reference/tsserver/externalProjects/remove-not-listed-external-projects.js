currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
let x = 1

//// [/b/app.ts]
let x = 1

//// [/c/app.ts]
let x = 1


Info 1    [00:00:16.000] request:
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
Info 2    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/app.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:18.000] Starting updateGraphWorker: Project: /a/app.ts.csproj
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app.ts.csproj WatchType: Missing file
Info 5    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/app.ts.csproj WatchType: Type roots
Info 6    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/app.ts.csproj WatchType: Type roots
Info 7    [00:00:22.000] Finishing updateGraphWorker: Project: /a/app.ts.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:23.000] Project '/a/app.ts.csproj' (External)
Info 9    [00:00:24.000] 	Files (1)
	/a/app.ts Text-1 "let x = 1"


	app.ts
	  Root file specified for compilation

Info 10   [00:00:25.000] -----------------------------------------------
Info 11   [00:00:26.000] FileWatcher:: Added:: WatchInfo: /b/app.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:27.000] Starting updateGraphWorker: Project: /b/app.ts.csproj
Info 13   [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/app.ts.csproj WatchType: Missing file
Info 14   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/app.ts.csproj WatchType: Type roots
Info 15   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/app.ts.csproj WatchType: Type roots
Info 16   [00:00:31.000] Finishing updateGraphWorker: Project: /b/app.ts.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:32.000] Project '/b/app.ts.csproj' (External)
Info 18   [00:00:33.000] 	Files (1)
	/b/app.ts Text-1 "let x = 1"


	app.ts
	  Root file specified for compilation

Info 19   [00:00:34.000] -----------------------------------------------
Info 20   [00:00:35.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}
/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/app.ts: *new*
  {}
/b/app.ts: *new*
  {}

Before request

Info 21   [00:00:36.000] request:
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
Info 22   [00:00:37.000] Starting updateGraphWorker: Project: /a/app.ts.csproj
Info 23   [00:00:38.000] Finishing updateGraphWorker: Project: /a/app.ts.csproj Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:39.000] Same program as before
Info 25   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /c/app.ts 500 undefined WatchType: Closed Script info
Info 26   [00:00:41.000] Starting updateGraphWorker: Project: /c/app.ts.csproj
Info 27   [00:00:42.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /c/app.ts.csproj WatchType: Missing file
Info 28   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /c/node_modules/@types 1 undefined Project: /c/app.ts.csproj WatchType: Type roots
Info 29   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/node_modules/@types 1 undefined Project: /c/app.ts.csproj WatchType: Type roots
Info 30   [00:00:45.000] Finishing updateGraphWorker: Project: /c/app.ts.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 31   [00:00:46.000] Project '/c/app.ts.csproj' (External)
Info 32   [00:00:47.000] 	Files (1)
	/c/app.ts Text-1 "let x = 1"


	app.ts
	  Root file specified for compilation

Info 33   [00:00:48.000] -----------------------------------------------
Info 34   [00:00:49.000] `remove Project::
Info 35   [00:00:50.000] Project '/b/app.ts.csproj' (External)
Info 36   [00:00:51.000] 	Files (1)
	/b/app.ts


	app.ts
	  Root file specified for compilation

Info 37   [00:00:52.000] -----------------------------------------------
Info 38   [00:00:53.000] DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/app.ts.csproj WatchType: Type roots
Info 39   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/app.ts.csproj WatchType: Type roots
Info 40   [00:00:55.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/app.ts.csproj WatchType: Missing file
Info 41   [00:00:56.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/c/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/app.ts:
  {}
/b/app.ts:
  {}
/c/app.ts: *new*
  {}

Before request

Info 42   [00:00:57.000] request:
    {
      "command": "openExternalProjects",
      "arguments": {
        "projects": []
      },
      "seq": 3,
      "type": "request"
    }
Info 43   [00:00:58.000] `remove Project::
Info 44   [00:00:59.000] Project '/a/app.ts.csproj' (External)
Info 45   [00:01:00.000] 	Files (1)
	/a/app.ts


	app.ts
	  Root file specified for compilation

Info 46   [00:01:01.000] -----------------------------------------------
Info 47   [00:01:02.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/app.ts.csproj WatchType: Type roots
Info 48   [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/app.ts.csproj WatchType: Type roots
Info 49   [00:01:04.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app.ts.csproj WatchType: Missing file
Info 50   [00:01:05.000] `remove Project::
Info 51   [00:01:06.000] Project '/c/app.ts.csproj' (External)
Info 52   [00:01:07.000] 	Files (1)
	/c/app.ts


	app.ts
	  Root file specified for compilation

Info 53   [00:01:08.000] -----------------------------------------------
Info 54   [00:01:09.000] DirectoryWatcher:: Close:: WatchInfo: /c/node_modules/@types 1 undefined Project: /c/app.ts.csproj WatchType: Type roots
Info 55   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/node_modules/@types 1 undefined Project: /c/app.ts.csproj WatchType: Type roots
Info 56   [00:01:11.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /c/app.ts.csproj WatchType: Missing file
Info 57   [00:01:12.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches *deleted*::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/c/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/app.ts:
  {}
/b/app.ts:
  {}
/c/app.ts:
  {}

Before request

Info 58   [00:01:13.000] request:
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
Info 59   [00:01:14.000] Starting updateGraphWorker: Project: /b/app.ts.csproj
Info 60   [00:01:15.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/app.ts.csproj WatchType: Missing file
Info 61   [00:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/app.ts.csproj WatchType: Type roots
Info 62   [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/app.ts.csproj WatchType: Type roots
Info 63   [00:01:18.000] Finishing updateGraphWorker: Project: /b/app.ts.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 64   [00:01:19.000] Project '/b/app.ts.csproj' (External)
Info 65   [00:01:20.000] 	Files (1)
	/b/app.ts Text-1 "let x = 1"


	app.ts
	  Root file specified for compilation

Info 66   [00:01:21.000] -----------------------------------------------
Info 67   [00:01:22.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/app.ts:
  {}
/b/app.ts:
  {}
/c/app.ts:
  {}
