currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]


//// [/a/b/lib.ts]


//// [/a/b/tsconfig.json]
"files":["app.ts","lib.ts"]}


Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] Search path: /a/b
Info 3    [00:00:16.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:17.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:19.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts",
  "/a/b/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/lib.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:21.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 10   [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:25.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:26.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:27.000] 	Files (2)
	/a/b/app.ts SVC-1-0 ""
	/a/b/lib.ts Text-1 ""


	app.ts
	  Part of 'files' list in tsconfig.json
	lib.ts
	  Part of 'files' list in tsconfig.json

Info 15   [00:00:28.000] -----------------------------------------------
Info 16   [00:00:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:30.000] 	Files (2)

Info 16   [00:00:31.000] -----------------------------------------------
Info 16   [00:00:32.000] Open files: 
Info 16   [00:00:33.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 16   [00:00:34.000] 		Projects: /a/b/tsconfig.json
Info 16   [00:00:35.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b/lib.ts: *new*
  {}

Before request

Info 17   [00:00:36.000] request:
    {
      "command": "synchronizeProjectList",
      "arguments": {
        "knownProjects": []
      },
      "seq": 2,
      "type": "request"
    }
Info 18   [00:00:37.000] response:
    {
      "response": [
        {
          "info": {
            "projectName": "/a/b/tsconfig.json",
            "version": 1,
            "isInferred": false,
            "options": {
              "configFilePath": "/a/b/tsconfig.json",
              "allowNonTsExtensions": true
            },
            "languageServiceDisabled": false
          },
          "files": [
            "/a/b/app.ts",
            "/a/b/lib.ts",
            "/a/b/tsconfig.json"
          ],
          "projectErrors": []
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 19   [00:00:38.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/tsconfig.json",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info 20   [00:00:39.000] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 8
          },
          "text": "'{' expected.",
          "code": 1005,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
After request

Info 21   [00:00:43.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 22   [00:00:44.000] Scheduled: /a/b/tsconfig.json
Info 23   [00:00:45.000] Scheduled: *ensureProjectForOpenFiles*
Info 24   [00:00:46.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before request
//// [/a/b/tsconfig.json]
{"files":["app.ts","lib.ts"]}


Info 25   [00:00:47.000] request:
    {
      "command": "synchronizeProjectList",
      "arguments": {
        "knownProjects": []
      },
      "seq": 4,
      "type": "request"
    }
Info 26   [00:00:48.000] Reloading configured project /a/b/tsconfig.json
Info 27   [00:00:49.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts",
  "/a/b/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 28   [00:00:50.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 29   [00:00:51.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 30   [00:00:52.000] Project '/a/b/tsconfig.json' (Configured)
Info 31   [00:00:53.000] 	Files (2)
	/a/b/app.ts SVC-1-0 ""
	/a/b/lib.ts Text-1 ""

Info 32   [00:00:54.000] -----------------------------------------------
Info 33   [00:00:55.000] response:
    {
      "response": [
        {
          "info": {
            "projectName": "/a/b/tsconfig.json",
            "version": 1,
            "isInferred": false,
            "options": {
              "configFilePath": "/a/b/tsconfig.json",
              "allowNonTsExtensions": true
            },
            "languageServiceDisabled": false
          },
          "files": [
            "/a/b/app.ts",
            "/a/b/lib.ts",
            "/a/b/tsconfig.json"
          ],
          "projectErrors": []
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 34   [00:00:56.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/tsconfig.json",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 5,
      "type": "request"
    }
Info 35   [00:00:57.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
