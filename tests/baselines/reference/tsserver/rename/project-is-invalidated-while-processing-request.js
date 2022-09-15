Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:16.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/proj/a.ts"
      }
    }
Before request
//// [/tsconfig.json]
{}

//// [/proj/tsconfig.json]
{"compilerOptions":{"composite":true},"exclude":["**/__test__/"]}

//// [/proj/a.ts]
export const x = 1;

//// [/proj/__test__/a.test.ts]
import { x } from "../a";
x.toString();



PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:17.000] Search path: /proj
Info 3    [00:00:18.000] For info: /proj/a.ts :: Config file name: /proj/tsconfig.json
Info 4    [00:00:19.000] Creating configuration project /proj/tsconfig.json
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /proj/tsconfig.json 2000 undefined Project: /proj/tsconfig.json WatchType: Config file
Info 6    [00:00:21.000] Config: /proj/tsconfig.json : {
 "rootNames": [
  "/proj/a.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/proj/tsconfig.json"
 }
}
Info 7    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /proj 1 undefined Config: /proj/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj 1 undefined Config: /proj/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:24.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [00:00:25.000] Starting updateGraphWorker: Project: /proj/tsconfig.json
Info 11   [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /proj/tsconfig.json WatchType: Missing file
Info 12   [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /proj/tsconfig.json WatchType: Type roots
Info 13   [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/node_modules/@types 1 undefined Project: /proj/tsconfig.json WatchType: Type roots
Info 14   [00:00:29.000] Finishing updateGraphWorker: Project: /proj/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:30.000] Project '/proj/tsconfig.json' (Configured)
Info 16   [00:00:31.000] 	Files (1)
	/proj/a.ts


	a.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:32.000] -----------------------------------------------
Info 18   [00:00:33.000] Search path: /proj
Info 19   [00:00:34.000] For info: /proj/tsconfig.json :: Config file name: /tsconfig.json
Info 20   [00:00:35.000] Creating configuration project /tsconfig.json
Info 21   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 22   [00:00:37.000] Search path: /
Info 23   [00:00:38.000] For info: /tsconfig.json :: No config files found.
Info 24   [00:00:39.000] Project '/proj/tsconfig.json' (Configured)
Info 24   [00:00:40.000] 	Files (1)

Info 24   [00:00:41.000] -----------------------------------------------
Info 24   [00:00:42.000] Project '/tsconfig.json' (Configured)
Info 24   [00:00:43.000] 	Files (0) InitialLoadPending

Info 24   [00:00:44.000] -----------------------------------------------
Info 24   [00:00:45.000] Open files: 
Info 24   [00:00:46.000] 	FileName: /proj/a.ts ProjectRootPath: undefined
Info 24   [00:00:47.000] 		Projects: /proj/tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/proj/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/proj/tsconfig.json:
  {}
/tsconfig.json:
  {}

FsWatchesRecursive::
/proj:
  {}

Info 24   [00:00:48.000] response:
    {
      "responseRequired": false
    }
Info 25   [00:00:49.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/proj/__test__/a.test.ts"
      }
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/proj/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/proj/tsconfig.json:
  {}
/tsconfig.json:
  {}

FsWatchesRecursive::
/proj:
  {}

Info 26   [00:00:50.000] Search path: /proj/__test__
Info 27   [00:00:51.000] For info: /proj/__test__/a.test.ts :: Config file name: /proj/tsconfig.json
Info 28   [00:00:52.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 29   [00:00:53.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 30   [00:00:54.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 31   [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /proj/__test__/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 32   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /proj/__test__/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 33   [00:00:57.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [00:00:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 35   [00:00:59.000] 	Files (2)
	/proj/a.ts
	/proj/__test__/a.test.ts


	../a.ts
	  Imported via "../a" from file 'a.test.ts'
	a.test.ts
	  Root file specified for compilation

Info 36   [00:01:00.000] -----------------------------------------------
Info 37   [00:01:01.000] Project '/proj/tsconfig.json' (Configured)
Info 37   [00:01:02.000] 	Files (1)

Info 37   [00:01:03.000] -----------------------------------------------
Info 37   [00:01:04.000] Project '/tsconfig.json' (Configured)
Info 37   [00:01:05.000] 	Files (0) InitialLoadPending

Info 37   [00:01:06.000] -----------------------------------------------
Info 37   [00:01:07.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 37   [00:01:08.000] 	Files (2)

Info 37   [00:01:09.000] -----------------------------------------------
Info 37   [00:01:10.000] Open files: 
Info 37   [00:01:11.000] 	FileName: /proj/a.ts ProjectRootPath: undefined
Info 37   [00:01:12.000] 		Projects: /proj/tsconfig.json,/dev/null/inferredProject1*
Info 37   [00:01:13.000] 	FileName: /proj/__test__/a.test.ts ProjectRootPath: undefined
Info 37   [00:01:14.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/proj/node_modules/@types:
  {"pollingInterval":500}
/proj/__test__/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/proj/tsconfig.json:
  {}
/tsconfig.json:
  {}

FsWatchesRecursive::
/proj:
  {}

Info 37   [00:01:15.000] response:
    {
      "responseRequired": false
    }
Info 38   [00:01:16.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/proj/a.ts",
        "line": 1,
        "offset": 14
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/proj/node_modules/@types:
  {"pollingInterval":500}
/proj/__test__/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/proj/tsconfig.json:
  {}
/tsconfig.json:
  {}

FsWatchesRecursive::
/proj:
  {}

Info 39   [00:01:17.000] Finding references to /proj/a.ts position 13 in project /proj/tsconfig.json
Info 40   [00:01:18.000] Finding references to /proj/a.ts position 13 in project /dev/null/inferredProject1*
Info 41   [00:01:19.000] Loading configured project /tsconfig.json
Info 42   [00:01:20.000] Config: /tsconfig.json : {
 "rootNames": [
  "/proj/a.ts",
  "/proj/__test__/a.test.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 43   [00:01:21.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 44   [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 45   [00:01:23.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 46   [00:01:24.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 47   [00:01:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 48   [00:01:26.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 49   [00:01:27.000] Project '/tsconfig.json' (Configured)
Info 50   [00:01:28.000] 	Files (2)
	/proj/a.ts
	/proj/__test__/a.test.ts


	proj/a.ts
	  Matched by default include pattern '**/*'
	  Imported via "../a" from file 'proj/__test__/a.test.ts'
	proj/__test__/a.test.ts
	  Matched by default include pattern '**/*'

Info 51   [00:01:29.000] -----------------------------------------------
Info 52   [00:01:30.000] Finding references to /proj/a.ts position 13 in project /tsconfig.json
Info 53   [00:01:31.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 54   [00:01:32.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 55   [00:01:33.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 56   [00:01:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 57   [00:01:35.000] 	Files (0)



Info 58   [00:01:36.000] -----------------------------------------------
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/proj/node_modules/@types:
  {"pollingInterval":500}
/proj/__test__/node_modules/@types:
  {"pollingInterval":500}
/proj/__test__/bower_components:
  {"pollingInterval":500}
/proj/__test__/node_modules:
  {"pollingInterval":500}

FsWatches::
/proj/tsconfig.json:
  {}
/tsconfig.json:
  {}

FsWatchesRecursive::
/proj:
  {}
/:
  {}

Info 59   [00:01:37.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/proj/a.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 15
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 20
            },
            "lineText": "export const x = 1;",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/proj/__test__/a.test.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 11
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 26
            },
            "lineText": "import { x } from \"../a\";",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/proj/__test__/a.test.ts",
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 2
            },
            "lineText": "x.toString();",
            "isWriteAccess": false,
            "isDefinition": false
          }
        ],
        "symbolName": "x",
        "symbolStartOffset": 14,
        "symbolDisplayString": "const x: 1"
      },
      "responseRequired": true
    }