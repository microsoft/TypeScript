currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/packages/lib/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "module": "commonjs"
  }
}

//// [/packages/lib/index.ts]
export const foo = 0;

//// [/packages/app/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "module": "commonjs",
    "paths": {
      "lib": [
        "../lib/index.ts"
      ]
    }
  },
  "references": [
    {
      "path": "../lib"
    }
  ]
}

//// [/packages/app/index.ts]
foo

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }

//// [/packages/app/other.ts]
import { foo } from "../lib";


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "includePackageJsonAutoImports": "auto",
          "includeCompletionsForModuleExports": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/packages/app/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /packages/app/index.ts ProjectRootPath: undefined:: Result: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/app/tsconfig.json 2000 undefined Project: /packages/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/packages/app/tsconfig.json",
        "reason": "Creating possible configured project for /packages/app/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /packages/app/tsconfig.json : {
 "rootNames": [
  "/packages/app/index.ts",
  "/packages/app/other.ts"
 ],
 "options": {
  "composite": true,
  "module": 1,
  "paths": {
   "lib": [
    "../lib/index.ts"
   ]
  },
  "pathsBasePath": "/packages/app",
  "configFilePath": "/packages/app/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/lib",
   "originalPath": "../lib"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/app 1 undefined Config: /packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/app 1 undefined Config: /packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/app/other.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /packages/lib/tsconfig.json : {
 "rootNames": [
  "/packages/lib/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 1,
  "configFilePath": "/packages/lib/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/lib/tsconfig.json 2000 undefined Project: /packages/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/lib 1 undefined Config: /packages/lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/lib 1 undefined Config: /packages/lib/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/app/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/packages/app/index.ts SVC-1-0 "foo"
	/packages/lib/index.ts Text-1 "export const foo = 0;"
	/packages/app/other.ts Text-1 "import { foo } from \"../lib\";"


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by default include pattern '**/*'
	../lib/index.ts
	  Imported via "../lib" from file 'other.ts'
	other.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/packages/app/tsconfig.json"
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
          "projectId": "41bc5dc776489701ec6802cff9284d4bf8ffe94b17414e97e9c5e657c1583d81",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 53,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "module": "commonjs",
            "paths": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
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
        "triggerFile": "/packages/app/index.ts",
        "configFile": "/packages/app/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /packages/app/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/app/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/packages/app/other.ts: *new*
  {}
/packages/app/tsconfig.json: *new*
  {}
/packages/lib/index.ts: *new*
  {}
/packages/lib/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/packages/app: *new*
  {}
/packages/lib: *new*
  {}

Projects::
/packages/app/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /packages/app/tsconfig.json
/packages/app/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /packages/app/tsconfig.json *default*
/packages/app/other.ts *new*
    version: Text-1
    containingProjects: 1
        /packages/app/tsconfig.json
/packages/lib/index.ts *new*
    version: Text-1
    containingProjects: 1
        /packages/app/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/packages/lib/index.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /packages/lib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /packages/lib/index.ts ProjectRootPath: undefined:: Result: /packages/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/packages/lib/tsconfig.json",
        "reason": "Creating possible configured project for /packages/lib/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/lib/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/packages/lib/index.ts Text-1 "export const foo = 0;"


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/packages/lib/tsconfig.json"
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
          "projectId": "7f43865a88af5eec469de22d728bcd7e465169a53d03a9c0ba2e3a754ffbdcef",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 21,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "module": "commonjs"
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
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
        "triggerFile": "/packages/lib/index.ts",
        "configFile": "/packages/lib/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /packages/lib/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/lib/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/app/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /packages/lib/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/app/tsconfig.json,/packages/lib/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

FsWatches::
/a/lib/lib.d.ts:
  {}
/packages/app/other.ts:
  {}
/packages/app/tsconfig.json:
  {}
/packages/lib/tsconfig.json:
  {}

FsWatches *deleted*::
/packages/lib/index.ts:
  {}

FsWatchesRecursive::
/packages/app:
  {}
/packages/lib:
  {}

Projects::
/packages/app/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
/packages/lib/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /packages/app/tsconfig.json
        /packages/lib/tsconfig.json *new*
/packages/app/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /packages/app/tsconfig.json *default*
/packages/app/other.ts
    version: Text-1
    containingProjects: 1
        /packages/app/tsconfig.json
/packages/lib/index.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /packages/app/tsconfig.json
        /packages/lib/tsconfig.json *default* *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/packages/app/index.ts",
        "line": 1,
        "offset": 1,
        "prefix": "foo"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 1 from cache
Info seq  [hh:mm:ss:mss] collectAutoImports: response is incomplete
Info seq  [hh:mm:ss:mss] collectAutoImports: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "optionalReplacementSpan": {
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 4
          }
        },
        "entries": [
          {
            "name": "foo",
            "kind": "const",
            "kindModifiers": "export",
            "sortText": "16",
            "source": "/packages/lib/index",
            "hasAction": true,
            "data": {
              "exportName": "foo",
              "exportMapKey": "3 * foo ",
              "fileName": "/packages/lib/index.ts"
            }
          }
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/packages/lib/index.ts",
            "textChanges": [
              {
                "newText": "export const food = 0;",
                "start": {
                  "line": 1,
                  "offset": 1
                },
                "end": {
                  "line": 1,
                  "offset": 3
                }
              }
            ]
          }
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/packages/app/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
/packages/lib/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /packages/app/tsconfig.json
        /packages/lib/tsconfig.json
/packages/app/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /packages/app/tsconfig.json *default*
/packages/app/other.ts
    version: Text-1
    containingProjects: 1
        /packages/app/tsconfig.json
/packages/lib/index.ts (Open) *changed*
    version: SVC-2-1 *changed*
    containingProjects: 2
        /packages/app/tsconfig.json
        /packages/lib/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/app/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/packages/app/index.ts SVC-1-0 "foo"
	/packages/lib/index.ts SVC-2-1 "export const food = 0;port const foo = 0;"
	/packages/app/other.ts Text-1 "import { foo } from \"../lib\";"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Before request

Projects::
/packages/app/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
/packages/lib/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/packages/app/index.ts",
        "line": 1,
        "offset": 1,
        "prefix": "foo"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 0 module specifiers, plus 0 ambient and 1 from cache
Info seq  [hh:mm:ss:mss] collectAutoImports: response is incomplete
Info seq  [hh:mm:ss:mss] collectAutoImports: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "flags": 1,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "optionalReplacementSpan": {
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 4
          }
        },
        "entries": [
          {
            "name": "food",
            "kind": "const",
            "kindModifiers": "export",
            "sortText": "16",
            "source": "/packages/lib/index",
            "hasAction": true,
            "data": {
              "exportName": "food",
              "exportMapKey": "4 * food ",
              "fileName": "/packages/lib/index.ts"
            }
          }
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
        ]
      },
      "responseRequired": true
    }
After request
