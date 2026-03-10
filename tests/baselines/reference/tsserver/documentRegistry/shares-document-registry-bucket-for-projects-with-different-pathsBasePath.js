Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/shared/utils.d.ts]
export const util: number;

//// [/home/src/projects/projectA/tsconfig.json]
{
  "compilerOptions": {
    "paths": {
      "@utils": [
        "../shared/utils.d.ts"
      ]
    }
  },
  "files": [
    "index.ts"
  ]
}

//// [/home/src/projects/projectA/index.ts]
import { util } from "@utils";

//// [/home/src/projects/projectB/tsconfig.json]
{
  "compilerOptions": {
    "paths": {
      "@utils": [
        "../shared/utils.d.ts"
      ]
    }
  },
  "files": [
    "index.ts"
  ]
}

//// [/home/src/projects/projectB/index.ts]
import { util } from "@utils";

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
        "file": "/home/src/projects/projectA/index.ts",
        "projectRootPath": "/home/src/projects/projectA"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/projectA/index.ts ProjectRootPath: /home/src/projects/projectA:: Result: /home/src/projects/projectA/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/projectA/tsconfig.json, currentDirectory: /home/src/projects/projectA
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/projectA/tsconfig.json 2000 undefined Project: /home/src/projects/projectA/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/projectA/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/projectA/index.ts"
 ],
 "options": {
  "paths": {
   "@utils": [
    "../shared/utils.d.ts"
   ]
  },
  "pathsBasePath": "/home/src/projects/projectA",
  "configFilePath": "/home/src/projects/projectA/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/projectA/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/projectA/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/projectA/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/shared/utils.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/projectA/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/projectA/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts Text-1 "interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/shared/utils.d.ts Text-1 "export const util: number;"
	/home/src/projects/projectA/index.ts SVC-1-0 "import { util } from \"@utils\";"


	../../tslibs/TS/Lib/lib.es2025.full.d.ts
	  Default library for target 'es2025'
	../shared/utils.d.ts
	  Imported via "@utils" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/projectA/tsconfig.json"
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
          "projectId": "76f6759c51d9ebfe4c8c5ee9ab405e3ee888595cac9ec5fd632ef1e5669977fc",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 30,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 400,
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
          "files": true,
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
        "triggerFile": "/home/src/projects/projectA/index.ts",
        "configFile": "/home/src/projects/projectA/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/projectA/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/projectA/index.ts ProjectRootPath: /home/src/projects/projectA
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/projectA/tsconfig.json
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
//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*


FsWatches::
/home/src/projects/projectA/tsconfig.json: *new*
  {}
/home/src/projects/shared/utils.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}

Projects::
/home/src/projects/projectA/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/projectA/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/projectA/tsconfig.json *default*
/home/src/projects/shared/utils.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/projectA/tsconfig.json
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/projectA/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/projectB/index.ts",
        "projectRootPath": "/home/src/projects/projectB"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/projectB/index.ts ProjectRootPath: /home/src/projects/projectB:: Result: /home/src/projects/projectB/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/projectB/tsconfig.json, currentDirectory: /home/src/projects/projectB
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/projectB/tsconfig.json 2000 undefined Project: /home/src/projects/projectB/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/projectB/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/projectB/index.ts"
 ],
 "options": {
  "paths": {
   "@utils": [
    "../shared/utils.d.ts"
   ]
  },
  "pathsBasePath": "/home/src/projects/projectB",
  "configFilePath": "/home/src/projects/projectB/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/projectB/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/projectB/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/projectB/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/projectB/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/projectB/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts Text-1 "interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/shared/utils.d.ts Text-1 "export const util: number;"
	/home/src/projects/projectB/index.ts SVC-1-0 "import { util } from \"@utils\";"


	../../tslibs/TS/Lib/lib.es2025.full.d.ts
	  Default library for target 'es2025'
	../shared/utils.d.ts
	  Imported via "@utils" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/projectB/tsconfig.json"
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
          "projectId": "233654408b57727f3d12614d9949547740e287f65ffa44ff1b5dd55ed02c116a",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 30,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 400,
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
          "files": true,
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
        "triggerFile": "/home/src/projects/projectB/index.ts",
        "configFile": "/home/src/projects/projectB/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/projectA/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/projectB/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/projectA/index.ts ProjectRootPath: /home/src/projects/projectA
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/projectA/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/projectB/index.ts ProjectRootPath: /home/src/projects/projectB
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/projectB/tsconfig.json
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

FsWatches::
/home/src/projects/projectA/tsconfig.json:
  {}
/home/src/projects/projectB/tsconfig.json: *new*
  {}
/home/src/projects/shared/utils.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {}

Projects::
/home/src/projects/projectA/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/projects/projectB/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/projectA/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/projectA/tsconfig.json *default*
/home/src/projects/projectB/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/projectB/tsconfig.json *default*
/home/src/projects/shared/utils.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/projects/projectA/tsconfig.json
        /home/src/projects/projectB/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/projects/projectA/tsconfig.json
        /home/src/projects/projectB/tsconfig.json *new*

DocumentRegistry::
  Key:: undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined|undefined
    /home/src/projects/projecta/index.ts: TS 1
    /home/src/projects/shared/utils.d.ts: TS 2
    /home/src/tslibs/ts/lib/lib.es2025.full.d.ts: TS 2
    /home/src/projects/projectb/index.ts: TS 1