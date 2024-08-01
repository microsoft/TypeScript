currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/app.js]


//// [/jsconfig.json]
{}

//// [/package.json]
{
  "dependencies": {
    "@zkat/cacache": "1.0.0"
  }
}

//// [/node_modules/commander/index.js]


//// [/node_modules/commander/package.json]
{
  "name": "commander"
}

//// [/node_modules/@zkat/cacache/index.js]


//// [/node_modules/@zkat/cacache/package.json]
{
  "name": "@zkat/cacache"
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/app.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /app.js ProjectRootPath: undefined:: Result: /jsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /jsconfig.json 2000 undefined Project: /jsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/jsconfig.json",
        "reason": "Creating possible configured project for /app.js to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /jsconfig.json : {
 "rootNames": [
  "/app.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/jsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /jsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /jsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/app.js SVC-1-0 ""


	app.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/jsconfig.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

Projects::
/jsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/app.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /jsconfig.json *default*

TI:: [hh:mm:ss:mss] Global cache location '/tmp', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/tmp'
TI:: [hh:mm:ss:mss] Trying to find '/tmp/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/tmp'
TI:: [hh:mm:ss:mss] Npm config file: /tmp/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/tmp/package.json' is missing, creating new one...
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with tmp :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with tmp/package.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /jsconfig.json Detected new package.json: /tmp/package.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tmp/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project: /jsconfig.json Detected file add/remove of non supported extension: tmp/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/package.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with tmp/node_modules :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with tmp/node_modules/types-registry :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/types-registry :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with tmp/node_modules/types-registry/index.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /jsconfig.json Detected file add/remove of non supported extension: tmp/node_modules/types-registry/index.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/types-registry/index.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/tmp/package.json]
{ "private": true }

//// [/tmp/node_modules/types-registry/index.json]
{
  "entries": {
    "zkat__cacache": {
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
    "nested": {
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
    }
  }
}


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/jsconfig.json:
  {}
/tmp/package.json: *new*
  {}

FsWatchesRecursive::
/:
  {}

Timeout callback:: count: 2
5: /jsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/jsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 0
    dirty: true *changed*

TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/jsconfig.json",
      "fileNames": [
        "/app.js"
      ],
      "compilerOptions": {
        "allowJs": true,
        "maxNodeModuleJsDepth": 2,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "noEmit": true,
        "configFilePath": "/jsconfig.json",
        "allowNonTsExtensions": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Typing names in '/package.json' dependencies: ["@zkat/cacache"]
TI:: [hh:mm:ss:mss] Searching for typing names in /node_modules; all files: ["/node_modules/@zkat/cacache/package.json"]
TI:: [hh:mm:ss:mss]     Found package names: ["@zkat/cacache"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "@zkat/cacache"
      ],
      "filesToWatch": [
        "/bower_components",
        "/package.json",
        "/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/jsconfig.json",
      "files": [
        "/bower_components",
        "/package.json",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 2000 undefined Project: /jsconfig.json WatchType: File location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /jsconfig.json WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["@zkat/cacache"]
TI:: [hh:mm:ss:mss] Npm config file: /tmp/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 1,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/jsconfig.json"
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
TI:: [hh:mm:ss:mss] #1 with cwd: /tmp arguments: [
  "@types/zkat__cacache@tsFakeMajor.Minor"
]
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@zkat/cacache/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/node_modules/@zkat/cacache/index.js Text-1 ""


	node_modules/@zkat/cacache/index.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/jsconfig.json"
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
          "projectId": "d3f7418c3d4888d0a51e42716b5a330dab4da64c452eebe918c1e0e634d8ede1",
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
          "compilerOptions": {
            "allowJs": true,
            "maxNodeModuleJsDepth": 2,
            "allowSyntheticDefaultImports": true,
            "skipLibCheck": true,
            "noEmit": true
          },
          "typeAcquisition": {
            "enable": true,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "jsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /jsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /jsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/app.js",
        "configFile": "/jsconfig.json",
        "diagnostics": [
          {
            "text": "File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /jsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}

FsWatches::
/jsconfig.json:
  {}
/node_modules/@zkat/cacache/package.json: *new*
  {}
/package.json: *new*
  {}
/tmp/package.json:
  {}

FsWatchesRecursive::
/:
  {}
/node_modules: *new*
  {}

PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/zkat__cacache@tsFakeMajor.Minor"
] *new*

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/jsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1 *changed*
    dirty: false *changed*
    autoImportProviderHost: /dev/null/autoImportProviderProject1* *changed*

ScriptInfos::
/app.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /jsconfig.json *default*
/node_modules/@zkat/cacache/index.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*

Before running PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/zkat__cacache@tsFakeMajor.Minor"
]

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with tmp/node_modules/@types :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/@types :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with tmp/node_modules/@types/zkat__cacache :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/@types/zkat__cacache :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with tmp/node_modules/@types/zkat__cacache/index.d.ts :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with tmp/node_modules/@types/zkat__cacache/index.d.ts :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
TI:: Installation #1 with arguments:: [
  "@types/zkat__cacache@tsFakeMajor.Minor"
] complete with success::true
//// [/tmp/node_modules/@types/zkat__cacache/index.d.ts]



Timeout callback:: count: 2
5: /jsconfig.json *deleted*
6: *ensureProjectForOpenFiles* *deleted*
11: /jsconfig.json *new*
12: *ensureProjectForOpenFiles* *new*

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/jsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

TI:: [hh:mm:ss:mss] Installed typings ["@types/zkat__cacache@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/tmp/node_modules/@types/zkat__cacache/index.d.ts"]
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/jsconfig.json",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "maxNodeModuleJsDepth": 2,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "noEmit": true,
        "configFilePath": "/jsconfig.json",
        "allowNonTsExtensions": true
      },
      "typings": [
        "/tmp/node_modules/@types/zkat__cacache/index.d.ts"
      ],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/jsconfig.json",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "maxNodeModuleJsDepth": 2,
          "allowSyntheticDefaultImports": true,
          "skipLibCheck": true,
          "noEmit": true,
          "configFilePath": "/jsconfig.json",
          "allowNonTsExtensions": true
        },
        "typings": [
          "/tmp/node_modules/@types/zkat__cacache/index.d.ts"
        ],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 1,
      "projectName": "/jsconfig.json",
      "packagesToInstall": [
        "@types/zkat__cacache@tsFakeMajor.Minor"
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
          "@types/zkat__cacache@tsFakeMajor.Minor"
        ],
        "success": true
      }
    }
