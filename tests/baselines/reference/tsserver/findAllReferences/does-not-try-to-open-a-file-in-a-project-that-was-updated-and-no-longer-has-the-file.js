Info 0    [00:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/packages/babel-loader/tsconfig.json]

{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "composite": true,
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"],
    "references": [{"path": "../core"}]
}


//// [/packages/babel-loader/src/index.ts]

import type { Foo } from "../../core/src/index.js";


//// [/packages/core/tsconfig.json]

{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "composite": true,
        "rootDir": "./src",
        "outDir": "./dist",
    },
    "include": ["./src"]
}


//// [/packages/core/src/index.ts]

import { Bar } from "./loading-indicator.js";
export type Foo = {};
const bar: Bar = {
    prop: 0
}


//// [/packages/core/src/loading-indicator.ts]

export interface Bar {
    prop: number;
}
const bar: Bar = {
    prop: 1
}



Info 1    [00:00:24.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "openFiles": [
          {
            "file": "/packages/babel-loader/src/index.ts",
            "fileContent": "\nimport type { Foo } from \"../../core/src/index.js\";\n"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:25.000] Search path: /packages/babel-loader/src
Info 3    [00:00:26.000] For info: /packages/babel-loader/src/index.ts :: Config file name: /packages/babel-loader/tsconfig.json
Info 4    [00:00:27.000] Creating configuration project /packages/babel-loader/tsconfig.json
Info 5    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /packages/babel-loader/tsconfig.json 2000 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Config file
Info 6    [00:00:29.000] Config: /packages/babel-loader/tsconfig.json : {
 "rootNames": [
  "/packages/babel-loader/src/index.ts"
 ],
 "options": {
  "target": 5,
  "module": 1,
  "strict": true,
  "esModuleInterop": true,
  "composite": true,
  "rootDir": "/packages/babel-loader/src",
  "outDir": "/packages/babel-loader/dist",
  "configFilePath": "/packages/babel-loader/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/core",
   "originalPath": "../core"
  }
 ]
}
Info 7    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/src 1 undefined Config: /packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/src 1 undefined Config: /packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:32.000] Starting updateGraphWorker: Project: /packages/babel-loader/tsconfig.json
Info 10   [00:00:33.000] Config: /packages/core/tsconfig.json : {
 "rootNames": [
  "/packages/core/src/index.ts",
  "/packages/core/src/loading-indicator.ts"
 ],
 "options": {
  "target": 5,
  "module": 1,
  "strict": true,
  "esModuleInterop": true,
  "composite": true,
  "rootDir": "/packages/core/src",
  "outDir": "/packages/core/dist",
  "configFilePath": "/packages/core/tsconfig.json"
 }
}
Info 11   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /packages/core/tsconfig.json 2000 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Config file
Info 12   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /packages/core/src 1 undefined Config: /packages/core/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/core/src 1 undefined Config: /packages/core/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /packages/core/src/index.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /packages/core/src/loading-indicator.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2018.full.d.ts 500 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Missing file
Info 17   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/node_modules/@types 1 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Type roots
Info 18   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/node_modules/@types 1 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Type roots
Info 19   [00:00:42.000] Finishing updateGraphWorker: Project: /packages/babel-loader/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:00:43.000] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info 21   [00:00:44.000] 	Files (3)
	/packages/core/src/loading-indicator.ts Text-1 "\nexport interface Bar {\n    prop: number;\n}\nconst bar: Bar = {\n    prop: 1\n}\n"
	/packages/core/src/index.ts Text-1 "\nimport { Bar } from \"./loading-indicator.js\";\nexport type Foo = {};\nconst bar: Bar = {\n    prop: 0\n}\n"
	/packages/babel-loader/src/index.ts SVC-1-0 "\nimport type { Foo } from \"../../core/src/index.js\";\n"


	../core/src/loading-indicator.ts
	  Imported via "./loading-indicator.js" from file '../core/src/index.ts'
	../core/src/index.ts
	  Imported via "../../core/src/index.js" from file 'src/index.ts'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 22   [00:00:45.000] -----------------------------------------------
