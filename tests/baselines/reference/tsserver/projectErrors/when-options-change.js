Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/b/app.ts]
let x = 10

//// [/home/src/projects/project/a/b/tsconfig.json]
{
                // comment
                "compilerOptions": {
                    "inlineSourceMap": true,
                    "mapRoot": "./"
                }
            }

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/b/app.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/a/b/tsconfig.json, currentDirectory: /home/src/projects/project/a/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/tsconfig.json 2000 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/a/b/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/a/b/app.ts"
 ],
 "options": {
  "inlineSourceMap": true,
  "mapRoot": "./",
  "configFilePath": "/home/src/projects/project/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/a/b/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/a/b/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b 1 undefined Config: /home/src/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b 1 undefined Config: /home/src/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/b/app.ts SVC-1-0 "let x = 10"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/a/b/tsconfig.json"
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
          "projectId": "ada7c0fc4aa834f69b1c1c870ed211cb78e8712a3ea3ceada8227158109abbde",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 10,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "inlineSourceMap": true,
            "mapRoot": ""
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
        "triggerFile": "/home/src/projects/project/a/b/app.ts",
        "configFile": "/home/src/projects/project/a/b/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 4,
              "offset": 21
            },
            "end": {
              "line": 4,
              "offset": 38
            },
            "text": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
            "code": 5053,
            "category": "error",
            "fileName": "/home/src/projects/project/a/b/tsconfig.json"
          },
          {
            "start": {
              "line": 5,
              "offset": 21
            },
            "end": {
              "line": 5,
              "offset": 30
            },
            "text": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
            "code": 5053,
            "category": "error",
            "fileName": "/home/src/projects/project/a/b/tsconfig.json"
          },
          {
            "start": {
              "line": 5,
              "offset": 21
            },
            "end": {
              "line": 5,
              "offset": 30
            },
            "text": "Option 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.",
            "code": 5069,
            "category": "error",
            "fileName": "/home/src/projects/project/a/b/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/a/b: *new*
  {}

Projects::
/home/src/projects/project/a/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/b/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/a/b/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/home/src/projects/project/a/b/tsconfig.json",
        "projectFileName": "/home/src/projects/project/a/b/tsconfig.json",
        "includeLinePosition": true
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "message": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
          "start": 86,
          "length": 17,
          "category": "error",
          "code": 5053,
          "startLocation": {
            "line": 4,
            "offset": 21
          },
          "endLocation": {
            "line": 4,
            "offset": 38
          }
        },
        {
          "message": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
          "start": 131,
          "length": 9,
          "category": "error",
          "code": 5053,
          "startLocation": {
            "line": 5,
            "offset": 21
          },
          "endLocation": {
            "line": 5,
            "offset": 30
          }
        },
        {
          "message": "Option 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.",
          "start": 131,
          "length": 9,
          "category": "error",
          "code": 5069,
          "startLocation": {
            "line": 5,
            "offset": 21
          },
          "endLocation": {
            "line": 5,
            "offset": 30
          }
        }
      ],
      "responseRequired": true
    }
After request

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project/a/b/tsconfig.json 1:: WatchInfo: /home/src/projects/project/a/b/tsconfig.json 2000 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/b/app.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/a/b/tsconfig.json 1:: WatchInfo: /home/src/projects/project/a/b/tsconfig.json 2000 undefined Project: /home/src/projects/project/a/b/tsconfig.json WatchType: Config file
Before request
//// [/home/src/projects/project/a/b/tsconfig.json]
{
                "compilerOptions": {
                    "inlineSourceMap": true,
                    "mapRoot": "./"
                }
            }


Timeout callback:: count: 2
1: /home/src/projects/project/a/b/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: undefined *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/home/src/projects/project/a/b/tsconfig.json",
        "projectFileName": "/home/src/projects/project/a/b/tsconfig.json",
        "includeLinePosition": true
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/a/b/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/a/b/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/a/b/app.ts"
 ],
 "options": {
  "inlineSourceMap": true,
  "mapRoot": "./",
  "configFilePath": "/home/src/projects/project/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/b/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/b/app.ts SVC-1-0 "let x = 10"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/a/b/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/projects/project/a/b/tsconfig.json",
        "configFile": "/home/src/projects/project/a/b/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 3,
              "offset": 21
            },
            "end": {
              "line": 3,
              "offset": 38
            },
            "text": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
            "code": 5053,
            "category": "error",
            "fileName": "/home/src/projects/project/a/b/tsconfig.json"
          },
          {
            "start": {
              "line": 4,
              "offset": 21
            },
            "end": {
              "line": 4,
              "offset": 30
            },
            "text": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
            "code": 5053,
            "category": "error",
            "fileName": "/home/src/projects/project/a/b/tsconfig.json"
          },
          {
            "start": {
              "line": 4,
              "offset": 21
            },
            "end": {
              "line": 4,
              "offset": 30
            },
            "text": "Option 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.",
            "code": 5069,
            "category": "error",
            "fileName": "/home/src/projects/project/a/b/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "message": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
          "start": 59,
          "length": 17,
          "category": "error",
          "code": 5053,
          "startLocation": {
            "line": 3,
            "offset": 21
          },
          "endLocation": {
            "line": 3,
            "offset": 38
          }
        },
        {
          "message": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
          "start": 104,
          "length": 9,
          "category": "error",
          "code": 5053,
          "startLocation": {
            "line": 4,
            "offset": 21
          },
          "endLocation": {
            "line": 4,
            "offset": 30
          }
        },
        {
          "message": "Option 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.",
          "start": 104,
          "length": 9,
          "category": "error",
          "code": 5069,
          "startLocation": {
            "line": 4,
            "offset": 21
          },
          "endLocation": {
            "line": 4,
            "offset": 30
          }
        }
      ],
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/home/src/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
