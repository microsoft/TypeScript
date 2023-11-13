currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/jsconfig.json]
{
  "compilerOptions": {
    "checkJs": true,
    "skipLibCheck": true
  }
}

//// [/a/jsFile.js]
let x = 1;
                x === "string";


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/jsFile.js :: Config file name: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/jsconfig.json",
        "reason": "Creating possible configured project for /a/jsFile.js to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/jsconfig.json : {
 "rootNames": [
  "/a/jsFile.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "checkJs": true,
  "configFilePath": "/a/jsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/jsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/jsFile.js SVC-1-0 "let x = 1;\n                x === \"string\";"


	jsFile.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/jsconfig.json: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}

TI:: [hh:mm:ss:mss] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Trying to find '/a/data/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/a/data/package.json' is missing, creating new one...
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /a/jsconfig.json Detected new package.json: /a/data/package.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/data/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project: /a/jsconfig.json Detected file add/remove of non supported extension: /a/data/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/package.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/jsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry/index.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /a/jsconfig.json Detected file add/remove of non supported extension: /a/data/node_modules/types-registry/index.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/data/node_modules/types-registry/index.json :: WatchInfo: /a 1 undefined Config: /a/jsconfig.json WatchType: Wild card directory
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
/a/jsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Timeout callback:: count: 2
5: /a/jsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/a/jsconfig.json",
      "fileNames": [
        "/a/jsFile.js"
      ],
      "compilerOptions": {
        "allowJs": true,
        "maxNodeModuleJsDepth": 2,
        "allowSyntheticDefaultImports": true,
        "skipLibCheck": true,
        "noEmit": true,
        "checkJs": true,
        "configFilePath": "/a/jsconfig.json",
        "allowNonTsExtensions": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/a/jsconfig.json",
      "files": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /a/jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /a/jsconfig.json WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/a/jsconfig.json",
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
        "checkJs": true,
        "configFilePath": "/a/jsconfig.json",
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
        "projectName": "/a/jsconfig.json",
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
          "checkJs": true,
          "configFilePath": "/a/jsconfig.json",
          "allowNonTsExtensions": true
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/jsconfig.json"
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
          "projectId": "d0d8dad6731288ecaafd815d288fca9793f4a55553e712b664ec18e525950982",
          "fileStats": {
            "js": 1,
            "jsSize": 42,
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
            "noEmit": true,
            "checkJs": true
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
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a/jsFile.js",
        "configFile": "/a/jsconfig.json",
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
Info seq  [hh:mm:ss:mss] Project '/a/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/jsFile.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/jsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/data/package.json:
  {}
/a/jsconfig.json:
  {}

FsWatchesRecursive::
/a:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/jsFile.js"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "start": {
            "line": 2,
            "offset": 17
          },
          "end": {
            "line": 2,
            "offset": 31
          },
          "text": "This comparison appears to be unintentional because the types 'number' and 'string' have no overlap.",
          "code": 2367,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
After request
