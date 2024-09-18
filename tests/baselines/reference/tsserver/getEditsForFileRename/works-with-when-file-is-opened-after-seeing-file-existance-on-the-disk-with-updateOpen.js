Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/myproject/src/index.ts]
import {} from '@/old';

//// [/home/src/projects/myproject/src/old.ts]
export const x = 10;

//// [/home/src/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  }
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
      "command": "updateOpen",
      "arguments": {
        "openFiles": [
          {
            "file": "/home/src/projects/myproject/src/index.ts",
            "projectRootPath": "/home/src/projects/myproject"
          },
          {
            "file": "/home/src/projects/myproject/src/old.ts",
            "projectRootPath": "/home/src/projects/myproject"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/myproject/src/index.ts ProjectRootPath: /home/src/projects/myproject:: Result: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/myproject/tsconfig.json, currentDirectory: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/tsconfig.json 2000 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 1,
        "path": "/home/src/projects/myproject/tsconfig.json"
      }
    }
Custom watchFile:: Added:: {"id":1,"path":"/home/src/projects/myproject/tsconfig.json"}
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/myproject/src/index.ts",
  "/home/src/projects/myproject/src/old.ts"
 ],
 "options": {
  "paths": {
   "@/*": [
    "./src/*"
   ]
  },
  "pathsBasePath": "/home/src/projects/myproject",
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
        "reason": "Creating possible configured project for /home/src/projects/myproject/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject 1 undefined Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 2,
        "path": "/home/src/projects/myproject",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":2,"path":"/home/src/projects/myproject","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject 1 undefined Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 3,
        "path": "/home/src/tslibs/TS/Lib/lib.d.ts"
      }
    }
Custom watchFile:: Added:: {"id":3,"path":"/home/src/tslibs/TS/Lib/lib.d.ts"}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules/@types 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 4,
        "path": "/home/src/projects/myproject/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":4,"path":"/home/src/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules/@types 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 5,
        "path": "/home/src/projects/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":5,"path":"/home/src/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/myproject/src/old.ts SVC-1-0 "export const x = 10;"
	/home/src/projects/myproject/src/index.ts SVC-1-0 "import {} from '@/old';"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/old.ts
	  Imported via '@/old' from file 'src/index.ts'
	  Matched by default include pattern '**/*'
	src/index.ts
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
            "ts": 2,
            "tsSize": 43,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "paths": ""
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
        "triggerFile": "/home/src/projects/myproject/src/index.ts",
        "configFile": "/home/src/projects/myproject/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/myproject/src/old.ts ProjectRootPath: /home/src/projects/myproject:: Result: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/index.ts ProjectRootPath: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/old.ts ProjectRootPath: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/myproject/tsconfig.json: *new*
  {"event":{"id":1,"path":"/home/src/projects/myproject/tsconfig.json"}}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"event":{"id":3,"path":"/home/src/tslibs/TS/Lib/lib.d.ts"}}

FsWatchesRecursive::
/home/src/projects/myproject: *new*
  {"event":{"id":2,"path":"/home/src/projects/myproject","recursive":true,"ignoreUpdate":true}}
/home/src/projects/myproject/node_modules/@types: *new*
  {"event":{"id":4,"path":"/home/src/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/node_modules/@types: *new*
  {"event":{"id":5,"path":"/home/src/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/myproject/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/projects/myproject/src/old.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json

Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"/home/src/projects/myproject","recursive":true,"ignoreUpdate":true}:: /home/src/projects/myproject/src/old.ts deleted
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"/home/src/projects/myproject","recursive":true,"ignoreUpdate":true}:: /home/src/projects/myproject/src/new.ts created
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"/home/src/projects/myproject","recursive":true,"ignoreUpdate":true}:: /home/src/projects/myproject/src/new.ts updated
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"/home/src/projects/myproject","recursive":true,"ignoreUpdate":true}:: /home/src/projects/myproject/src updated
Before request
//// [/home/src/projects/myproject/src/new.ts]
export const x = 10;

//// [/home/src/projects/myproject/src/old.ts] deleted

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 2,
        "deleted": [
          "/home/src/projects/myproject/src/old.ts"
        ],
        "created": [
          "/home/src/projects/myproject/src/new.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/myproject/src/new.ts :: WatchInfo: /home/src/projects/myproject 1 undefined Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/myproject/src/new.ts :: WatchInfo: /home/src/projects/myproject 1 undefined Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/myproject/src/old.ts :: WatchInfo: /home/src/projects/myproject 1 undefined Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/myproject/src/old.ts :: WatchInfo: /home/src/projects/myproject 1 undefined Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
After request

Timeout callback:: count: 2
1: /home/src/projects/myproject/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "openFiles": [
          {
            "file": "/home/src/projects/myproject/src/new.ts",
            "fileContent": "export const x = 10;",
            "projectRootPath": "/home/src/projects/myproject"
          }
        ],
        "closedFiles": [
          "/home/src/projects/myproject/src/old.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Invoking /home/src/projects/myproject/tsconfig.json:: wildcard for open scriptInfo:: /home/src/projects/myproject/src/new.ts
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/myproject/src/new.ts ProjectRootPath: /home/src/projects/myproject:: Result: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 6,
        "path": "/home/src/projects/myproject/src",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":6,"path":"/home/src/projects/myproject/src","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 7,
        "path": "/home/src/projects/myproject/node_modules",
        "recursive": true
      }
    }