After running PendingInstalls callback:: count: 0

Timeout callback:: count: 2
11: /jsconfig.json *deleted*
12: *ensureProjectForOpenFiles* *deleted*
13: /jsconfig.json *new*
14: *ensureProjectForOpenFiles* *new*

Before running Timeout callback:: count: 2
13: /jsconfig.json
14: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /jsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tmp/node_modules/@types/zkat__cacache/package.json 2000 undefined Project: /jsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tmp/node_modules/@types/package.json 2000 undefined Project: /jsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /jsconfig.json projectStateVersion: 3 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/app.js SVC-1-0 ""
	/tmp/node_modules/@types/zkat__cacache/index.d.ts Text-1 ""


	app.js
	  Matched by default include pattern '**/*'
	tmp/node_modules/@types/zkat__cacache/index.d.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/jsconfig.json",
      "fileNames": [
        "/app.js",
        "/tmp/node_modules/@types/zkat__cacache/index.d.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "maxNodeModuleJsDepth": 2,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "noEmit": true,
        "configFilePath": "/jsconfig.json",
        "allowNonTsExtensions": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Typing names in '/package.json' dependencies: ["@zkat/cacache"]
TI:: [hh:mm:ss:mss] Searching for typing names in /node_modules; all files: ["/node_modules/@zkat/cacache/package.json"]
TI:: [hh:mm:ss:mss]     Found package names: ["@zkat/cacache"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "@zkat/cacache"
      ],
      "filesToWatch": [
        "/bower_components",
        "/package.json",
        "/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/jsconfig.json"
    }
TI:: [hh:mm:ss:mss] Installing typings ["@zkat/cacache"]
TI:: [hh:mm:ss:mss] '@zkat/cacache':: 'zkat__cacache' already has an up-to-date typing - skipping...
TI:: [hh:mm:ss:mss] All typings are known to be missing or invalid - no need to install more typings
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/jsconfig.json",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "maxNodeModuleJsDepth": 2,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "noEmit": true,
        "configFilePath": "/jsconfig.json",
        "allowNonTsExtensions": true
      },
      "typings": [],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/jsconfig.json",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "maxNodeModuleJsDepth": 2,
          "allowSyntheticDefaultImports": true,
          "skipLibCheck": true,
          "noEmit": true,
          "configFilePath": "/jsconfig.json",
          "allowNonTsExtensions": true
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /tmp/node_modules/@types/zkat__cacache/package.json 2000 undefined Project: /jsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /tmp/node_modules/@types/package.json 2000 undefined Project: /jsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /jsconfig.json projectStateVersion: 4 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/app.js SVC-1-0 ""


	app.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/jsconfig.json",
      "fileNames": [
        "/app.js"
      ],
      "compilerOptions": {
        "allowJs": true,
        "maxNodeModuleJsDepth": 2,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "noEmit": true,
        "configFilePath": "/jsconfig.json",
        "allowNonTsExtensions": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Typing names in '/package.json' dependencies: ["@zkat/cacache"]
TI:: [hh:mm:ss:mss] Searching for typing names in /node_modules; all files: ["/node_modules/@zkat/cacache/package.json"]
TI:: [hh:mm:ss:mss]     Found package names: ["@zkat/cacache"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "@zkat/cacache"
      ],
      "filesToWatch": [
        "/bower_components",
        "/package.json",
        "/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/jsconfig.json"
    }
TI:: [hh:mm:ss:mss] Installing typings ["@zkat/cacache"]
TI:: [hh:mm:ss:mss] '@zkat/cacache':: 'zkat__cacache' already has an up-to-date typing - skipping...
TI:: [hh:mm:ss:mss] All typings are known to be missing or invalid - no need to install more typings
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/jsconfig.json",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "maxNodeModuleJsDepth": 2,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "noEmit": true,
        "configFilePath": "/jsconfig.json",
        "allowNonTsExtensions": true
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
        "projectName": "/jsconfig.json",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "maxNodeModuleJsDepth": 2,
          "allowSyntheticDefaultImports": true,
          "skipLibCheck": true,
          "noEmit": true,
          "configFilePath": "/jsconfig.json",
          "allowNonTsExtensions": true
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
After running Timeout callback:: count: 2

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}

FsWatches::
/jsconfig.json:
  {}
/node_modules/@zkat/cacache/package.json:
  {}
/package.json:
  {}
/tmp/package.json:
  {}

FsWatchesRecursive::
/:
  {}
/node_modules:
  {}

Timeout callback:: count: 2
14: *ensureProjectForOpenFiles* *deleted*
15: /jsconfig.json *new*
16: *ensureProjectForOpenFiles* *new*

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
/jsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3 *changed*
    dirty: false *changed*
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
/app.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /jsconfig.json *default*
/node_modules/@zkat/cacache/index.js
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/tmp/node_modules/@types/zkat__cacache/index.d.ts *new*
    version: Text-1
    containingProjects: 0
