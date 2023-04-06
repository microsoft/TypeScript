currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let x = 1

//// [/a/b/tsconfig.json]
{"include":[]}


Info 1    [00:00:12.000] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "lazyConfiguredProjectsFromExternalProject": false
        }
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
Info 3    [00:00:14.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 4    [00:00:15.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/project.csproj",
        "rootFiles": [
          {
            "fileName": "/a/b/app.ts"
          },
          {
            "fileName": "/A/B/tsconfig.json"
          }
        ],
        "options": {}
      },
      "seq": 2,
      "type": "request"
    }
Info 5    [00:00:16.000] Creating configuration project /A/B/tsconfig.json
Info 6    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /A/B/tsconfig.json 2000 undefined Project: /A/B/tsconfig.json WatchType: Config file
Info 7    [00:00:18.000] Config: /A/B/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/A/B/tsconfig.json"
 }
}
Info 8    [00:00:19.000] Starting updateGraphWorker: Project: /A/B/tsconfig.json
Info 9    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /A/B/node_modules/@types 1 undefined Project: /A/B/tsconfig.json WatchType: Type roots
Info 10   [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /A/B/node_modules/@types 1 undefined Project: /A/B/tsconfig.json WatchType: Type roots
Info 11   [00:00:22.000] Finishing updateGraphWorker: Project: /A/B/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:23.000] Project '/A/B/tsconfig.json' (Configured)
Info 13   [00:00:24.000] 	Files (0)

Info 14   [00:00:25.000] -----------------------------------------------
Info 15   [00:00:26.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

Before request

Info 16   [00:00:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 17   [00:00:28.000] Search path: /a/b
Info 18   [00:00:29.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 19   [00:00:30.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 21   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:36.000] 	Files (1)
	/a/b/app.ts SVC-1-0 "let x = 1"


	app.ts
	  Root file specified for compilation

Info 26   [00:00:37.000] -----------------------------------------------
Info 27   [00:00:38.000] Project '/A/B/tsconfig.json' (Configured)
Info 27   [00:00:39.000] 	Files (0)

Info 27   [00:00:40.000] -----------------------------------------------
Info 27   [00:00:41.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:00:42.000] 	Files (1)

Info 27   [00:00:43.000] -----------------------------------------------
Info 27   [00:00:44.000] Open files: 
Info 27   [00:00:45.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 27   [00:00:46.000] 		Projects: /dev/null/inferredProject1*
Info 27   [00:00:47.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
