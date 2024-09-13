Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Before request
//// [/user/username/projects/project/lodash.js]


//// [/user/username/projects/project/commander.js]


//// [/user/username/projects/project/file3.d.ts]


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
        "projectFileName": "/user/username/projects/app/test1.csproj",
        "options": {
          "allowJS": true,
          "moduleResolution": 2
        },
        "rootFiles": [
          {
            "fileName": "/user/username/projects/project/lodash.js"
          },
          {
            "fileName": "/user/username/projects/project/commander.js"
          },
          {
            "fileName": "/user/username/projects/project/file3.d.ts"
          }
        ],
        "typeAcquisition": {
          "include": [
            "jquery",
            "cordova"
          ]
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Excluded '/user/username/projects/project/lodash.js' because it matched lodash from the legacy safelist
Info seq  [hh:mm:ss:mss] Excluded '/user/username/projects/project/commander.js' because it matched commander from the legacy safelist
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /user/username/projects/app/test1.csproj, currentDirectory: /user/username/projects/app
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/file3.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/app/test1.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules/@types 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules/@types 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/app/test1.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/app/test1.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/file3.d.ts Text-1 ""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../project/file3.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling throttled operation:
    {
      "projectName": "/user/username/projects/app/test1.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/file3.d.ts",
        "/user/username/projects/project/lodash.js",
        "/user/username/projects/project/commander.js"
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
          "cordova",
          "lodash",
          "commander"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/user/username/projects/app",
      "kind": "discover"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling request for: /user/username/projects/app/test1.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "3f50cfc566480103236ba7d91dffb32ba81fc1c9286c2b9c1029bf95ac31b17d",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
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
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/app/test1.csproj' (External)
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
/user/username/projects/app/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project/file3.d.ts: *new*
  {}

Timeout callback:: count: 1
1: /user/username/projects/app/test1.csproj::discover *new*

Projects::
/user/username/projects/app/test1.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test1.csproj
/user/username/projects/project/file3.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test1.csproj

Before running Timeout callback:: count: 1
1: /user/username/projects/app/test1.csproj::discover

Info seq  [hh:mm:ss:mss] TIAdapter:: Sending request:
    {
      "projectName": "/user/username/projects/app/test1.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/file3.d.ts",
        "/user/username/projects/project/lodash.js",
        "/user/username/projects/project/commander.js"
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
          "cordova",
          "lodash",
          "commander"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/user/username/projects/app",
      "kind": "discover"
    }
TI:: Creating typing installer

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
      "projectName": "/user/username/projects/app/test1.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/file3.d.ts",
        "/user/username/projects/project/lodash.js",
        "/user/username/projects/project/commander.js"
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
          "cordova",
          "lodash",
          "commander"
        ],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/user/username/projects/app",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Loaded safelist from types map file '/home/src/tslibs/TS/Lib/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: ["jquery","cordova","lodash","commander"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["lodash","commander"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "jquery",
        "cordova",
        "lodash",
        "commander"
      ],
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
      "projectName": "/user/username/projects/app/test1.csproj",
      "files": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/user/username/projects/app/bower_components",
        "/user/username/projects/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/user/username/projects/app/test1.csproj",
      "files": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules",
        "/user/username/projects/app/bower_components",
        "/user/username/projects/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/bower_components 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/bower_components 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules 1 undefined Project: /user/username/projects/app/test1.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["jquery","cordova","lodash","commander"]
TI:: [hh:mm:ss:mss] Npm config file: /home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 1,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/user/username/projects/app/test1.csproj"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 1,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/user/username/projects/app/test1.csproj"
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
TI:: [hh:mm:ss:mss] #1 with cwd: /home/src/Library/Caches/typescript arguments: [
  "@types/jquery@tsFakeMajor.Minor",
  "@types/cordova@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor"
]
After running Timeout callback:: count: 0

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
/user/username/projects/project/file3.d.ts:
  {}

PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/jquery@tsFakeMajor.Minor",
  "@types/cordova@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor"
] *new*

Before running PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/jquery@tsFakeMajor.Minor",
  "@types/cordova@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor"
]

TI:: Installation #1 with arguments:: [
  "@types/jquery@tsFakeMajor.Minor",
  "@types/cordova@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor"
] complete with success::true
//// [/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts]
declare const commander: { x: number }

//// [/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts]
declare const jquery: { x: number }

//// [/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts]
declare const lodash: { x: number }

//// [/home/src/Library/Caches/typescript/node_modules/@types/cordova/index.d.ts]
declare const cordova: { x: number }


TI:: [hh:mm:ss:mss] Installed typings ["@types/jquery@tsFakeMajor.Minor","@types/cordova@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts","/home/src/Library/Caches/typescript/node_modules/@types/cordova/index.d.ts","/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts","/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/user/username/projects/app/test1.csproj",
      "typeAcquisition": {
        "include": [
          "jquery",
          "cordova",
          "lodash",
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
        "/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/cordova/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "projectName": "/user/username/projects/app/test1.csproj",
      "typeAcquisition": {
        "include": [
          "jquery",
          "cordova",
          "lodash",
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
        "/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/cordova/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/app/test1.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/user/username/projects/app/test1.csproj",
        "typeAcquisition": {
          "include": [
            "jquery",
            "cordova",
            "lodash",
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
          "/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/cordova/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 1,
      "projectName": "/user/username/projects/app/test1.csproj",
      "packagesToInstall": [
        "@types/jquery@tsFakeMajor.Minor",
        "@types/cordova@tsFakeMajor.Minor",
        "@types/lodash@tsFakeMajor.Minor",
        "@types/commander@tsFakeMajor.Minor"
      ],
      "installSuccess": true,
      "typingsInstallerVersion": "FakeVersion"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 1,
      "projectName": "/user/username/projects/app/test1.csproj",
      "packagesToInstall": [
        "@types/jquery@tsFakeMajor.Minor",
        "@types/cordova@tsFakeMajor.Minor",
        "@types/lodash@tsFakeMajor.Minor",
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
          "@types/cordova@tsFakeMajor.Minor",
          "@types/lodash@tsFakeMajor.Minor",
          "@types/commander@tsFakeMajor.Minor"
        ],
        "success": true
      }
    }
After running PendingInstalls callback:: count: 0

Timeout callback:: count: 1
2: /user/username/projects/app/test1.csproj *new*

Projects::
/user/username/projects/app/test1.csproj (External) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/user/username/projects/project/app/test2.csproj",
        "options": {
          "allowJS": true,
          "moduleResolution": 2
        },
        "rootFiles": [
          {
            "fileName": "/user/username/projects/project/file3.d.ts"
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
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /user/username/projects/project/app/test2.csproj, currentDirectory: /user/username/projects/project/app
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/app/test2.csproj
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/app/node_modules/@types 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/app/node_modules/@types 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/app/test2.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/app/test2.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/file3.d.ts Text-1 ""


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../file3.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling throttled operation:
    {
      "projectName": "/user/username/projects/project/app/test2.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/file3.d.ts"
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
      "projectRootPath": "/user/username/projects/project/app",
      "kind": "discover"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Scheduling request for: /user/username/projects/project/app/test2.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "b593991b27b12a7207b7e7885d26b08da86188da5b4b535731cfa8d622ac4bfd",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
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
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/app/test1.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/app/test2.csproj' (External)
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
/user/username/projects/app/bower_components:
  {"pollingInterval":500}
/user/username/projects/app/node_modules:
  {"pollingInterval":500}
/user/username/projects/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/app/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/file3.d.ts:
  {}

Timeout callback:: count: 2
2: /user/username/projects/app/test1.csproj
3: /user/username/projects/project/app/test2.csproj::discover *new*

Projects::
/user/username/projects/app/test1.csproj (External)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
/user/username/projects/project/app/test2.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/app/test1.csproj
        /user/username/projects/project/app/test2.csproj *new*
/user/username/projects/project/file3.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/app/test1.csproj
        /user/username/projects/project/app/test2.csproj *new*

Before running Timeout callback:: count: 2
2: /user/username/projects/app/test1.csproj
3: /user/username/projects/project/app/test2.csproj::discover

Invoking Timeout callback:: timeoutId:: 3:: /user/username/projects/project/app/test2.csproj::discover
Info seq  [hh:mm:ss:mss] TIAdapter:: Sending request:
    {
      "projectName": "/user/username/projects/project/app/test2.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/file3.d.ts"
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
      "projectRootPath": "/user/username/projects/project/app",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/user/username/projects/project/app/test2.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/file3.d.ts"
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
      "projectRootPath": "/user/username/projects/project/app",
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
        "/user/username/projects/project/app/bower_components",
        "/user/username/projects/project/app/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/user/username/projects/project/app/test2.csproj",
      "files": [
        "/user/username/projects/project/app/bower_components",
        "/user/username/projects/project/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/user/username/projects/project/app/test2.csproj",
      "files": [
        "/user/username/projects/project/app/bower_components",
        "/user/username/projects/project/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/app/bower_components 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/app/bower_components 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/app/node_modules 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/app/node_modules 1 undefined Project: /user/username/projects/project/app/test2.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["grunt","gulp"]
TI:: [hh:mm:ss:mss] Npm config file: /home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 2,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/user/username/projects/project/app/test2.csproj"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 2,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/user/username/projects/project/app/test2.csproj"
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
TI:: [hh:mm:ss:mss] #2 with cwd: /home/src/Library/Caches/typescript arguments: [
  "@types/grunt@tsFakeMajor.Minor",
  "@types/gulp@tsFakeMajor.Minor"
]
After running Timeout callback:: count: 1

PolledWatches::
/user/username/projects/app/bower_components:
  {"pollingInterval":500}
/user/username/projects/app/node_modules:
  {"pollingInterval":500}
/user/username/projects/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/app/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/app/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/file3.d.ts:
  {}

PendingInstalls callback:: count: 1
2: #2 with arguments:: [
  "@types/grunt@tsFakeMajor.Minor",
  "@types/gulp@tsFakeMajor.Minor"
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
//// [/home/src/Library/Caches/typescript/node_modules/@types/grunt/index.d.ts]
declare const grunt: { x: number }

//// [/home/src/Library/Caches/typescript/node_modules/@types/gulp/index.d.ts]
declare const gulp: { x: number }


TI:: [hh:mm:ss:mss] Installed typings ["@types/grunt@tsFakeMajor.Minor","@types/gulp@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/home/src/Library/Caches/typescript/node_modules/@types/grunt/index.d.ts","/home/src/Library/Caches/typescript/node_modules/@types/gulp/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/user/username/projects/project/app/test2.csproj",
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
        "/home/src/Library/Caches/typescript/node_modules/@types/grunt/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/gulp/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] TIAdapter:: Received response:
    {
      "projectName": "/user/username/projects/project/app/test2.csproj",
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
        "/home/src/Library/Caches/typescript/node_modules/@types/grunt/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/gulp/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/project/app/test2.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/user/username/projects/project/app/test2.csproj",
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
          "/home/src/Library/Caches/typescript/node_modules/@types/grunt/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/gulp/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 2,
      "projectName": "/user/username/projects/project/app/test2.csproj",
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
      "projectName": "/user/username/projects/project/app/test2.csproj",
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

Timeout callback:: count: 2
2: /user/username/projects/app/test1.csproj
4: /user/username/projects/project/app/test2.csproj *new*

Projects::
/user/username/projects/app/test1.csproj (External)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
/user/username/projects/project/app/test2.csproj (External) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
