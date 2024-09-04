Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/app.js]
var x = 1

//// [/home/src/projects/project/a/largefile.js]


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
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/home/src/projects/project/a/proj.csproj",
        "rootFiles": [
          {
            "fileName": "/home/src/projects/project/a/app.js"
          },
          {
            "fileName": "/home/src/projects/project/a/largefile.js"
          }
        ],
        "options": {}
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Non TS file size exceeded limit (20971530). Largest files: /home/src/projects/project/a/largefile.js:20971521, /home/src/projects/project/a/app.js:9
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /home/src/projects/project/a/proj.csproj, currentDirectory: /home/src/projects/project/a
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLanguageServiceState",
      "body": {
        "projectName": "/home/src/projects/project/a/proj.csproj",
        "languageServiceEnabled": false
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/app.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/largefile.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/proj.csproj
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/proj.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/proj.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Skipped loading contents of large file /home/src/projects/project/a/largefile.js for info /home/src/projects/project/a/largefile.js: fileSize: 20971521
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "largeFileReferenced",
      "body": {
        "file": "/home/src/projects/project/a/largefile.js",
        "fileSize": 20971521,
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
          "projectId": "58ee8d253e9f7531757e2401511e15ff5018d4afad670ea65a45831d9859d473",
          "fileStats": {
            "js": 2,
            "jsSize": 9,
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
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/proj.csproj' (External)
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

FsWatches::
/home/src/projects/project/a/app.js: *new*
  {}
/home/src/projects/project/a/largefile.js: *new*
  {}

Projects::
/home/src/projects/project/a/proj.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/projects/project/a/app.js *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/proj.csproj
/home/src/projects/project/a/largefile.js *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/proj.csproj

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/home/src/projects/project/a/proj.csproj",
        "rootFiles": [
          {
            "fileName": "/home/src/projects/project/a/app.js"
          }
        ],
        "options": {}
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLanguageServiceState",
      "body": {
        "projectName": "/home/src/projects/project/a/proj.csproj",
        "languageServiceEnabled": true
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/proj.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/proj.csproj projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/proj.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/app.js Text-1 "var x = 1"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/app.js:
  {}
/home/src/projects/project/a/largefile.js:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/home/src/projects/project/a/proj.csproj (External) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1

ScriptInfos::
/home/src/projects/project/a/app.js
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/proj.csproj
/home/src/projects/project/a/largefile.js *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/projects/project/a/proj.csproj *deleted*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/proj.csproj

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
      "projectName": "/home/src/projects/project/a/proj.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/home/src/projects/project/a/app.js"
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
      "projectRootPath": "/home/src/projects/project/a",
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
        "/home/src/projects/project/a/bower_components",
        "/home/src/projects/project/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/home/src/projects/project/a/proj.csproj",
      "files": [
        "/home/src/projects/project/a/bower_components",
        "/home/src/projects/project/a/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/bower_components 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/bower_components 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/home/src/projects/project/a/proj.csproj",
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
        "projectName": "/home/src/projects/project/a/proj.csproj",
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
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/proj.csproj' (External)
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
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/bower_components: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/app.js:
  {}
/home/src/projects/project/a/largefile.js:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

Projects::
/home/src/projects/project/a/proj.csproj (External) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/home/src/projects/project/a/proj.csproj",
        "rootFiles": [
          {
            "fileName": "/home/src/projects/project/a/app.js"
          },
          {
            "fileName": "/home/src/projects/project/a/largefile.js"
          }
        ],
        "options": {}
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Non TS file size exceeded limit (20971530). Largest files: /home/src/projects/project/a/largefile.js:20971521, /home/src/projects/project/a/app.js:9
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/proj.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLanguageServiceState",
      "body": {
        "projectName": "/home/src/projects/project/a/proj.csproj",
        "languageServiceEnabled": false
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/proj.csproj
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/proj.csproj projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/proj.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/proj.csproj' (External)
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
/home/src/projects/project/a/bower_components:
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/app.js:
  {}
/home/src/projects/project/a/largefile.js:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

Projects::
/home/src/projects/project/a/proj.csproj (External) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 3 *changed*

ScriptInfos::
/home/src/projects/project/a/app.js
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/proj.csproj
/home/src/projects/project/a/largefile.js *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/projects/project/a/proj.csproj *new*
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/projects/project/a/proj.csproj *deleted*
