Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/a/username/workspace/project/src/index.ts] Inode:: 6
import {} from "./"

//// [/a/username/workspace/project/src/file1.ts] Inode:: 7


//// [/a/username/workspace/project/tsconfig.json] Inode:: 8
{
  "watchOptions": {
    "synchronousWatchDirectory": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 17
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
        "file": "/a/username/workspace/project/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/username/workspace/project/src/index.ts ProjectRootPath: undefined:: Result: /a/username/workspace/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /a/username/workspace/project/tsconfig.json, currentDirectory: /a/username/workspace/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/username/workspace/project/tsconfig.json 2000 undefined Project: /a/username/workspace/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /a/username/workspace/project/tsconfig.json : {
 "rootNames": [
  "/a/username/workspace/project/src/file1.ts",
  "/a/username/workspace/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/username/workspace/project/tsconfig.json"
 },
 "watchOptions": {
  "synchronousWatchDirectory": true
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/username/workspace/project/tsconfig.json 2000 undefined Project: /a/username/workspace/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/username/workspace/project/tsconfig.json 2000 {"synchronousWatchDirectory":true} Project: /a/username/workspace/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/username/workspace/project/tsconfig.json",
        "reason": "Creating possible configured project for /a/username/workspace/project/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/username/workspace/project 1 {"synchronousWatchDirectory":true} Config: /a/username/workspace/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/workspace/project 1 {"synchronousWatchDirectory":true} Config: /a/username/workspace/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/username/workspace/project/src/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/username/workspace/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/username/workspace/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/workspace/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/workspace/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/workspace/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/username/workspace/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/workspace/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/workspace/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/workspace/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/username/workspace/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/workspace/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/workspace/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/workspace/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/username/workspace/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/username/workspace/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/a/username/workspace/project/src/file1.ts Text-1 ""
	/a/username/workspace/project/src/index.ts SVC-1-0 "import {} from \"./\""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	  Imported via "./" from file 'src/index.ts'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/username/workspace/project/tsconfig.json"
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
          "projectId": "fa39ad82dd6eff690eb340579caa033cc0c0abe5281441bd3041d547ec752a45",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 19,
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
        "triggerFile": "/a/username/workspace/project/src/index.ts",
        "configFile": "/a/username/workspace/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/a/username/workspace/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/username/workspace/project/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/username/workspace/project/tsconfig.json
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
/a/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/a/username/workspace/project: *new*
  {"pollingInterval":500}
/a/username/workspace/project/node_modules/@types: *new*
  {"pollingInterval":500}
/a/username/workspace/project/src: *new*
  {"pollingInterval":500}

FsWatches::
/a/username/workspace/project/src/file1.ts: *new*
  {"inode":7}
/a/username/workspace/project/tsconfig.json: *new*
  {"inode":8}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"inode":17}

Projects::
/a/username/workspace/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/username/workspace/project/src/file1.ts *new*
    version: Text-1
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json
/a/username/workspace/project/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/a/username/workspace/project/src/index.ts",
        "line": 1,
        "offset": 19
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "file1",
            "kind": "script",
            "kindModifiers": ".ts",
            "sortText": "11"
          }
        ],
        "defaultCommitCharacters": []
      },
      "responseRequired": true
    }
After request

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/username/workspace/project/src :: WatchInfo: /a/username/workspace/project 1 {"synchronousWatchDirectory":true} Config: /a/username/workspace/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Invoking sourceFileChange on /a/username/workspace/project/src/file1.ts:: 1
Info seq  [hh:mm:ss:mss] Scheduled: /a/username/workspace/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Scheduled: /a/username/workspace/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/workspace/project/src :: WatchInfo: /a/username/workspace/project 1 {"synchronousWatchDirectory":true} Config: /a/username/workspace/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/username/workspace/project/src :: WatchInfo: /a/username/workspace/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/workspace/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /a/username/workspace/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/workspace/project/src :: WatchInfo: /a/username/workspace/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/workspace/project/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 3
3: /a/username/workspace/project/tsconfig.json
4: *ensureProjectForOpenFiles*
5: /a/username/workspace/project/tsconfig.jsonFailedLookupInvalidation
//// [/a/username/workspace/project/src/file2.ts] Inode:: 115



Timeout callback:: count: 3
3: /a/username/workspace/project/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*
5: /a/username/workspace/project/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/a/username/workspace/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/a/username/workspace/project/src/file1.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json
/a/username/workspace/project/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /a/username/workspace/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/username/workspace/project/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/username/workspace/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/username/workspace/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/username/workspace/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/a/username/workspace/project/src/file1.ts Text-1 ""
	/a/username/workspace/project/src/index.ts SVC-1-0 "import {} from \"./\""
	/a/username/workspace/project/src/file2.ts Text-1 ""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	  Imported via "./" from file 'src/index.ts'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
After running Timeout callback:: count: 1

PolledWatches::
/a/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/a/username/workspace/project:
  {"pollingInterval":500}
/a/username/workspace/project/node_modules/@types:
  {"pollingInterval":500}
/a/username/workspace/project/src:
  {"pollingInterval":500}

FsWatches::
/a/username/workspace/project/src/file1.ts:
  {"inode":7}
/a/username/workspace/project/src/file2.ts: *new*
  {"inode":115}
/a/username/workspace/project/tsconfig.json:
  {"inode":8}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":17}

Timeout callback:: count: 1
4: *ensureProjectForOpenFiles* *deleted*
5: /a/username/workspace/project/tsconfig.jsonFailedLookupInvalidation *deleted*
6: *ensureProjectForOpenFiles* *new*

Projects::
/a/username/workspace/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/a/username/workspace/project/src/file1.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json
/a/username/workspace/project/src/file2.ts *new*
    version: Text-1
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json
/a/username/workspace/project/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/username/workspace/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/a/username/workspace/project/src/index.ts",
        "line": 1,
        "offset": 19
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "file1",
            "kind": "script",
            "kindModifiers": ".ts",
            "sortText": "11"
          },
          {
            "name": "file2",
            "kind": "script",
            "kindModifiers": ".ts",
            "sortText": "11"
          }
        ],
        "defaultCommitCharacters": []
      },
      "responseRequired": true
    }
After request
