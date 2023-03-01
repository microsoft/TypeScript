Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/a.ts]
function f() {}

//// [/a/tsconfig.json]
{"compilerOptions":{"declaration":true,"declarationMap":true,"outFile":"../bin/a.js"}}

//// [/b/b.ts]
f();

//// [/b/tsconfig.json]
{"references":[{"path":"../a"}]}

//// [/bin/a.d.ts]
declare function f(): void;
//# sourceMappingURL=a.d.ts.map

//// [/bin/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../a/a.ts"],"names":[],"mappings":"AAAA,iBAAS,CAAC,SAAK"}


Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Search path: /a
Info 3    [00:00:24.000] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /a/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/a.ts"
 ],
 "options": {
  "declaration": true,
  "declarationMap": true,
  "outFile": "/bin/a.js",
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 10   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 11   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 12   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [00:00:34.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:35.000] Project '/a/tsconfig.json' (Configured)
Info 15   [00:00:36.000] 	Files (1)
	/a/a.ts SVC-1-0 "function f() {}"


	a.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:37.000] -----------------------------------------------
Info 17   [00:00:38.000] Project '/a/tsconfig.json' (Configured)
Info 17   [00:00:39.000] 	Files (1)

Info 17   [00:00:40.000] -----------------------------------------------
Info 17   [00:00:41.000] Open files: 
Info 17   [00:00:42.000] 	FileName: /a/a.ts ProjectRootPath: undefined
Info 17   [00:00:43.000] 		Projects: /a/tsconfig.json
Info 17   [00:00:44.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

ts.getFileEmitOutput: /a/a.ts: {
 "outputFiles": [
  {
   "name": "/bin/a.d.ts.map",
   "writeByteOrderMark": false,
   "text": "{\"version\":3,\"file\":\"a.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../a/a.ts\"],\"names\":[],\"mappings\":\"AAAA,iBAAS,CAAC,SAAK\"}"
  },
  {
   "name": "/bin/a.d.ts",
   "writeByteOrderMark": false,
   "text": "declare function f(): void;\n//# sourceMappingURL=a.d.ts.map"
  }
 ],
 "emitSkipped": false,
 "diagnostics": []
}
Before request

Info 18   [00:00:45.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 19   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /a/a.ts 500 undefined WatchType: Closed Script info
Info 20   [00:00:47.000] Project '/a/tsconfig.json' (Configured)
Info 20   [00:00:48.000] 	Files (1)

Info 20   [00:00:49.000] -----------------------------------------------
Info 20   [00:00:50.000] Open files: 
Info 20   [00:00:51.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/a.ts: *new*
  {}

FsWatchesRecursive::
/a:
  {}

Before request

Info 21   [00:00:52.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b/b.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 22   [00:00:53.000] Search path: /b
Info 23   [00:00:54.000] For info: /b/b.ts :: Config file name: /b/tsconfig.json
Info 24   [00:00:55.000] Creating configuration project /b/tsconfig.json
Info 25   [00:00:56.000] FileWatcher:: Added:: WatchInfo: /b/tsconfig.json 2000 undefined Project: /b/tsconfig.json WatchType: Config file
Info 26   [00:00:57.000] Config: /b/tsconfig.json : {
 "rootNames": [
  "/b/b.ts"
 ],
 "options": {
  "configFilePath": "/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/a",
   "originalPath": "../a"
  }
 ]
}
Info 27   [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 28   [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Info 29   [00:01:00.000] Starting updateGraphWorker: Project: /b/tsconfig.json
Info 30   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/tsconfig.json WatchType: Missing file
Info 31   [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 32   [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Info 33   [00:01:04.000] Finishing updateGraphWorker: Project: /b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [00:01:05.000] Project '/b/tsconfig.json' (Configured)
Info 35   [00:01:06.000] 	Files (2)
	/a/a.ts SVC-1-0 "function f() {}"
	/b/b.ts SVC-1-0 "f();"


	../a/a.ts
	  Source from referenced project '../a/tsconfig.json' included because '--module' is specified as 'none'
	b.ts
	  Matched by default include pattern '**/*'

Info 36   [00:01:07.000] -----------------------------------------------
Info 37   [00:01:08.000] Project '/a/tsconfig.json' (Configured)
Info 37   [00:01:09.000] 	Files (1)

Info 37   [00:01:10.000] -----------------------------------------------
Info 37   [00:01:11.000] Project '/b/tsconfig.json' (Configured)
Info 37   [00:01:12.000] 	Files (2)

Info 37   [00:01:13.000] -----------------------------------------------
Info 37   [00:01:14.000] Open files: 
Info 37   [00:01:15.000] 	FileName: /b/b.ts ProjectRootPath: undefined
Info 37   [00:01:16.000] 		Projects: /b/tsconfig.json
Info 37   [00:01:17.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/tsconfig.json:
  {}
/a/a.ts:
  {}
/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a:
  {}
/b: *new*
  {}

Before request

Info 38   [00:01:18.000] request:
    {
      "command": "references-full",
      "arguments": {
        "file": "/b/b.ts",
        "line": 1,
        "offset": 1
      },
      "seq": 4,
      "type": "request"
    }
Info 39   [00:01:19.000] Finding references to /b/b.ts position 0 in project /b/tsconfig.json
Info 40   [00:01:20.000] Search path: /a
Info 41   [00:01:21.000] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info 42   [00:01:22.000] Search path: /a
Info 43   [00:01:23.000] For info: /a/a.ts :: Config file name: /a/tsconfig.json
Info 44   [00:01:24.000] Finding references to /a/a.ts position 9 in project /a/tsconfig.json
Info 45   [00:01:25.000] response:
    {
      "response": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/a/a.ts",
            "kind": "function",
            "name": "function f(): void",
            "textSpan": {
              "start": 9,
              "length": 1
            },
            "displayParts": [
              {
                "text": "function",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "f",
                "kind": "functionName"
              },
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": ":",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "void",
                "kind": "keyword"
              }
            ],
            "contextSpan": {
              "start": 0,
              "length": 15
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 9,
                "length": 1
              },
              "fileName": "/a/a.ts",
              "contextSpan": {
                "start": 0,
                "length": 15
              },
              "isWriteAccess": true
            },
            {
              "textSpan": {
                "start": 0,
                "length": 1
              },
              "fileName": "/b/b.ts",
              "isWriteAccess": false
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
