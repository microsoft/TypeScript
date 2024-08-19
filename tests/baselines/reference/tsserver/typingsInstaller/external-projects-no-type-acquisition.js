currentDirectory:: / useCaseSensitiveFileNames: false
Before request
//// [/a/b/lodash.js]


//// [/a/b/file2.jsx]


//// [/a/b/file3.d.ts]


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
        "projectFileName": "/a/app/test.csproj",
        "options": {
          "allowJS": true,
          "moduleResolution": 2
        },
        "rootFiles": [
          {
            "fileName": "/a/b/lodash.js"
          },
          {
            "fileName": "/a/b/file2.jsx"
          },
          {
            "fileName": "/a/b/file3.d.ts"
          }
        ],
        "typeAcquisition": {}
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Excluded '/a/b/lodash.js' because it matched lodash from the legacy safelist
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/file2.jsx 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/file3.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app/test.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/b/file2.jsx Text-1 ""
	/a/b/file3.d.ts Text-1 ""


	../b/file2.jsx
	  Root file specified for compilation
	../b/file3.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file2.jsx: *new*
  {}
/a/b/file3.d.ts: *new*
  {}

Projects::
/a/app/test.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/a/b/file2.jsx *new*
    version: Text-1
    containingProjects: 1
        /a/app/test.csproj
/a/b/file3.d.ts *new*
    version: Text-1
    containingProjects: 1
        /a/app/test.csproj

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
  "entries": {
    "lodash": {
      "latest": "1.3.0",
      "ts2.0": "1.0.0",
      "ts2.1": "1.0.0",
      "ts2.2": "1.2.0",
      "ts2.3": "1.3.0",
      "ts2.4": "1.3.0",
      "ts2.5": "1.3.0",
      "ts2.6": "1.3.0",
      "ts2.7": "1.3.0"
    },
    "react": {
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
      "projectName": "/a/app/test.csproj",
      "fileNames": [
        "/a/b/file2.jsx",
        "/a/b/file3.d.ts",
        "/a/b/lodash.js"
      ],
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "lodash"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Loaded safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: ["lodash"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["lodash"]
TI:: [hh:mm:ss:mss] Inferred 'react' typings due to presence of '.jsx' extension
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "lodash",
        "react"
      ],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules",
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/a/app/test.csproj",
      "files": [
        "/a/b/bower_components",
        "/a/b/node_modules",
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["lodash","react"]
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 1,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/a/app/test.csproj"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "beginInstallTypes",
      "body": {
        "eventId": 1
      }
    }
TI:: [hh:mm:ss:mss] #1 with cwd: /a/data arguments: [
  "@types/lodash@tsFakeMajor.Minor",
  "@types/react@tsFakeMajor.Minor"
]
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "6011e60969d97dd67a30c213a0f84e4df5372512e4d76256ab889fe749192088",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 1,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "allowJS": true,
            "moduleResolution": "node10"
          },
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
Info seq  [hh:mm:ss:mss] Project '/a/app/test.csproj' (External)
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
/a/app/bower_components: *new*
  {"pollingInterval":500}
/a/app/node_modules: *new*
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}
/a/b/node_modules: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/file2.jsx:
  {}
/a/b/file3.d.ts:
  {}

PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/lodash@tsFakeMajor.Minor",
  "@types/react@tsFakeMajor.Minor"
] *new*

Projects::
/a/app/test.csproj (External) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*

Before running PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/lodash@tsFakeMajor.Minor",
  "@types/react@tsFakeMajor.Minor"
]

TI:: Installation #1 with arguments:: [
  "@types/lodash@tsFakeMajor.Minor",
  "@types/react@tsFakeMajor.Minor"
] complete with success::true
//// [/a/data/node_modules/@types/lodash/index.d.ts]
declare const lodash: { x: number }

//// [/a/data/node_modules/@types/react/index.d.ts]
declare const react: { x: number }


