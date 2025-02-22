Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/workspaces/somerepo/src/tsconfig.json] Inode:: 4
{}

//// [/workspaces/somerepo/src/main.ts] Inode:: 5
import { randomSeed } from "random-seed";
randomSeed();

//// [/workspaces/somerepo/node_modules/@types/random-seed/index.d.ts] Inode:: 9
export function randomSeed(): string;

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 18
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
        "file": "/workspaces/somerepo/src/main.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /workspaces/somerepo/src/main.ts ProjectRootPath: undefined:: Result: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /workspaces/somerepo/src/tsconfig.json, currentDirectory: /workspaces/somerepo/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /workspaces/somerepo/src/tsconfig.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /workspaces/somerepo/src/tsconfig.json : {
 "rootNames": [
  "/workspaces/somerepo/src/main.ts"
 ],
 "options": {
  "configFilePath": "/workspaces/somerepo/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/workspaces/somerepo/src/tsconfig.json",
        "reason": "Creating possible configured project for /workspaces/somerepo/src/main.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/src 1 undefined Config: /workspaces/somerepo/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/src 1 undefined Config: /workspaces/somerepo/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/src/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/src/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules/@types/random-seed/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules/@types/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /workspaces/somerepo/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/src/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/src/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /workspaces/somerepo/src/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/workspaces/somerepo/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/workspaces/somerepo/node_modules/@types/random-seed/index.d.ts Text-1 "export function randomSeed(): string;"
	/workspaces/somerepo/src/main.ts SVC-1-0 "import { randomSeed } from \"random-seed\";\nrandomSeed();"


	../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../node_modules/@types/random-seed/index.d.ts
	  Imported via "random-seed" from file 'main.ts'
	  Entry point for implicit type library 'random-seed'
	main.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/workspaces/somerepo/src/tsconfig.json"
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
          "projectId": "9e8115631fa65f5cabbf69613510b85e9196bbd1dbd96acfd77b994bec889817",
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
            "dtsSize": 450,
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
        "triggerFile": "/workspaces/somerepo/src/main.ts",
        "configFile": "/workspaces/somerepo/src/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/workspaces/somerepo/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /workspaces/somerepo/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /workspaces/somerepo/src/tsconfig.json
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
/workspaces/somerepo/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/@types/random-seed/package.json: *new*
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/package.json: *new*
  {"pollingInterval":2000}
/workspaces/somerepo/package.json: *new*
  {"pollingInterval":2000}
/workspaces/somerepo/src/node_modules: *new*
  {"pollingInterval":500}
/workspaces/somerepo/src/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"inode":18}
/workspaces/somerepo/node_modules: *new*
  {"inode":6}
/workspaces/somerepo/node_modules/@types: *new*
  {"inode":7}
/workspaces/somerepo/node_modules/@types/random-seed: *new*
  {"inode":8}
/workspaces/somerepo/src: *new*
  {"inode":3}
/workspaces/somerepo/src/tsconfig.json: *new*
  {"inode":4}

Projects::
/workspaces/somerepo/src/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /workspaces/somerepo/src/tsconfig.json
/workspaces/somerepo/node_modules/@types/random-seed/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /workspaces/somerepo/src/tsconfig.json
/workspaces/somerepo/src/main.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /workspaces/somerepo/src/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/workspaces/somerepo/src/main.ts"
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
        "file": "/workspaces/somerepo/src/main.ts",
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
        "file": "/workspaces/somerepo/src/main.ts",
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
        "file": "/workspaces/somerepo/src/main.ts",
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
              "file": "/workspaces/somerepo/src/main.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed :: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed :: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types :: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types :: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Before request
//// [/workspaces/somerepo/node_modules/@types/random-seed/index.d.ts] deleted

PolledWatches::
/workspaces/somerepo/node_modules: *new*
  {"pollingInterval":500}
/workspaces/somerepo/node_modules/@types: *new*
  {"pollingInterval":500}
/workspaces/somerepo/node_modules/@types/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/@types/random-seed/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/src/node_modules:
  {"pollingInterval":500}
/workspaces/somerepo/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":18}
/workspaces/somerepo/src:
  {"inode":3}
/workspaces/somerepo/src/tsconfig.json:
  {"inode":4}

FsWatches *deleted*::
/workspaces/somerepo/node_modules:
  {"inode":6}
/workspaces/somerepo/node_modules/@types:
  {"inode":7}
/workspaces/somerepo/node_modules/@types/random-seed:
  {"inode":8}

