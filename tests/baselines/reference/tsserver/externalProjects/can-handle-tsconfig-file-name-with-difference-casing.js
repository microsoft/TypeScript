Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/b/app.ts]
let x = 1

//// [/home/src/projects/project/a/b/tsconfig.json]
{
  "include": []
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
      "command": "configure",
      "arguments": {
        "preferences": {
          "lazyConfiguredProjectsFromExternalProject": false
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/home/src/projects/project/a/b/project.csproj",
        "rootFiles": [
          {
            "fileName": "/home/src/projects/project/a/b/app.ts"
          },
          {
            "fileName": "/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json"
          }
        ],
        "options": {}
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json, currentDirectory: /HOME/SRC/PROJECTS/PROJECT/A/B
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json 2000 undefined Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json",
        "reason": "Creating configured project in external project: /home/src/projects/project/a/b/project.csproj"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /HOME/SRC/PROJECTS/PROJECT/A/B/node_modules/@types 1 undefined Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /HOME/SRC/PROJECTS/PROJECT/A/B/node_modules/@types 1 undefined Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /HOME/SRC/PROJECTS/PROJECT/A/node_modules/@types 1 undefined Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /HOME/SRC/PROJECTS/PROJECT/A/node_modules/@types 1 undefined Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /HOME/SRC/PROJECTS/PROJECT/node_modules/@types 1 undefined Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /HOME/SRC/PROJECTS/PROJECT/node_modules/@types 1 undefined Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /HOME/SRC/PROJECTS/node_modules/@types 1 undefined Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /HOME/SRC/PROJECTS/node_modules/@types 1 undefined Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json"
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
          "projectId": "2a054fd15884f3bf9a401d7683458a8547554c7259410f0ff35094e41d86719f",
          "fileStats": {
            "js": 0,
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
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": true,
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
        "triggerFile": "/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json",
        "configFile": "/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json",
        "diagnostics": [
          {
            "text": "No inputs were found in config file '/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json'. Specified 'include' paths were '[]' and 'exclude' paths were '[]'.",
            "code": 18003,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

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
/HOME/SRC/PROJECTS/PROJECT/A/B/node_modules/@types: *new*
  {"pollingInterval":500}
/HOME/SRC/PROJECTS/PROJECT/A/node_modules/@types: *new*
  {"pollingInterval":500}
/HOME/SRC/PROJECTS/PROJECT/node_modules/@types: *new*
  {"pollingInterval":500}
/HOME/SRC/PROJECTS/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json: *new*
  {}

Projects::
/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/a/b/app.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/b/app.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/projects/project/a/b/app.ts",
        "configFile": "/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json",
        "diagnostics": [
          {
            "text": "No inputs were found in config file '/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json'. Specified 'include' paths were '[]' and 'exclude' paths were '[]'.",
            "code": 18003,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/projects/project/a/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/b/app.ts SVC-1-0 "let x = 1"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/HOME/SRC/PROJECTS/PROJECT/A/B/node_modules/@types:
  {"pollingInterval":500}
/HOME/SRC/PROJECTS/PROJECT/A/node_modules/@types:
  {"pollingInterval":500}
/HOME/SRC/PROJECTS/PROJECT/node_modules/@types:
  {"pollingInterval":500}
/HOME/SRC/PROJECTS/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/b/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/HOME/SRC/PROJECTS/PROJECT/A/B/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/b/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
