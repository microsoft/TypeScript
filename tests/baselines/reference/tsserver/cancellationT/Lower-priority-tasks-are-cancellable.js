Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/myproject/app.ts]
{ let x = 1; } var foo = "foo"; var bar = "bar"; var fooBar = "fooBar";

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
	/home/src/projects/myproject/app.ts SVC-1-0 "{ let x = 1; } var foo = \"foo\"; var bar = \"bar\"; var fooBar = \"fooBar\";"


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
            "tsSize": 71,
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
      "command": "navbar",
      "arguments": {
        "file": "/home/src/projects/myproject/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 2
TestServerCancellationToken:: resetRequest:: 2 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "text": "<global>",
          "kind": "script",
          "kindModifiers": "",
          "spans": [
            {
              "start": {
                "line": 1,
                "offset": 1
              },
              "end": {
                "line": 1,
                "offset": 72
              }
            }
          ],
          "childItems": [
            {
              "text": "bar",
              "kind": "var",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 37
                  },
                  "end": {
                    "line": 1,
                    "offset": 48
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "foo",
              "kind": "var",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 20
                  },
                  "end": {
                    "line": 1,
                    "offset": 31
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "fooBar",
              "kind": "var",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 54
                  },
                  "end": {
                    "line": 1,
                    "offset": 71
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            },
            {
              "text": "x",
              "kind": "let",
              "kindModifiers": "",
              "spans": [
                {
                  "start": {
                    "line": 1,
                    "offset": 7
                  },
                  "end": {
                    "line": 1,
                    "offset": 12
                  }
                }
              ],
              "childItems": [],
              "indent": 0
            }
          ],
          "indent": 0
        }
      ],
      "responseRequired": true
    }
After request

TestServerCancellationToken:: Setting request to cancel:: 3
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "navbar",
      "arguments": {
        "file": "/home/src/projects/myproject/app.ts"
      },
      "seq": 3,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 3
TestServerCancellationToken:: Cancellation is requested
TestServerCancellationToken:: resetRequest:: 3 is as expected
Exception is OperationCanceledException: true
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "outliningSpans",
      "arguments": {
        "file": "/home/src/projects/myproject/app.ts"
      },
      "seq": 4,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 4
TestServerCancellationToken:: resetRequest:: 4 is as expected
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "textSpan": {
            "start": 0,
            "length": 14
          },
          "kind": "code",
          "hintSpan": {
            "start": 0,
            "length": 14
          },
          "bannerText": "...",
          "autoCollapse": false
        }
      ],
      "responseRequired": true
    }
After request

TestServerCancellationToken:: Setting request to cancel:: 5
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "outliningSpans",
      "arguments": {
        "file": "/home/src/projects/myproject/app.ts"
      },
      "seq": 5,
      "type": "request"
    }
TestServerCancellationToken:: Cancellation Request id:: 5
TestServerCancellationToken:: Cancellation is requested
TestServerCancellationToken:: resetRequest:: 5 is as expected
Exception is OperationCanceledException: true