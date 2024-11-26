Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/b/app.js]


//// [/home/src/projects/project/node_modules/@types/node/index.d.ts]
declare var node;

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
        "projectFileName": "/home/src/projects/project/a/app/test.csproj",
        "options": {},
        "rootFiles": [
          {
            "fileName": "/home/src/projects/project/a/b/app.js"
          }
        ],
        "typeAcquisition": {
          "enable": true,
          "include": [
            "node"
          ]
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /home/src/projects/project/a/app/test.csproj, currentDirectory: /home/src/projects/project/a/app
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/app.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/app/test.csproj
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/app/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/app/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types/node/package.json 2000 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types/package.json 2000 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package.json 2000 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/package.json 2000 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/package.json 2000 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/app/node_modules/@types 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/app/node_modules/@types 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/app/test.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/b/app.js Text-1 ""
	/home/src/projects/project/node_modules/@types/node/index.d.ts Text-1 "declare var node;"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../b/app.js
	  Root file specified for compilation
	../../node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/a/app/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/app/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types/node/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/a/b/app.js: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules: *new*
  {}
/home/src/projects/project/node_modules/@types: *new*
  {}

Projects::
/home/src/projects/project/a/app/test.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/home/src/projects/project/a/b/app.js *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/app/test.csproj
/home/src/projects/project/node_modules/@types/node/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/app/test.csproj
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/app/test.csproj

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
    "node": {
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
      "projectName": "/home/src/projects/project/a/app/test.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/home/src/projects/project/a/b/app.js"
      ],
      "compilerOptions": {
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/home/src/projects/project/a/app",
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
        "/home/src/projects/project/a/b/bower_components",
        "/home/src/projects/project/a/b/node_modules",
        "/home/src/projects/project/a/app/bower_components",
        "/home/src/projects/project/a/app/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/home/src/projects/project/a/app/test.csproj",
      "files": [
        "/home/src/projects/project/a/b/bower_components",
        "/home/src/projects/project/a/b/node_modules",
        "/home/src/projects/project/a/app/bower_components",
        "/home/src/projects/project/a/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/bower_components 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/bower_components 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/app/bower_components 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/app/bower_components 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/app/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/app/node_modules 1 undefined Project: /home/src/projects/project/a/app/test.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/home/src/projects/project/a/app/test.csproj",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
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
        "projectName": "/home/src/projects/project/a/app/test.csproj",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
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
          "projectId": "f9c9b7a85fb0b5fb707c15da86bd6caa3399e9404f08683f80debaf4e5d36219",
          "fileStats": {
            "js": 1,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 430,
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
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)

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
/home/src/projects/package.json:
  {"pollingInterval":2000}
/home/src/projects/project/a/app/bower_components: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/app/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/a/app/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/b/bower_components: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/b/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types/node/package.json:
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/projects/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/a/b/app.js:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/node_modules:
  {}
/home/src/projects/project/node_modules/@types:
  {}

Projects::
/home/src/projects/project/a/app/test.csproj (External) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