Timeout callback:: count: 4
13: /workspaces/somerepo/src/tsconfig.json *new*
14: *ensureProjectForOpenFiles* *new*
16: timerToUpdateChildWatches *new*
17: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/workspaces/somerepo/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /workspaces/somerepo/src/tsconfig.json
/workspaces/somerepo/node_modules/@types/random-seed/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /workspaces/somerepo/src/tsconfig.json *deleted*
/workspaces/somerepo/src/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /workspaces/somerepo/src/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/workspaces/somerepo/src/main.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
After request

Timeout callback:: count: 5
13: /workspaces/somerepo/src/tsconfig.json
14: *ensureProjectForOpenFiles*
16: timerToUpdateChildWatches
17: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation
18: checkOne *new*

Before running Timeout callback:: count: 5
13: /workspaces/somerepo/src/tsconfig.json
14: *ensureProjectForOpenFiles*
16: timerToUpdateChildWatches
17: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation
18: checkOne

Invoking Timeout callback:: timeoutId:: 18:: checkOne
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /workspaces/somerepo/node_modules/@types/random-seed/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /workspaces/somerepo/node_modules/@types/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /workspaces/somerepo/node_modules/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /workspaces/somerepo/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /workspaces/somerepo/src/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/workspaces/somerepo/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/workspaces/somerepo/src/main.ts SVC-1-0 "import { randomSeed } from \"random-seed\";\nrandomSeed();"


	../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	main.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/workspaces/somerepo/src/main.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 3

PolledWatches::
/workspaces/somerepo/node_modules:
  {"pollingInterval":500}
/workspaces/somerepo/node_modules/@types:
  {"pollingInterval":500}
/workspaces/somerepo/src/node_modules:
  {"pollingInterval":500}
/workspaces/somerepo/src/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/workspaces/somerepo/node_modules/@types/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/@types/random-seed/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":18}
/workspaces/somerepo/src:
  {"inode":3}
/workspaces/somerepo/src/tsconfig.json:
  {"inode":4}

Timeout callback:: count: 3
17: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation *deleted*
13: /workspaces/somerepo/src/tsconfig.json
14: *ensureProjectForOpenFiles*
16: timerToUpdateChildWatches

Immedidate callback:: count: 1
3: semanticCheck *new*

Projects::
/workspaces/somerepo/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

Before running Immedidate callback:: count: 1
3: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/workspaces/somerepo/src/main.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 28
            },
            "end": {
              "line": 1,
              "offset": 41
            },
            "text": "Cannot find module 'random-seed' or its corresponding type declarations.",
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
        "file": "/workspaces/somerepo/src/main.ts",
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
          "updateGraphDurationMs": *,
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/workspaces/somerepo/src/main.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Before running Timeout callback:: count: 3
13: /workspaces/somerepo/src/tsconfig.json
14: *ensureProjectForOpenFiles*
16: timerToUpdateChildWatches

Info seq  [hh:mm:ss:mss] Running: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/workspaces/somerepo/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /workspaces/somerepo/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/workspaces/somerepo/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /workspaces/somerepo/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /workspaces/somerepo/src/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/workspaces/somerepo/src/main.ts"
        ]
      }
    }
Info seq  [hh:mm:ss:mss] sysLog:: onTimerToUpdateChildWatches:: 3
Info seq  [hh:mm:ss:mss] sysLog:: invokingWatchers:: Elapsed:: *ms:: 0
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed/index.d.ts 0:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed/index.d.ts 0:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed 1:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed 1:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types 2:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types 2:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed/index.d.ts 0:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed/index.d.ts 0:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed 1:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed 1:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types 2:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types 2:: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed/index.d.ts 0:: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed/index.d.ts 0:: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed 1:: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types/random-seed 1:: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] sysLog:: Elapsed:: *ms:: onTimerToUpdateChildWatches:: 0 undefined
After running Timeout callback:: count: 3

Timeout callback:: count: 3
25: /workspaces/somerepo/src/tsconfig.json *new*
26: *ensureProjectForOpenFiles* *new*
27: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/workspaces/somerepo/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

Before request
//// [/workspaces/somerepo/node_modules/@types/random-seed/index.d.ts] Inode:: 119
export function randomSeed(): string;


PolledWatches::
/workspaces/somerepo/src/node_modules:
  {"pollingInterval":500}
/workspaces/somerepo/src/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/workspaces/somerepo/node_modules:
  {"pollingInterval":500}
/workspaces/somerepo/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":18}
/workspaces/somerepo/node_modules: *new*
  {"inode":116}
/workspaces/somerepo/node_modules/@types: *new*
  {"inode":117}
/workspaces/somerepo/src:
  {"inode":3}
/workspaces/somerepo/src/tsconfig.json:
  {"inode":4}

