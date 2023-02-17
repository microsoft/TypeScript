TI:: [00:00:05.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:06.000] Processing cache location '/a/data/'
TI:: [00:00:07.000] Trying to find '/a/data/package.json'...
TI:: [00:00:08.000] Finished processing cache location '/a/data/'
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts",
        "fileContent": "1 = 2;"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a.ts]
1 = 2;


Info 2    [00:00:11.000] Search path: /
Info 3    [00:00:12.000] For info: /a.ts :: No config files found.
Info 4    [00:00:13.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:17.000] 	Files (1)
	/a.ts


	a.ts
	  Root file specified for compilation

Info 9    [00:00:18.000] -----------------------------------------------
Info 10   [00:00:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:20.000] 	Files (1)

Info 10   [00:00:21.000] -----------------------------------------------
Info 10   [00:00:22.000] Open files: 
Info 10   [00:00:23.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 10   [00:00:24.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Info 10   [00:00:25.000] response:
    {
      "responseRequired": false
    }
Checking timeout queue length: 0

Info 11   [00:00:26.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/a.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

Info 12   [00:00:27.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
After request

Info 13   [00:00:28.000] response:
    {
      "responseRequired": false
    }
Checking timeout queue length: 0

Info 14   [00:00:29.000] request:
    {
      "command": "geterrForProject",
      "arguments": {
        "delay": 0,
        "file": "/a.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

Info 15   [00:00:30.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
After request

Info 16   [00:00:31.000] response:
    {
      "responseRequired": false
    }
Checking timeout queue length: 0
