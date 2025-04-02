Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/myprojects/project/tsconfig.json]
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "paths": {
      "@app/*": [
        "./*"
      ]
    },
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}

//// [/home/src/myprojects/project/index.ts]
import { alert } from '@app/components/whatever/alert';
alert('Hello, world!');


//// [/home/src/myprojects/project/components/whatever/alert.ts]
export function alert(message: string) {
    console.log(`ALERT: ${message}`);
}


//// [/home/src/myprojects/project/functions/whatever/placeholder.txt]


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
        "file": "/home/src/myprojects/project/index.ts",
        "projectRootPath": "/home/src/myprojects/project"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/myprojects/project/index.ts ProjectRootPath: /home/src/myprojects/project:: Result: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/myprojects/project/tsconfig.json, currentDirectory: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/myprojects/project/tsconfig.json 2000 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/myprojects/project/tsconfig.json : {
 "rootNames": [
  "/home/src/myprojects/project/index.ts",
  "/home/src/myprojects/project/components/whatever/alert.ts"
 ],
 "options": {
  "target": 3,
  "module": 1,
  "paths": {
   "@app/*": [
    "./*"
   ]
  },
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "skipLibCheck": true,
  "pathsBasePath": "/home/src/myprojects/project",
  "configFilePath": "/home/src/myprojects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/myprojects/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/myprojects/project/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/myprojects/project/components/whatever/alert.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/node_modules/@types 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/node_modules/@types 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/node_modules/@types 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/node_modules/@types 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/myprojects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/myprojects/project/components/whatever/alert.ts Text-1 "export function alert(message: string) {\n    console.log(`ALERT: ${message}`);\n}\n"
	/home/src/myprojects/project/index.ts SVC-1-0 "import { alert } from '@app/components/whatever/alert';\nalert('Hello, world!');\n"


	../../tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	components/whatever/alert.ts
	  Imported via '@app/components/whatever/alert' from file 'index.ts'
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/myprojects/project/tsconfig.json"
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
          "projectId": "8eef2d0b8a0e9b1fea9cc093cf6e65a3858613760d59db089978dadbab81a1fb",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 161,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "target": "es2016",
            "module": "commonjs",
            "paths": "",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "skipLibCheck": true
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
        "triggerFile": "/home/src/myprojects/project/index.ts",
        "configFile": "/home/src/myprojects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/index.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
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
//// [/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts] *Lib*


PolledWatches::
/home/src/myprojects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/myprojects/project/components/whatever/alert.ts: *new*
  {}
/home/src/myprojects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/myprojects/project: *new*
  {}

Projects::
/home/src/myprojects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/myprojects/project/components/whatever/alert.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json
/home/src/myprojects/project/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/myprojects/project/components/whatever :: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Invoking sourceFileChange on /home/src/myprojects/project/components/whatever/alert.ts:: 2
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/myprojects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/myprojects/project/components/whatever :: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/myprojects/project/functions/whatever :: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/myprojects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/myprojects/project/functions/whatever :: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Before request
//// [/home/src/myprojects/project/functions/whatever/alert.ts]
export function alert(message: string) {
    console.log(`ALERT: ${message}`);
}


//// [/home/src/myprojects/project/components/whatever/alert.ts] deleted

Timeout callback:: count: 2
5: /home/src/myprojects/project/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/myprojects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/myprojects/project/components/whatever/alert.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/myprojects/project/tsconfig.json *deleted*
/home/src/myprojects/project/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/myprojects/project/functions/whatever/alert.ts",
        "projectRootPath": "/home/src/myprojects/project",
        "fileContent": "export function alert(message: string) {\n    console.log(`ALERT: ${message}`);\n}\n"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Invoking /home/src/myprojects/project/tsconfig.json:: wildcard for open scriptInfo:: /home/src/myprojects/project/functions/whatever/alert.ts
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/myprojects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/myprojects/project/functions/whatever/alert.ts ProjectRootPath: /home/src/myprojects/project:: Result: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/components 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/components 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/myprojects/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/myprojects/project/index.ts SVC-1-0 "import { alert } from '@app/components/whatever/alert';\nalert('Hello, world!');\n"
	/home/src/myprojects/project/functions/whatever/alert.ts SVC-1-0 "export function alert(message: string) {\n    console.log(`ALERT: ${message}`);\n}\n"


	../../tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	index.ts
	  Matched by default include pattern '**/*'
	functions/whatever/alert.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/myprojects/project/components/whatever/alert.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/index.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/functions/whatever/alert.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/myprojects/node_modules: *new*
  {"pollingInterval":500}
/home/src/myprojects/node_modules/@types:
  {"pollingInterval":500}
/home/src/myprojects/project/node_modules: *new*
  {"pollingInterval":500}
/home/src/myprojects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/myprojects/project/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}

FsWatches *deleted*::
/home/src/myprojects/project/components/whatever/alert.ts:
  {}

FsWatchesRecursive::
/home/src/myprojects/project:
  {}
/home/src/myprojects/project/components: *new*
  {}

Timeout callback:: count: 2
5: /home/src/myprojects/project/tsconfig.json *deleted*
6: *ensureProjectForOpenFiles* *deleted*
7: /home/src/myprojects/project/tsconfig.json *new*
8: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/myprojects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/myprojects/project/components/whatever/alert.ts *deleted*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/myprojects/project/functions/whatever/alert.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/myprojects/project/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getEditsForFileRename",
      "arguments": {
        "oldFilePath": "/home/src/myprojects/project/components/whatever",
        "newFilePath": "/home/src/myprojects/project/functions/whatever"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "fileName": "/home/src/myprojects/project/index.ts",
          "textChanges": [
            {
              "start": {
                "line": 1,
                "offset": 24
              },
              "end": {
                "line": 1,
                "offset": 54
              },
              "newText": "@app/functions/whatever/alert"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Projects::
/home/src/myprojects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2
    documentPositionMappers: 1 *changed*
        /home/src/tslibs/ts/lib/lib.es2016.full.d.ts: identitySourceMapConsumer *new*

ScriptInfos::
/home/src/myprojects/project/functions/whatever/alert.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/myprojects/project/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts *changed*
    version: Text-1
    sourceMapFilePath: false *changed*
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/home/src/myprojects/project/index.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 24
                },
                "end": {
                  "line": 1,
                  "offset": 54
                },
                "newText": "@app/functions/whatever/alert"
              }
            ]
          }
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/home/src/myprojects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/myprojects/project/functions/whatever/alert.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/myprojects/project/index.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    sourceMapFilePath: false
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json

