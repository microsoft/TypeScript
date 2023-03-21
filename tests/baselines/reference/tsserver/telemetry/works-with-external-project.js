Info 0    [00:00:05.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]



Info 1    [00:00:06.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a.ts"
          }
        ],
        "options": {
          "strict": true
        },
        "projectFileName": "/hunter2/foo.csproj"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:07.000] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:08.000] Starting updateGraphWorker: Project: /hunter2/foo.csproj
Info 4    [00:00:09.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /hunter2/foo.csproj WatchType: Missing file
Info 5    [00:00:10.000] DirectoryWatcher:: Added:: WatchInfo: /hunter2/node_modules/@types 1 undefined Project: /hunter2/foo.csproj WatchType: Type roots
Info 6    [00:00:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /hunter2/node_modules/@types 1 undefined Project: /hunter2/foo.csproj WatchType: Type roots
Info 7    [00:00:12.000] Finishing updateGraphWorker: Project: /hunter2/foo.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:13.000] Project '/hunter2/foo.csproj' (External)
Info 9    [00:00:14.000] 	Files (1)
	/a.ts Text-1 ""


	../a.ts
	  Root file specified for compilation

Info 10   [00:00:15.000] -----------------------------------------------
Info 11   [00:00:16.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"ef055f5036459f2705212d5657970dd7bc0280bdb6fa2cddd17d0cd73eb2a989","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":0,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{"strict":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"compileOnSave":true,"configFileName":"other","projectType":"external","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 12   [00:00:17.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/hunter2/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a.ts: *new*
  {}

Before request

Info 13   [00:00:18.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:19.000] FileWatcher:: Close:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:20.000] Project '/hunter2/foo.csproj' (External)
Info 15   [00:00:21.000] 	Files (1)

Info 15   [00:00:22.000] -----------------------------------------------
Info 15   [00:00:23.000] Open files: 
Info 15   [00:00:24.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 15   [00:00:25.000] 		Projects: /hunter2/foo.csproj
Info 15   [00:00:26.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/hunter2/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/a.ts:
  {}

Before request

Info 16   [00:00:27.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 17   [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:29.000] Project '/hunter2/foo.csproj' (External)
Info 18   [00:00:30.000] 	Files (1)

Info 18   [00:00:31.000] -----------------------------------------------
Info 18   [00:00:32.000] Open files: 
Info 18   [00:00:33.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/hunter2/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a.ts: *new*
  {}

Before request

Info 19   [00:00:34.000] request:
    {
      "command": "closeExternalProject",
      "arguments": {
        "projectFileName": "/hunter2/foo.csproj"
      },
      "seq": 4,
      "type": "request"
    }
Info 20   [00:00:35.000] `remove Project::
Info 21   [00:00:36.000] Project '/hunter2/foo.csproj' (External)
Info 22   [00:00:37.000] 	Files (1)
	/a.ts


	../a.ts
	  Root file specified for compilation

Info 23   [00:00:38.000] -----------------------------------------------
Info 24   [00:00:39.000] DirectoryWatcher:: Close:: WatchInfo: /hunter2/node_modules/@types 1 undefined Project: /hunter2/foo.csproj WatchType: Type roots
Info 25   [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /hunter2/node_modules/@types 1 undefined Project: /hunter2/foo.csproj WatchType: Type roots
Info 26   [00:00:41.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /hunter2/foo.csproj WatchType: Missing file
Info 27   [00:00:42.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches *deleted*::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/hunter2/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

Before request

Info 28   [00:00:43.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a.ts"
          }
        ],
        "options": {
          "strict": true,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true
        },
        "projectFileName": "/hunter2/foo.csproj"
      },
      "seq": 5,
      "type": "request"
    }
Info 29   [00:00:44.000] Starting updateGraphWorker: Project: /hunter2/foo.csproj
Info 30   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /hunter2/foo.csproj WatchType: Missing file
Info 31   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /hunter2/node_modules/@types 1 undefined Project: /hunter2/foo.csproj WatchType: Type roots
Info 32   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /hunter2/node_modules/@types 1 undefined Project: /hunter2/foo.csproj WatchType: Type roots
Info 33   [00:00:48.000] Finishing updateGraphWorker: Project: /hunter2/foo.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [00:00:49.000] Project '/hunter2/foo.csproj' (External)
Info 35   [00:00:50.000] 	Files (1)
	/a.ts Text-1 ""


	../a.ts
	  Root file specified for compilation

Info 36   [00:00:51.000] -----------------------------------------------
Info 37   [00:00:52.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/hunter2/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a.ts:
  {}

Before request

Info 38   [00:00:53.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info 39   [00:00:54.000] FileWatcher:: Close:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info 40   [00:00:55.000] Project '/hunter2/foo.csproj' (External)
Info 40   [00:00:56.000] 	Files (1)

Info 40   [00:00:57.000] -----------------------------------------------
Info 40   [00:00:58.000] Open files: 
Info 40   [00:00:59.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 40   [00:01:00.000] 		Projects: /hunter2/foo.csproj
Info 40   [00:01:01.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/hunter2/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/a.ts:
  {}
