Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/a.ts]
function f() {}

//// [/home/src/projects/project/a/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "outFile": "../bin/a.js"
  }
}

//// [/home/src/projects/project/b/b.ts]
f();

//// [/home/src/projects/project/b/tsconfig.json]
{
  "references": [
    {
      "path": "../a"
    }
  ]
}

//// [/home/src/projects/project/bin/a.d.ts]
declare function f(): void;
//# sourceMappingURL=a.d.ts.map

//// [/home/src/projects/project/bin/a.d.ts.map]
{
  "version": 3,
  "file": "a.d.ts",
  "sourceRoot": "",
  "sources": [
    "../a/a.ts"
  ],
  "names": [],
  "mappings": "AAAA,iBAAS,CAAC,SAAK"
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
        "file": "/home/src/projects/project/a/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/a.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/a/tsconfig.json, currentDirectory: /home/src/projects/project/a
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/tsconfig.json 2000 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/a/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/a/a.ts"
 ],
 "options": {
  "declaration": true,
  "declarationMap": true,
  "outFile": "/home/src/projects/project/bin/a.js",
  "configFilePath": "/home/src/projects/project/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/a/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/a/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Config: /home/src/projects/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Config: /home/src/projects/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/a/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/a.ts SVC-1-0 "function f() {}"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/a/tsconfig.json"
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
          "projectId": "46252e13e72e315e6b1dedef64ce02f5003545991770234f0ee355610cb28667",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 15,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "declaration": true,
            "declarationMap": true,
            "outFile": ""
          },
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
        "triggerFile": "/home/src/projects/project/a/a.ts",
        "configFile": "/home/src/projects/project/a/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/a/tsconfig.json
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
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/a: *new*
  {}

Projects::
/home/src/projects/project/a/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/a/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/tsconfig.json

ts.getFileEmitOutput: /home/src/projects/project/a/a.ts: {
  "outputFiles": [
    {
      "name": "/home/src/projects/project/bin/a.d.ts.map",
      "writeByteOrderMark": false,
      "text": "{\"version\":3,\"file\":\"a.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../a/a.ts\"],\"names\":[],\"mappings\":\"AAAA,iBAAS,CAAC,SAAK\"}"
    },
    {
      "name": "/home/src/projects/project/bin/a.d.ts",
      "writeByteOrderMark": false,
      "text": "declare function f(): void;\n//# sourceMappingURL=a.d.ts.map"
    }
  ],
  "emitSkipped": false,
  "diagnostics": []
}
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/home/src/projects/project/a/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 2,
      "success": true
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/a.ts: *new*
  {}
/home/src/projects/project/a/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/a:
  {}

Projects::
/home/src/projects/project/a/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/a.ts *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/a/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/a/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/b/b.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/b/b.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/b/tsconfig.json, currentDirectory: /home/src/projects/project/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/b/tsconfig.json 2000 undefined Project: /home/src/projects/project/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/b/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/b/b.ts"
 ],
 "options": {
  "configFilePath": "/home/src/projects/project/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/projects/project/a",
   "originalPath": "../a"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/b/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/b/b.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b 1 undefined Config: /home/src/projects/project/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b 1 undefined Config: /home/src/projects/project/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b/node_modules/@types 1 undefined Project: /home/src/projects/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b/node_modules/@types 1 undefined Project: /home/src/projects/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/a.ts SVC-1-0 "function f() {}"
	/home/src/projects/project/b/b.ts SVC-1-0 "f();"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../a/a.ts
	  Source from referenced project '../a/tsconfig.json' included because '--module' is specified as 'none'
	b.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/b/tsconfig.json"
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
          "projectId": "12d5481057bdbc86f3fdf4eacf0490fc5694acf3db8d1f7545c8f4d4a37f2175",
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
        "triggerFile": "/home/src/projects/project/b/b.ts",
        "configFile": "/home/src/projects/project/b/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 3,
              "offset": 5
            },
            "end": {
              "line": 5,
              "offset": 6
            },
            "text": "Referenced project '/home/src/projects/project/a' must have setting \"composite\": true.",
            "code": 6306,
            "category": "error",
            "fileName": "/home/src/projects/project/b/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/b/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/a.ts:
  {}
/home/src/projects/project/a/tsconfig.json:
  {}
/home/src/projects/project/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/a:
  {}
/home/src/projects/project/b: *new*
  {}

Projects::
/home/src/projects/project/a/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*
    autoImportProviderHost: false
/home/src/projects/project/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/a.ts *changed*
    version: SVC-1-0
    containingProjects: 2 *changed*
        /home/src/projects/project/a/tsconfig.json
        /home/src/projects/project/b/tsconfig.json *new*
/home/src/projects/project/b/b.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/b/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/projects/project/a/tsconfig.json
        /home/src/projects/project/b/tsconfig.json *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references-full",
      "arguments": {
        "file": "/home/src/projects/project/b/b.ts",
        "line": 1,
        "offset": 1
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/projects/project/b/b.ts position 0 in project /home/src/projects/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/a.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/a.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/projects/project/a/a.ts position 9 in project /home/src/projects/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/projects/project/a/a.ts",
            "kind": "function",
            "name": "function f(): void",
            "textSpan": {
              "start": 9,
              "length": 1
            },
            "displayParts": [
              {
                "text": "function",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "f",
                "kind": "functionName"
              },
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": ":",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "void",
                "kind": "keyword"
              }
            ],
            "contextSpan": {
              "start": 0,
              "length": 15
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 9,
                "length": 1
              },
              "fileName": "/home/src/projects/project/a/a.ts",
              "contextSpan": {
                "start": 0,
                "length": 15
              },
              "isWriteAccess": true
            },
            {
              "textSpan": {
                "start": 0,
                "length": 1
              },
              "fileName": "/home/src/projects/project/b/b.ts",
              "isWriteAccess": false
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Projects::
/home/src/projects/project/a/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/projects/project/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
    originalConfiguredProjects: 2 *changed*
        /home/src/projects/project/a/tsconfig.json *new*
        /home/src/projects/project/b/tsconfig.json *new*