Custom watchDirectory:: Added:: {"id":7,"path":"/home/src/projects/myproject/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 8,
        "path": "/home/src/projects/node_modules",
        "recursive": true
      }
    }
Custom watchDirectory:: Added:: {"id":8,"path":"/home/src/projects/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/myproject/src/index.ts SVC-1-0 "import {} from '@/old';"
	/home/src/projects/myproject/src/new.ts SVC-1-0 "export const x = 10;"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/index.ts
	  Matched by default include pattern '**/*'
	src/new.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/index.ts ProjectRootPath: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/new.ts ProjectRootPath: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/myproject/tsconfig.json:
  {"event":{"id":1,"path":"/home/src/projects/myproject/tsconfig.json"}}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"event":{"id":3,"path":"/home/src/tslibs/TS/Lib/lib.d.ts"}}

FsWatchesRecursive::
/home/src/projects/myproject:
  {"event":{"id":2,"path":"/home/src/projects/myproject","recursive":true,"ignoreUpdate":true}}
/home/src/projects/myproject/node_modules: *new*
  {"event":{"id":7,"path":"/home/src/projects/myproject/node_modules","recursive":true}}
/home/src/projects/myproject/node_modules/@types:
  {"event":{"id":4,"path":"/home/src/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/myproject/src: *new*
  {"event":{"id":6,"path":"/home/src/projects/myproject/src","recursive":true,"ignoreUpdate":true}}
/home/src/projects/node_modules: *new*
  {"event":{"id":8,"path":"/home/src/projects/node_modules","recursive":true}}
/home/src/projects/node_modules/@types:
  {"event":{"id":5,"path":"/home/src/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}

Timeout callback:: count: 2
1: /home/src/projects/myproject/tsconfig.json *deleted*
2: *ensureProjectForOpenFiles* *deleted*
5: /home/src/projects/myproject/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/projects/myproject/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/projects/myproject/src/new.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/projects/myproject/src/old.ts *deleted*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /home/src/projects/myproject/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getEditsForFileRename",
      "arguments": {
        "oldFilePath": "/home/src/projects/myproject/src/old.ts",
        "newFilePath": "/home/src/projects/myproject/src/new.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "fileName": "/home/src/projects/myproject/src/index.ts",
          "textChanges": [
            {
              "start": {
                "line": 1,
                "offset": 17
              },
              "end": {
                "line": 1,
                "offset": 22
              },
              "newText": "@/new"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2
    documentPositionMappers: 1 *changed*
        /home/src/tslibs/ts/lib/lib.d.ts: identitySourceMapConsumer *new*

ScriptInfos::
/home/src/projects/myproject/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/projects/myproject/src/new.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    sourceMapFilePath: false *changed*
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "closedFiles": [
          "/home/src/projects/myproject/src/new.ts"
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src/new.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 9,
        "path": "/home/src/projects/myproject/src/new.ts"
      }
    }
Custom watchFile:: Added:: {"id":9,"path":"/home/src/projects/myproject/src/new.ts"}
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/index.ts ProjectRootPath: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/home/src/projects/myproject/src/new.ts: *new*
  {"event":{"id":9,"path":"/home/src/projects/myproject/src/new.ts"}}
/home/src/projects/myproject/tsconfig.json:
  {"event":{"id":1,"path":"/home/src/projects/myproject/tsconfig.json"}}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"event":{"id":3,"path":"/home/src/tslibs/TS/Lib/lib.d.ts"}}

FsWatchesRecursive::
/home/src/projects/myproject:
  {"event":{"id":2,"path":"/home/src/projects/myproject","recursive":true,"ignoreUpdate":true}}
/home/src/projects/myproject/node_modules:
  {"event":{"id":7,"path":"/home/src/projects/myproject/node_modules","recursive":true}}
/home/src/projects/myproject/node_modules/@types:
  {"event":{"id":4,"path":"/home/src/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/myproject/src:
  {"event":{"id":6,"path":"/home/src/projects/myproject/src","recursive":true,"ignoreUpdate":true}}
/home/src/projects/node_modules:
  {"event":{"id":8,"path":"/home/src/projects/node_modules","recursive":true}}
/home/src/projects/node_modules/@types:
  {"event":{"id":5,"path":"/home/src/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/projects/myproject/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/projects/myproject/src/new.ts *changed*
    open: false *changed*
    version: SVC-1-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    sourceMapFilePath: false
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/myproject/src/index.ts"
        ]
      },
      "seq": 6,
      "type": "request"
    }
After request

Timeout callback:: count: 3
5: /home/src/projects/myproject/tsconfig.json
6: *ensureProjectForOpenFiles*
7: checkOne *new*

Before running Timeout callback:: count: 3
5: /home/src/projects/myproject/tsconfig.json
6: *ensureProjectForOpenFiles*
7: checkOne

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/index.ts ProjectRootPath: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/index.ts ProjectRootPath: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/myproject/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/myproject/src/index.ts"
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/myproject/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
1: semanticCheck *new*

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: false *changed*

ScriptInfos::
/home/src/projects/myproject/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/projects/myproject/src/new.ts *changed*
    version: SVC-1-0
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    sourceMapFilePath: false
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json

Before running Immedidate callback:: count: 1
1: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/myproject/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 16
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "text": "Cannot find module '@/old' or its corresponding type declarations.",
            "code": 2307,
            "category": "error"
          }
        ]
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
        "file": "/home/src/projects/myproject/src/index.ts",
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
              "file": "/home/src/projects/myproject/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0
