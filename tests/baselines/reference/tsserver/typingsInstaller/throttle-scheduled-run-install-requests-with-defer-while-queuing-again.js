currentDirectory:: / useCaseSensitiveFileNames: false
Before request
//// [/a/b/lodash.js]


//// [/a/b/commander.js]


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
        "projectFileName": "/a/app/test1.csproj",
        "options": {
          "allowJS": true,
          "moduleResolution": 2
        },
        "rootFiles": [
          {
            "fileName": "/a/b/commander.js"
          },
          {
            "fileName": "/a/b/file3.d.ts"
          }
        ],
        "typeAcquisition": {
          "include": [
            "jquery"
          ]
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Excluded '/a/b/commander.js' because it matched commander from the legacy safelist
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/file3.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app/test1.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test1.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app/test1.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app/test1.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/file3.d.ts Text-1 ""


	../b/file3.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling throttled operation:
    {
      "projectName": "/a/app/test1.csproj",
      "fileNames": [
        "/a/b/file3.d.ts",
        "/a/b/commander.js"
      ],
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "jquery",
          "commander"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling request for: /a/app/test1.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "d57df0c2e801fc85740246bb38cad99e380b98923a5bdf2b146062324576d721",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
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
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file3.d.ts: *new*
  {}

Timeout callback:: count: 1
1: /a/app/test1.csproj::discover *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/app/test2.csproj",
        "options": {
          "allowJS": true,
          "moduleResolution": 2
        },
        "rootFiles": [
          {
            "fileName": "/a/b/file3.d.ts"
          }
        ],
        "typeAcquisition": {
          "include": [
            "grunt",
            "gulp"
          ]
        }
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app/test2.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test2.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app/test2.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app/test2.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/file3.d.ts Text-1 ""


	../b/file3.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling throttled operation:
    {
      "projectName": "/a/app/test2.csproj",
      "fileNames": [
        "/a/b/file3.d.ts"
      ],
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "grunt",
          "gulp"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Deferring request for: /a/app/test2.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "708ab763923f965e4d2f19cfd2dca6beb9d49c11ba2c52d06b3375b1867b290b",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
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
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/app/test3.csproj",
        "options": {
          "allowJS": true,
          "moduleResolution": 2
        },
        "rootFiles": [
          {
            "fileName": "/a/b/lodash.js"
          },
          {
            "fileName": "/a/b/file3.d.ts"
          }
        ],
        "typeAcquisition": {
          "include": [
            "cordova"
          ]
        }
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Excluded '/a/b/lodash.js' because it matched lodash from the legacy safelist
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/app/test3.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/app/test3.csproj WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/app/test3.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/app/test3.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/file3.d.ts Text-1 ""


	../b/file3.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling throttled operation:
    {
      "projectName": "/a/app/test3.csproj",
      "fileNames": [
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
          "cordova",
          "lodash"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Deferring request for: /a/app/test3.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "5d322fe3ca31af82cbdcc0d00ec687f0e61a044e99fcdbe8f28f538027445147",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
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
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before running Timeout callback:: count: 1
1: /a/app/test1.csproj::discover

Info seq  [hh:mm:ss:mss] TIAdapter:: Sending request:
    {
      "projectName": "/a/app/test1.csproj",
      "fileNames": [
        "/a/b/file3.d.ts",
        "/a/b/commander.js"
      ],
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "jquery",
          "commander"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
TI:: Creating typing installer

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
    "commander": {
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
    },
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
    "cordova": {
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
    "gulp": {
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
    "grunt": {
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
      "projectName": "/a/app/test1.csproj",
      "fileNames": [
        "/a/b/file3.d.ts",
        "/a/b/commander.js"
      ],
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "jquery",
          "commander"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Loaded safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: ["jquery","commander"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["commander"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "jquery",
        "commander"
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
      "projectName": "/a/app/test1.csproj",
      "files": [
        "/a/b/bower_components",
        "/a/b/node_modules",
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/a/app/test1.csproj",
      "files": [
        "/a/b/bower_components",
        "/a/b/node_modules",
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test1.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["jquery","commander"]
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 1,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/a/app/test1.csproj"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 1,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/a/app/test1.csproj"
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
  "@types/jquery@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor"
]
After running Timeout callback:: count: 0

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
/a/b/file3.d.ts:
  {}

PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/jquery@ts5.4",
  "@types/commander@ts5.4"
] *new*

Before running PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/jquery@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor"
]

TI:: Installation #1 with arguments:: [
  "@types/jquery@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor"
] complete with success::true
//// [/a/data/node_modules/@types/commander/index.d.ts]
declare const commander: { x: number }

//// [/a/data/node_modules/@types/jquery/index.d.ts]
declare const jquery: { x: number }


TI:: [hh:mm:ss:mss] Installed typings ["@types/jquery@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/a/data/node_modules/@types/jquery/index.d.ts","/a/data/node_modules/@types/commander/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/a/app/test1.csproj",
      "typeAcquisition": {
        "include": [
          "jquery",
          "commander"
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
        "/a/data/node_modules/@types/jquery/index.d.ts",
        "/a/data/node_modules/@types/commander/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "projectName": "/a/app/test1.csproj",
      "typeAcquisition": {
        "include": [
          "jquery",
          "commander"
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
        "/a/data/node_modules/@types/jquery/index.d.ts",
        "/a/data/node_modules/@types/commander/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling request for: /a/app/test2.csproj
Info seq  [hh:mm:ss:mss] Scheduled: /a/app/test1.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/a/app/test1.csproj",
        "typeAcquisition": {
          "include": [
            "jquery",
            "commander"
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
          "/a/data/node_modules/@types/jquery/index.d.ts",
          "/a/data/node_modules/@types/commander/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 1,
      "projectName": "/a/app/test1.csproj",
      "packagesToInstall": [
        "@types/jquery@tsFakeMajor.Minor",
        "@types/commander@tsFakeMajor.Minor"
      ],
      "installSuccess": true,
      "typingsInstallerVersion": "FakeVersion"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 1,
      "projectName": "/a/app/test1.csproj",
      "packagesToInstall": [
        "@types/jquery@tsFakeMajor.Minor",
        "@types/commander@tsFakeMajor.Minor"
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
          "@types/jquery@tsFakeMajor.Minor",
          "@types/commander@tsFakeMajor.Minor"
        ],
        "success": true
      }
    }
After running PendingInstalls callback:: count: 0

Timeout callback:: count: 2
2: /a/app/test2.csproj::discover *new*
3: /a/app/test1.csproj *new*

Before running Timeout callback:: count: 2
2: /a/app/test2.csproj::discover
3: /a/app/test1.csproj

Invoking Timeout callback:: timeoutId:: 2:: /a/app/test2.csproj::discover
Info seq  [hh:mm:ss:mss] TIAdapter:: Sending request:
    {
      "projectName": "/a/app/test2.csproj",
      "fileNames": [
        "/a/b/file3.d.ts"
      ],
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "grunt",
          "gulp"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/a/app/test2.csproj",
      "fileNames": [
        "/a/b/file3.d.ts"
      ],
      "compilerOptions": {
        "allowJS": true,
        "moduleResolution": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [
          "grunt",
          "gulp"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: ["grunt","gulp"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "grunt",
        "gulp"
      ],
      "filesToWatch": [
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/a/app/test2.csproj",
      "files": [
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/a/app/test2.csproj",
      "files": [
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test2.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test2.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test2.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test2.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["grunt","gulp"]
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 2,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/a/app/test2.csproj"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 2,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/a/app/test2.csproj"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "beginInstallTypes",
      "body": {
        "eventId": 2
      }
    }
TI:: [hh:mm:ss:mss] #2 with cwd: /a/data arguments: [
  "@types/grunt@tsFakeMajor.Minor",
  "@types/gulp@tsFakeMajor.Minor"
]
After running Timeout callback:: count: 1

PendingInstalls callback:: count: 1
2: #2 with arguments:: [
  "@types/grunt@ts5.4",
  "@types/gulp@ts5.4"
] *new*

Before running PendingInstalls callback:: count: 1
2: #2 with arguments:: [
  "@types/grunt@tsFakeMajor.Minor",
  "@types/gulp@tsFakeMajor.Minor"
]

TI:: Installation #2 with arguments:: [
  "@types/grunt@tsFakeMajor.Minor",
  "@types/gulp@tsFakeMajor.Minor"
] complete with success::true
//// [/a/data/node_modules/@types/grunt/index.d.ts]
declare const grunt: { x: number }

//// [/a/data/node_modules/@types/gulp/index.d.ts]
declare const gulp: { x: number }


TI:: [hh:mm:ss:mss] Installed typings ["@types/grunt@tsFakeMajor.Minor","@types/gulp@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/a/data/node_modules/@types/grunt/index.d.ts","/a/data/node_modules/@types/gulp/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/a/app/test2.csproj",
      "typeAcquisition": {
        "include": [
          "grunt",
          "gulp"
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
        "/a/data/node_modules/@types/grunt/index.d.ts",
        "/a/data/node_modules/@types/gulp/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "projectName": "/a/app/test2.csproj",
      "typeAcquisition": {
        "include": [
          "grunt",
          "gulp"
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
        "/a/data/node_modules/@types/grunt/index.d.ts",
        "/a/data/node_modules/@types/gulp/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling request for: /a/app/test3.csproj
Info seq  [hh:mm:ss:mss] Scheduled: /a/app/test2.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/a/app/test2.csproj",
        "typeAcquisition": {
          "include": [
            "grunt",
            "gulp"
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
          "/a/data/node_modules/@types/grunt/index.d.ts",
          "/a/data/node_modules/@types/gulp/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 2,
      "projectName": "/a/app/test2.csproj",
      "packagesToInstall": [
        "@types/grunt@tsFakeMajor.Minor",
        "@types/gulp@tsFakeMajor.Minor"
      ],
      "installSuccess": true,
      "typingsInstallerVersion": "FakeVersion"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 2,
      "projectName": "/a/app/test2.csproj",
      "packagesToInstall": [
        "@types/grunt@tsFakeMajor.Minor",
        "@types/gulp@tsFakeMajor.Minor"
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
        "eventId": 2,
        "packages": [
          "@types/grunt@tsFakeMajor.Minor",
          "@types/gulp@tsFakeMajor.Minor"
        ],
        "success": true
      }
    }
After running PendingInstalls callback:: count: 0

Timeout callback:: count: 3
3: /a/app/test1.csproj
4: /a/app/test3.csproj::discover *new*
5: /a/app/test2.csproj *new*

Before running Timeout callback:: count: 3
3: /a/app/test1.csproj
4: /a/app/test3.csproj::discover
5: /a/app/test2.csproj

Invoking Timeout callback:: timeoutId:: 4:: /a/app/test3.csproj::discover
Info seq  [hh:mm:ss:mss] TIAdapter:: Sending request:
    {
      "projectName": "/a/app/test3.csproj",
      "fileNames": [
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
          "cordova",
          "lodash"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/a/app/test3.csproj",
      "fileNames": [
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
          "cordova",
          "lodash"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/a/app",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: ["cordova","lodash"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["lodash"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "cordova",
        "lodash"
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
      "projectName": "/a/app/test3.csproj",
      "files": [
        "/a/b/bower_components",
        "/a/b/node_modules",
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/a/app/test3.csproj",
      "files": [
        "/a/b/bower_components",
        "/a/b/node_modules",
        "/a/app/bower_components",
        "/a/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test3.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/app/test3.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test3.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/app/test3.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test3.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/bower_components 1 undefined Project: /a/app/test3.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test3.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/app/node_modules 1 undefined Project: /a/app/test3.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["cordova","lodash"]
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 3,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/a/app/test3.csproj"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 3,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/a/app/test3.csproj"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "beginInstallTypes",
      "body": {
        "eventId": 3
      }
    }
TI:: [hh:mm:ss:mss] #3 with cwd: /a/data arguments: [
  "@types/cordova@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor"
]
After running Timeout callback:: count: 2

PendingInstalls callback:: count: 1
3: #3 with arguments:: [
  "@types/cordova@ts5.4",
  "@types/lodash@ts5.4"
] *new*

Before running PendingInstalls callback:: count: 1
3: #3 with arguments:: [
  "@types/cordova@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor"
]

TI:: Installation #3 with arguments:: [
  "@types/cordova@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor"
] complete with success::true
//// [/a/data/node_modules/@types/lodash/index.d.ts]
declare const lodash: { x: number }

//// [/a/data/node_modules/@types/cordova/index.d.ts]
declare const cordova: { x: number }


TI:: [hh:mm:ss:mss] Installed typings ["@types/cordova@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/a/data/node_modules/@types/cordova/index.d.ts","/a/data/node_modules/@types/lodash/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/a/app/test3.csproj",
      "typeAcquisition": {
        "include": [
          "cordova",
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
        "/a/data/node_modules/@types/cordova/index.d.ts",
        "/a/data/node_modules/@types/lodash/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "projectName": "/a/app/test3.csproj",
      "typeAcquisition": {
        "include": [
          "cordova",
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
        "/a/data/node_modules/@types/cordova/index.d.ts",
        "/a/data/node_modules/@types/lodash/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /a/app/test3.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/a/app/test3.csproj",
        "typeAcquisition": {
          "include": [
            "cordova",
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
          "/a/data/node_modules/@types/cordova/index.d.ts",
          "/a/data/node_modules/@types/lodash/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 3,
      "projectName": "/a/app/test3.csproj",
      "packagesToInstall": [
        "@types/cordova@tsFakeMajor.Minor",
        "@types/lodash@tsFakeMajor.Minor"
      ],
      "installSuccess": true,
      "typingsInstallerVersion": "FakeVersion"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 3,
      "projectName": "/a/app/test3.csproj",
      "packagesToInstall": [
        "@types/cordova@tsFakeMajor.Minor",
        "@types/lodash@tsFakeMajor.Minor"
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
        "eventId": 3,
        "packages": [
          "@types/cordova@tsFakeMajor.Minor",
          "@types/lodash@tsFakeMajor.Minor"
        ],
        "success": true
      }
    }
After running PendingInstalls callback:: count: 0

Timeout callback:: count: 3
3: /a/app/test1.csproj
5: /a/app/test2.csproj
6: /a/app/test3.csproj *new*
