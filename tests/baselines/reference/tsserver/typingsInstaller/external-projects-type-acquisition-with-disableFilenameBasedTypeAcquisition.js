Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/jquery.js]


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
        "projectFileName": "/user/username/projects/app/test.csproj",
        "options": {
          "allowJS": true,
          "moduleResolution": 2
        },
        "rootFiles": [
          {
            "fileName": "/user/username/projects/project/jquery.js"
          }
        ],
        "typeAcquisition": {
          "enable": true,
          "disableFilenameBasedTypeAcquisition": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /user/username/projects/app/test.csproj, currentDirectory: /user/username/projects/app
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jquery.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/app/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules/@types 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules/@types 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/app/test.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/jquery.js Text-1 ""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../project/jquery.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/user/username/projects/app/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project/jquery.js: *new*
  {}

Projects::
/user/username/projects/app/test.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test.csproj
/user/username/projects/project/jquery.js *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test.csproj

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
  "entries": {
    "jquery": {
      "latest": "1.3.0",
      "ts2.0": "1.0.0",
      "ts2.1": "1.0.0",
      "ts2.2": "1.2.0",
      "ts2.3": "1.3.0",
      "ts2.4": "1.3.0",
      "ts2.5": "1.3.0",
      "ts2.6": "1.3.0",
      "ts2.7": "1.3.0"
    }
  }
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/user/username/projects/app/test.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/jquery.js"
      ],
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "enable": true,
        "disableFilenameBasedTypeAcquisition": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/user/username/projects/app",
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
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/user/username/projects/app/bower_components",
        "/user/username/projects/app/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/user/username/projects/app/test.csproj",
      "files": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/user/username/projects/app/bower_components",
        "/user/username/projects/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/bower_components 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/bower_components 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/user/username/projects/app/test.csproj",
      "typeAcquisition": {
        "enable": true,
        "disableFilenameBasedTypeAcquisition": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
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
        "projectName": "/user/username/projects/app/test.csproj",
        "typeAcquisition": {
          "enable": true,
          "disableFilenameBasedTypeAcquisition": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJS": true,
          "moduleResolution": 2,
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
          "projectId": "68f87f6cc6726fc180432dc4a4e6c633ff5b560bb2eed90a4695aadc4ceb6ed4",
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
            "allowJS": true,
            "moduleResolution": "node10"
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
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/app/test.csproj' (External)
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
/user/username/projects/app/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/app/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/jquery.js:
  {}

Projects::
/user/username/projects/app/test.csproj (External) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*

Before running PendingInstalls callback:: count: 0

After running PendingInstalls callback:: count: 0
