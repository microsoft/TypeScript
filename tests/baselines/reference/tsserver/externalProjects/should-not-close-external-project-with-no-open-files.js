Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/b/f1.ts]
let x =1;

//// [/home/src/projects/project/a/b/f2.ts]
let y =1;

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
        "rootFiles": [
          {
            "fileName": "/home/src/projects/project/a/b/f1.ts"
          },
          {
            "fileName": "/home/src/projects/project/a/b/f2.ts"
          }
        ],
        "options": {},
        "projectFileName": "externalproject"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating ExternalProject: externalproject, currentDirectory: 
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/f1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/f2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: externalproject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: externalproject projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'externalproject' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/b/f1.ts Text-1 "let x =1;"
	/home/src/projects/project/a/b/f2.ts Text-1 "let y =1;"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../projects/project/a/b/f1.ts
	  Root file specified for compilation
	../../../projects/project/a/b/f2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "59cfd112a2b851f335a337881c90d587c0f168242dc1e05a7c50b27678c07b75",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 18,
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
          "compileOnSave": true,
          "configFileName": "other",
          "projectType": "external",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] Project 'externalproject' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)

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
/home/src/Vscode/Projects/bin/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/b/f1.ts: *new*
  {}
/home/src/projects/project/a/b/f2.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
externalproject (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/projects/project/a/b/f1.ts *new*
    version: Text-1
    containingProjects: 1
        externalproject
/home/src/projects/project/a/b/f2.ts *new*
    version: Text-1
    containingProjects: 1
        externalproject
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        externalproject

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/a/b/f1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/a/b/f1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project 'externalproject' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a/b/f1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: externalproject
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/b/f2.ts:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project/a/b/f1.ts:
  {}

ScriptInfos::
/home/src/projects/project/a/b/f1.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        externalproject *default*
/home/src/projects/project/a/b/f2.ts
    version: Text-1
    containingProjects: 1
        externalproject
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        externalproject

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/home/src/projects/project/a/b/f1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/b/f1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project 'externalproject' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 3,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/b/f1.ts: *new*
  {}
/home/src/projects/project/a/b/f2.ts:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

ScriptInfos::
/home/src/projects/project/a/b/f1.ts *changed*
    open: false *changed*
    version: Text-1
    containingProjects: 1
        externalproject
/home/src/projects/project/a/b/f2.ts
    version: Text-1
    containingProjects: 1
        externalproject
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        externalproject

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "closeExternalProject",
      "arguments": {
        "projectFileName": "externalproject"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project 'externalproject' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/home/src/projects/project/a/b/f1.ts
	/home/src/projects/project/a/b/f2.ts


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../projects/project/a/b/f1.ts
	  Root file specified for compilation
	../../../projects/project/a/b/f2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches *deleted*::
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/b/f1.ts:
  {}
/home/src/projects/project/a/b/f2.ts:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

Projects::
externalproject (External) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*

ScriptInfos::
/home/src/projects/project/a/b/f1.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        externalproject *deleted*
/home/src/projects/project/a/b/f2.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        externalproject *deleted*
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        externalproject *deleted*
