currentDirectory:: /home/src/vscode/projects/bin useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/a/b/f1.js]
export let x = 5

//// [/user/username/projects/project/c/moment.min.js]
unspecified

//// [/user/username/projects/project/q/lib/kendo/kendo.all.min.js]
unspecified

//// [/user/username/projects/project/q/lib/kendo/kendo.ui.min.js]
unspecified

//// [/user/username/projects/project/q/lib/kendo-ui/kendo.all.js]
unspecified

//// [/user/username/projects/project/scripts/Office/1/excel-15.debug.js]
unspecified

//// [/user/username/projects/project/scripts/Office/1/powerpoint.js]
unspecified

//// [/home/src/tslibs/ts/lib/lib.d.ts]
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
            "fileName": "/user/username/projects/project/a/b/f1.js"
          },
          {
            "fileName": "/user/username/projects/project/c/moment.min.js"
          },
          {
            "fileName": "/user/username/projects/project/q/lib/kendo/kendo.all.min.js"
          },
          {
            "fileName": "/user/username/projects/project/q/lib/kendo/kendo.ui.min.js"
          },
          {
            "fileName": "/user/username/projects/project/q/lib/kendo-ui/kendo.all.js"
          },
          {
            "fileName": "/user/username/projects/project/scripts/Office/1/excel-15.debug.js"
          },
          {
            "fileName": "/user/username/projects/project/scripts/Office/1/powerpoint.js"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Excluding files based on rule Kendo matching file '/user/username/projects/project/q/lib/kendo/kendo.all.min.js'
Info seq  [hh:mm:ss:mss] Excluding files based on rule Kendo matching file '/user/username/projects/project/q/lib/kendo-ui/kendo.all.js'
Info seq  [hh:mm:ss:mss] Excluding files based on rule Office Nuget matching file '/user/username/projects/project/scripts/Office/1/excel-15.debug.js'
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/f1.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/ts/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/node_modules/@types 1 undefined Project: project WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: project projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'project' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/ts/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/b/f1.js Text-1 "export let x = 5"


	../../../tslibs/ts/lib/lib.d.ts
	  Default library for target 'es5'
	../../../../../user/username/projects/project/a/b/f1.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/home/src/vscode/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/vscode/projects/bin/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/vscode/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/ts/lib/lib.d.ts: *new*
  {}
/user/username/projects/project/a/b/f1.js: *new*
  {}

Projects::
project (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/home/src/tslibs/ts/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        project
/user/username/projects/project/a/b/f1.js *new*
    version: Text-1
    containingProjects: 1
        project

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
      "projectName": "project",
      "fileNames": [
        "/home/src/tslibs/ts/lib/lib.d.ts",
        "/user/username/projects/project/a/b/f1.js",
        "/user/username/projects/project/c/moment.min.js",
        "/user/username/projects/project/q/lib/kendo/kendo.all.min.js",
        "/user/username/projects/project/q/lib/kendo/kendo.ui.min.js",
        "/user/username/projects/project/q/lib/kendo-ui/kendo.all.js",
        "/user/username/projects/project/scripts/Office/1/excel-15.debug.js",
        "/user/username/projects/project/scripts/Office/1/powerpoint.js"
      ],
      "compilerOptions": {
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "kendo-ui",
          "office"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/home/src/vscode/projects/bin",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: ["kendo-ui","office"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "kendo-ui",
        "office"
      ],
      "filesToWatch": [
        "/user/username/projects/project/a/b/bower_components",
        "/user/username/projects/project/a/b/node_modules",
        "/user/username/projects/project/c/bower_components",
        "/user/username/projects/project/c/node_modules",
        "/user/username/projects/project/q/lib/kendo/bower_components",
        "/user/username/projects/project/q/lib/kendo/node_modules",
        "/user/username/projects/project/q/lib/kendo-ui/bower_components",
        "/user/username/projects/project/q/lib/kendo-ui/node_modules",
        "/user/username/projects/project/scripts/Office/1/bower_components",
        "/user/username/projects/project/scripts/Office/1/node_modules",
        "/home/src/vscode/projects/bin/bower_components",
        "/home/src/vscode/projects/bin/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "project",
      "files": [
        "/user/username/projects/project/a/b/bower_components",
        "/user/username/projects/project/a/b/node_modules",
        "/user/username/projects/project/c/bower_components",
        "/user/username/projects/project/c/node_modules",
        "/user/username/projects/project/q/lib/kendo/bower_components",
        "/user/username/projects/project/q/lib/kendo/node_modules",
        "/user/username/projects/project/q/lib/kendo-ui/bower_components",
        "/user/username/projects/project/q/lib/kendo-ui/node_modules",
        "/user/username/projects/project/scripts/Office/1/bower_components",
        "/user/username/projects/project/scripts/Office/1/node_modules",
        "/home/src/vscode/projects/bin/bower_components",
        "/home/src/vscode/projects/bin/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/c/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/q/lib/kendo/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/q/lib/kendo/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/q/lib/kendo/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/q/lib/kendo/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/q/lib/kendo-ui/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/q/lib/kendo-ui/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/q/lib/kendo-ui/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/q/lib/kendo-ui/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/scripts/Office/1/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/scripts/Office/1/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/scripts/Office/1/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/scripts/Office/1/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/vscode/projects/bin/node_modules 1 undefined Project: project WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["kendo-ui","office"]
TI:: [hh:mm:ss:mss] 'kendo-ui':: Entry for package 'kendo-ui' does not exist in local types registry - skipping...
TI:: [hh:mm:ss:mss] 'office':: Entry for package 'office' does not exist in local types registry - skipping...
TI:: [hh:mm:ss:mss] All typings are known to be missing or invalid - no need to install more typings
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "project",
      "typeAcquisition": {
        "include": [
          "kendo-ui",
          "office"
        ],
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
        "projectName": "project",
        "typeAcquisition": {
          "include": [
            "kendo-ui",
            "office"
          ],
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
            "js": 1,
            "jsSize": 16,
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
/user/username/projects/project/a/b/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/c/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/c/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/q/lib/kendo-ui/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/q/lib/kendo-ui/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/q/lib/kendo/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/q/lib/kendo/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/scripts/Office/1/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/scripts/Office/1/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/ts/lib/lib.d.ts:
  {}
/user/username/projects/project/a/b/f1.js:
  {}

Projects::
project (External) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*

TypeAcquisition:: {
  "include": [
    "kendo-ui",
    "office"
  ],
  "exclude": [],
  "enable": true
}