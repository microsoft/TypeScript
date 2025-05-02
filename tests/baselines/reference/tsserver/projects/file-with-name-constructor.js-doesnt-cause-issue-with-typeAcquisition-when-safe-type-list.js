Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Before request
//// [/user/username/projects/project/f1.js]
export let x = 5; import { s } from "s"

//// [/user/username/projects/project/constructor.js]
const x = 10;

//// [/user/username/projects/project/bliss.js]
export function is() { return true; }

//// [/home/src/tslibs/TS/Lib/typesMap.json]
{
  "typesMap": {
    "jquery": {
      "match": "jquery(-(\\.?\\d+)+)?(\\.intellisense)?(\\.min)?\\.js$",
      "types": [
        "jquery"
      ]
    },
    "quack": {
      "match": "/duckquack-(\\d+)\\.min\\.js",
      "types": [
        "duck-types"
      ]
    }
  },
  "simpleMap": {
    "Bacon": "baconjs",
    "bliss": "blissfuljs",
    "commander": "commander",
    "cordova": "cordova",
    "react": "react",
    "lodash": "lodash"
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
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "project",
        "options": {},
        "rootFiles": [
          {
            "fileName": "/user/username/projects/project/f1.js"
          },
          {
            "fileName": "/user/username/projects/project/constructor.js"
          },
          {
            "fileName": "/user/username/projects/project/bliss.js"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Excluded '/user/username/projects/project/bliss.js' because it matched bliss from the legacy safelist
Info seq  [hh:mm:ss:mss] Creating ExternalProject: project, currentDirectory: 
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/f1.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/constructor.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: project projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'project' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/f1.js Text-1 "export let x = 5; import { s } from \"s\""
	/user/username/projects/project/constructor.js Text-1 "const x = 10;"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../../user/username/projects/project/f1.js
	  Root file specified for compilation
	../../../../../user/username/projects/project/constructor.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/home/src/Vscode/Projects/bin/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project/constructor.js: *new*
  {}
/user/username/projects/project/f1.js: *new*
  {}

Projects::
project (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        project
/user/username/projects/project/constructor.js *new*
    version: Text-1
    containingProjects: 1
        project
/user/username/projects/project/f1.js *new*
    version: Text-1
    containingProjects: 1
        project

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
      "projectName": "project",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/f1.js",
        "/user/username/projects/project/constructor.js",
        "/user/username/projects/project/bliss.js"
      ],
      "compilerOptions": {
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "blissfuljs"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [
        "s"
      ],
      "projectRootPath": "/home/src/Vscode/Projects/bin",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Loaded safelist from types map file '/home/src/tslibs/TS/Lib/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: ["blissfuljs"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["blissfuljs"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: ["s"]
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "blissfuljs",
        "s"
      ],
      "filesToWatch": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/home/src/Vscode/Projects/bin/bower_components",
        "/home/src/Vscode/Projects/bin/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "project",
      "files": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/home/src/Vscode/Projects/bin/bower_components",
        "/home/src/Vscode/Projects/bin/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["blissfuljs","s"]
TI:: [hh:mm:ss:mss] 'blissfuljs':: Entry for package 'blissfuljs' does not exist in local types registry - skipping...
TI:: [hh:mm:ss:mss] 's':: Entry for package 's' does not exist in local types registry - skipping...
TI:: [hh:mm:ss:mss] All typings are known to be missing or invalid - no need to install more typings
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "project",
      "typeAcquisition": {
        "include": [
          "blissfuljs"
        ],
        "exclude": [],
        "enable": true
      },
      "compilerOptions": {
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typings": [],
      "unresolvedImports": [
        "s"
      ],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "project",
        "typeAcquisition": {
          "include": [
            "blissfuljs"
          ],
          "exclude": [],
          "enable": true
        },
        "compilerOptions": {
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true
        },
        "typings": [],
        "unresolvedImports": [
          "s"
        ],
        "kind": "action::set"
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
          "projectId": "244210e48437b6556980a70249a99369934a352429034cef9d7bd253b3bf2c01",
          "fileStats": {
            "js": 2,
            "jsSize": 52,
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
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": true,
            "include": true,
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
Info seq  [hh:mm:ss:mss] Project 'project' (External)
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
/home/src/Vscode/Projects/bin/bower_components: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/constructor.js:
  {}
/user/username/projects/project/f1.js:
  {}

Projects::
project (External) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
