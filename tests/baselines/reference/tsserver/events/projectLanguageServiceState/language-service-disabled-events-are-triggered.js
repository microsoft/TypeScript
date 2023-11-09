Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/app.js]
let x = 1;

//// [/user/username/projects/project/largefile.js]


//// [/user/username/projects/project/jsconfig.json]
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
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/app.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/app.js ProjectRootPath: undefined:: Result: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/project/jsconfig.json, currentDirectory: /user/username/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined Project: /user/username/projects/project/jsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/jsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/app.js",
  "/user/username/projects/project/largefile.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/user/username/projects/project/jsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/project/app.js to open"
      }
    }
Info seq  [hh:mm:ss:mss] Non TS file size exceeded limit (20971531). Largest files: /user/username/projects/project/largefile.js:20971521, /user/username/projects/project/app.js:10
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLanguageServiceState",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json",
        "languageServiceEnabled": false
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/largefile.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/jsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/app.js SVC-1-0 "let x = 1;"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] Skipped loading contents of large file /user/username/projects/project/largefile.js for info /user/username/projects/project/largefile.js: fileSize: 20971521
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "largeFileReferenced",
      "body": {
        "file": "/user/username/projects/project/largefile.js",
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
          "projectId": "14e44f2ee3cfa137be67194f588a7a038f0db9769bc5ae66738ae9f27090fec8",
          "fileStats": {
            "js": 2,
            "jsSize": 10,
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
          "compilerOptions": {
            "allowJs": true,
            "maxNodeModuleJsDepth": 2,
            "allowSyntheticDefaultImports": true,
            "skipLibCheck": true,
            "noEmit": true
          },
          "typeAcquisition": {
            "enable": true,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "jsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": false,
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
        "triggerFile": "/user/username/projects/project/app.js",
        "configFile": "/user/username/projects/project/jsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/jsconfig.json
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

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project/jsconfig.json: *new*
  {}
/user/username/projects/project/largefile.js: *new*
  {}

Projects::
/user/username/projects/project/jsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/jsconfig.json
/user/username/projects/project/app.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/jsconfig.json *default*
/user/username/projects/project/largefile.js *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/jsconfig.json

Language service enabled: false
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/project/jsconfig.json 1:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined Project: /user/username/projects/project/jsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/app.js ProjectRootPath: undefined:: Result: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/project/jsconfig.json 1:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined Project: /user/username/projects/project/jsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /user/username/projects/project/jsconfig.json
2: *ensureProjectForOpenFiles*
//// [/user/username/projects/project/jsconfig.json]
{
  "exclude": [
    "largefile.js"
  ]
}


Timeout callback:: count: 2
1: /user/username/projects/project/jsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/projects/project/jsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/jsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/app.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/user/username/projects/project/jsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLanguageServiceState",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json",
        "languageServiceEnabled": true
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project 1 undefined Config: /user/username/projects/project/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project 1 undefined Config: /user/username/projects/project/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/jsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/app.js SVC-1-0 "let x = 1;"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/jsconfig.json:
  {}
/user/username/projects/project/largefile.js:
  {}

FsWatchesRecursive::
/user/username/projects/project: *new*
  {}

Projects::
/user/username/projects/project/jsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/jsconfig.json
/user/username/projects/project/app.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/jsconfig.json *default*
/user/username/projects/project/largefile.js *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /user/username/projects/project/jsconfig.json *deleted*

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
      "projectName": "/user/username/projects/project/jsconfig.json",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/app.js"
      ],
      "compilerOptions": {
        "allowJs": true,
        "maxNodeModuleJsDepth": 2,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "noEmit": true,
        "configFilePath": "/user/username/projects/project/jsconfig.json",
        "allowNonTsExtensions": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "projectRootPath": "/user/username/projects/project",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/home/src/tslibs/TS/Lib/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/user/username/projects/project/jsconfig.json",
      "files": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /user/username/projects/project/jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /user/username/projects/project/jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /user/username/projects/project/jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /user/username/projects/project/jsconfig.json WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/user/username/projects/project/jsconfig.json",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "maxNodeModuleJsDepth": 2,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "noEmit": true,
        "configFilePath": "/user/username/projects/project/jsconfig.json",
        "allowNonTsExtensions": true
      },
      "typings": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "maxNodeModuleJsDepth": 2,
          "allowSyntheticDefaultImports": true,
          "skipLibCheck": true,
          "noEmit": true,
          "configFilePath": "/user/username/projects/project/jsconfig.json",
          "allowNonTsExtensions": true
        },
        "typings": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/user/username/projects/project/jsconfig.json",
        "configFile": "/user/username/projects/project/jsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/projects/project/app.js
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/project/app.js"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/project/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/jsconfig.json:
  {}
/user/username/projects/project/largefile.js:
  {}

FsWatchesRecursive::
/user/username/projects/project:
  {}

Language service enabled: true