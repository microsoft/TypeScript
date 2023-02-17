TI:: Creating typing installer
//// [/main.ts]
import { value, valueA, valueB, valueC, renamedD, valueE, valueF } from "./mod";

//// [/mod.ts]
export const value = 0;
export const [valueA, valueB] = [0, 1];
export const { valueC, valueD: renamedD } = { valueC: 0, valueD: 1 };
export const { nest: [valueE, { valueF }] } = { nest: [0, { valueF: 1 }] };


//// [/tsconfig.json]
{}


TI:: [00:00:09.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:10.000] Processing cache location '/a/data/'
TI:: [00:00:11.000] Trying to find '/a/data/package.json'...
TI:: [00:00:12.000] Finished processing cache location '/a/data/'
TI:: [00:00:13.000] Npm config file: /a/data/package.json
TI:: [00:00:14.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:21.000] Updating types-registry npm package...
TI:: [00:00:22.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:29.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:30.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:31.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/main.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:32.000] Search path: /
Info 3    [00:00:33.000] For info: /main.ts :: Config file name: /tsconfig.json
Info 4    [00:00:34.000] Creating configuration project /tsconfig.json
Info 5    [00:00:35.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:36.000] Config: /tsconfig.json : {
 "rootNames": [
  "/main.ts",
  "/mod.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:39.000] FileWatcher:: Added:: WatchInfo: /mod.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:40.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 11   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 12   [00:00:42.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:43.000] Project '/tsconfig.json' (Configured)
Info 14   [00:00:44.000] 	Files (2)
	/mod.ts
	/main.ts


	mod.ts
	  Imported via "./mod" from file 'main.ts'
	  Matched by default include pattern '**/*'
	main.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:45.000] -----------------------------------------------
Info 16   [00:00:46.000] Project '/tsconfig.json' (Configured)
Info 16   [00:00:47.000] 	Files (2)

Info 16   [00:00:48.000] -----------------------------------------------
Info 16   [00:00:49.000] Open files: 
Info 16   [00:00:50.000] 	FileName: /main.ts ProjectRootPath: undefined
Info 16   [00:00:51.000] 		Projects: /tsconfig.json
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

Info 16   [00:00:52.000] response:
    {
      "responseRequired": false
    }
Info 17   [00:00:53.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/mod.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

Info 18   [00:00:54.000] FileWatcher:: Close:: WatchInfo: /mod.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:55.000] Search path: /
Info 20   [00:00:56.000] For info: /mod.ts :: Config file name: /tsconfig.json
Info 21   [00:00:57.000] Project '/tsconfig.json' (Configured)
Info 21   [00:00:58.000] 	Files (2)

Info 21   [00:00:59.000] -----------------------------------------------
Info 21   [00:01:00.000] Open files: 
Info 21   [00:01:01.000] 	FileName: /main.ts ProjectRootPath: undefined
Info 21   [00:01:02.000] 		Projects: /tsconfig.json
Info 21   [00:01:03.000] 	FileName: /mod.ts ProjectRootPath: undefined
Info 21   [00:01:04.000] 		Projects: /tsconfig.json
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

Info 21   [00:01:05.000] response:
    {
      "responseRequired": false
    }
Info 22   [00:01:06.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/mod.ts",
        "line": 3,
        "offset": 16
      },
      "seq": 3,
      "type": "request"
    }
Before request

Info 23   [00:01:07.000] Finding references to /mod.ts position 79 in project /tsconfig.json
After request

Info 24   [00:01:08.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/mod.ts",
            "start": {
              "line": 3,
              "offset": 16
            },
            "end": {
              "line": 3,
              "offset": 22
            },
            "contextStart": {
              "line": 3,
              "offset": 1
            },
            "contextEnd": {
              "line": 3,
              "offset": 70
            },
            "lineText": "export const { valueC, valueD: renamedD } = { valueC: 0, valueD: 1 };",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/main.ts",
            "start": {
              "line": 1,
              "offset": 33
            },
            "end": {
              "line": 1,
              "offset": 39
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
              "line": 3,
              "offset": 47
            },
            "end": {
              "line": 3,
              "offset": 53
            },
            "contextStart": {
              "line": 3,
              "offset": 47
            },
            "contextEnd": {
              "line": 3,
              "offset": 56
            },
            "lineText": "export const { valueC, valueD: renamedD } = { valueC: 0, valueD: 1 };",
            "isWriteAccess": true,
            "isDefinition": false
          }
        ],
        "symbolName": "valueC",
        "symbolStartOffset": 16,
        "symbolDisplayString": "const valueC: number"
      },
      "responseRequired": true
    }