currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "shared/src/library"
    },
    {
      "path": "app/src/program"
    }
  ]
}

//// [/user/username/projects/myproject/shared/src/library/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "../../bld/library"
  }
}

//// [/user/username/projects/myproject/shared/src/library/index.ts]
export function foo() {}

//// [/user/username/projects/myproject/shared/package.json]
{
  "name": "shared",
  "version": "1.0.0",
  "main": "bld/library/index.js",
  "types": "bld/library/index.d.ts"
}

//// [/user/username/projects/myproject/app/src/program/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "../../bld/program"
  },
  "references": [
    {
      "path": "../../../shared/src/library"
    }
  ]
}

//// [/user/username/projects/myproject/app/src/program/bar.ts]
import {foo} from "shared";

//// [/user/username/projects/myproject/app/src/program/index.ts]
foo

//// [/user/username/projects/myproject/node_modules/shared] symlink(/user/username/projects/myproject/shared)
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
        "file": "/user/username/projects/myproject/app/src/program/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/app/src/program
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/app/src/program/index.ts :: Config file name: /user/username/projects/myproject/app/src/program/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/app/src/program/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/app/src/program/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/app/src/program/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/app/src/program/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app/src/program/bar.ts",
  "/user/username/projects/myproject/app/src/program/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/app/bld/program",
  "configFilePath": "/user/username/projects/myproject/app/src/program/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/shared/src/library",
   "originalPath": "../../../shared/src/library"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program 1 undefined Config: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program 1 undefined Config: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/bar.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/app/src/program/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/shared/src/library/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/shared/src/library/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/shared/bld/library",
  "configFilePath": "/user/username/projects/myproject/shared/src/library/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library 1 undefined Config: /user/username/projects/myproject/shared/src/library/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library 1 undefined Config: /user/username/projects/myproject/shared/src/library/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/package.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app/src/program/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app/src/program/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/shared/src/library/index.ts Text-1 "export function foo() {}"
	/user/username/projects/myproject/app/src/program/bar.ts Text-1 "import {foo} from \"shared\";"
	/user/username/projects/myproject/app/src/program/index.ts SVC-1-0 "foo"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../../../shared/src/library/index.ts
	  Imported via "shared" from file 'bar.ts' with packageId 'shared/bld/library/index.d.ts@1.0.0'
	bar.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/app/src/program/tsconfig.json"
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
          "projectId": "411522698dbc12875e9e299d0a129013c8978d5b30e858e832f28e635af6304a",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 54,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "outDir": ""
          },
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
        "triggerFile": "/user/username/projects/myproject/app/src/program/index.ts",
        "configFile": "/user/username/projects/myproject/app/src/program/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/app/src/program
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/app/src/program/tsconfig.json :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app/src/program/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/app/src/program/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/app/src/program/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/app/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/app/src/program/bar.ts: *new*
  {}
/user/username/projects/myproject/app/src/program/tsconfig.json: *new*
  {}
/user/username/projects/myproject/shared/package.json: *new*
  {}
/user/username/projects/myproject/shared/src/library/index.ts: *new*
  {}
/user/username/projects/myproject/shared/src/library/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/app/src/program: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/shared/src/library: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getCodeFixes",
      "arguments": {
        "file": "/user/username/projects/myproject/app/src/program/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 4,
        "errorCodes": [
          2304
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "fixName": "import",
          "description": "Add import from \"shared\"",
          "changes": [
            {
              "fileName": "/user/username/projects/myproject/app/src/program/index.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { foo } from \"shared\";\n\n"
                }
              ]
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
