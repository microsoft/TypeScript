currentDirectory:: / useCaseSensitiveFileNames: false newLine: 

Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
var x = 1;
var y = 2;


Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:09.000] Search path: /a
Info 3    [00:00:10.000] For info: /a/app.ts :: No config files found.
Info 4    [00:00:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:13.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:17.000] 	Files (1)
	/a/app.ts SVC-1-0 "var x = 1;\nvar y = 2;"


	app.ts
	  Root file specified for compilation

Info 11   [00:00:18.000] -----------------------------------------------
Info 12   [00:00:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:20.000] 	Files (1)

Info 12   [00:00:21.000] -----------------------------------------------
Info 12   [00:00:22.000] Open files: 
Info 12   [00:00:23.000] 	FileName: /a/app.ts ProjectRootPath: undefined
Info 12   [00:00:24.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:00:25.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

Before request

Info 13   [00:00:26.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:29.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/a/app.js]
var x = 1;
var y = 2;



currentDirectory:: / useCaseSensitiveFileNames: false newLine: 

Info 15   [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/app.ts]
var x = 1;
var y = 2;


Info 16   [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 17   [00:00:09.000] Search path: /a
Info 18   [00:00:10.000] For info: /a/app.ts :: No config files found.
Info 19   [00:00:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 21   [00:00:13.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:00:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:00:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:17.000] 	Files (1)
	/a/app.ts SVC-1-0 "var x = 1;\r\nvar y = 2;"


	app.ts
	  Root file specified for compilation

Info 26   [00:00:18.000] -----------------------------------------------
Info 27   [00:00:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:00:20.000] 	Files (1)

Info 27   [00:00:21.000] -----------------------------------------------
Info 27   [00:00:22.000] Open files: 
Info 27   [00:00:23.000] 	FileName: /a/app.ts ProjectRootPath: undefined
Info 27   [00:00:24.000] 		Projects: /dev/null/inferredProject1*
Info 27   [00:00:25.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

Before request

Info 28   [00:00:26.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/a/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 29   [00:00:29.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/a/app.js]
var x = 1;
var y = 2;


