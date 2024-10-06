Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/myproject/app.ts]
let x = 1

//// [/home/src/projects/myproject/tsconfig.json]
{
  "compilerOptions": {}
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
        "file": "/home/src/projects/myproject/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 1
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/myproject/app.ts ProjectRootPath: undefined:: Result: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/myproject/tsconfig.json, currentDirectory: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/tsconfig.json 2000 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/myproject/app.ts"
 ],
 "options": {
  "configFilePath": "/home/src/projects/myproject/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/myproject/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/myproject/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject 1 undefined Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject 1 undefined Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules/@types 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules/@types 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/myproject/app.ts SVC-1-0 "let x = 1"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/myproject/tsconfig.json"
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
          "projectId": "c082244e14d80420126a10c084f20f9b41809e79e7f5a330fc4d923f1197daa1",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 9,
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
        "triggerFile": "/home/src/projects/myproject/app.ts",
        "configFile": "/home/src/projects/myproject/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
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
TestServerCancellationToken:: resetRequest:: 1 is as expected
After request

PolledWatches::
/home/src/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/myproject/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/myproject: *new*
  {}

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/myproject/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/home/src/projects/myproject/missing"
        ],
        "delay": 0
      },
      "seq": 2,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 2
TestServerCancellationToken:: resetRequest:: 2 is as expected
After request

Timeout callback:: count: 1
1: checkOne *new*

Before running Timeout callback:: count: 1
1: checkOne

TestServerCancellationToken:: Cancellation Request id:: 2
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 2
      }
    }
TestServerCancellationToken:: resetRequest:: 2 is as expected
After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/home/src/projects/myproject/app.ts"
        ],
        "delay": 0
      },
      "seq": 3,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 3
TestServerCancellationToken:: resetRequest:: 3 is as expected
After request

Timeout callback:: count: 1
2: checkOne *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "projectInfo",
      "arguments": {
        "file": "/home/src/projects/myproject/app.ts",
        "needFileNameList": false,
        "needDefaultConfiguredProjectInfo": true
      },
      "seq": 4,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 4
TestServerCancellationToken:: resetRequest:: 4 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "configFileName": "/home/src/projects/myproject/tsconfig.json",
        "languageServiceDisabled": false,
        "configuredProjectInfo": {
          "defaultProject": "/home/src/projects/myproject/tsconfig.json"
        }
      },
      "responseRequired": true
    }
After request

TestServerCancellationToken:: Setting request to cancel:: 3
Before running Timeout callback:: count: 1
2: checkOne

TestServerCancellationToken:: Cancellation Request id:: 3
TestServerCancellationToken:: Cancellation is requested
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 3
      }
    }
TestServerCancellationToken:: resetRequest:: 3 is as expected
After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/home/src/projects/myproject/app.ts"
        ],
        "delay": 0
      },
      "seq": 5,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 5
TestServerCancellationToken:: resetRequest:: 5 is as expected
After request

Timeout callback:: count: 1
3: checkOne *new*

Before running Timeout callback:: count: 1
3: checkOne

TestServerCancellationToken:: Cancellation Request id:: 5
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/myproject/app.ts",
        "diagnostics": []
      }
    }
TestServerCancellationToken:: resetRequest:: 5 is as expected
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
1: semanticCheck *new*

TestServerCancellationToken:: Setting request to cancel:: 5
Before running Immedidate callback:: count: 1
1: semanticCheck

TestServerCancellationToken:: Cancellation Request id:: 5
TestServerCancellationToken:: Cancellation is requested
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 5,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "file": "/home/src/projects/myproject/app.ts"
            }
          ]
        }
      }
    }
TestServerCancellationToken:: resetRequest:: 5 is as expected
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/home/src/projects/myproject/app.ts"
        ],
        "delay": 0
      },
      "seq": 6,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 6
TestServerCancellationToken:: resetRequest:: 6 is as expected
After request

Timeout callback:: count: 1
4: checkOne *new*

Before running Timeout callback:: count: 1
4: checkOne

TestServerCancellationToken:: Cancellation Request id:: 6
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/myproject/app.ts",
        "diagnostics": []
      }
    }
TestServerCancellationToken:: resetRequest:: 6 is as expected
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
2: semanticCheck *new*

Before running Immedidate callback:: count: 1
2: semanticCheck

TestServerCancellationToken:: Cancellation Request id:: 6
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/myproject/app.ts",
        "diagnostics": []
      }
    }
TestServerCancellationToken:: resetRequest:: 6 is as expected
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
3: suggestionCheck *new*

Before running Immedidate callback:: count: 1
3: suggestionCheck

TestServerCancellationToken:: Cancellation Request id:: 6
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/myproject/app.ts",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 6,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/myproject/app.ts"
            }
          ]
        }
      }
    }
TestServerCancellationToken:: resetRequest:: 6 is as expected
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/home/src/projects/myproject/app.ts"
        ],
        "delay": 0
      },
      "seq": 7,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 7
TestServerCancellationToken:: resetRequest:: 7 is as expected
After request

Timeout callback:: count: 1
5: checkOne *new*

Before running Timeout callback:: count: 1
5: checkOne

TestServerCancellationToken:: Cancellation Request id:: 7
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/myproject/app.ts",
        "diagnostics": []
      }
    }
TestServerCancellationToken:: resetRequest:: 7 is as expected
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
4: semanticCheck *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "files": [
          "/home/src/projects/myproject/app.ts"
        ],
        "delay": 0
      },
      "seq": 8,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 8
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 7,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "file": "/home/src/projects/myproject/app.ts"
            }
          ]
        }
      }
    }
TestServerCancellationToken:: resetRequest:: 8 is as expected
After request

Timeout callback:: count: 1
6: checkOne *new*

Immedidate callback:: count: 0
4: semanticCheck *deleted*
