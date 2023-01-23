Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a.ts]
export const a = 0;

//// [/tsconfig.json]
{ "files": ["./a.ts"] }


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:09.000] Search path: /
Info 3    [00:00:10.000] For info: /a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:11.000] Creating configuration project /tsconfig.json
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:13.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:14.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 8    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 9    [00:00:16.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:17.000] Project '/tsconfig.json' (Configured)
Info 11   [00:00:18.000] 	Files (1)
	/a.ts


	a.ts
	  Part of 'files' list in tsconfig.json

Info 12   [00:00:19.000] -----------------------------------------------
Info 13   [00:00:20.000] Project '/tsconfig.json' (Configured)
Info 13   [00:00:21.000] 	Files (1)

Info 13   [00:00:22.000] -----------------------------------------------
Info 13   [00:00:23.000] Open files: 
Info 13   [00:00:24.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 13   [00:00:25.000] 		Projects: /tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::

Info 13   [00:00:26.000] response:
    {
      "responseRequired": false
    }
Info 14   [00:00:27.000] request:
    {
      "command": "getEditsForRefactor",
      "arguments": {
        "refactor": "Move to a new file",
        "action": "Move to a new file",
        "file": "/a.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 20
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::

Info 15   [00:00:28.000] response:
    {
      "response": {
        "edits": [
          {
            "fileName": "/a.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 1
                },
                "end": {
                  "line": 1,
                  "offset": 20
                },
                "newText": ""
              }
            ]
          },
          {
            "fileName": "/tsconfig.json",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 21
                },
                "end": {
                  "line": 1,
                  "offset": 21
                },
                "newText": ", \"./a.1.ts\""
              }
            ]
          },
          {
            "fileName": "/a.1.ts",
            "textChanges": [
              {
                "start": {
                  "line": 0,
                  "offset": 0
                },
                "end": {
                  "line": 0,
                  "offset": 0
                },
                "newText": "export const a = 0;\n"
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }