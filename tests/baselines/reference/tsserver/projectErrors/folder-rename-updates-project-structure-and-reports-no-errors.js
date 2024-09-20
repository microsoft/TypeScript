Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/a/b/projects/myproject/bar/app.ts]
class Bar implements foo.Foo { getFoo() { return ''; } get2() { return 1; } }

//// [/a/b/projects/myproject/foo/foo.ts]
declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }

//// [/a/b/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "targer": "es5"
  },
  "exclude": [
    "node_modules"
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
        "file": "/a/b/projects/myproject/bar/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined:: Result: /a/b/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /a/b/projects/myproject/tsconfig.json, currentDirectory: /a/b/projects/myproject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/projects/myproject/tsconfig.json 2000 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /a/b/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/myproject/bar/app.ts",
  "/a/b/projects/myproject/foo/foo.ts"
 ],
 "options": {
  "module": 0,
  "configFilePath": "/a/b/projects/myproject/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/a/b/projects/myproject/tsconfig.json",
        "reason": "Creating possible configured project for /a/b/projects/myproject/bar/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject/node_modules/@types 1 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/myproject/node_modules/@types 1 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/node_modules/@types 1 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/node_modules/@types 1 undefined Project: /a/b/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/a/b/projects/myproject/bar/app.ts SVC-1-0 "class Bar implements foo.Foo { getFoo() { return ''; } get2() { return 1; } }"
	/a/b/projects/myproject/foo/foo.ts Text-1 "declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	bar/app.ts
	  Matched by default include pattern '**/*'
	foo/foo.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/a/b/projects/myproject/tsconfig.json"
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
          "projectId": "c56abb8c7c51bef5953613f05226da8e72cd9eafe09ab58ca2ccd81b65ba193a",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 154,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "module": "none"
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": true,
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
        "triggerFile": "/a/b/projects/myproject/bar/app.ts",
        "configFile": "/a/b/projects/myproject/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 4,
              "offset": 5
            },
            "end": {
              "line": 4,
              "offset": 13
            },
            "text": "Unknown compiler option 'targer'. Did you mean 'target'?",
            "code": 5025,
            "category": "error",
            "fileName": "/a/b/projects/myproject/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/projects/myproject/tsconfig.json
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
/a/b/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/projects/myproject/foo/foo.ts: *new*
  {}
/a/b/projects/myproject/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b/projects/myproject: *new*
  {}

Projects::
/a/b/projects/myproject/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a/b/projects/myproject/bar/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /a/b/projects/myproject/tsconfig.json *default*
/a/b/projects/myproject/foo/foo.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/projects/myproject/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/projects/myproject/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/a/b/projects/myproject/bar/app.ts"
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
        "file": "/a/b/projects/myproject/bar/app.ts",
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
        "file": "/a/b/projects/myproject/bar/app.ts",
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
        "file": "/a/b/projects/myproject/bar/app.ts",
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
              "file": "/a/b/projects/myproject/bar/app.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts 2:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts 2:: WatchInfo: /a/b/projects/myproject/foo/foo.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2/foo.ts :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2 :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /a/b/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/myproject/foo2 :: WatchInfo: /a/b/projects/myproject 1 undefined Config: /a/b/projects/myproject/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
10: /a/b/projects/myproject/tsconfig.json
11: *ensureProjectForOpenFiles*
//// [/a/b/projects/myproject/foo2/foo.ts]
declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }

//// [/a/b/projects/myproject/foo/foo.ts] deleted

Timeout callback:: count: 2
10: /a/b/projects/myproject/tsconfig.json *new*
11: *ensureProjectForOpenFiles* *new*

Projects::
/a/b/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/a/b/projects/myproject/bar/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/b/projects/myproject/tsconfig.json *default*
/a/b/projects/myproject/foo/foo.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /a/b/projects/myproject/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/b/projects/myproject/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /a/b/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/projects/myproject/foo2/foo.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/b/projects/myproject/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/a/b/projects/myproject/bar/app.ts SVC-1-0 "class Bar implements foo.Foo { getFoo() { return ''; } get2() { return 1; } }"
	/a/b/projects/myproject/foo2/foo.ts Text-1 "declare namespace foo { interface Foo { get2(): number; getFoo(): string; } }"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	bar/app.ts
	  Matched by default include pattern '**/*'
	foo2/foo.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/a/b/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/projects/myproject/bar/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/b/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /a/b/projects/myproject/bar/app.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/a/b/projects/myproject/bar/app.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/a/b/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/projects/myproject/foo/foo.ts:
  {}
/a/b/projects/myproject/foo2/foo.ts: *new*
  {}
/a/b/projects/myproject/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/myproject:
  {}

Projects::
/a/b/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/a/b/projects/myproject/bar/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /a/b/projects/myproject/tsconfig.json *default*
/a/b/projects/myproject/foo/foo.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/a/b/projects/myproject/foo2/foo.ts *new*
    version: Text-1
    containingProjects: 1
        /a/b/projects/myproject/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /a/b/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/a/b/projects/myproject/bar/app.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
After request

Timeout callback:: count: 1
12: checkOne *new*

Before running Timeout callback:: count: 1
12: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/a/b/projects/myproject/bar/app.ts",
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
        "file": "/a/b/projects/myproject/bar/app.ts",
        "diagnostics": []
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
        "file": "/a/b/projects/myproject/bar/app.ts",
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
              "file": "/a/b/projects/myproject/bar/app.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0
