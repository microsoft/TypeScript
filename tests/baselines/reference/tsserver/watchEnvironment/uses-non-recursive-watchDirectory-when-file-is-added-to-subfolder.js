currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/username/project/src/index.ts] Inode:: 5
import {} from "./"

//// [/a/username/project/src/file1.ts] Inode:: 6


//// [/a/username/project/tsconfig.json] Inode:: 7
{
  "watchOptions": {
    "synchronousWatchDirectory": true
  }
}

//// [/a/lib/lib.d.ts] Inode:: 9
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
        "file": "/a/username/project/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/username/project/src/index.ts ProjectRootPath: undefined:: Result: /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/username/project/tsconfig.json 2000 undefined Project: /a/username/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/username/project/tsconfig.json",
        "reason": "Creating possible configured project for /a/username/project/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /a/username/project/tsconfig.json : {
 "rootNames": [
  "/a/username/project/src/file1.ts",
  "/a/username/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/username/project/tsconfig.json"
 },
 "watchOptions": {
  "synchronousWatchDirectory": true
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/username/project/tsconfig.json 2000 undefined Project: /a/username/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/username/project/tsconfig.json 2000 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/username/project/src/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/username/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/username/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/username/project/src/file1.ts Text-1 ""
	/a/username/project/src/index.ts SVC-1-0 "import {} from \"./\""


	../../lib/lib.d.ts
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
        "projectName": "/a/username/project/tsconfig.json"
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
          "projectId": "a0af5b27731f9d2151d1de4a531bb7e00d38f2466c0dcec1894287686cf1be28",
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
            "dtsSize": 334,
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
        "triggerFile": "/a/username/project/src/index.ts",
        "configFile": "/a/username/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/a/username/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/username/project/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/username/project/tsconfig.json
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
/a/username/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {"inode":9}
/a/username/project: *new*
  {"inode":3}
/a/username/project/src: *new*
  {"inode":4}
/a/username/project/src/file1.ts: *new*
  {"inode":6}
/a/username/project/tsconfig.json: *new*
  {"inode":7}

Projects::
/a/username/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /a/username/project/tsconfig.json
/a/username/project/src/file1.ts *new*
    version: Text-1
    containingProjects: 1
        /a/username/project/tsconfig.json
/a/username/project/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /a/username/project/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/a/username/project/src/index.ts",
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

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/username/project/src/file2.ts :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src/file2.ts :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/username/project/src/file2.ts :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /a/username/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src/file2.ts :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 3
1: /a/username/project/tsconfig.json
2: *ensureProjectForOpenFiles*
3: /a/username/project/tsconfig.jsonFailedLookupInvalidation
//// [/a/username/project/src/file2.ts] Inode:: 10



Timeout callback:: count: 3
1: /a/username/project/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*
3: /a/username/project/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/a/username/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] Running: /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/username/project/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/username/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/username/project/src/file1.ts Text-1 ""
	/a/username/project/src/index.ts SVC-1-0 "import {} from \"./\""
	/a/username/project/src/file2.ts Text-1 ""


	../../lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	  Imported via "./" from file 'src/index.ts'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/username/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/username/project/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/username/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/username/project/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /a/username/project/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/a/username/project/src/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/a/username/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":9}
/a/username/project:
  {"inode":3}
/a/username/project/src:
  {"inode":4}
/a/username/project/src/file1.ts:
  {"inode":6}
/a/username/project/src/file2.ts: *new*
  {"inode":10}
/a/username/project/tsconfig.json:
  {"inode":7}

Timeout callback:: count: 0
3: /a/username/project/tsconfig.jsonFailedLookupInvalidation *deleted*

Projects::
/a/username/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/username/project/tsconfig.json
/a/username/project/src/file1.ts
    version: Text-1
    containingProjects: 1
        /a/username/project/tsconfig.json
/a/username/project/src/file2.ts *new*
    version: Text-1
    containingProjects: 1
        /a/username/project/tsconfig.json
/a/username/project/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/username/project/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/a/username/project/src/index.ts",
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
