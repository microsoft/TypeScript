currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.js]
export let x = 5

//// [/c/moment.min.js]
unspecified

//// [/q/lib/kendo/kendo.all.min.js]
unspecified

//// [/q/lib/kendo/kendo.ui.min.js]
unspecified

//// [/q/lib/kendo-ui/kendo.all.js]
unspecified

//// [/scripts/Office/1/excel-15.debug.js]
unspecified

//// [/scripts/Office/1/powerpoint.js]
unspecified


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "project",
        "options": {},
        "rootFiles": [
          {
            "fileName": "/a/b/f1.js"
          },
          {
            "fileName": "/c/moment.min.js"
          },
          {
            "fileName": "/q/lib/kendo/kendo.all.min.js"
          },
          {
            "fileName": "/q/lib/kendo/kendo.ui.min.js"
          },
          {
            "fileName": "/q/lib/kendo-ui/kendo.all.js"
          },
          {
            "fileName": "/scripts/Office/1/excel-15.debug.js"
          },
          {
            "fileName": "/scripts/Office/1/powerpoint.js"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Excluding files based on rule Kendo matching file '/q/lib/kendo/kendo.all.min.js'
Info seq  [hh:mm:ss:mss] Excluding files based on rule Kendo matching file '/q/lib/kendo-ui/kendo.all.js'
Info seq  [hh:mm:ss:mss] Excluding files based on rule Office Nuget matching file '/scripts/Office/1/excel-15.debug.js'
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/f1.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: project Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'project' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/f1.js Text-1 "export let x = 5"


	a/b/f1.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js: *new*
  {}

TI:: [hh:mm:ss:mss] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Trying to find '/a/data/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "project",
      "fileNames": [
        "/a/b/f1.js",
        "/c/moment.min.js",
        "/q/lib/kendo/kendo.all.min.js",
        "/q/lib/kendo/kendo.ui.min.js",
        "/q/lib/kendo-ui/kendo.all.js",
        "/scripts/Office/1/excel-15.debug.js",
        "/scripts/Office/1/powerpoint.js"
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
      "projectRootPath": "/",
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
        "/a/b/bower_components",
        "/a/b/node_modules",
        "/c/bower_components",
        "/c/node_modules",
        "/q/lib/kendo/bower_components",
        "/q/lib/kendo/node_modules",
        "/q/lib/kendo-ui/bower_components",
        "/q/lib/kendo-ui/node_modules",
        "/scripts/Office/1/bower_components",
        "/scripts/Office/1/node_modules",
        "/bower_components",
        "/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "project",
      "files": [
        "/a/b/bower_components",
        "/a/b/node_modules",
        "/c/bower_components",
        "/c/node_modules",
        "/q/lib/kendo/bower_components",
        "/q/lib/kendo/node_modules",
        "/q/lib/kendo-ui/bower_components",
        "/q/lib/kendo-ui/node_modules",
        "/scripts/Office/1/bower_components",
        "/scripts/Office/1/node_modules",
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /c 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /q 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /q 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /scripts 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /scripts 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Directory location for typing installer
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
            "dts": 0,
            "dtsSize": 0,
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
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js:
  {}

FsWatchesRecursive::
/a: *new*
  {}
/c: *new*
  {}
/q: *new*
  {}
/scripts: *new*
  {}

TypeAcquisition:: {
  "include": [
    "kendo-ui",
    "office"
  ],
  "exclude": [],
  "enable": true
}