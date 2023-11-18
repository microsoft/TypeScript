currentDirectory:: C:/ useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [C:/temp/test/project1/index.ts]
export function myFunc() {
}


//// [C:/temp/test/project1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [C:/temp/test/project1/package.json]
{
  "name": "project1",
  "version": "1.0.0",
  "main": "index.js"
}

//// [C:/temp/test/project2/index.ts]
import { myFunc } from 'project1'
myFunc();


//// [C:/temp/test/project2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../project1"
    }
  ]
}

//// [C:/temp/test/tsconfig.json]
{
  "references": [
    {
      "path": "./project1"
    },
    {
      "path": "./project2"
    }
  ],
  "files": [],
  "include": []
}

//// [C:/temp/test/node_modules/project1] symlink(c:/temp/test/project1)
//// [C:/a/lib/lib.d.ts]
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
        "file": "c:/temp/test/project1/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: c:/temp/test/project1
Info seq  [hh:mm:ss:mss] For info: c:/temp/test/project1/index.ts :: Config file name: c:/temp/test/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project c:/temp/test/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/test/project1/tsconfig.json 2000 undefined Project: c:/temp/test/project1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "c:/temp/test/project1/tsconfig.json",
        "reason": "Creating possible configured project for c:/temp/test/project1/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: c:/temp/test/project1/tsconfig.json : {
 "rootNames": [
  "c:/temp/test/project1/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "c:/temp/test/project1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project1 1 undefined Config: c:/temp/test/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project1 1 undefined Config: c:/temp/test/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/temp/test/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project1/node_modules/@types 1 undefined Project: c:/temp/test/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project1/node_modules/@types 1 undefined Project: c:/temp/test/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/node_modules/@types 1 undefined Project: c:/temp/test/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/node_modules/@types 1 undefined Project: c:/temp/test/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: c:/temp/test/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: c:/temp/test/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/temp/test/project1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/temp/test/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	C:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	c:/temp/test/project1/index.ts SVC-1-0 "export function myFunc() {\n}\n"


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/test/project1/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "c:/temp/test/project1/tsconfig.json"
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
          "projectId": "7987d5b773b493a86a91f135bb6a27cbcb359536c3bbea16ea5f1ab8c979acf0",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 29,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true
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
        "triggerFile": "c:/temp/test/project1/index.ts",
        "configFile": "c:/temp/test/project1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: c:/temp/test/project1
Info seq  [hh:mm:ss:mss] For info: c:/temp/test/project1/tsconfig.json :: Config file name: c:/temp/test/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project c:/temp/test/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/test/tsconfig.json 2000 undefined Project: c:/temp/test/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Search path: c:/temp/test
Info seq  [hh:mm:ss:mss] For info: c:/temp/test/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project 'c:/temp/test/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project 'c:/temp/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/test/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/temp/test/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
c:/temp/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/test/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/test/project1/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
C:/a/lib/lib.d.ts: *new*
  {}
c:/temp/test/project1/package.json: *new*
  {}
c:/temp/test/project1/tsconfig.json: *new*
  {}
c:/temp/test/tsconfig.json: *new*
  {}

FsWatchesRecursive::
c:/temp/test/project1: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "rename",
      "arguments": {
        "file": "C:/temp/test/project1/index.ts",
        "line": 1,
        "offset": 17
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Loading configured project c:/temp/test/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "c:/temp/test/tsconfig.json",
        "reason": "Creating project possibly referencing default composite project c:/temp/test/project1/tsconfig.json of open file c:/temp/test/project1/index.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Config: c:/temp/test/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "c:/temp/test/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "c:/temp/test/project1",
   "originalPath": "./project1"
  },
  {
   "path": "c:/temp/test/project2",
   "originalPath": "./project2"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/temp/test/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: c:/temp/test/project2/tsconfig.json : {
 "rootNames": [
  "c:/temp/test/project2/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "c:/temp/test/project2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "c:/temp/test/project1",
   "originalPath": "../project1"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/test/project2/tsconfig.json 2000 undefined Project: c:/temp/test/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project2 1 undefined Config: c:/temp/test/project2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project2 1 undefined Config: c:/temp/test/project2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/node_modules/@types 1 undefined Project: c:/temp/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/node_modules/@types 1 undefined Project: c:/temp/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: c:/temp/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: c:/temp/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/temp/test/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/temp/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "c:/temp/test/tsconfig.json"
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
          "projectId": "8e7953c1d1edaf51b05db26e77ce2b2601ac9b361b20637b7df15d06b08f29c5",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
        "triggerFile": "c:/temp/test/tsconfig.json",
        "configFile": "c:/temp/test/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project c:/temp/test/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "c:/temp/test/project2/tsconfig.json",
        "reason": "Creating project referenced by : c:/temp/test/tsconfig.json as it references project c:/temp/test/project1/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/test/project2/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/temp/test/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project2/node_modules 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project2/node_modules 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/node_modules 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/node_modules 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/temp/test/project1/package.json 2000 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project2/node_modules/@types 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/project2/node_modules/@types 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/node_modules/@types 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/test/node_modules/@types 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: c:/temp/test/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/temp/test/project2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/temp/test/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	C:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	C:/temp/test/project1/index.ts SVC-1-0 "export function myFunc() {\n}\n"
	c:/temp/test/project2/index.ts Text-1 "import { myFunc } from 'project1'\nmyFunc();\n"


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/index.ts
	  Imported via 'project1' from file 'index.ts' with packageId 'project1/index.ts@1.0.0'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "c:/temp/test/project2/tsconfig.json"
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
          "projectId": "80bd38ecf3f3fe2cb16c7a334a11c6716aa001717fa79c13f9bcc7a102350f92",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 73,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/test/project1/index.d.ts 2000 undefined Project: c:/temp/test/project1/tsconfig.json WatchType: Missing generated file
Info seq  [hh:mm:ss:mss] Search path: C:/temp/test/project1
Info seq  [hh:mm:ss:mss] For info: C:/temp/test/project1/index.ts :: Config file name: C:/temp/test/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "myFunc",
          "fullDisplayName": "\"c:/temp/test/project1/index\".myFunc",
          "kind": "function",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 23
            }
          }
        },
        "locs": [
          {
            "file": "c:/temp/test/project1/index.ts",
            "locs": [
              {
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
                  "line": 2,
                  "offset": 2
                }
              }
            ]
          },
          {
            "file": "c:/temp/test/project2/index.ts",
            "locs": [
              {
                "start": {
                  "line": 1,
                  "offset": 10
                },
                "end": {
                  "line": 1,
                  "offset": 16
                },
                "contextStart": {
                  "line": 1,
                  "offset": 1
                },
                "contextEnd": {
                  "line": 1,
                  "offset": 34
                }
              },
              {
                "start": {
                  "line": 2,
                  "offset": 1
                },
                "end": {
                  "line": 2,
                  "offset": 7
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
After request

PolledWatches::
c:/temp/node_modules/@types:
  {"pollingInterval":500}
c:/temp/test/node_modules/@types:
  {"pollingInterval":500}
c:/temp/test/project1/index.d.ts: *new*
  {"pollingInterval":2000}
c:/temp/test/project1/node_modules/@types:
  {"pollingInterval":500}
c:/temp/test/project2/node_modules: *new*
  {"pollingInterval":500}
c:/temp/test/project2/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
C:/a/lib/lib.d.ts:
  {}
c:/temp/test/project1/package.json:
  {}
c:/temp/test/project1/tsconfig.json:
  {}
c:/temp/test/project2/index.ts: *new*
  {}
c:/temp/test/project2/tsconfig.json: *new*
  {}
c:/temp/test/tsconfig.json:
  {}

FsWatchesRecursive::
c:/temp/test/node_modules: *new*
  {}
c:/temp/test/project1:
  {}
c:/temp/test/project2: *new*
  {}
