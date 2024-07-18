currentDirectory:: /home/src/workspaces useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/home/src/workspaces/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "projects/server"
    },
    {
      "path": "projects/shared"
    }
  ]
}

//// [/home/src/workspaces/projects/shared/src/myClass.ts]
export class MyClass { }

//// [/home/src/workspaces/projects/shared/src/logging.ts]
export function log(str: string) {
    console.log(str);
}


//// [/home/src/workspaces/projects/shared/src/random.ts]
export function randomFn(str: string) {
    console.log(str);
}


//// [/home/src/workspaces/projects/shared/tsconfig.json]
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/workspaces/projects/server/src/server.ts]
import { MyClass } from ':shared/myClass.js';
console.log('Hello, world!');


//// [/home/src/workspaces/projects/server/tsconfig.json]
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "rootDir": "..",
    "outDir": "./dist",
    "paths": {
      ":shared/*": [
        "../../shared/src/*"
      ]
    }
  },
  "include": [
    "../shared/src/**/*.ts",
    "src/**/*.ts"
  ],
  "references": [
    {
      "path": "../shared"
    }
  ]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspaces/projects/server/src/server.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/projects/server/src/server.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/server/tsconfig.json 2000 undefined Project: /home/src/workspaces/projects/server/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/projects/server/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/projects/server/src/server.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/projects/server/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/projects/shared/src/logging.ts",
  "/home/src/workspaces/projects/shared/src/myClass.ts",
  "/home/src/workspaces/projects/shared/src/random.ts",
  "/home/src/workspaces/projects/server/src/server.ts"
 ],
 "options": {
  "composite": true,
  "baseUrl": "/home/src/workspaces/projects/server/src",
  "rootDir": "/home/src/workspaces/projects",
  "outDir": "/home/src/workspaces/projects/server/dist",
  "paths": {
   ":shared/*": [
    "../../shared/src/*"
   ]
  },
  "pathsBasePath": "/home/src/workspaces/projects/server",
  "configFilePath": "/home/src/workspaces/projects/server/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/projects/shared",
   "originalPath": "../shared"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/tsconfig.json 2000 undefined Config: /home/src/workspaces/projects/server/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/shared/src 1 undefined Config: /home/src/workspaces/projects/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/shared/src 1 undefined Config: /home/src/workspaces/projects/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/server/src 1 undefined Config: /home/src/workspaces/projects/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/server/src 1 undefined Config: /home/src/workspaces/projects/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/shared/src/logging.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/shared/src/myClass.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/shared/src/random.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/projects/shared/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/projects/shared/src/logging.ts",
  "/home/src/workspaces/projects/shared/src/myClass.ts",
  "/home/src/workspaces/projects/shared/src/random.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/home/src/workspaces/projects/shared/dist",
  "configFilePath": "/home/src/workspaces/projects/shared/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/shared/tsconfig.json 2000 undefined Project: /home/src/workspaces/projects/server/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/shared/src 1 undefined Config: /home/src/workspaces/projects/shared/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/shared/src 1 undefined Config: /home/src/workspaces/projects/shared/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/server/node_modules/@types 1 undefined Project: /home/src/workspaces/projects/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/server/node_modules/@types 1 undefined Project: /home/src/workspaces/projects/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/node_modules/@types 1 undefined Project: /home/src/workspaces/projects/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/projects/node_modules/@types 1 undefined Project: /home/src/workspaces/projects/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/projects/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/projects/server/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/projects/server/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/projects/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/projects/shared/src/logging.ts Text-1 "export function log(str: string) {\n    console.log(str);\n}\n"
	/home/src/workspaces/projects/shared/src/myClass.ts Text-1 "export class MyClass { }"
	/home/src/workspaces/projects/shared/src/random.ts Text-1 "export function randomFn(str: string) {\n    console.log(str);\n}\n"
	/home/src/workspaces/projects/server/src/server.ts SVC-1-0 "import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../shared/src/logging.ts
	  Matched by include pattern '../shared/src/**/*.ts' in 'tsconfig.json'
	../shared/src/myClass.ts
	  Matched by include pattern '../shared/src/**/*.ts' in 'tsconfig.json'
	  Imported via ':shared/myClass.js' from file 'src/server.ts'
	../shared/src/random.ts
	  Matched by include pattern '../shared/src/**/*.ts' in 'tsconfig.json'
	src/server.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/projects/server/tsconfig.json"
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
          "projectId": "3e7cc0fff0dd9d6df3a5e18543004f6ea135e64846930b71357afdc86795b593",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 4,
            "tsSize": 223,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "baseUrl": "",
            "rootDir": "",
            "outDir": "",
            "paths": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": true,
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
        "triggerFile": "/home/src/workspaces/projects/server/src/server.ts",
        "configFile": "/home/src/workspaces/projects/server/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/projects/server/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /home/src/workspaces/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/tsconfig.json 2000 undefined Project: /home/src/workspaces/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/projects/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/projects/server/src/server.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/projects/server/tsconfig.json
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
/home/src/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/projects/server/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/home/src/workspaces/projects/server/tsconfig.json: *new*
  {}
/home/src/workspaces/projects/shared/src/logging.ts: *new*
  {}
/home/src/workspaces/projects/shared/src/myClass.ts: *new*
  {}
/home/src/workspaces/projects/shared/src/random.ts: *new*
  {}
/home/src/workspaces/projects/shared/tsconfig.json: *new*
  {}
/home/src/workspaces/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspaces/projects/server/src: *new*
  {}
/home/src/workspaces/projects/shared/src: *new*
  {}

Projects::
/home/src/workspaces/projects/server/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true

ScriptInfos::
/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/server/src/server.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json *default*
/home/src/workspaces/projects/shared/src/logging.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/shared/src/myClass.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/shared/src/random.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/projects/shared/src/logging.ts 1:: WatchInfo: /home/src/workspaces/projects/shared/src/logging.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/projects/shared/src/logging.ts 1:: WatchInfo: /home/src/workspaces/projects/shared/src/logging.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /home/src/workspaces/projects/server/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/projects/shared/src/logging.ts]
export function log(str: string) {
    console.log(str);
}
export const x = 10;


