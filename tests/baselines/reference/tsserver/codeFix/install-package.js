currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/src/file.ts]
import * as os from "os";
import * as https from "https";
import * as vscode from "vscode";


//// [/home/src/projects/project/tsconfig.json]
{ }

//// [/home/src/projects/project/node_modules/vscode/index.js]
export const x = 10;

//// [/a/lib/lib.d.ts]
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/src/file.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /home/src/projects/project/src
Info seq  [hh:mm:ss:mss] For info: /home/src/projects/project/src/file.ts :: Config file name: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/src/file.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/src/file.ts"
 ],
 "options": {
  "configFilePath": "/home/src/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 1 undefined Config: /home/src/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 1 undefined Config: /home/src/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/src 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/src 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/home/src/projects/project/src/file.ts SVC-1-0 "import * as os from \"os\";\nimport * as https from \"https\";\nimport * as vscode from \"vscode\";\n"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/file.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/tsconfig.json"
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
          "projectId": "1097a5f82e8323ba7aba7567ec06402f7ad4ea74abce44ec5efd223ac77ff169",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 92,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/projects/project/src/file.ts",
        "configFile": "/home/src/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/src/file.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project: *new*
  {}
/home/src/projects/project/node_modules: *new*
  {}
/home/src/projects/project/src: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getCombinedCodeFix",
      "arguments": {
        "scope": {
          "type": "file",
          "args": {
            "file": "/home/src/projects/project/src/file.ts"
          }
        },
        "fixId": "installTypesPackage"
      },
      "seq": 2,
      "type": "request"
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
    "vscode": {
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


TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::typesRegistry",
      "typesRegistry": {
        "vscode": {
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
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "changes": [],
        "commands": [
          {
            "type": "install package",
            "file": "/home/src/projects/project/src/file.ts",
            "packageName": "@types/node"
          },
          {
            "type": "install package",
            "file": "/home/src/projects/project/src/file.ts",
            "packageName": "@types/node"
          },
          {
            "type": "install package",
            "file": "/home/src/projects/project/src/file.ts",
            "packageName": "@types/vscode"
          }
        ]
      },
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "applyCodeActionCommand",
      "arguments": {
        "command": {
          "type": "install package",
          "file": "/home/src/projects/project/src/file.ts",
          "packageName": "@types/node"
        }
      },
      "seq": 3,
      "type": "request"
    }
TI:: [hh:mm:ss:mss] #-1 with cwd: /home/src/projects/project arguments: [
  "@types/node"
]
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {},
      "responseRequired": true
    }
After request

PendingInstalls callback:: count: 1
1: #-1 with arguments:: [
  "@types/node"
] *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "applyCodeActionCommand",
      "arguments": {
        "command": {
          "type": "install package",
          "file": "/home/src/projects/project/src/file.ts",
          "packageName": "@types/node"
        }
      },
      "seq": 4,
      "type": "request"
    }
TI:: [hh:mm:ss:mss] #-1 with cwd: /home/src/projects/project arguments: [
  "@types/node"
]
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {},
      "responseRequired": true
    }
After request

PendingInstalls callback:: count: 2
1: #-1 with arguments:: [
  "@types/node"
]
2: #-1 with arguments:: [
  "@types/node"
] *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "applyCodeActionCommand",
      "arguments": {
        "command": {
          "type": "install package",
          "file": "/home/src/projects/project/src/file.ts",
          "packageName": "@types/vscode"
        }
      },
      "seq": 5,
      "type": "request"
    }
TI:: [hh:mm:ss:mss] #-1 with cwd: /home/src/projects/project arguments: [
  "@types/vscode"
]
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {},
      "responseRequired": true
    }
After request

PendingInstalls callback:: count: 3
1: #-1 with arguments:: [
  "@types/node"
]
2: #-1 with arguments:: [
  "@types/node"
]
3: #-1 with arguments:: [
  "@types/vscode"
] *new*

Before running PendingInstalls callback:: count: 3
1: #-1 with arguments:: [
  "@types/node"
]
2: #-1 with arguments:: [
  "@types/node"
]
3: #-1 with arguments:: [
  "@types/vscode"
]

TI:: Installation #-1 with arguments:: [
  "@types/node"
] complete with success::true

TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::packageInstalled",
      "projectName": "/home/src/projects/project/tsconfig.json",
      "id": 1,
      "success": true,
      "message": "Package @types/node installed."
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "kind": "action::packageInstalled",
        "projectName": "/home/src/projects/project/tsconfig.json",
        "id": 1,
        "success": true,
        "message": "Package @types/node installed."
      }
    }
TI:: Installation #-1 with arguments:: [
  "@types/node"
] complete with success::true

TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::packageInstalled",
      "projectName": "/home/src/projects/project/tsconfig.json",
      "id": 2,
      "success": true,
      "message": "Package @types/node installed."
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "kind": "action::packageInstalled",
        "projectName": "/home/src/projects/project/tsconfig.json",
        "id": 2,
        "success": true,
        "message": "Package @types/node installed."
      }
    }
TI:: Installation #-1 with arguments:: [
  "@types/vscode"
] complete with success::true

TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::packageInstalled",
      "projectName": "/home/src/projects/project/tsconfig.json",
      "id": 3,
      "success": true,
      "message": "Package @types/vscode installed."
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "kind": "action::packageInstalled",
        "projectName": "/home/src/projects/project/tsconfig.json",
        "id": 3,
        "success": true,
        "message": "Package @types/vscode installed."
      }
    }
After running PendingInstalls callback:: count: 0
