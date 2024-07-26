currentDirectory:: /home/src/vscode/projects/bin useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/f1.js]
let x =1;

//// [/user/username/projects/project/f2.js]
let y =1;

//// [/user/username/projects/project/f3.js]
let y =1;


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/user/username/projects/project/f1.js"
          }
        ],
        "options": {},
        "projectFileName": "proj1"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/f1.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: proj1
Info seq  [hh:mm:ss:mss] Skipped loading contents of large file /user/username/projects/project/f1.js for info /user/username/projects/project/f1.js: fileSize: 10485760
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "largeFileReferenced",
      "body": {
        "file": "/user/username/projects/project/f1.js",
        "fileSize": 10485760,
        "maxFileSize": 4194304
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/ts/lib/lib.d.ts 500 undefined Project: proj1 WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules/@types 1 undefined Project: proj1 WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules/@types 1 undefined Project: proj1 WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/node_modules/@types 1 undefined Project: proj1 WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/node_modules/@types 1 undefined Project: proj1 WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/node_modules/@types 1 undefined Project: proj1 WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/node_modules/@types 1 undefined Project: proj1 WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: proj1 projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'proj1' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/user/username/projects/project/f1.js Text-1 ""


	../../../../../user/username/projects/project/f1.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/home/src/tslibs/ts/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/home/src/vscode/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/vscode/projects/bin/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/vscode/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/project/f1.js: *new*
  {}

Projects::
proj1 (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/user/username/projects/project/f1.js *new*
    version: Text-1
    containingProjects: 1
        proj1

TI:: [hh:mm:ss:mss] Global cache location '/home/src/typinginstaller/globalcache/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/home/src/typinginstaller/globalcache/data'
TI:: [hh:mm:ss:mss] Trying to find '/home/src/typinginstaller/globalcache/data/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/home/src/typinginstaller/globalcache/data'
TI:: [hh:mm:ss:mss] Npm config file: /home/src/typinginstaller/globalcache/data/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/home/src/typinginstaller/globalcache/data/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/home/src/typinginstaller/globalcache/data/package.json]
{ "private": true }

//// [/home/src/typinginstaller/globalcache/data/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "proj1",
      "fileNames": [
        "/user/username/projects/project/f1.js"
      ],
      "compilerOptions": {
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/home/src/vscode/projects/bin",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/home/src/vscode/projects/bin/bower_components",
        "/home/src/vscode/projects/bin/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "proj1",
      "files": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/home/src/vscode/projects/bin/bower_components",
        "/home/src/vscode/projects/bin/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: proj1 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: proj1 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: proj1 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: proj1 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/bower_components 1 undefined Project: proj1 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/bower_components 1 undefined Project: proj1 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules 1 undefined Project: proj1 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules 1 undefined Project: proj1 WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "proj1",
      "typeAcquisition": {
        "include": [],
        "exclude": [],
        "enable": true
      },
      "compilerOptions": {
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
        "projectName": "proj1",
        "typeAcquisition": {
          "include": [],
          "exclude": [],
          "enable": true
        },
        "compilerOptions": {
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
          "projectId": "aed1eeb782fa64b744256ff894525c4bb6dfbbaa60dcd0a6e9bfb68e48278387",
          "fileStats": {
            "js": 1,
            "jsSize": 10485760,
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
Info seq  [hh:mm:ss:mss] Project 'proj1' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

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
/home/src/tslibs/ts/lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/vscode/node_modules/@types:
  {"pollingInterval":500}
/home/src/vscode/projects/bin/bower_components: *new*
  {"pollingInterval":500}
/home/src/vscode/projects/bin/node_modules: *new*
  {"pollingInterval":500}
/home/src/vscode/projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/vscode/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/project/f1.js:
  {}

Projects::
proj1 (External) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/user/username/projects/project/f2.js"
          }
        ],
        "options": {},
        "projectFileName": "proj2"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/f2.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: proj2
Info seq  [hh:mm:ss:mss] Skipped loading contents of large file /user/username/projects/project/f2.js for info /user/username/projects/project/f2.js: fileSize: 6291456
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "largeFileReferenced",
      "body": {
        "file": "/user/username/projects/project/f2.js",
        "fileSize": 6291456,
        "maxFileSize": 4194304
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/ts/lib/lib.d.ts 500 undefined Project: proj2 WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules/@types 1 undefined Project: proj2 WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules/@types 1 undefined Project: proj2 WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/node_modules/@types 1 undefined Project: proj2 WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/node_modules/@types 1 undefined Project: proj2 WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/node_modules/@types 1 undefined Project: proj2 WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/node_modules/@types 1 undefined Project: proj2 WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: proj2 projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'proj2' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/user/username/projects/project/f2.js Text-1 ""


	../../../../../user/username/projects/project/f2.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "proj2",
      "fileNames": [
        "/user/username/projects/project/f2.js"
      ],
      "compilerOptions": {
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/home/src/vscode/projects/bin",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/home/src/vscode/projects/bin/bower_components",
        "/home/src/vscode/projects/bin/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "proj2",
      "files": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/home/src/vscode/projects/bin/bower_components",
        "/home/src/vscode/projects/bin/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: proj2 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: proj2 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: proj2 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: proj2 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/bower_components 1 undefined Project: proj2 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/bower_components 1 undefined Project: proj2 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules 1 undefined Project: proj2 WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules 1 undefined Project: proj2 WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "proj2",
      "typeAcquisition": {
        "include": [],
        "exclude": [],
        "enable": true
      },
      "compilerOptions": {
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
        "projectName": "proj2",
        "typeAcquisition": {
          "include": [],
          "exclude": [],
          "enable": true
        },
        "compilerOptions": {
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
          "projectId": "97492cf085c4140203a68a26f9f76491a6d067d51483c2c6596aef9b274aea94",
          "fileStats": {
            "js": 1,
            "jsSize": 6291456,
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
Info seq  [hh:mm:ss:mss] Project 'proj1' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project 'proj2' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

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
/home/src/tslibs/ts/lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/vscode/node_modules/@types:
  {"pollingInterval":500}
/home/src/vscode/projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/vscode/projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/vscode/projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/vscode/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/project/f1.js:
  {}
/user/username/projects/project/f2.js: *new*
  {}

Projects::
proj1 (External)
    projectStateVersion: 1
    projectProgramVersion: 1
proj2 (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/user/username/projects/project/f1.js
    version: Text-1
    containingProjects: 1
        proj1
/user/username/projects/project/f2.js *new*
    version: Text-1
    containingProjects: 1
        proj2

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/user/username/projects/project/f3.js"
          }
        ],
        "options": {},
        "projectFileName": "proj3"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Non TS file size exceeded limit (6291456). Largest files: /user/username/projects/project/f3.js:6291456
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLanguageServiceState",
      "body": {
        "projectName": "proj3",
        "languageServiceEnabled": false
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/f3.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: proj3
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: proj3 projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'proj3' (External)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Skipped loading contents of large file /user/username/projects/project/f3.js for info /user/username/projects/project/f3.js: fileSize: 6291456
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "largeFileReferenced",
      "body": {
        "file": "/user/username/projects/project/f3.js",
        "fileSize": 6291456,
        "maxFileSize": 4194304
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
          "projectId": "8ccae276f171e2bbbd22e633f1b2a7333024f1d985397706419cb774929a8c55",
          "fileStats": {
            "js": 1,
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
            "enable": true,
            "include": false,
            "exclude": false
          },
          "compileOnSave": true,
          "configFileName": "other",
          "projectType": "external",
          "languageServiceEnabled": false,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] Project 'proj1' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project 'proj2' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project 'proj3' (External)
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
/home/src/tslibs/ts/lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/vscode/node_modules/@types:
  {"pollingInterval":500}
/home/src/vscode/projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/vscode/projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/vscode/projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/vscode/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/project/f1.js:
  {}
/user/username/projects/project/f2.js:
  {}
/user/username/projects/project/f3.js: *new*
  {}

Projects::
proj1 (External)
    projectStateVersion: 1
    projectProgramVersion: 1
proj2 (External)
    projectStateVersion: 1
    projectProgramVersion: 1
proj3 (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/user/username/projects/project/f1.js
    version: Text-1
    containingProjects: 1
        proj1
/user/username/projects/project/f2.js
    version: Text-1
    containingProjects: 1
        proj2
/user/username/projects/project/f3.js *new*
    version: Text-1
    containingProjects: 1
        proj3