Timeout callback:: count: 2
1: /home/src/workspaces/projects/server/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/projects/server/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
/home/src/workspaces/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/server/src/server.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json *default*
/home/src/workspaces/projects/shared/src/logging.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/shared/src/myClass.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/shared/src/random.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/projects/server/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/projects/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/projects/shared/src/logging.ts Text-2 "export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;"
	/home/src/workspaces/projects/shared/src/myClass.ts Text-1 "export class MyClass { }"
	/home/src/workspaces/projects/shared/src/random.ts Text-1 "export function randomFn(str: string) {\n    console.log(str);\n}\n"
	/home/src/workspaces/projects/server/src/server.ts SVC-1-0 "import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/projects/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/projects/server/src/server.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/projects/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/projects/server/src/server.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/projects/server/src/server.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/projects/server/src/server.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/projects/server/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
/home/src/workspaces/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/server/src/server.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json *default*
/home/src/workspaces/projects/shared/src/logging.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/shared/src/myClass.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/shared/src/random.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/projects/shared/src/random.ts 2:: WatchInfo: /home/src/workspaces/projects/shared/src/random.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/projects/shared/src/random.ts 2:: WatchInfo: /home/src/workspaces/projects/shared/src/random.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/projects/shared/src/random.ts :: WatchInfo: /home/src/workspaces/projects/shared/src 1 undefined Config: /home/src/workspaces/projects/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/projects/server/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/projects/shared/src/random.ts :: WatchInfo: /home/src/workspaces/projects/shared/src 1 undefined Config: /home/src/workspaces/projects/server/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/projects/shared/src/random.ts :: WatchInfo: /home/src/workspaces/projects/shared/src 1 undefined Config: /home/src/workspaces/projects/shared/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/projects/shared/src/random.ts :: WatchInfo: /home/src/workspaces/projects/shared/src 1 undefined Config: /home/src/workspaces/projects/shared/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
5: /home/src/workspaces/projects/server/tsconfig.json
6: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/projects/shared/src/random.ts] deleted

Timeout callback:: count: 2
5: /home/src/workspaces/projects/server/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/projects/server/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
/home/src/workspaces/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/server/src/server.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json *default*
/home/src/workspaces/projects/shared/src/logging.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/shared/src/myClass.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/projects/server/tsconfig.json
/home/src/workspaces/projects/shared/src/random.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspaces/projects/server/tsconfig.json *deleted*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/projects/server/tsconfig.json projectStateVersion: 3 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/projects/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/projects/shared/src/logging.ts Text-2 "export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;"
	/home/src/workspaces/projects/shared/src/myClass.ts Text-1 "export class MyClass { }"
	/home/src/workspaces/projects/server/src/server.ts SVC-1-0 "import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../shared/src/logging.ts
	  Matched by include pattern '../shared/src/**/*.ts' in 'tsconfig.json'
	../shared/src/myClass.ts
	  Matched by include pattern '../shared/src/**/*.ts' in 'tsconfig.json'
	  Imported via ':shared/myClass.js' from file 'src/server.ts'
	src/server.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/projects/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/projects/server/src/server.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/projects/server/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/projects/server/src/server.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/projects/server/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/projects/server/src/server.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/projects/server/src/server.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/projects/server/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
/home/src/workspaces/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
