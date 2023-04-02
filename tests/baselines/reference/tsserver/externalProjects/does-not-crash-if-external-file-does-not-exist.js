currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/file1.ts]
let x = [1, 2];


Info 1    [00:00:08.000] request:
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
Info 2    [00:00:09.000] Loading global plugin myplugin
Info 3    [00:00:10.000] Enabling plugin myplugin from candidate paths: /a/lib/tsc.js/../../..
Info 4    [00:00:11.000] Loading myplugin from /a/lib/tsc.js/../../.. (resolved to /a/lib/tsc.js/../../../node_modules)
Info 5    [00:00:12.000] Plugin validation succeeded
Info 6    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 7    [00:00:14.000] Starting updateGraphWorker: Project: /a/proj1.csproj
Info 8    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/proj1.csproj WatchType: Missing file
Info 9    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/proj1.csproj WatchType: Type roots
Info 10   [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/proj1.csproj WatchType: Type roots
Info 11   [00:00:18.000] Finishing updateGraphWorker: Project: /a/proj1.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:19.000] Project '/a/proj1.csproj' (External)
Info 13   [00:00:20.000] 	Files (1)
	/a/file1.ts Text-1 "let x = [1, 2];"


	file1.ts
	  Root file specified for compilation

Info 14   [00:00:21.000] -----------------------------------------------
Info 15   [00:00:22.000] response:
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

FsWatches::
/a/file1.ts: *new*
  {}
