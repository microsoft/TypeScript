currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/project/a.ts]
export const a = {};

//// [/project/b.ts]
import "./a";

//// [/project/c.ts]
import {} from "./a";

//// [/project/d.ts]
import { a } from "/project/a";
type T = typeof import("./a").a;

//// [/project/tsconfig.json]
{}


Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] Search path: /project
Info 3    [00:00:18.000] For info: /project/a.ts :: Config file name: /project/tsconfig.json
Info 4    [00:00:19.000] Creating configuration project /project/tsconfig.json
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /project/tsconfig.json 2000 undefined Project: /project/tsconfig.json WatchType: Config file
Info 6    [00:00:21.000] Config: /project/tsconfig.json : {
 "rootNames": [
  "/project/a.ts",
  "/project/b.ts",
  "/project/c.ts",
  "/project/d.ts"
 ],
 "options": {
  "configFilePath": "/project/tsconfig.json"
 }
}
Info 7    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:25.000] FileWatcher:: Added:: WatchInfo: /project/c.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:26.000] FileWatcher:: Added:: WatchInfo: /project/d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:27.000] Starting updateGraphWorker: Project: /project/tsconfig.json
Info 13   [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /project/tsconfig.json WatchType: Missing file
Info 14   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /project/node_modules/@types 1 undefined Project: /project/tsconfig.json WatchType: Type roots
Info 15   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/node_modules/@types 1 undefined Project: /project/tsconfig.json WatchType: Type roots
Info 16   [00:00:31.000] Finishing updateGraphWorker: Project: /project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:32.000] Project '/project/tsconfig.json' (Configured)
Info 18   [00:00:33.000] 	Files (4)
	/project/a.ts SVC-1-0 "export const a = {};"
	/project/b.ts Text-1 "import \"./a\";"
	/project/c.ts Text-1 "import {} from \"./a\";"
	/project/d.ts Text-1 "import { a } from \"/project/a\";\ntype T = typeof import(\"./a\").a;"


	a.ts
	  Matched by default include pattern '**/*'
	  Imported via "./a" from file 'b.ts'
	  Imported via "./a" from file 'c.ts'
	  Imported via "/project/a" from file 'd.ts'
	  Imported via "./a" from file 'd.ts'
	b.ts
	  Matched by default include pattern '**/*'
	c.ts
	  Matched by default include pattern '**/*'
	d.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:34.000] -----------------------------------------------
Info 20   [00:00:35.000] Project '/project/tsconfig.json' (Configured)
Info 20   [00:00:36.000] 	Files (4)

