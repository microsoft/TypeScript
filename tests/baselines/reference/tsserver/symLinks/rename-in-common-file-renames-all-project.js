currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/c/fc.ts]
export const C = 8

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

//// [/users/username/projects/a/a.ts]
import {C} from "./c/fc"; console.log(C)

//// [/users/username/projects/a/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs"
  }
}

//// [/users/username/projects/a/c] symlink(/users/username/projects/c)
//// [/users/username/projects/b/b.ts]
import {C} from "./c/fc"; console.log(C)

//// [/users/username/projects/b/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs"
  }
}

//// [/users/username/projects/b/c] symlink(/users/username/projects/c)

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/a/a.ts",
        "projectRootPath": "/users/username/projects/a"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/a
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/a/a.ts :: Config file name: /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/a/tsconfig.json 2000 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/projects/a/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/projects/a/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/a/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/a/a.ts",
  "/users/username/projects/a/c/fc.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/users/username/projects/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a 1 undefined Config: /users/username/projects/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a 1 undefined Config: /users/username/projects/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/a/c/fc.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/a/c/fc.ts Text-1 "export const C = 8"
	/users/username/projects/a/a.ts SVC-1-0 "import {C} from \"./c/fc\"; console.log(C)"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	c/fc.ts
	  Imported via "./c/fc" from file 'a.ts'
	  Matched by default include pattern '**/*'
	a.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/projects/a/tsconfig.json"
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
          "projectId": "b9af92da02c3f29a4a4dcb5162558ecb87aacbef30605f56fe50b79ff9db72e3",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 58,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
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
        "triggerFile": "/users/username/projects/a/a.ts",
        "configFile": "/users/username/projects/a/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/a/c/fc.ts: *new*
  {}
/users/username/projects/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/a: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/b/b.ts",
        "projectRootPath": "/users/username/projects/b"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/b
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/b/b.ts :: Config file name: /users/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/b/tsconfig.json 2000 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/projects/b/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/projects/b/b.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/b/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/b/b.ts",
  "/users/username/projects/b/c/fc.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/users/username/projects/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b 1 undefined Config: /users/username/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b 1 undefined Config: /users/username/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/b/c/fc.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/b/c/fc.ts Text-1 "export const C = 8"
	/users/username/projects/b/b.ts SVC-1-0 "import {C} from \"./c/fc\"; console.log(C)"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	c/fc.ts
	  Imported via "./c/fc" from file 'b.ts'
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/projects/b/tsconfig.json"
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
          "projectId": "0add50c9c982ef1b2a827920e76267f864b8fe0dd1bf090ce146c1ecb3f64c31",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 58,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
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
        "triggerFile": "/users/username/projects/b/b.ts",
        "configFile": "/users/username/projects/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/a/c/fc.ts:
  {}
/users/username/projects/a/tsconfig.json:
  {}
/users/username/projects/b/c/fc.ts: *new*
  {}
/users/username/projects/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/a/c/fc.ts",
        "projectRootPath": "/users/username/projects/a"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/projects/a/c/fc.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/a/c
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/a/c/fc.ts :: Config file name: /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/a/c/fc.ts ProjectRootPath: /users/username/projects/a
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/a/tsconfig.json:
  {}
/users/username/projects/b/c/fc.ts:
  {}
/users/username/projects/b/tsconfig.json:
  {}

FsWatches *deleted*::
/users/username/projects/a/c/fc.ts:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/b/c/fc.ts",
        "projectRootPath": "/users/username/projects/b"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/projects/b/c/fc.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/b/c
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/b/c/fc.ts :: Config file name: /users/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/a/c/fc.ts ProjectRootPath: /users/username/projects/a
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/b/c/fc.ts ProjectRootPath: /users/username/projects/b
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/b/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/a/tsconfig.json:
  {}
/users/username/projects/b/tsconfig.json:
  {}

FsWatches *deleted*::
/users/username/projects/b/c/fc.ts:
  {}

FsWatchesRecursive::
/users/username/projects/a:
  {}
/users/username/projects/b:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/users/username/projects/a/c/fc.ts",
        "line": 1,
        "offset": 14
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "C",
          "fullDisplayName": "\"/users/username/projects/a/c/fc\".C",
          "kind": "const",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 15
            }
          }
        },
        "locs": [
          {
            "file": "/users/username/projects/a/c/fc.ts",
            "locs": [
              {
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
                  "offset": 19
                }
              }
            ]
          },
          {
            "file": "/users/username/projects/a/a.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 9
                },
                "end": {
                  "line": 1,
                  "offset": 10
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 26
                }
              },
              {
                "start": {
                  "line": 1,
                  "offset": 39
                },
                "end": {
                  "line": 1,
                  "offset": 40
                }
              }
            ]
          },
          {
            "file": "/users/username/projects/b/c/fc.ts",
            "locs": [
              {
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
                  "offset": 19
                }
              }
            ]
          },
          {
            "file": "/users/username/projects/b/b.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 9
                },
                "end": {
                  "line": 1,
                  "offset": 10
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 26
                }
              },
              {
                "start": {
                  "line": 1,
                  "offset": 39
                },
                "end": {
                  "line": 1,
                  "offset": 40
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request
