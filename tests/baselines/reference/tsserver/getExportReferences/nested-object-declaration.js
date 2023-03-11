Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/main.ts"
      },
      "seq": 1,
      "type": "request"
    }
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
	/mod.ts Text-1 "export const value = 0;\nexport const [valueA, valueB] = [0, 1];\nexport const { valueC, valueD: renamedD } = { valueC: 0, valueD: 1 };\nexport const { nest: [valueE, { valueF }] } = { nest: [0, { valueF: 1 }] };\n"
	/main.ts SVC-1-0 "import { value, valueA, valueB, valueC, renamedD, valueE, valueF } from \"./mod\";"


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
Info 16   [00:00:31.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/mod.ts: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

Before request

Info 17   [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/mod.ts"
      },
      "seq": 2,
      "type": "request"
    }
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
Info 21   [00:00:44.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}

FsWatches *deleted*::
/mod.ts:
  {}

FsWatchesRecursive::
/:
  {}

Before request

Info 22   [00:00:45.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/mod.ts",
        "line": 4,
        "offset": 33
      },
      "seq": 3,
      "type": "request"
    }
Info 23   [00:00:46.000] Finding references to /mod.ts position 166 in project /tsconfig.json
Info 24   [00:00:47.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/mod.ts",
            "start": {
              "line": 4,
              "offset": 33
            },
            "end": {
              "line": 4,
              "offset": 39
            },
            "contextStart": {
              "line": 4,
              "offset": 1
            },
            "contextEnd": {
              "line": 4,
              "offset": 76
            },
            "lineText": "export const { nest: [valueE, { valueF }] } = { nest: [0, { valueF: 1 }] };",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/main.ts",
            "start": {
              "line": 1,
              "offset": 59
            },
            "end": {
              "line": 1,
              "offset": 65
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
          },
          {
            "file": "/mod.ts",
            "start": {
              "line": 4,
              "offset": 61
            },
            "end": {
              "line": 4,
              "offset": 67
            },
            "contextStart": {
              "line": 4,
              "offset": 61
            },
            "contextEnd": {
              "line": 4,
              "offset": 70
            },
            "lineText": "export const { nest: [valueE, { valueF }] } = { nest: [0, { valueF: 1 }] };",
            "isWriteAccess": true,
            "isDefinition": false
          }
        ],
        "symbolName": "valueF",
        "symbolStartOffset": 33,
        "symbolDisplayString": "const valueF: number"
      },
      "responseRequired": true
    }
After request
