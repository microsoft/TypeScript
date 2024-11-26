Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts]
import {C} from "@microsoft/recognizers-text";
new C();

//// [/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json]
{
  "include": [
    "src"
  ]
}

//// [/users/username/projects/myproject/javascript/packages/recognizers-text/src/recognizers-text.ts]
export class C { method () { return 10; } }

//// [/users/username/projects/myproject/javascript/packages/recognizers-text/package.json]
{
  "typings": "dist/types/recognizers-text.d.ts"
}

//// [/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text] symlink(/users/username/projects/myproject/javascript/packages/recognizers-text)

//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts]
export class C { method(): number; }

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
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "projectRootPath": "/users/username/projects/myproject"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject:: Result: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json, currentDirectory: /users/username/projects/myproject/javascript/packages/recognizers-date-time
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json 2000 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/package.json 2000 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts Text-1 "export class C { method(): number; }"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../recognizers-text/dist/types/recognizers-text.d.ts
	  Imported via "@microsoft/recognizers-text" from file 'src/datetime/baseDate.ts'
	src/datetime/baseDate.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json"
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
          "projectId": "a6bd830f3b019a6f703b938422f5798726d0914f0d6f67c2539798ea5e66fed2",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 55,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 449,
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
        "triggerFile": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "configFile": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
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
/users/username/projects/myproject/javascript/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src: *new*
  {}

Projects::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json *default*
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
After request

Timeout callback:: count: 1
1: checkOne *new*

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
1: semanticCheck *new*

Before running Immedidate callback:: count: 1
1: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
2: suggestionCheck *new*

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 2,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 2:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 2:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
2: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
3: *ensureProjectForOpenFiles*
//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts] deleted

Timeout callback:: count: 2
2: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json *new*
3: *ensureProjectForOpenFiles* *new*

Projects::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json *default*
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json *deleted*

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/datetime/baseDate.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/users/username/projects/myproject/javascript/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text: *new*
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src:
  {}

Projects::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
After request

Timeout callback:: count: 1
4: checkOne *new*

Before running Timeout callback:: count: 1
4: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
3: semanticCheck *new*

Before running Immedidate callback:: count: 1
3: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 46
            },
            "text": "Cannot find module '@microsoft/recognizers-text' or its corresponding type declarations.",
            "code": 2307,
            "category": "error"
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
4: suggestionCheck *new*

Before running Immedidate callback:: count: 1
4: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 3,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text/dist :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text/dist :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text/dist/types :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text/dist/types :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 0:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 0:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text/dist/types/recognizers-text.d.ts :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text/dist/types/recognizers-text.d.ts :: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 1
7: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.jsonFailedLookupInvalidation
//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts]
export class C { method(): number; }


Timeout callback:: count: 1
7: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.jsonFailedLookupInvalidation *new*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json *default*
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
8: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json *new*
9: *ensureProjectForOpenFiles* *new*

Projects::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

Before running Timeout callback:: count: 2
8: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
9: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts Text-1 "export class C { method(): number; }"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../recognizers-text/dist/types/recognizers-text.d.ts
	  Imported via "@microsoft/recognizers-text" from file 'src/datetime/baseDate.ts'
	src/datetime/baseDate.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts ProjectRootPath: /users/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/users/username/projects/myproject/javascript/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/myproject/javascript/node_modules:
  {"pollingInterval":500}
/users/username/projects/myproject/javascript/packages/node_modules:
  {"pollingInterval":500}
/users/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/users/username/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src:
  {}

FsWatchesRecursive *deleted*::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text:
  {}

Projects::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json *default*
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
After request

Timeout callback:: count: 1
10: checkOne *new*

Before running Timeout callback:: count: 1
10: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
5: semanticCheck *new*

Before running Immedidate callback:: count: 1
5: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
6: suggestionCheck *new*

Before running Immedidate callback:: count: 1
6: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 4,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0
