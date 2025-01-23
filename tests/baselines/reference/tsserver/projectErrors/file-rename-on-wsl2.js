Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/username/workspaces/project/src/a.ts] Inode:: 6
export const a = 10;

//// [/home/username/workspaces/project/src/b.ts] Inode:: 7
export const b = 10;

//// [/home/username/workspaces/project/tsconfig.json] Inode:: 8
{
  "compilerOptions": {
    "strictNullChecks": true
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 16
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
        "file": "/home/username/workspaces/project/src/a.ts",
        "projectRootPath": "/home/username/workspaces/project"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/username/workspaces/project/src/a.ts ProjectRootPath: /home/username/workspaces/project:: Result: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/username/workspaces/project/tsconfig.json, currentDirectory: /home/username/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/username/workspaces/project/tsconfig.json 2000 undefined Project: /home/username/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/username/workspaces/project/tsconfig.json : {
 "rootNames": [
  "/home/username/workspaces/project/src/a.ts",
  "/home/username/workspaces/project/src/b.ts"
 ],
 "options": {
  "strictNullChecks": true,
  "configFilePath": "/home/username/workspaces/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/username/workspaces/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/username/workspaces/project/src/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/username/workspaces/project/src 1 undefined Config: /home/username/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/username/workspaces/project/src 1 undefined Config: /home/username/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/username/workspaces/project/src/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/username/workspaces/project/node_modules/@types 1 undefined Project: /home/username/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/username/workspaces/project/node_modules/@types 1 undefined Project: /home/username/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/username/workspaces/node_modules/@types 1 undefined Project: /home/username/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/username/workspaces/node_modules/@types 1 undefined Project: /home/username/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/username/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/username/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/username/workspaces/project/src/a.ts SVC-1-0 "export const a = 10;"
	/home/username/workspaces/project/src/b.ts Text-1 "export const b = 10;"


	../../../src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/a.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/b.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/username/workspaces/project/tsconfig.json"
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
          "projectId": "feae09fccc5853fad179bd1098956e4ca9d751edf8685dec7f9f2e80c273756a",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 40,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "strictNullChecks": true
          },
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
        "triggerFile": "/home/username/workspaces/project/src/a.ts",
        "configFile": "/home/username/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/username/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/username/workspaces/project/src/a.ts ProjectRootPath: /home/username/workspaces/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/username/workspaces/project/tsconfig.json
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
/home/username/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/home/username/workspaces/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"inode":16}
/home/username/workspaces/project/src: *new*
  {"inode":5}
/home/username/workspaces/project/src/b.ts: *new*
  {"inode":7}
/home/username/workspaces/project/tsconfig.json: *new*
  {"inode":8}

Projects::
/home/username/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json
/home/username/workspaces/project/src/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json *default*
/home/username/workspaces/project/src/b.ts *new*
    version: Text-1
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/username/workspaces/project/src/b.ts 2:: WatchInfo: /home/username/workspaces/project/src/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/username/workspaces/project/src/b.ts 2:: WatchInfo: /home/username/workspaces/project/src/b.ts 500 undefined WatchType: Closed Script info
Before request
//// [/home/username/workspaces/project/src/c.ts] Inode:: 114
export const b = 10;

//// [/home/username/workspaces/project/src/b.ts] deleted

PolledWatches::
/home/username/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/username/workspaces/project/node_modules/@types:
  {"pollingInterval":500}
/home/username/workspaces/project/src/b.ts: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":16}
/home/username/workspaces/project/src:
  {"inode":5}
/home/username/workspaces/project/tsconfig.json:
  {"inode":8}

FsWatches *deleted*::
/home/username/workspaces/project/src/b.ts:
  {"inode":7}

Timeout callback:: count: 3
1: /home/username/workspaces/project/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*
4: timerToUpdateChildWatches *new*

Projects::
/home/username/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json
/home/username/workspaces/project/src/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json *default*
/home/username/workspaces/project/src/b.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/username/workspaces/project/tsconfig.json *deleted*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/username/workspaces/project/src/c.ts",
        "projectRootPath": "/home/username/workspaces/project",
        "fileContent": "export const b = 10;"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Invoking /home/username/workspaces/project/tsconfig.json:: wildcard for open scriptInfo:: /home/username/workspaces/project/src/c.ts
Info seq  [hh:mm:ss:mss] Scheduled: /home/username/workspaces/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/username/workspaces/project/src/c.ts ProjectRootPath: /home/username/workspaces/project:: Result: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/username/workspaces/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/username/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/username/workspaces/project/src/a.ts SVC-1-0 "export const a = 10;"
	/home/username/workspaces/project/src/c.ts SVC-1-0 "export const b = 10;"


	../../../src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/a.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/c.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/username/workspaces/project/src/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/home/username/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/username/workspaces/project/src/a.ts ProjectRootPath: /home/username/workspaces/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/username/workspaces/project/src/c.ts ProjectRootPath: /home/username/workspaces/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/username/workspaces/project/tsconfig.json
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
/home/username/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/username/workspaces/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/username/workspaces/project/src/b.ts:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":16}
/home/username/workspaces/project/src:
  {"inode":5}
/home/username/workspaces/project/tsconfig.json:
  {"inode":8}

Timeout callback:: count: 3
1: /home/username/workspaces/project/tsconfig.json *deleted*
2: *ensureProjectForOpenFiles* *deleted*
4: timerToUpdateChildWatches
5: /home/username/workspaces/project/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/home/username/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json
/home/username/workspaces/project/src/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json *default*
/home/username/workspaces/project/src/b.ts *deleted*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/username/workspaces/project/src/c.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json *default*

Before running Timeout callback:: count: 3
4: timerToUpdateChildWatches
5: /home/username/workspaces/project/tsconfig.json
6: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] sysLog:: onTimerToUpdateChildWatches:: 1
Info seq  [hh:mm:ss:mss] sysLog:: invokingWatchers:: Elapsed:: *ms:: 0
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/username/workspaces/project/src/b.ts 0:: WatchInfo: /home/username/workspaces/project/src 1 undefined Config: /home/username/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/username/workspaces/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/username/workspaces/project/src/b.ts 0:: WatchInfo: /home/username/workspaces/project/src 1 undefined Config: /home/username/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/username/workspaces/project/src/c.ts 1:: WatchInfo: /home/username/workspaces/project/src 1 undefined Config: /home/username/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/username/workspaces/project/src/c.ts 1:: WatchInfo: /home/username/workspaces/project/src 1 undefined Config: /home/username/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] sysLog:: Elapsed:: *ms:: onTimerToUpdateChildWatches:: 0 undefined
After running Timeout callback:: count: 2

