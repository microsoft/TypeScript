currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/background/a.ts]
let x = 10;

//// [/user/username/projects/myproject/background/tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "../typedefs/filesystem"
    ]
  }
}

//// [/user/username/projects/myproject/typedefs/filesystem.d.ts]
interface LocalFileSystem { someProperty: string; }

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
        "file": "/user/username/projects/myproject/background/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/background
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/background/a.ts :: Config file name: /user/username/projects/myproject/background/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/background/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/background/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/background/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/background/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/background/a.ts"
 ],
 "options": {
  "types": [
   "../typedefs/filesystem"
  ],
  "configFilePath": "/user/username/projects/myproject/background/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background 1 undefined Config: /user/username/projects/myproject/background/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background 1 undefined Config: /user/username/projects/myproject/background/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/background/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/typedefs/filesystem.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/background/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/background/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/background/a.ts SVC-1-0 "let x = 10;"
	/user/username/projects/myproject/typedefs/filesystem.d.ts Text-1 "interface LocalFileSystem { someProperty: string; }"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'
	../typedefs/filesystem.d.ts
	  Entry point of type library '../typedefs/filesystem' specified in compilerOptions

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/background/tsconfig.json"
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
          "projectId": "ccf693aa3668cc46bc3fa72e08d6e05afc771449aea697728f7ec49b60f77eb7",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 11,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 385,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "types": [
              ""
            ]
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
        "triggerFile": "/user/username/projects/myproject/background/a.ts",
        "configFile": "/user/username/projects/myproject/background/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/background/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/background/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/background/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/background/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/background/tsconfig.json: *new*
  {}
/user/username/projects/myproject/typedefs/filesystem.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/background: *new*
  {}