Before running Timeout callback:: count: 2
7: /home/src/myprojects/project/tsconfig.json
8: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/myprojects/project/components 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/myprojects/project/components 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/myprojects/project/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/myprojects/project/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/myprojects/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/myprojects/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/myprojects/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/myprojects/project/functions/whatever/alert.ts SVC-1-0 "export function alert(message: string) {\n    console.log(`ALERT: ${message}`);\n}\n"
	/home/src/myprojects/project/index.ts SVC-1-1 "import { alert } from '@app/functions/whatever/alert';\nalert('Hello, world!');\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/index.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/functions/whatever/alert.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/index.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/functions/whatever/alert.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/myprojects/project/index.ts,/home/src/myprojects/project/functions/whatever/alert.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/myprojects/project/index.ts",
          "/home/src/myprojects/project/functions/whatever/alert.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/myprojects/node_modules/@types:
  {"pollingInterval":500}
/home/src/myprojects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/myprojects/node_modules:
  {"pollingInterval":500}
/home/src/myprojects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/myprojects/project/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}

FsWatchesRecursive::
/home/src/myprojects/project:
  {}

FsWatchesRecursive *deleted*::
/home/src/myprojects/project/components:
  {}

Projects::
/home/src/myprojects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*
    documentPositionMappers: 0 *changed*
        /home/src/tslibs/ts/lib/lib.es2016.full.d.ts: identitySourceMapConsumer *deleted*

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/myprojects/project/functions/whatever :: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/myprojects/project/functions/whatever :: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/myprojects/project/components/whatever :: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/myprojects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/myprojects/project/components/whatever :: WatchInfo: /home/src/myprojects/project 1 undefined Config: /home/src/myprojects/project/tsconfig.json WatchType: Wild card directory
Before request
//// [/home/src/myprojects/project/components/whatever/alert.ts]
export function alert(message: string) {
    console.log(`ALERT: ${message}`);
}


