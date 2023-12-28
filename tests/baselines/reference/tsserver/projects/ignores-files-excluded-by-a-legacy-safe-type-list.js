currentDirectory:: / useCaseSensitiveFileNames: false
Before request
//// [/a/b/bliss.js]
let x = 5

//// [/a/b/foo.js]


//// [/a/b/Bacon.js]
let y = 5

//// [/typesMap.json]
{
            "typesMap": {
                "jquery": {
                    "match": "jquery(-(\\.?\\d+)+)?(\\.intellisense)?(\\.min)?\\.js$",
                    "types": ["jquery"]
                },
                "quack": {
                    "match": "/duckquack-(\\d+)\\.min\\.js",
                    "types": ["duck-types"]
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "project",
        "options": {},
        "rootFiles": [
          {
            "fileName": "/a/b/bliss.js"
          },
          {
            "fileName": "/a/b/foo.js"
          }
        ],
        "typeAcquisition": {
          "enable": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Excluded '/a/b/bliss.js' because it matched bliss from the legacy safelist
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/foo.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: project Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'project' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/foo.js Text-1 ""


	a/b/foo.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/foo.js: *new*
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
        "/a/b/foo.js",
        "/a/b/bliss.js"
      ],
      "compilerOptions": {
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [
          "blissfuljs"
        ],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Loaded safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: ["blissfuljs"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["blissfuljs"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "blissfuljs"
      ],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules",
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
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["blissfuljs"]
TI:: [hh:mm:ss:mss] 'blissfuljs':: Entry for package 'blissfuljs' does not exist in local types registry - skipping...
TI:: [hh:mm:ss:mss] All typings are known to be missing or invalid - no need to install more typings
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "project",
      "typeAcquisition": {
        "enable": true,
        "include": [
          "blissfuljs"
        ],
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
        "projectName": "project",
        "typeAcquisition": {
          "enable": true,
          "include": [
            "blissfuljs"
          ],
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
/a/b/foo.js:
  {}

FsWatchesRecursive::
/a: *new*
  {}