Timeout callback:: count: 2
5: /home/username/workspaces/project/tsconfig.json *deleted*
6: *ensureProjectForOpenFiles* *deleted*
7: /home/username/workspaces/project/tsconfig.json *new*
8: *ensureProjectForOpenFiles* *new*

Projects::
/home/username/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

Before running Timeout callback:: count: 2
7: /home/username/workspaces/project/tsconfig.json
8: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/username/workspaces/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/username/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/username/workspaces/project/src/a.ts ProjectRootPath: /home/username/workspaces/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/username/workspaces/project/src/c.ts ProjectRootPath: /home/username/workspaces/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/username/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/username/workspaces/project/src/a.ts ProjectRootPath: /home/username/workspaces/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/username/workspaces/project/src/c.ts ProjectRootPath: /home/username/workspaces/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/username/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/username/workspaces/project/src/a.ts,/home/username/workspaces/project/src/c.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/username/workspaces/project/src/a.ts",
          "/home/username/workspaces/project/src/c.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/username/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: false *changed*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/home/username/workspaces/project/src/c.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/username/workspaces/project/src/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/home/username/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/username/workspaces/project/src/a.ts ProjectRootPath: /home/username/workspaces/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/username/workspaces/project/tsconfig.json
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
/home/username/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/username/workspaces/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":16}
/home/username/workspaces/project/src:
  {"inode":5}
/home/username/workspaces/project/src/c.ts: *new*
  {"inode":114}
/home/username/workspaces/project/tsconfig.json:
  {"inode":8}

Projects::
/home/username/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json
/home/username/workspaces/project/src/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json *default*
/home/username/workspaces/project/src/c.ts *changed*
    open: false *changed*
    version: SVC-1-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/username/workspaces/project/tsconfig.json