//// [/home/src/myprojects/project/functions/whatever/alert.ts] deleted

Timeout callback:: count: 2
11: /home/src/myprojects/project/tsconfig.json *new*
12: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/myprojects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "openFiles": [
          {
            "file": "/home/src/myprojects/project/components/whatever/alert.ts",
            "fileContent": "export function alert(message: string) {\n    console.log(`ALERT: ${message}`);\n}\n",
            "projectRootPath": "/home/src/myprojects/project"
          }
        ],
        "closedFiles": [
          "/home/src/myprojects/project/functions/whatever/alert.ts"
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/myprojects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Invoking /home/src/myprojects/project/tsconfig.json:: wildcard for open scriptInfo:: /home/src/myprojects/project/components/whatever/alert.ts
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/myprojects/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/myprojects/project/components/whatever/alert.ts ProjectRootPath: /home/src/myprojects/project:: Result: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/functions 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/functions 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/project/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/myprojects/node_modules 1 undefined Project: /home/src/myprojects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/myprojects/project/tsconfig.json projectStateVersion: 4 projectProgramVersion: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/myprojects/project/index.ts SVC-1-1 "import { alert } from '@app/functions/whatever/alert';\nalert('Hello, world!');\n"
	/home/src/myprojects/project/components/whatever/alert.ts SVC-2-0 "export function alert(message: string) {\n    console.log(`ALERT: ${message}`);\n}\n"


	../../tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	index.ts
	  Matched by default include pattern '**/*'
	components/whatever/alert.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/index.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/components/whatever/alert.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
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
/home/src/myprojects/node_modules: *new*
  {"pollingInterval":500}
/home/src/myprojects/node_modules/@types:
  {"pollingInterval":500}
/home/src/myprojects/project/node_modules: *new*
  {"pollingInterval":500}
/home/src/myprojects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/myprojects/project/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}

FsWatchesRecursive::
/home/src/myprojects/project:
  {}
/home/src/myprojects/project/functions: *new*
  {}

Timeout callback:: count: 2
11: /home/src/myprojects/project/tsconfig.json *deleted*
12: *ensureProjectForOpenFiles* *deleted*
15: /home/src/myprojects/project/tsconfig.json *new*
16: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/myprojects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/myprojects/project/components/whatever/alert.ts (Open) *new*
    version: SVC-2-0
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/myprojects/project/functions/whatever/alert.ts *deleted*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /home/src/myprojects/project/tsconfig.json *deleted*
/home/src/myprojects/project/index.ts (Open)
    version: SVC-1-1
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    sourceMapFilePath: false
    containingProjects: 1
        /home/src/myprojects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getEditsForFileRename",
      "arguments": {
        "oldFilePath": "/home/src/myprojects/project/functions/whatever",
        "newFilePath": "/home/src/myprojects/project/components/whatever"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "fileName": "/home/src/myprojects/project/index.ts",
          "textChanges": [
            {
              "start": {
                "line": 1,
                "offset": 24
              },
              "end": {
                "line": 1,
                "offset": 53
              },
              "newText": "@app/components/whatever/alert"
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Projects::
/home/src/myprojects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 4
    documentPositionMappers: 1 *changed*
        /home/src/tslibs/ts/lib/lib.es2016.full.d.ts: identitySourceMapConsumer *new*

Before running Timeout callback:: count: 2
15: /home/src/myprojects/project/tsconfig.json
16: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/index.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/components/whatever/alert.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/myprojects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/index.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/myprojects/project/components/whatever/alert.ts ProjectRootPath: /home/src/myprojects/project
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/myprojects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/myprojects/project/index.ts,/home/src/myprojects/project/components/whatever/alert.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/myprojects/project/index.ts",
          "/home/src/myprojects/project/components/whatever/alert.ts"
        ]
      }
    }
After running Timeout callback:: count: 0
