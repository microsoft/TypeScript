currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/username/project/src/index.ts]
import {} from "./"

//// [/a/username/project/src/file1.ts]


//// [/a/username/project/tsconfig.json]
{
  "watchOptions": {
    "synchronousWatchDirectory": true
  }
}

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
        "file": "/a/username/project/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a/username/project/src
Info seq  [hh:mm:ss:mss] For info: /a/username/project/src/index.ts :: Config file name: /a/username/project/tsconfig.json
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
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
      "responseRequired": false
    }
After request

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/a/username/project/src/file1.ts: *new*
  {}
/a/username/project/tsconfig.json: *new*
  {}

Timeout callback:: count: 1
1: pollPollingIntervalQueue *new*

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
        ]
      },
      "responseRequired": true
    }
After request

Before running Timeout callback:: count: 1
1: pollPollingIntervalQueue
//// [/a/username/project/src/file2.ts]



Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /a/username/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
After running Timeout callback:: count: 5

Timeout callback:: count: 5
2: /a/username/project/tsconfig.json *new*
3: *ensureProjectForOpenFiles* *new*
4: /a/username/project/tsconfig.jsonFailedLookupInvalidation *new*
5: pollLowPollingIntervalQueue *new*
6: pollPollingIntervalQueue *new*

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
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/username/project/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/username/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
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
        ]
      },
      "responseRequired": true
    }
After request

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/username/project/src/file1.ts:
  {}
/a/username/project/src/file2.ts: *new*
  {}
/a/username/project/tsconfig.json:
  {}

Timeout callback:: count: 4
3: *ensureProjectForOpenFiles* *deleted*
4: /a/username/project/tsconfig.jsonFailedLookupInvalidation *deleted*
2: /a/username/project/tsconfig.json
5: pollLowPollingIntervalQueue
6: pollPollingIntervalQueue
7: *ensureProjectForOpenFiles* *new*