Info 20   [00:00:37.000] -----------------------------------------------
Info 20   [00:00:38.000] Open files: 
Info 20   [00:00:39.000] 	FileName: /project/a.ts ProjectRootPath: undefined
Info 20   [00:00:40.000] 		Projects: /project/tsconfig.json
Info 20   [00:00:41.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/project/tsconfig.json: *new*
  {}
/project/b.ts: *new*
  {}
/project/c.ts: *new*
  {}
/project/d.ts: *new*
  {}

FsWatchesRecursive::
/project: *new*
  {}

Before request

Info 21   [00:00:42.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 22   [00:00:43.000] FileWatcher:: Close:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Info 23   [00:00:44.000] Search path: /project
Info 24   [00:00:45.000] For info: /project/b.ts :: Config file name: /project/tsconfig.json
Info 25   [00:00:46.000] Project '/project/tsconfig.json' (Configured)
Info 25   [00:00:47.000] 	Files (4)

Info 25   [00:00:48.000] -----------------------------------------------
Info 25   [00:00:49.000] Open files: 
Info 25   [00:00:50.000] 	FileName: /project/a.ts ProjectRootPath: undefined
Info 25   [00:00:51.000] 		Projects: /project/tsconfig.json
Info 25   [00:00:52.000] 	FileName: /project/b.ts ProjectRootPath: undefined
Info 25   [00:00:53.000] 		Projects: /project/tsconfig.json
Info 25   [00:00:54.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/project/tsconfig.json:
  {}
/project/c.ts:
  {}
/project/d.ts:
  {}

FsWatches *deleted*::
/project/b.ts:
  {}

FsWatchesRecursive::
/project:
  {}

Before request

Info 26   [00:00:55.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/c.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 27   [00:00:56.000] FileWatcher:: Close:: WatchInfo: /project/c.ts 500 undefined WatchType: Closed Script info
Info 28   [00:00:57.000] Search path: /project
Info 29   [00:00:58.000] For info: /project/c.ts :: Config file name: /project/tsconfig.json
Info 30   [00:00:59.000] Project '/project/tsconfig.json' (Configured)
Info 30   [00:01:00.000] 	Files (4)

Info 30   [00:01:01.000] -----------------------------------------------
Info 30   [00:01:02.000] Open files: 
Info 30   [00:01:03.000] 	FileName: /project/a.ts ProjectRootPath: undefined
Info 30   [00:01:04.000] 		Projects: /project/tsconfig.json
Info 30   [00:01:05.000] 	FileName: /project/b.ts ProjectRootPath: undefined
Info 30   [00:01:06.000] 		Projects: /project/tsconfig.json
Info 30   [00:01:07.000] 	FileName: /project/c.ts ProjectRootPath: undefined
Info 30   [00:01:08.000] 		Projects: /project/tsconfig.json
Info 30   [00:01:09.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/project/tsconfig.json:
  {}
/project/d.ts:
  {}

FsWatches *deleted*::
/project/c.ts:
  {}

FsWatchesRecursive::
/project:
  {}

Before request

Info 31   [00:01:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/project/d.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 32   [00:01:11.000] FileWatcher:: Close:: WatchInfo: /project/d.ts 500 undefined WatchType: Closed Script info
Info 33   [00:01:12.000] Search path: /project
Info 34   [00:01:13.000] For info: /project/d.ts :: Config file name: /project/tsconfig.json
Info 35   [00:01:14.000] Project '/project/tsconfig.json' (Configured)
Info 35   [00:01:15.000] 	Files (4)

Info 35   [00:01:16.000] -----------------------------------------------
Info 35   [00:01:17.000] Open files: 
Info 35   [00:01:18.000] 	FileName: /project/a.ts ProjectRootPath: undefined
Info 35   [00:01:19.000] 		Projects: /project/tsconfig.json
Info 35   [00:01:20.000] 	FileName: /project/b.ts ProjectRootPath: undefined
Info 35   [00:01:21.000] 		Projects: /project/tsconfig.json
Info 35   [00:01:22.000] 	FileName: /project/c.ts ProjectRootPath: undefined
Info 35   [00:01:23.000] 		Projects: /project/tsconfig.json
Info 35   [00:01:24.000] 	FileName: /project/d.ts ProjectRootPath: undefined
Info 35   [00:01:25.000] 		Projects: /project/tsconfig.json
Info 35   [00:01:26.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/project/tsconfig.json:
  {}

FsWatches *deleted*::
/project/d.ts:
  {}

FsWatchesRecursive::
/project:
  {}

Before request

Info 36   [00:01:27.000] request:
    {
      "command": "fileReferences",
      "arguments": {
        "file": "/project/a.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 37   [00:01:28.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/project/b.ts",
            "start": {
              "line": 1,
              "offset": 9
            },
            "end": {
              "line": 1,
              "offset": 12
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 14
            },
            "lineText": "import \"./a\";",
            "isWriteAccess": false
          },
          {
            "file": "/project/c.ts",
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 20
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 22
            },
            "lineText": "import {} from \"./a\";",
            "isWriteAccess": false
          },
          {
            "file": "/project/d.ts",
            "start": {
              "line": 1,
              "offset": 20
            },
            "end": {
              "line": 1,
              "offset": 30
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 32
            },
            "lineText": "import { a } from \"/project/a\";",
            "isWriteAccess": false
          },
          {
            "file": "/project/d.ts",
            "start": {
              "line": 2,
              "offset": 25
            },
            "end": {
              "line": 2,
              "offset": 28
            },
            "contextStart": {
              "line": 2,
              "offset": 1
            },
            "contextEnd": {
              "line": 2,
              "offset": 33
            },
            "lineText": "type T = typeof import(\"./a\").a;",
            "isWriteAccess": false
          }
        ],
        "symbolName": "\"/project/a.ts\""
      },
      "responseRequired": true
    }
After request
