Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/main.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/main.ts]
import { value, valueA, valueB, valueC, renamedD, valueE, valueF } from "./mod";

//// [/mod.ts]
export const value = 0;
export const [valueA, valueB] = [0, 1];
export const { valueC, valueD: renamedD } = { valueC: 0, valueD: 1 };
export const { nest: [valueE, { valueF }] } = { nest: [0, { valueF: 1 }] };


//// [/tsconfig.json]
{}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:11.000] Search path: /
Info 3    [00:00:12.000] For info: /main.ts :: Config file name: /tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] Config: /tsconfig.json : {
 "rootNames": [
  "/main.ts",
  "/mod.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:16.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /mod.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:19.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 11   [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 12   [00:00:21.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:22.000] Project '/tsconfig.json' (Configured)
Info 14   [00:00:23.000] 	Files (2)
	/mod.ts
	/main.ts


	mod.ts
	  Imported via "./mod" from file 'main.ts'
	  Matched by default include pattern '**/*'
	main.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:24.000] -----------------------------------------------
Info 16   [00:00:25.000] Project '/tsconfig.json' (Configured)
Info 16   [00:00:26.000] 	Files (2)

Info 16   [00:00:27.000] -----------------------------------------------
Info 16   [00:00:28.000] Open files: 
Info 16   [00:00:29.000] 	FileName: /main.ts ProjectRootPath: undefined
Info 16   [00:00:30.000] 		Projects: /tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/mod.ts:
  {}

FsWatchesRecursive::
/:
  {}

Info 16   [00:00:31.000] response:
    {
      "responseRequired": false
    }
Info 17   [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/mod.ts"
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
/mod.ts:
  {}

FsWatchesRecursive::
/:
  {}

Info 18   [00:00:33.000] FileWatcher:: Close:: WatchInfo: /mod.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:34.000] Search path: /
Info 20   [00:00:35.000] For info: /mod.ts :: Config file name: /tsconfig.json
Info 21   [00:00:36.000] Project '/tsconfig.json' (Configured)
Info 21   [00:00:37.000] 	Files (2)

Info 21   [00:00:38.000] -----------------------------------------------
Info 21   [00:00:39.000] Open files: 
Info 21   [00:00:40.000] 	FileName: /main.ts ProjectRootPath: undefined
Info 21   [00:00:41.000] 		Projects: /tsconfig.json
Info 21   [00:00:42.000] 	FileName: /mod.ts ProjectRootPath: undefined
Info 21   [00:00:43.000] 		Projects: /tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::
/:
  {}

Info 21   [00:00:44.000] response:
    {
      "responseRequired": false
    }
Info 22   [00:00:45.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/mod.ts",
        "line": 2,
        "offset": 15
      },
      "seq": 3,
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
/:
  {}

Info 23   [00:00:46.000] Finding references to /mod.ts position 38 in project /tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatchesRecursive::
/:
  {}

Info 24   [00:00:47.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/mod.ts",
            "start": {
              "line": 2,
              "offset": 15
            },
            "end": {
              "line": 2,
              "offset": 21
            },
            "contextStart": {
              "line": 2,
              "offset": 1
            },
            "contextEnd": {
              "line": 2,
              "offset": 40
            },
            "lineText": "export const [valueA, valueB] = [0, 1];",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/main.ts",
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 81
            },
            "lineText": "import { value, valueA, valueB, valueC, renamedD, valueE, valueF } from \"./mod\";",
            "isWriteAccess": true,
            "isDefinition": false
          }
        ],
        "symbolName": "valueA",
        "symbolStartOffset": 15,
        "symbolDisplayString": "const valueA: number"
      },
      "responseRequired": true
    }