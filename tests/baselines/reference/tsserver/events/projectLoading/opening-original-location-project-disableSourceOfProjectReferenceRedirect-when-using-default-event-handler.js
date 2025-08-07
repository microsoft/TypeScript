Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/a/a.ts]
export class A { }

//// [/user/username/projects/a/tsconfig.json]
{}

//// [/user/username/projects/a/a.d.ts]
export declare class A {
}
//# sourceMappingURL=a.d.ts.map


//// [/user/username/projects/a/a.d.ts.map]
{
  "version": 3,
  "file": "a.d.ts",
  "sourceRoot": "",
  "sources": [
    "./a.ts"
  ],
  "names": [],
  "mappings": "AAAA,qBAAa,CAAC;CAAI"
}

//// [/user/username/projects/b/b.ts]
import {A} from "../a/a"; new A();

//// [/user/username/projects/b/tsconfig.json]
{
  "compilerOptions": {
    "disableSourceOfProjectReferenceRedirect": true
  },
  "references": [
    {
      "path": "../a"
    }
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
        "file": "/user/username/projects/b/b.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/b/b.ts ProjectRootPath: undefined:: Result: /user/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/b/tsconfig.json, currentDirectory: /user/username/projects/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/b/tsconfig.json 2000 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/b/b.ts"
 ],
 "options": {
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/a",
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
        "projectName": "/user/username/projects/b/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/b/b.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/b 1 undefined Config: /user/username/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/b 1 undefined Config: /user/username/projects/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/a/a.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/tsconfig.json 2000 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a 1 undefined Config: /user/username/projects/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a 1 undefined Config: /user/username/projects/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/b/node_modules/@types 1 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/b/node_modules/@types 1 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/a/a.d.ts Text-1 "export declare class A {\n}\n//# sourceMappingURL=a.d.ts.map\n"
	/user/username/projects/b/b.ts SVC-1-0 "import {A} from \"../a/a\"; new A();"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../a/a.d.ts
	  Imported via "../a/a" from file 'b.ts'
	  File is output of project reference source '../a/a.ts'
	b.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/b/tsconfig.json"
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
          "projectId": "20501ec57de369fa110ede8c3db8fe97460676d82a7b594783e32439eba20158",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 34,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 472,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "disableSourceOfProjectReferenceRedirect": true
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
        "triggerFile": "/user/username/projects/b/b.ts",
        "configFile": "/user/username/projects/b/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 6,
              "offset": 5
            },
            "end": {
              "line": 8,
              "offset": 6
            },
            "text": "Referenced project '/user/username/projects/a' must have setting \"composite\": true.",
            "code": 6306,
            "category": "error",
            "fileName": "/user/username/projects/b/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/b/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/b/tsconfig.json
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
/user/username/projects/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/a/a.d.ts: *new*
  {}
/user/username/projects/a/tsconfig.json: *new*
  {}
/user/username/projects/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/a: *new*
  {}
/user/username/projects/b: *new*
  {}

Projects::
/user/username/projects/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/b/tsconfig.json
/user/username/projects/a/a.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/b/tsconfig.json
/user/username/projects/b/b.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/b/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/b/b.ts",
        "line": 1,
        "offset": 31
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/b/b.ts position 30 in project /user/username/projects/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/a.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/a/a.ts ProjectRootPath: undefined:: Result: /user/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/a/tsconfig.json, currentDirectory: /user/username/projects/a
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/a/tsconfig.json",
        "reason": "Creating project for original file: /user/username/projects/a/a.ts for location: /user/username/projects/a/a.d.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/a/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/a/a.ts Text-1 "export class A { }"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
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
        "projectName": "/user/username/projects/a/tsconfig.json"
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
          "projectId": "20a91f8dffe761e39e0ada0a62a3058faad15d4a8c135539aaccd61bb5497dea",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 18,
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
        "triggerFile": "/user/username/projects/a/tsconfig.json",
        "configFile": "/user/username/projects/a/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/a/a.ts ProjectRootPath: undefined:: Result: /user/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/a/a.ts position 13 in project /user/username/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/b/b.ts",
            "start": {
              "line": 1,
              "offset": 9
            },
            "end": {
              "line": 1,
              "offset": 10
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 26
            },
            "lineText": "import {A} from \"../a/a\"; new A();",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/b/b.ts",
            "start": {
              "line": 1,
              "offset": 31
            },
            "end": {
              "line": 1,
              "offset": 32
            },
            "lineText": "import {A} from \"../a/a\"; new A();",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/a/a.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 15
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 19
            },
            "lineText": "export class A { }",
            "isWriteAccess": true
          }
        ],
        "symbolName": "A",
        "symbolStartOffset": 31,
        "symbolDisplayString": "(alias) new A(): A\nimport A"
      },
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/a/a.d.ts:
  {}
/user/username/projects/a/a.d.ts.map: *new*
  {}
/user/username/projects/a/a.ts: *new*
  {}
/user/username/projects/a/tsconfig.json:
  {}
/user/username/projects/b/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/a:
  {}
/user/username/projects/b:
  {}

Projects::
/user/username/projects/a/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/user/username/projects/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /user/username/projects/a/a.d.ts: DocumentPositionMapper1 *new*
    autoImportProviderHost: false
    originalConfiguredProjects: 1 *changed*
        /user/username/projects/a/tsconfig.json *new*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/b/tsconfig.json
        /user/username/projects/a/tsconfig.json *new*
/user/username/projects/a/a.d.ts *changed*
    version: Text-1
    sourceMapFilePath: /user/username/projects/a/a.d.ts.map *changed*
    containingProjects: 1
        /user/username/projects/b/tsconfig.json
/user/username/projects/a/a.d.ts.map *new*
    version: Text-1
    declarationInfoPath: /user/username/projects/a/a.d.ts
    sourceInfos: 1
        /user/username/projects/a/a.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/user/username/projects/a/a.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/a/tsconfig.json
/user/username/projects/b/b.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/b/tsconfig.json *default*

DocumentPositionMappers::
DocumentPositionMapper1 *new*
