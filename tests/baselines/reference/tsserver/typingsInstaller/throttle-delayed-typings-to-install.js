Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Before request
//// [/user/username/projects/project/lodash.js]


//// [/user/username/projects/project/commander.js]


//// [/user/username/projects/project/file3.d.ts]


//// [/user/username/projects/project/package.json]
{
  "name": "test",
  "dependencies": {
    "express": "^3.1.0"
  }
}

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
        "projectFileName": "/user/username/projects/app/test.csproj",
        "options": {
          "allowJS": true,
          "moduleResolution": 2
        },
        "rootFiles": [
          {
            "fileName": "/user/username/projects/project//lodash.js"
          },
          {
            "fileName": "/user/username/projects/project//commander.js"
          },
          {
            "fileName": "/user/username/projects/project//file3.d.ts"
          }
        ],
        "typeAcquisition": {
          "include": [
            "jquery",
            "moment"
          ]
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Excluded '/user/username/projects/project//lodash.js' because it matched lodash from the legacy safelist
Info seq  [hh:mm:ss:mss] Excluded '/user/username/projects/project//commander.js' because it matched commander from the legacy safelist
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /user/username/projects/app/test.csproj, currentDirectory: /user/username/projects/app
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/file3.d.ts 500 undefined WatchType: Closed Script info
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
	/user/username/projects/project/file3.d.ts Text-1 ""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../project/file3.d.ts
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
/user/username/projects/project/file3.d.ts: *new*
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
/user/username/projects/project/file3.d.ts *new*
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
    "express": {
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
    "moment": {
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
    }
  }
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/user/username/projects/app/test.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/file3.d.ts",
        "/user/username/projects/project//lodash.js",
        "/user/username/projects/project//commander.js"
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
          "moment",
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
TI:: [hh:mm:ss:mss] Explicitly included types: ["jquery","moment","lodash","commander"]
TI:: [hh:mm:ss:mss] Typing names in '/user/username/projects/project/package.json' dependencies: ["express"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["lodash","commander"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "jquery",
        "moment",
        "lodash",
        "commander",
        "express"
      ],
      "filesToWatch": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/package.json",
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
        "/user/username/projects/project/package.json",
        "/user/username/projects/project/node_modules",
        "/user/username/projects/app/bower_components",
        "/user/username/projects/app/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/package.json 2000 undefined Project: /user/username/projects/app/test.csproj WatchType: File location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/bower_components 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/bower_components 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/app/node_modules 1 undefined Project: /user/username/projects/app/test.csproj WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["jquery","moment","lodash","commander","express"]
TI:: [hh:mm:ss:mss] Npm config file: /home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 1,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/user/username/projects/app/test.csproj"
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
  "@types/moment@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor",
  "@types/express@tsFakeMajor.Minor"
]
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
/user/username/projects/project/file3.d.ts:
  {}
/user/username/projects/project/package.json: *new*
  {}

PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/jquery@tsFakeMajor.Minor",
  "@types/moment@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor",
  "@types/express@tsFakeMajor.Minor"
] *new*

Projects::
/user/username/projects/app/test.csproj (External) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*

Before running PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/jquery@tsFakeMajor.Minor",
  "@types/moment@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor",
  "@types/express@tsFakeMajor.Minor"
]

TI:: Installation #1 with arguments:: [
  "@types/jquery@tsFakeMajor.Minor",
  "@types/moment@tsFakeMajor.Minor",
  "@types/lodash@tsFakeMajor.Minor",
  "@types/commander@tsFakeMajor.Minor",
  "@types/express@tsFakeMajor.Minor"
] complete with success::true
//// [/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts]
declare const commander: { x: number }

//// [/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts]
declare const express: { x: number }

//// [/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts]
declare const jquery: { x: number }

//// [/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts]
declare const moment: { x: number }

//// [/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts]
declare const lodash: { x: number }