Timeout callback:: count: 4
25: /workspaces/somerepo/src/tsconfig.json
26: *ensureProjectForOpenFiles*
27: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation
33: timerToUpdateChildWatches *new*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/workspaces/somerepo/src/main.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
After request

Timeout callback:: count: 5
25: /workspaces/somerepo/src/tsconfig.json
26: *ensureProjectForOpenFiles*
27: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation
33: timerToUpdateChildWatches
34: checkOne *new*

Before running Timeout callback:: count: 5
25: /workspaces/somerepo/src/tsconfig.json
26: *ensureProjectForOpenFiles*
27: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation
33: timerToUpdateChildWatches
34: checkOne

Invoking Timeout callback:: timeoutId:: 34:: checkOne
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules/@types/random-seed/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules/@types/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /workspaces/somerepo/node_modules/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /workspaces/somerepo/package.json 2000 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /workspaces/somerepo/src/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/workspaces/somerepo/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/workspaces/somerepo/node_modules/@types/random-seed/index.d.ts Text-1 "export function randomSeed(): string;"
	/workspaces/somerepo/src/main.ts SVC-1-0 "import { randomSeed } from \"random-seed\";\nrandomSeed();"


	../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../node_modules/@types/random-seed/index.d.ts
	  Imported via "random-seed" from file 'main.ts'
	  Entry point for implicit type library 'random-seed'
	main.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/workspaces/somerepo/src/main.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 3

PolledWatches::
/workspaces/somerepo/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/@types/random-seed/package.json: *new*
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/package.json: *new*
  {"pollingInterval":2000}
/workspaces/somerepo/package.json: *new*
  {"pollingInterval":2000}
/workspaces/somerepo/src/node_modules:
  {"pollingInterval":500}
/workspaces/somerepo/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":18}
/workspaces/somerepo/node_modules:
  {"inode":116}
/workspaces/somerepo/node_modules/@types:
  {"inode":117}
/workspaces/somerepo/src:
  {"inode":3}
/workspaces/somerepo/src/tsconfig.json:
  {"inode":4}

Timeout callback:: count: 3
26: *ensureProjectForOpenFiles* *deleted*
27: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation *deleted*
25: /workspaces/somerepo/src/tsconfig.json
33: timerToUpdateChildWatches
35: *ensureProjectForOpenFiles* *new*

Immedidate callback:: count: 1
5: semanticCheck *new*

Projects::
/workspaces/somerepo/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /workspaces/somerepo/src/tsconfig.json
/workspaces/somerepo/node_modules/@types/random-seed/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    deferredDelete: undefined *changed*
    containingProjects: 1 *changed*
        /workspaces/somerepo/src/tsconfig.json *new*
/workspaces/somerepo/src/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /workspaces/somerepo/src/tsconfig.json *default*

Before running Immedidate callback:: count: 1
5: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/workspaces/somerepo/src/main.ts",
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
        "file": "/workspaces/somerepo/src/main.ts",
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
          "updateGraphDurationMs": *,
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/workspaces/somerepo/src/main.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Before running Timeout callback:: count: 3
25: /workspaces/somerepo/src/tsconfig.json
33: timerToUpdateChildWatches
35: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] sysLog:: onTimerToUpdateChildWatches:: 2
Info seq  [hh:mm:ss:mss] sysLog:: invokingWatchers:: Elapsed:: *ms:: 0
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules :: WatchInfo: /workspaces/somerepo/node_modules 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types :: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /workspaces/somerepo/node_modules/@types :: WatchInfo: /workspaces/somerepo/node_modules/@types 1 undefined Project: /workspaces/somerepo/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] sysLog:: Elapsed:: *ms:: onTimerToUpdateChildWatches:: 0 undefined
After running Timeout callback:: count: 3

PolledWatches::
/workspaces/somerepo/node_modules/@types/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/@types/random-seed/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/node_modules/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/package.json:
  {"pollingInterval":2000}
/workspaces/somerepo/src/node_modules:
  {"pollingInterval":500}
/workspaces/somerepo/src/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":18}
/workspaces/somerepo/node_modules:
  {"inode":116}
/workspaces/somerepo/node_modules/@types:
  {"inode":117}
/workspaces/somerepo/node_modules/@types/random-seed: *new*
  {"inode":118}
/workspaces/somerepo/src:
  {"inode":3}
/workspaces/somerepo/src/tsconfig.json:
  {"inode":4}

Timeout callback:: count: 3
35: *ensureProjectForOpenFiles* *deleted*
37: /workspaces/somerepo/src/tsconfig.json *new*
38: *ensureProjectForOpenFiles* *new*
39: /workspaces/somerepo/src/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/workspaces/somerepo/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3
    dirty: true *changed*
