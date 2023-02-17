TI:: Creating typing installer

TI:: [00:00:03.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:04.000] Processing cache location '/a/data/'
TI:: [00:00:05.000] Trying to find '/a/data/package.json'...
TI:: [00:00:06.000] Finished processing cache location '/a/data/'
TI:: [00:00:07.000] Npm config file: /a/data/package.json
TI:: [00:00:08.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:15.000] Updating types-registry npm package...
TI:: [00:00:16.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:23.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:24.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:25.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [],
        "closedFiles": [],
        "openFiles": [
          {
            "file": "^/untitled/ts-nul-authority/Untitled-1",
            "fileContent": "function fn(Foo: number) {\r\n     type Foo = typeof Foo;\r\n    return 0 as any as {x: Foo};\r\n}",
            "scriptKindName": "TS"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:26.000] Search path: ^/untitled/ts-nul-authority
Info 3    [00:00:27.000] For info: ^/untitled/ts-nul-authority/Untitled-1 :: No config files found.
Info 4    [00:00:28.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:32.000] 	Files (1)
	^/untitled/ts-nul-authority/Untitled-1


	^/untitled/ts-nul-authority/Untitled-1
	  Root file specified for compilation

Info 9    [00:00:33.000] -----------------------------------------------
Info 10   [00:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:35.000] 	Files (1)

Info 10   [00:00:36.000] -----------------------------------------------
Info 10   [00:00:37.000] Open files: 
Info 10   [00:00:38.000] 	FileName: ^/untitled/ts-nul-authority/Untitled-1 ProjectRootPath: undefined
Info 10   [00:00:39.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Info 10   [00:00:40.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 11   [00:00:41.000] request:
    {
      "command": "encodedSemanticClassifications-full",
      "arguments": {
        "file": "^/untitled/ts-nul-authority/Untitled-1",
        "start": 0,
        "length": 128,
        "format": "2020"
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request

Info 12   [00:00:42.000] response:
    {
      "response": {
        "spans": [
          9,
          2,
          2817,
          12,
          3,
          1536,
          38,
          3,
          1537,
          51,
          3,
          1536,
          81,
          1,
          2561,
          84,
          3,
          1536
        ],
        "endOfLineState": 0
      },
      "responseRequired": true
    }
Info 13   [00:00:43.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "^/untitled/ts-nul-authority/Untitled-1"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Before request

After request

Info 14   [00:00:44.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

Info 15   [00:00:45.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"^/untitled/ts-nul-authority/Untitled-1","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 16   [00:00:46.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"^/untitled/ts-nul-authority/Untitled-1","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 17   [00:00:47.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"^/untitled/ts-nul-authority/Untitled-1","diagnostics":[]}}
Info 18   [00:00:48.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)