TI:: [hh:mm:ss:mss] Installed typings ["@types/lodash@tsFakeMajor.Minor","@types/react@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/a/data/node_modules/@types/lodash/index.d.ts","/a/data/node_modules/@types/react/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/a/app/test.csproj",
      "typeAcquisition": {
        "include": [
          "lodash"
        ],
        "exclude": [],
        "enable": true
      },
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typings": [
        "/a/data/node_modules/@types/lodash/index.d.ts",
        "/a/data/node_modules/@types/react/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /a/app/test.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/a/app/test.csproj",
        "typeAcquisition": {
          "include": [
            "lodash"
          ],
          "exclude": [],
          "enable": true
        },
        "compilerOptions": {
          "allowJS": true,
          "moduleResolution": 2,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true
        },
        "typings": [
          "/a/data/node_modules/@types/lodash/index.d.ts",
          "/a/data/node_modules/@types/react/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 1,
      "projectName": "/a/app/test.csproj",
      "packagesToInstall": [
        "@types/lodash@tsFakeMajor.Minor",
        "@types/react@tsFakeMajor.Minor"
      ],
      "installSuccess": true,
      "typingsInstallerVersion": "FakeVersion"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "endInstallTypes",
      "body": {
        "eventId": 1,
        "packages": [
          "@types/lodash@tsFakeMajor.Minor",
          "@types/react@tsFakeMajor.Minor"
        ],
        "success": true
      }
    }
After running PendingInstalls callback:: count: 0

Timeout callback:: count: 1
1: /a/app/test.csproj *new*

Projects::
/a/app/test.csproj (External) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Before running Timeout callback:: count: 1
1: /a/app/test.csproj

Info seq  [hh:mm:ss:mss] Running: /a/app/test.csproj
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/data/node_modules/@types/lodash/package.json 2000 undefined Project: /a/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/data/node_modules/@types/package.json 2000 undefined Project: /a/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/data/node_modules/package.json 2000 undefined Project: /a/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/data/node_modules/@types/react/package.json 2000 undefined Project: /a/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app/test.csproj projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/b/file2.jsx Text-1 ""
	/a/b/file3.d.ts Text-1 ""
	/a/data/node_modules/@types/lodash/index.d.ts Text-1 "declare const lodash: { x: number }"
	/a/data/node_modules/@types/react/index.d.ts Text-1 "declare const react: { x: number }"


	../b/file2.jsx
	  Root file specified for compilation
	../b/file3.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/lodash/index.d.ts
	  Root file specified for compilation
	../data/node_modules/@types/react/index.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/a/app/test.csproj",
      "fileNames": [
        "/a/b/file2.jsx",
        "/a/b/file3.d.ts",
        "/a/data/node_modules/@types/lodash/index.d.ts",
        "/a/data/node_modules/@types/react/index.d.ts",
        "/a/b/lodash.js"
      ],
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "lodash"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: ["lodash"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["lodash"]
TI:: [hh:mm:ss:mss] Inferred 'react' typings due to presence of '.jsx' extension
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [
        "/a/data/node_modules/@types/lodash/index.d.ts",
        "/a/data/node_modules/@types/react/index.d.ts"
      ],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules",
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/a/app/test.csproj"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/a/app/test.csproj",
      "typeAcquisition": {
        "include": [
          "lodash"
        ],
        "exclude": [],
        "enable": true
      },
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typings": [
        "/a/data/node_modules/@types/lodash/index.d.ts",
        "/a/data/node_modules/@types/react/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/a/app/test.csproj",
        "typeAcquisition": {
          "include": [
            "lodash"
          ],
          "exclude": [],
          "enable": true
        },
        "compilerOptions": {
          "allowJS": true,
          "moduleResolution": 2,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true
        },
        "typings": [
          "/a/data/node_modules/@types/lodash/index.d.ts",
          "/a/data/node_modules/@types/react/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
After running Timeout callback:: count: 0

PolledWatches::
/a/app/bower_components:
  {"pollingInterval":500}
/a/app/node_modules:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/data/node_modules/@types/lodash/package.json: *new*
  {"pollingInterval":2000}
/a/data/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/a/data/node_modules/@types/react/package.json: *new*
  {"pollingInterval":2000}
/a/data/node_modules/package.json: *new*
  {"pollingInterval":2000}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/b/file2.jsx:
  {}
/a/b/file3.d.ts:
  {}

Projects::
/a/app/test.csproj (External) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
/a/b/file2.jsx
    version: Text-1
    containingProjects: 1
        /a/app/test.csproj
/a/b/file3.d.ts
    version: Text-1
    containingProjects: 1
        /a/app/test.csproj
/a/data/node_modules/@types/lodash/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /a/app/test.csproj
/a/data/node_modules/@types/react/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /a/app/test.csproj
