Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/core/core.ts]
let z = 10;

//// [/user/username/projects/myproject/app1/app.ts]
let x = 10;

//// [/user/username/projects/myproject/app2/app.ts]
let y = 10;

//// [/user/username/projects/myproject/app1/tsconfig.json]
{
  "files": [
    "app.ts",
    "../core/core.ts"
  ],
  "compilerOptions": {
    "outFile": "build/output.js"
  },
  "compileOnSave": true
}

//// [/user/username/projects/myproject/app2/tsconfig.json]
{
  "files": [
    "app.ts",
    "../core/core.ts"
  ],
  "compilerOptions": {
    "outFile": "build/output.js"
  },
  "compileOnSave": true
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
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/app1/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/app1/app.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/app1/tsconfig.json, currentDirectory: /user/username/projects/myproject/app1
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/app1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app1/app.ts",
  "/user/username/projects/myproject/core/core.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/myproject/app1/build/output.js",
  "configFilePath": "/user/username/projects/myproject/app1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/app1/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/app1/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/core.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app1/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/app1/app.ts SVC-1-0 "let x = 10;"
	/user/username/projects/myproject/core/core.ts Text-1 "let z = 10;"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Part of 'files' list in tsconfig.json
	../core/core.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/app1/tsconfig.json"
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
          "projectId": "ad06cfcd75b622967d2a3f6234f1726ca250ca760de0a77d4eb73e8f023d899b",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 22,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "outFile": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
          "include": false,
          "exclude": false,
          "compileOnSave": true,
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
        "triggerFile": "/user/username/projects/myproject/app1/app.ts",
        "configFile": "/user/username/projects/myproject/app1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/app1/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/myproject/app1/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/app1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/core/core.ts: *new*
  {}

Projects::
/user/username/projects/myproject/app1/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/app1/tsconfig.json
/user/username/projects/myproject/app1/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/app1/tsconfig.json *default*
/user/username/projects/myproject/core/core.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/app1/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/app2/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/app2/app.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/app2/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/app2/tsconfig.json, currentDirectory: /user/username/projects/myproject/app2
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/app2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app2/app.ts",
  "/user/username/projects/myproject/core/core.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/myproject/app2/build/output.js",
  "configFilePath": "/user/username/projects/myproject/app2/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/app2/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/app2/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/app2/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app2/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/app2/app.ts SVC-1-0 "let y = 10;"
	/user/username/projects/myproject/core/core.ts Text-1 "let z = 10;"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Part of 'files' list in tsconfig.json
	../core/core.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/app2/tsconfig.json"
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
          "projectId": "4b6490418c9531e13d2d92446630cfe2d438e55f300423a496a5133d48a2000b",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 22,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "outFile": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
          "include": false,
          "exclude": false,
          "compileOnSave": true,
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
        "triggerFile": "/user/username/projects/myproject/app2/app.ts",
        "configFile": "/user/username/projects/myproject/app2/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/app1/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/app2/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/app2/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/myproject/app1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app2/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/app1/tsconfig.json:
  {}
/user/username/projects/myproject/app2/tsconfig.json: *new*
  {}
/user/username/projects/myproject/core/core.ts:
  {}

Projects::
/user/username/projects/myproject/app1/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/myproject/app2/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/myproject/app1/tsconfig.json
        /user/username/projects/myproject/app2/tsconfig.json *new*
/user/username/projects/myproject/app1/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/app1/tsconfig.json *default*
/user/username/projects/myproject/app2/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/app2/tsconfig.json *default*
/user/username/projects/myproject/core/core.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/myproject/app1/tsconfig.json
        /user/username/projects/myproject/app2/tsconfig.json *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/core/core.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/core/core.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/core/core.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/app1/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/app2/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/app2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/core/core.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/app1/tsconfig.json,/user/username/projects/myproject/app2/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true
    }
After request

PolledWatches::
/user/username/projects/myproject/app1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/app2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/app1/tsconfig.json:
  {}
/user/username/projects/myproject/app2/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/core/core.ts:
  {}

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/myproject/app1/tsconfig.json
        /user/username/projects/myproject/app2/tsconfig.json
/user/username/projects/myproject/app1/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/app1/tsconfig.json *default*
/user/username/projects/myproject/app2/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/app2/tsconfig.json *default*
/user/username/projects/myproject/core/core.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 2
        /user/username/projects/myproject/app1/tsconfig.json *default*
        /user/username/projects/myproject/app2/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "change",
      "arguments": {
        "file": "/user/username/projects/myproject/app1/app.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "let k = 1"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 4,
      "success": true
    }
After request

Projects::
/user/username/projects/myproject/app1/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false
/user/username/projects/myproject/app2/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/myproject/app1/tsconfig.json
        /user/username/projects/myproject/app2/tsconfig.json
/user/username/projects/myproject/app1/app.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /user/username/projects/myproject/app1/tsconfig.json *default*
/user/username/projects/myproject/app2/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/app2/tsconfig.json *default*
/user/username/projects/myproject/core/core.ts (Open)
    version: Text-1
    containingProjects: 2
        /user/username/projects/myproject/app1/tsconfig.json *default*
        /user/username/projects/myproject/app2/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "change",
      "arguments": {
        "file": "/user/username/projects/myproject/app2/app.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "let k = 1"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 5,
      "success": true
    }
After request

Projects::
/user/username/projects/myproject/app1/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    autoImportProviderHost: false
/user/username/projects/myproject/app2/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/myproject/app1/tsconfig.json
        /user/username/projects/myproject/app2/tsconfig.json
/user/username/projects/myproject/app1/app.ts (Open)
    version: SVC-1-1
    containingProjects: 1
        /user/username/projects/myproject/app1/tsconfig.json *default*
/user/username/projects/myproject/app2/app.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /user/username/projects/myproject/app2/tsconfig.json *default*
/user/username/projects/myproject/core/core.ts (Open)
    version: Text-1
    containingProjects: 2
        /user/username/projects/myproject/app1/tsconfig.json *default*
        /user/username/projects/myproject/app2/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/core/core.ts",
        "projectFileName": "/user/username/projects/myproject/app1/tsconfig.json"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app1/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/app1/app.ts SVC-1-1 "let k = 1let x = 10;"
	/user/username/projects/myproject/core/core.ts Text-1 "let z = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/app1/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/core/core.ts"
          ],
          "projectUsesOutFile": true
        }
      ],
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/user/username/projects/myproject/app1/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false
/user/username/projects/myproject/app2/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    autoImportProviderHost: false
