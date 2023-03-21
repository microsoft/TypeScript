Info 0    [00:00:05.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]



Info 1    [00:00:06.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:07.000] Search path: /
Info 3    [00:00:08.000] For info: /a.ts :: No config files found.
Info 4    [00:00:09.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:10.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:11.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:13.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:15.000] 	Files (1)
	/a.ts SVC-1-0 ""


	a.ts
	  Root file specified for compilation

Info 11   [00:00:16.000] -----------------------------------------------
Info 12   [00:00:17.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:18.000] 	Files (1)

Info 12   [00:00:19.000] -----------------------------------------------
Info 12   [00:00:20.000] Open files: 
Info 12   [00:00:21.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 12   [00:00:22.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:00:23.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types: *new*
  {"pollingInterval":500}

Before request

Info 13   [00:00:24.000] request:
    {
      "command": "getApplicableRefactors",
      "arguments": {
        "file": "/a.ts",
        "line": 1,
        "offset": 1
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:25.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
