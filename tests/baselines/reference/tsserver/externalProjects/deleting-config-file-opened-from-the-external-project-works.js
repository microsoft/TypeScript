Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/someuser/projects/project/js/site.js]


//// [/user/someuser/projects/project/tsconfig.json]
{}

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
      "command": "configure",
      "arguments": {
        "preferences": {
          "lazyConfiguredProjectsFromExternalProject": false
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
      "command": "openExternalProjects",
      "arguments": {
        "projects": [
          {
            "projectFileName": "/user/someuser/projects/project/WebApplication6.csproj",
            "rootFiles": [
              {
                "fileName": "/user/someuser/projects/project/js/site.js"
              },
              {
                "fileName": "/user/someuser/projects/project/tsconfig.json"
              }
            ],
            "options": {
              "allowJs": false
            },
            "typeAcquisition": {
              "include": []
            }
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/someuser/projects/project/tsconfig.json, currentDirectory: /user/someuser/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/someuser/projects/project/tsconfig.json 2000 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/someuser/projects/project/tsconfig.json",
        "reason": "Creating configured project in external project: /user/someuser/projects/project/WebApplication6.csproj"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/someuser/projects/project/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/someuser/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project 1 undefined Config: /user/someuser/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project 1 undefined Config: /user/someuser/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/someuser/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/node_modules/@types 1 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/node_modules/@types 1 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/node_modules/@types 1 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/node_modules/@types 1 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/someuser/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/someuser/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/someuser/projects/project/tsconfig.json"
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
          "projectId": "2e97ef70ac353217af69cf7cd5f80b4a0be14a62de40b8d7eb164a5a6e3b4889",
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
        "triggerFile": "/user/someuser/projects/project/tsconfig.json",
        "configFile": "/user/someuser/projects/project/tsconfig.json",
        "diagnostics": [
          {
            "text": "No inputs were found in config file '/user/someuser/projects/project/tsconfig.json'. Specified 'include' paths were '[\"**/*\"]' and 'exclude' paths were '[]'.",
            "code": 18003,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/someuser/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/someuser/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/someuser/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/someuser/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/someuser/projects/project: *new*
  {}

Projects::
/user/someuser/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "synchronizeProjectList",
      "arguments": {
        "knownProjects": []
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "info": {
            "projectName": "/user/someuser/projects/project/tsconfig.json",
            "version": 1,
            "isInferred": false,
            "options": {
              "configFilePath": "/user/someuser/projects/project/tsconfig.json",
              "allowNonTsExtensions": true
            },
            "languageServiceDisabled": false
          },
          "files": [
            "/user/someuser/projects/project/tsconfig.json"
          ],
          "projectErrors": [
            {
              "message": "No inputs were found in config file '/user/someuser/projects/project/tsconfig.json'. Specified 'include' paths were '[\"**/*\"]' and 'exclude' paths were '[]'.",
              "category": "error",
              "code": 18003
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/someuser/projects/project/tsconfig.json 2:: WatchInfo: /user/someuser/projects/project/tsconfig.json 2000 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/someuser/projects/project/tsconfig.json 2:: WatchInfo: /user/someuser/projects/project/tsconfig.json 2000 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/someuser/projects/project/tsconfig.json :: WatchInfo: /user/someuser/projects/project 1 undefined Config: /user/someuser/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/someuser/projects/project/tsconfig.json Detected file add/remove of non supported extension: /user/someuser/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/someuser/projects/project/tsconfig.json :: WatchInfo: /user/someuser/projects/project 1 undefined Config: /user/someuser/projects/project/tsconfig.json WatchType: Wild card directory
Before request
//// [/user/someuser/projects/project/tsconfig.json] deleted

Projects::
/user/someuser/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    isOrphan: true *changed*
    deferredClose: true *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "synchronizeProjectList",
      "arguments": {
        "knownProjects": [
          {
            "projectName": "/user/someuser/projects/project/tsconfig.json",
            "version": 1,
            "isInferred": false,
            "options": {
              "configFilePath": "/user/someuser/projects/project/tsconfig.json",
              "allowNonTsExtensions": true
            },
            "languageServiceDisabled": false
          }
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProjects",
      "arguments": {
        "projects": [
          {
            "projectFileName": "/user/someuser/projects/project/WebApplication6.csproj",
            "rootFiles": [
              {
                "fileName": "/user/someuser/projects/project/js/site.js"
              }
            ],
            "options": {
              "allowJs": false
            },
            "typeAcquisition": {
              "include": []
            }
          }
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /user/someuser/projects/project/WebApplication6.csproj, currentDirectory: /user/someuser/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/someuser/projects/project/js/site.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/someuser/projects/project/WebApplication6.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/node_modules/@types 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/node_modules/@types 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/node_modules/@types 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/node_modules/@types 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/someuser/projects/project/WebApplication6.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/someuser/projects/project/WebApplication6.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/someuser/projects/project/js/site.js Text-1 ""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	js/site.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/user/someuser/projects/node_modules/@types:
  {"pollingInterval":500}
/user/someuser/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/someuser/projects/project/js/site.js: *new*
  {}
/user/someuser/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::
/user/someuser/projects/project:
  {}

Projects::
/user/someuser/projects/project/WebApplication6.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 0
/user/someuser/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    isOrphan: true
    noOpenRef: true *changed*
    deferredClose: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/someuser/projects/project/WebApplication6.csproj
/user/someuser/projects/project/js/site.js *new*
    version: Text-1
    containingProjects: 1
        /user/someuser/projects/project/WebApplication6.csproj

TI:: [hh:mm:ss:mss] Global cache location '/home/src/Library/Caches/typescript', safe file path '/home/src/tslibs/TS/Lib/typingSafeList.json', types map path /home/src/tslibs/TS/Lib/typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Trying to find '/home/src/Library/Caches/typescript/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Npm config file: /home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/home/src/Library/Caches/typescript/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/home/src/Library/Caches/typescript/package.json]
{ "private": true }

//// [/home/src/Library/Caches/typescript/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/user/someuser/projects/project/WebApplication6.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/someuser/projects/project/js/site.js"
      ],
      "compilerOptions": {
        "allowJs": false,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/user/someuser/projects/project",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/home/src/tslibs/TS/Lib/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/someuser/projects/project/js/bower_components",
        "/user/someuser/projects/project/js/node_modules",
        "/user/someuser/projects/project/bower_components",
        "/user/someuser/projects/project/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/user/someuser/projects/project/WebApplication6.csproj",
      "files": [
        "/user/someuser/projects/project/js/bower_components",
        "/user/someuser/projects/project/js/node_modules",
        "/user/someuser/projects/project/bower_components",
        "/user/someuser/projects/project/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/js 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/js 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/bower_components 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/bower_components 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/node_modules 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/project/node_modules 1 undefined Project: /user/someuser/projects/project/WebApplication6.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/user/someuser/projects/project/WebApplication6.csproj",
      "typeAcquisition": {
        "include": [],
        "exclude": [],
        "enable": true
      },
      "compilerOptions": {
        "allowJs": false,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typings": [],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/user/someuser/projects/project/WebApplication6.csproj",
        "typeAcquisition": {
          "include": [],
          "exclude": [],
          "enable": true
        },
        "compilerOptions": {
          "allowJs": false,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "6dcce8f9be144549fd0146a85a6c43c6830fcf02c579678ab8927e313d5effa7",
          "fileStats": {
            "js": 1,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "allowJs": false
          },
          "typeAcquisition": {
            "enable": true,
            "include": false,
            "exclude": false
          },
          "compileOnSave": true,
          "configFileName": "other",
          "projectType": "external",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/someuser/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/someuser/projects/project 1 undefined Config: /user/someuser/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/someuser/projects/project 1 undefined Config: /user/someuser/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/someuser/projects/project/tsconfig.json 2000 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/someuser/projects/project/node_modules/@types 1 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/someuser/projects/project/node_modules/@types 1 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/someuser/projects/node_modules/@types 1 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/someuser/projects/node_modules/@types 1 undefined Project: /user/someuser/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/user/someuser/projects/project/WebApplication6.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/someuser/projects/node_modules/@types:
  {"pollingInterval":500}
/user/someuser/projects/project/bower_components: *new*
  {"pollingInterval":500}
/user/someuser/projects/project/node_modules: *new*
  {"pollingInterval":500}
/user/someuser/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/someuser/projects/project/js/site.js:
  {}

FsWatches *deleted*::
/user/someuser/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::
/user/someuser/projects/project/js: *new*
  {}

FsWatchesRecursive *deleted*::
/user/someuser/projects/project:
  {}

Projects::
/user/someuser/projects/project/WebApplication6.csproj (External) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
/user/someuser/projects/project/tsconfig.json (Configured) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
    isOrphan: true
    noOpenRef: true
    deferredClose: true
