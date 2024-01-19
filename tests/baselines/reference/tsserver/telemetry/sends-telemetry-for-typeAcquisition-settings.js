currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a.js]


//// [/jsconfig.json]
{
  "compilerOptions": {},
  "typeAcquisition": {
    "enable": true,
    "include": [
      "hunter2",
      "hunter3"
    ],
    "exclude": []
  }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /a.js :: Config file name: /jsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /jsconfig.json 2000 undefined Project: /jsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/jsconfig.json",
        "reason": "Creating possible configured project for /a.js to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /jsconfig.json : {
 "rootNames": [
  "/a.js"
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a.js SVC-1-0 ""


	a.js
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

TI:: [hh:mm:ss:mss] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Trying to find '/a/data/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/a/data/package.json' is missing, creating new one...
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with a :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with a :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with a/data :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with a/data/package.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /jsconfig.json Detected new package.json: /a/data/package.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/data/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project: /jsconfig.json Detected file add/remove of non supported extension: a/data/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data/package.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with a/data/node_modules :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data/node_modules :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with a/data/node_modules/types-registry :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data/node_modules/types-registry :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with a/data/node_modules/types-registry/index.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /jsconfig.json Detected file add/remove of non supported extension: a/data/node_modules/types-registry/index.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with a/data/node_modules/types-registry/index.json :: WatchInfo:  1 undefined Config: /jsconfig.json WatchType: Wild card directory
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
  "entries": {}
}


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/data/package.json: *new*
  {}
/jsconfig.json:
  {}

FsWatchesRecursive::
/:
  {}

Timeout callback:: count: 2
7: /jsconfig.json *new*
8: *ensureProjectForOpenFiles* *new*

TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/jsconfig.json",
      "fileNames": [
        "/a.js"
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
        "include": [
          "hunter2",
          "hunter3"
        ],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: ["hunter2","hunter3"]
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "hunter2",
        "hunter3"
      ],
      "filesToWatch": [
        "/bower_components",
        "/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/jsconfig.json",
      "files": [
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /jsconfig.json WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["hunter2","hunter3"]
TI:: [hh:mm:ss:mss] 'hunter2':: Entry for package 'hunter2' does not exist in local types registry - skipping...
TI:: [hh:mm:ss:mss] 'hunter3':: Entry for package 'hunter3' does not exist in local types registry - skipping...
TI:: [hh:mm:ss:mss] All typings are known to be missing or invalid - no need to install more typings
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/jsconfig.json",
      "typeAcquisition": {
        "enable": true,
        "include": [
          "hunter2",
          "hunter3"
        ],
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
          "include": [
            "hunter2",
            "hunter3"
          ],
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
            "include": true,
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /jsconfig.json Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a.js",
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
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /jsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
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
/a/data/package.json:
  {}
/jsconfig.json:
  {}

FsWatchesRecursive::
/:
  {}