Info 23   [00:00:46.000] Search path: /packages/babel-loader
Info 24   [00:00:47.000] For info: /packages/babel-loader/tsconfig.json :: No config files found.
Info 25   [00:00:48.000] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info 25   [00:00:49.000] 	Files (3)

Info 25   [00:00:50.000] -----------------------------------------------
Info 25   [00:00:51.000] Open files: 
Info 25   [00:00:52.000] 	FileName: /packages/babel-loader/src/index.ts ProjectRootPath: undefined
Info 25   [00:00:53.000] 		Projects: /packages/babel-loader/tsconfig.json
Info 25   [00:00:54.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.es2018.full.d.ts: *new*
  {"pollingInterval":500}
/packages/babel-loader/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/packages/babel-loader/tsconfig.json: *new*
  {}
/packages/core/tsconfig.json: *new*
  {}
/packages/core/src/index.ts: *new*
  {}
/packages/core/src/loading-indicator.ts: *new*
  {}

FsWatchesRecursive::
/packages/babel-loader/src: *new*
  {}
/packages/core/src: *new*
  {}

Before request

Info 26   [00:00:55.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "openFiles": [
          {
            "file": "/packages/core/src/index.ts",
            "fileContent": "\nimport { Bar } from \"./loading-indicator.js\";\nexport type Foo = {};\nconst bar: Bar = {\n    prop: 0\n}\n"
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info 27   [00:00:56.000] FileWatcher:: Close:: WatchInfo: /packages/core/src/index.ts 500 undefined WatchType: Closed Script info
Info 28   [00:00:57.000] Search path: /packages/core/src
Info 29   [00:00:58.000] For info: /packages/core/src/index.ts :: Config file name: /packages/core/tsconfig.json
Info 30   [00:00:59.000] Creating configuration project /packages/core/tsconfig.json
Info 31   [00:01:00.000] Starting updateGraphWorker: Project: /packages/core/tsconfig.json
Info 32   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2018.full.d.ts 500 undefined Project: /packages/core/tsconfig.json WatchType: Missing file
Info 33   [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /packages/core/node_modules/@types 1 undefined Project: /packages/core/tsconfig.json WatchType: Type roots
Info 34   [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/core/node_modules/@types 1 undefined Project: /packages/core/tsconfig.json WatchType: Type roots
Info 35   [00:01:04.000] Finishing updateGraphWorker: Project: /packages/core/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [00:01:05.000] Project '/packages/core/tsconfig.json' (Configured)
Info 37   [00:01:06.000] 	Files (2)
	/packages/core/src/loading-indicator.ts Text-1 "\nexport interface Bar {\n    prop: number;\n}\nconst bar: Bar = {\n    prop: 1\n}\n"
	/packages/core/src/index.ts Text-1 "\nimport { Bar } from \"./loading-indicator.js\";\nexport type Foo = {};\nconst bar: Bar = {\n    prop: 0\n}\n"


	src/loading-indicator.ts
	  Imported via "./loading-indicator.js" from file 'src/index.ts'
	  Matched by include pattern './src' in 'tsconfig.json'
	src/index.ts
	  Matched by include pattern './src' in 'tsconfig.json'

Info 38   [00:01:07.000] -----------------------------------------------
Info 39   [00:01:08.000] Search path: /packages/core
Info 40   [00:01:09.000] For info: /packages/core/tsconfig.json :: No config files found.
Info 41   [00:01:10.000] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info 41   [00:01:11.000] 	Files (3)

Info 41   [00:01:12.000] -----------------------------------------------
Info 41   [00:01:13.000] Project '/packages/core/tsconfig.json' (Configured)
Info 41   [00:01:14.000] 	Files (2)

Info 41   [00:01:15.000] -----------------------------------------------
Info 41   [00:01:16.000] Open files: 
Info 41   [00:01:17.000] 	FileName: /packages/babel-loader/src/index.ts ProjectRootPath: undefined
Info 41   [00:01:18.000] 		Projects: /packages/babel-loader/tsconfig.json
Info 41   [00:01:19.000] 	FileName: /packages/core/src/index.ts ProjectRootPath: undefined
Info 41   [00:01:20.000] 		Projects: /packages/babel-loader/tsconfig.json,/packages/core/tsconfig.json
Info 41   [00:01:21.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.es2018.full.d.ts:
  {"pollingInterval":500}
/packages/babel-loader/node_modules/@types:
  {"pollingInterval":500}
/packages/core/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/packages/babel-loader/tsconfig.json:
  {}
/packages/core/tsconfig.json:
  {}
/packages/core/src/loading-indicator.ts:
  {}

FsWatches *deleted*::
/packages/core/src/index.ts:
  {}

FsWatchesRecursive::
/packages/babel-loader/src:
  {}
/packages/core/src:
  {}

Before request

Info 42   [00:01:22.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/packages/babel-loader/src/index.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 26
                },
                "end": {
                  "line": 1,
                  "offset": 26
                },
                "newText": "// comment"
              }
            ]
          }
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 43   [00:01:23.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info 44   [00:01:24.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/packages/core/src/index.ts",
        "line": 5,
        "offset": 5
      },
      "seq": 4,
      "type": "request"
    }
Info 45   [00:01:25.000] Finding references to /packages/core/src/index.ts position 92 in project /packages/core/tsconfig.json
Info 46   [00:01:26.000] Starting updateGraphWorker: Project: /packages/babel-loader/tsconfig.json
Info 47   [00:01:27.000] Finishing updateGraphWorker: Project: /packages/babel-loader/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 48   [00:01:28.000] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info 49   [00:01:29.000] 	Files (1)
	/packages/babel-loader/src/index.ts SVC-1-1 "\nimport type { Foo } from// comment \"../../core/src/index.js\";\n"


	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 50   [00:01:30.000] -----------------------------------------------
Info 51   [00:01:31.000] FileWatcher:: Added:: WatchInfo: /packages/core/dist/loading-indicator.d.ts 2000 undefined Project: /packages/core/tsconfig.json WatchType: Missing generated file
Info 52   [00:01:32.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/packages/core/src/loading-indicator.ts",
            "start": {
              "line": 3,
              "offset": 5
            },
            "end": {
              "line": 3,
              "offset": 9
            },
            "contextStart": {
              "line": 3,
              "offset": 5
            },
            "contextEnd": {
              "line": 3,
              "offset": 18
            },
            "lineText": "    prop: number;",
            "isWriteAccess": false,
            "isDefinition": false
          },
          {
            "file": "/packages/core/src/loading-indicator.ts",
            "start": {
              "line": 6,
              "offset": 5
            },
            "end": {
              "line": 6,
              "offset": 9
            },
            "contextStart": {
              "line": 6,
              "offset": 5
            },
            "contextEnd": {
              "line": 6,
              "offset": 12
            },
            "lineText": "    prop: 1",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/packages/core/src/index.ts",
            "start": {
              "line": 5,
              "offset": 5
            },
            "end": {
              "line": 5,
              "offset": 9
            },
            "contextStart": {
              "line": 5,
              "offset": 5
            },
            "contextEnd": {
              "line": 5,
              "offset": 12
            },
            "lineText": "    prop: 0",
            "isWriteAccess": true,
            "isDefinition": true
          }
        ],
        "symbolName": "prop",
        "symbolStartOffset": 5,
        "symbolDisplayString": "(property) Bar.prop: number"
      },
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.es2018.full.d.ts:
  {"pollingInterval":500}
/packages/babel-loader/node_modules/@types:
  {"pollingInterval":500}
/packages/core/node_modules/@types:
  {"pollingInterval":500}
/packages/core/dist/loading-indicator.d.ts: *new*
  {"pollingInterval":2000}

FsWatches::
/packages/babel-loader/tsconfig.json:
  {}
/packages/core/tsconfig.json:
  {}
/packages/core/src/loading-indicator.ts:
  {}

FsWatchesRecursive::
/packages/babel-loader/src:
  {}
/packages/core/src:
  {}
