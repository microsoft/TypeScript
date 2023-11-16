currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
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



Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] Search path: /packages/babel-loader/src
Info seq  [hh:mm:ss:mss] For info: /packages/babel-loader/src/index.ts :: Config file name: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/babel-loader/tsconfig.json 2000 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/packages/babel-loader/tsconfig.json",
        "reason": "Creating possible configured project for /packages/babel-loader/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /packages/babel-loader/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/src 1 undefined Config: /packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/src 1 undefined Config: /packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /packages/core/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/core/tsconfig.json 2000 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/core/src 1 undefined Config: /packages/core/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/core/src 1 undefined Config: /packages/core/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/core/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/core/src/loading-indicator.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2018.full.d.ts 500 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/babel-loader/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/packages/core/src/loading-indicator.ts Text-1 "\nexport interface Bar {\n    prop: number;\n}\nconst bar: Bar = {\n    prop: 1\n}\n"
	/packages/core/src/index.ts Text-1 "\nimport { Bar } from \"./loading-indicator.js\";\nexport type Foo = {};\nconst bar: Bar = {\n    prop: 0\n}\n"
	/packages/babel-loader/src/index.ts SVC-1-0 "\nimport type { Foo } from \"../../core/src/index.js\";\n"


	../core/src/loading-indicator.ts
	  Imported via "./loading-indicator.js" from file '../core/src/index.ts'
	../core/src/index.ts
	  Imported via "../../core/src/index.js" from file 'src/index.ts'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/packages/babel-loader/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "b5c9ceadb72d6d15d60a31707ef7d6e2798bddc428873ecb3036d48757a18392",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 232,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "target": "es2018",
            "module": "commonjs",
            "strict": true,
            "esModuleInterop": true,
            "composite": true,
            "rootDir": "",
            "outDir": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": true,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/packages/babel-loader/src/index.ts",
        "configFile": "/packages/babel-loader/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/a/lib/lib.es2018.full.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es2018'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'CallableFunction'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'NewableFunction'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/babel-loader
Info seq  [hh:mm:ss:mss] For info: /packages/babel-loader/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/babel-loader/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.es2018.full.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/packages/babel-loader/tsconfig.json: *new*
  {}
/packages/core/src/index.ts: *new*
  {}
/packages/core/src/loading-indicator.ts: *new*
  {}
/packages/core/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/packages/babel-loader/src: *new*
  {}
/packages/core/src: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /packages/core/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /packages/core/src
Info seq  [hh:mm:ss:mss] For info: /packages/core/src/index.ts :: Config file name: /packages/core/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/core/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/packages/core/tsconfig.json",
        "reason": "Creating possible configured project for /packages/core/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/core/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2018.full.d.ts 500 undefined Project: /packages/core/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/core/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/core/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/packages/core/src/loading-indicator.ts Text-1 "\nexport interface Bar {\n    prop: number;\n}\nconst bar: Bar = {\n    prop: 1\n}\n"
	/packages/core/src/index.ts Text-1 "\nimport { Bar } from \"./loading-indicator.js\";\nexport type Foo = {};\nconst bar: Bar = {\n    prop: 0\n}\n"


	src/loading-indicator.ts
	  Imported via "./loading-indicator.js" from file 'src/index.ts'
	  Matched by include pattern './src' in 'tsconfig.json'
	src/index.ts
	  Matched by include pattern './src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/packages/core/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "ec773ccbd2b6bb7f39f525c229566d00ea24dcfc9cd257b987c2c6551fd8d4c1",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 179,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "target": "es2018",
            "module": "commonjs",
            "strict": true,
            "esModuleInterop": true,
            "composite": true,
            "rootDir": "",
            "outDir": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": true,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/packages/core/src/index.ts",
        "configFile": "/packages/core/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/a/lib/lib.es2018.full.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es2018'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'CallableFunction'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'NewableFunction'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/core
Info seq  [hh:mm:ss:mss] For info: /packages/core/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/core/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/babel-loader/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /packages/core/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/babel-loader/tsconfig.json,/packages/core/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.es2018.full.d.ts:
  {"pollingInterval":500}

FsWatches::
/packages/babel-loader/tsconfig.json:
  {}
/packages/core/src/loading-indicator.ts:
  {}
/packages/core/tsconfig.json:
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

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] Finding references to /packages/core/src/index.ts position 92 in project /packages/core/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/babel-loader/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/packages/babel-loader/src/index.ts SVC-1-1 "\nimport type { Foo } from// comment \"../../core/src/index.js\";\n"


	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/core/dist/loading-indicator.d.ts 2000 undefined Project: /packages/core/tsconfig.json WatchType: Missing generated file
Info seq  [hh:mm:ss:mss] response:
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
/packages/core/dist/loading-indicator.d.ts: *new*
  {"pollingInterval":2000}

FsWatches::
/packages/babel-loader/tsconfig.json:
  {}
/packages/core/src/loading-indicator.ts:
  {}
/packages/core/tsconfig.json:
  {}

FsWatchesRecursive::
/packages/babel-loader/src:
  {}
/packages/core/src:
  {}
