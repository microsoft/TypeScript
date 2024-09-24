Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/a/b/src/file1.ts]
let x = 1;

//// [/user/username/projects/project/a/b/src/file2.ts]
let y = 1;

//// [/user/username/projects/project/a/b/file3.ts]
let z = 1;

//// [/user/username/projects/project/a/file4.ts]
let z = 1;

//// [/user/username/projects/project/a/b/tsconfig.json]
{
  "files": [
    "src/file1.ts",
    "file3.ts"
  ]
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
        "file": "/user/username/projects/project/a/b/src/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/b/src/file1.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/project/a/b/tsconfig.json, currentDirectory: /user/username/projects/project/a/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/tsconfig.json 2000 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/a/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/a/b/src/file1.ts",
  "/user/username/projects/project/a/b/file3.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/project/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/a/b/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/project/a/b/src/file1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/a/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/b/src/file1.ts SVC-1-0 "let x = 1;"
	/user/username/projects/project/a/b/file3.ts Text-1 "let z = 1;"


	../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Part of 'files' list in tsconfig.json
	file3.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/a/b/tsconfig.json"
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
          "projectId": "7e3b2b8617d8e0c4d620aa844198acf13d097732523c56cc651fe4595bffe37c",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 20,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
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
          "files": true,
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
        "triggerFile": "/user/username/projects/project/a/b/src/file1.ts",
        "configFile": "/user/username/projects/project/a/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
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
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project/a/b/file3.ts: *new*
  {}
/user/username/projects/project/a/b/tsconfig.json: *new*
  {}

Projects::
/user/username/projects/project/a/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/file3.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/src/file1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/a/b/src/file2.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/b/src/file2.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/b/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/user/username/projects/project/a/b/src/file2.ts",
        "configFile": "/user/username/projects/project/a/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /user/username/projects/project/a/b/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/b/src/file2.ts SVC-1-0 "let y = 1;"


	../../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/src/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/b/src/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/b/src/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/a/b/file3.ts:
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/project/a/b/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/project/a/b/tsconfig.json
        /dev/null/inferredProject1* *new*
/user/username/projects/project/a/b/file3.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file2.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/a/b/file3.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
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
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/project/a/b/file3.ts:
  {}

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/project/a/b/tsconfig.json
        /dev/null/inferredProject1*
/user/username/projects/project/a/b/file3.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/a/file4.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject2*, currentDirectory: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/file4.ts SVC-1-0 "let z = 1;"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file4.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/project/a/b/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /user/username/projects/project/a/b/tsconfig.json
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/user/username/projects/project/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/a/file4.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/project/a/b/tsconfig.json 1:: WatchInfo: /user/username/projects/project/a/b/tsconfig.json 2000 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/b/src/file1.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/b/src/file2.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/project/a/b/tsconfig.json 1:: WatchInfo: /user/username/projects/project/a/b/tsconfig.json 2000 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /user/username/projects/project/a/b/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/user/username/projects/project/a/b/tsconfig.json]
{}


Timeout callback:: count: 2
1: /user/username/projects/project/a/b/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: undefined *changed*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/a/b/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/a/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/a/b/file3.ts",
  "/user/username/projects/project/a/b/src/file1.ts",
  "/user/username/projects/project/a/b/src/file2.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/project/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b 1 undefined Config: /user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b 1 undefined Config: /user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/a/b/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/b/src/file1.ts SVC-1-0 "let x = 1;"
	/user/username/projects/project/a/b/file3.ts Text-1 "let z = 1;"
	/user/username/projects/project/a/b/src/file2.ts SVC-1-0 "let y = 1;"


	../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/a/b/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/user/username/projects/project/a/b/tsconfig.json",
        "configFile": "/user/username/projects/project/a/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/projects/project/a/b/src/file1.ts,/user/username/projects/project/a/b/src/file2.ts,/user/username/projects/project/a/b/file3.ts,/user/username/projects/project/a/file4.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/project/a/b/src/file1.ts",
          "/user/username/projects/project/a/b/src/file2.ts",
          "/user/username/projects/project/a/b/file3.ts",
          "/user/username/projects/project/a/file4.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/a/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/b/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/b/src/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/a/b: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 2 *changed*
    isOrphan: true *changed*
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/project/a/b/tsconfig.json
        /dev/null/inferredProject2*
        /dev/null/inferredProject1* *deleted*
