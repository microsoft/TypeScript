currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
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

//// [/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts]
import {C} from "@microsoft/recognizers-text";
new C();

//// [/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json]
{"include":["src"]}

//// [/users/username/projects/myproject/javascript/packages/recognizers-text/src/recognizers-text.ts]
export class C { method () { return 10; } }

//// [/users/username/projects/myproject/javascript/packages/recognizers-text/package.json]
{"typings":"dist/types/recognizers-text.d.ts"}

//// [/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules/@microsoft/recognizers-text] symlink(/users/username/projects/myproject/javascript/packages/recognizers-text)
//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts]
export class C { method(): number; }


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
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts :: Config file name: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json 2000 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Config file
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
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Config: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/src 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/package.json 2000 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts Text-1 "export class C { method(): number; }"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../a/lib/lib.d.ts
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
        "dtsSize": 370,
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
      "responseRequired": false
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
/a/lib/lib.d.ts: *new*
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
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

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
2: suggestionCheck

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
      "request_seq": 2
     }
    }
After running Immedidate callback:: count: 0

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 2:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 2:: WatchInfo: /users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
2: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
3: *ensureProjectForOpenFiles*
//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts] deleted

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

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json:
  {}

FsWatches *deleted*::
/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src:
  {}

Info seq  [hh:mm:ss:mss] Running: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/packages/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/javascript/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts SVC-1-0 "import {C} from \"@microsoft/recognizers-text\";\nnew C();"


	../../../../../../../a/lib/lib.d.ts
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
Info seq  [hh:mm:ss:mss] got projects updated in background, updating diagnostics for /users/username/projects/myproject/javascript/packages/recognizers-date-time/src/datetime/baseDate.ts
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
After running Timeout callback:: count: 1
4: checkOne

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
/a/lib/lib.d.ts:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/tsconfig.json:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-text/package.json:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/javascript/packages/recognizers-date-time/node_modules:
  {}
/users/username/projects/myproject/javascript/packages/recognizers-date-time/src:
  {}

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
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
5: checkOne

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

Before running Immedidate callback:: count: 1
4: semanticCheck

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
5: suggestionCheck

Before running Immedidate callback:: count: 1
5: suggestionCheck

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
      "request_seq": 3
     }
    }
After running Immedidate callback:: count: 0

Before running Timeout callback:: count: 0
//// [/users/username/projects/myproject/javascript/packages/recognizers-text/dist/types/recognizers-text.d.ts]
export class C { method(): number; }


After running Timeout callback:: count: 0

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
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
6: checkOne

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

Before running Immedidate callback:: count: 1
6: semanticCheck

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
7: suggestionCheck

Before running Immedidate callback:: count: 1
7: suggestionCheck

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
      "request_seq": 4
     }
    }
After running Immedidate callback:: count: 0