TI:: [hh:mm:ss:mss] Installed typings ["@types/jquery@tsFakeMajor.Minor","@types/moment@tsFakeMajor.Minor","@types/lodash@tsFakeMajor.Minor","@types/commander@tsFakeMajor.Minor","@types/express@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts","/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts","/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts","/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts","/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/user/username/projects/app/test.csproj",
      "typeAcquisition": {
        "include": [
          "jquery",
          "moment",
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
        "/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/app/test.csproj
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/user/username/projects/app/test.csproj",
        "typeAcquisition": {
          "include": [
            "jquery",
            "moment",
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
          "/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 1,
      "projectName": "/user/username/projects/app/test.csproj",
      "packagesToInstall": [
        "@types/jquery@tsFakeMajor.Minor",
        "@types/moment@tsFakeMajor.Minor",
        "@types/lodash@tsFakeMajor.Minor",
        "@types/commander@tsFakeMajor.Minor",
        "@types/express@tsFakeMajor.Minor"
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
          "@types/moment@tsFakeMajor.Minor",
          "@types/lodash@tsFakeMajor.Minor",
          "@types/commander@tsFakeMajor.Minor",
          "@types/express@tsFakeMajor.Minor"
        ],
        "success": true
      }
    }
After running PendingInstalls callback:: count: 0

Timeout callback:: count: 1
1: /user/username/projects/app/test.csproj *new*

Projects::
/user/username/projects/app/test.csproj (External) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Before running Timeout callback:: count: 1
1: /user/username/projects/app/test.csproj

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/app/test.csproj
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/app/test.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/commander/package.json 2000 undefined Project: /user/username/projects/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/package.json 2000 undefined Project: /user/username/projects/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/package.json 2000 undefined Project: /user/username/projects/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/package.json 2000 undefined Project: /user/username/projects/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/express/package.json 2000 undefined Project: /user/username/projects/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/jquery/package.json 2000 undefined Project: /user/username/projects/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/lodash/package.json 2000 undefined Project: /user/username/projects/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/moment/package.json 2000 undefined Project: /user/username/projects/app/test.csproj WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/app/test.csproj projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/app/test.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (7)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/file3.d.ts Text-1 ""
	/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts Text-1 "declare const commander: { x: number }"
	/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts Text-1 "declare const express: { x: number }"
	/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts Text-1 "declare const jquery: { x: number }"
	/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts Text-1 "declare const lodash: { x: number }"
	/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts Text-1 "declare const moment: { x: number }"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../project/file3.d.ts
	  Root file specified for compilation
	../../../../home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts
	  Root file specified for compilation
	../../../../home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts
	  Root file specified for compilation
	../../../../home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts
	  Root file specified for compilation
	../../../../home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts
	  Root file specified for compilation
	../../../../home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/user/username/projects/app/test.csproj",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/file3.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts",
        "/user/username/projects/project//lodash.js",
        "/user/username/projects/project//commander.js"
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
          "moment",
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
TI:: [hh:mm:ss:mss] Explicitly included types: ["jquery","moment","lodash","commander"]
TI:: [hh:mm:ss:mss] Typing names in '/user/username/projects/project/package.json' dependencies: ["express"]
TI:: [hh:mm:ss:mss] Inferred typings from file names: ["lodash","commander"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [
        "/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts"
      ],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/package.json",
        "/user/username/projects/project/node_modules",
        "/user/username/projects/app/bower_components",
        "/user/username/projects/app/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/user/username/projects/app/test.csproj"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/user/username/projects/app/test.csproj",
      "typeAcquisition": {
        "include": [
          "jquery",
          "moment",
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
        "/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts",
        "/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts"
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
        "projectName": "/user/username/projects/app/test.csproj",
        "typeAcquisition": {
          "include": [
            "jquery",
            "moment",
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
          "/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts",
          "/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
After running Timeout callback:: count: 0

PolledWatches::
/home/src/Library/Caches/typescript/node_modules/@types/commander/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/express/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/jquery/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/lodash/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/moment/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/app/bower_components:
  {"pollingInterval":500}
/user/username/projects/app/node_modules:
  {"pollingInterval":500}
/user/username/projects/app/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/Library/Caches/typescript/package.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/file3.d.ts:
  {}
/user/username/projects/project/package.json:
  {}

Projects::
/user/username/projects/app/test.csproj (External) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/Library/Caches/typescript/node_modules/@types/commander/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test.csproj
/home/src/Library/Caches/typescript/node_modules/@types/express/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test.csproj
/home/src/Library/Caches/typescript/node_modules/@types/jquery/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test.csproj
/home/src/Library/Caches/typescript/node_modules/@types/lodash/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test.csproj
/home/src/Library/Caches/typescript/node_modules/@types/moment/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test.csproj
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test.csproj
/user/username/projects/project/file3.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/app/test.csproj
