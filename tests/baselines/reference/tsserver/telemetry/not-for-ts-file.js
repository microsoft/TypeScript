currentDirectory:: / useCaseSensitiveFileNames: false
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
Info 6    [00:00:11.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:13.000] 	Files (1)
	/a.ts SVC-1-0 ""


	a.ts
	  Root file specified for compilation

Info 9    [00:00:14.000] -----------------------------------------------
Info 10   [00:00:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:16.000] 	Files (1)

Info 10   [00:00:17.000] -----------------------------------------------
Info 10   [00:00:18.000] Open files: 
Info 10   [00:00:19.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 10   [00:00:20.000] 		Projects: /dev/null/inferredProject1*
Info 10   [00:00:21.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