/user/username/projects/project/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file2.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /user/username/projects/project/a/b/tsconfig.json *default* *new*
        /dev/null/inferredProject1* *deleted*
/user/username/projects/project/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/a/b/src/file1.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/src/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/src/file2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 5,
      "success": true
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/a/b/src/file1.ts: *new*
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/a/b:
  {}

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/project/a/b/tsconfig.json
        /dev/null/inferredProject2*
/user/username/projects/project/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file1.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/src/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/a/b/src/file2.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 6,
      "success": true
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/a/b/src/file1.ts:
  {}
/user/username/projects/project/a/b/src/file2.ts: *new*
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/a/b:
  {}

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/project/a/b/tsconfig.json
        /dev/null/inferredProject2*
/user/username/projects/project/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file1.ts
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/src/file2.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/a/file4.ts"
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/file4.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 7,
      "success": true
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/a/b/src/file1.ts:
  {}
/user/username/projects/project/a/b/src/file2.ts:
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}
/user/username/projects/project/a/file4.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/project/a/b:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 2
    isOrphan: true
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false
/user/username/projects/project/a/b/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 2

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/project/a/b/tsconfig.json
        /dev/null/inferredProject2*
/user/username/projects/project/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file1.ts
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/src/file2.ts
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/file4.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /dev/null/inferredProject2* *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/a/file4.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/file4.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 8,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/a/b/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/a/b/src/file1.ts:
  {}
/user/username/projects/project/a/b/src/file2.ts:
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/project/a/file4.ts:
  {}

FsWatchesRecursive::
/user/username/projects/project/a/b:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 2
    isClosed: true *changed*
    isOrphan: true
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    isOrphan: false *changed*
    autoImportProviderHost: undefined *changed*
/user/username/projects/project/a/b/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 2

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/project/a/b/tsconfig.json
        /dev/null/inferredProject2*
/user/username/projects/project/a/b/file3.ts (Open)
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/src/file1.ts
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/src/file2.ts
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/file4.ts (Open) *changed*
    open: true *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /dev/null/inferredProject2* *default* *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/a/b/file3.ts"
      },
      "seq": 9,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 9,
      "success": true
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/a/b/file3.ts: *new*
  {}
/user/username/projects/project/a/b/src/file1.ts:
  {}
/user/username/projects/project/a/b/src/file2.ts:
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project/a/b:
  {}

Projects::
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
/user/username/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2
    noOpenRef: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/project/a/b/tsconfig.json
        /dev/null/inferredProject2*
/user/username/projects/project/a/b/file3.ts *changed*
    open: false *changed*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/src/file1.ts
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/src/file2.ts
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

File5 written
//// [/user/username/projects/project/file5.ts]
let zz = 1;


Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/file5.ts"
      },
      "seq": 10,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/file5.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject3*, currentDirectory: /user/username/projects/project
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/file5.ts SVC-1-0 "let zz = 1;"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file5.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/user/username/projects/project/a/b/src/file1.ts
	/user/username/projects/project/a/b/file3.ts
	/user/username/projects/project/a/b/src/file2.ts


	../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b 1 undefined Config: /user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b 1 undefined Config: /user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/tsconfig.json 2000 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/src/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/file5.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 10,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/project/a/b/file3.ts:
  {}
/user/username/projects/project/a/b/src/file1.ts:
  {}
/user/username/projects/project/a/b/src/file2.ts:
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/project/a/b:
  {}

Projects::
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
/dev/null/inferredProject3* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/project/a/b/tsconfig.json (Configured) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 2
    isClosed: true *changed*
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject2*
        /dev/null/inferredProject3* *new*
        /user/username/projects/project/a/b/tsconfig.json *deleted*
/user/username/projects/project/a/b/file3.ts *deleted*
    version: Text-1
    containingProjects: 0 *changed*
        /user/username/projects/project/a/b/tsconfig.json *deleted*
/user/username/projects/project/a/b/src/file1.ts *deleted*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /user/username/projects/project/a/b/tsconfig.json *deleted*
/user/username/projects/project/a/b/src/file2.ts *deleted*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /user/username/projects/project/a/b/tsconfig.json *deleted*
/user/username/projects/project/a/file4.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/user/username/projects/project/file5.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
