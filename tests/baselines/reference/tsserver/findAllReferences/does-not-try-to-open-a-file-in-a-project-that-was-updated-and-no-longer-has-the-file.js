Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/packages/babel-loader/tsconfig.json]

{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "composite": true,
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"],
    "references": [{"path": "../core"}]
}


//// [/home/src/projects/project/packages/babel-loader/src/index.ts]

import type { Foo } from "../../core/src/index.js";


//// [/home/src/projects/project/packages/core/tsconfig.json]

{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "composite": true,
        "rootDir": "./src",
        "outDir": "./dist",
    },
    "include": ["./src"]
}


//// [/home/src/projects/project/packages/core/src/index.ts]

import { Bar } from "./loading-indicator.js";
export type Foo = {};
const bar: Bar = {
    prop: 0
}


//// [/home/src/projects/project/packages/core/src/loading-indicator.ts]

export interface Bar {
    prop: number;
}
const bar: Bar = {
    prop: 1
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
            "file": "/home/src/projects/project/packages/babel-loader/src/index.ts",
            "fileContent": "\nimport type { Foo } from \"../../core/src/index.js\";\n"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/packages/babel-loader/src/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/packages/babel-loader/tsconfig.json, currentDirectory: /home/src/projects/project/packages/babel-loader
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/tsconfig.json 2000 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/packages/babel-loader/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/packages/babel-loader/src/index.ts"
 ],
 "options": {
  "target": 5,
  "module": 1,
  "strict": true,
  "esModuleInterop": true,
  "composite": true,
  "rootDir": "/home/src/projects/project/packages/babel-loader/src",
  "outDir": "/home/src/projects/project/packages/babel-loader/dist",
  "configFilePath": "/home/src/projects/project/packages/babel-loader/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/projects/project/packages/core",
   "originalPath": "../core"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/packages/babel-loader/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/packages/babel-loader/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/src 1 undefined Config: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/src 1 undefined Config: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/packages/core/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/packages/core/src/index.ts",
  "/home/src/projects/project/packages/core/src/loading-indicator.ts"
 ],
 "options": {
  "target": 5,
  "module": 1,
  "strict": true,
  "esModuleInterop": true,
  "composite": true,
  "rootDir": "/home/src/projects/project/packages/core/src",
  "outDir": "/home/src/projects/project/packages/core/dist",
  "configFilePath": "/home/src/projects/project/packages/core/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/core/tsconfig.json 2000 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/core/src 1 undefined Config: /home/src/projects/project/packages/core/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/core/src 1 undefined Config: /home/src/projects/project/packages/core/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/core/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/core/src/loading-indicator.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2018.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/babel-loader/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/core/src/loading-indicator.ts Text-1 "\nexport interface Bar {\n    prop: number;\n}\nconst bar: Bar = {\n    prop: 1\n}\n"
	/home/src/projects/project/packages/core/src/index.ts Text-1 "\nimport { Bar } from \"./loading-indicator.js\";\nexport type Foo = {};\nconst bar: Bar = {\n    prop: 0\n}\n"
	/home/src/projects/project/packages/babel-loader/src/index.ts SVC-1-0 "\nimport type { Foo } from \"../../core/src/index.js\";\n"


	../../../../tslibs/TS/Lib/lib.es2018.full.d.ts
	  Default library for target 'es2018'
	../core/src/loading-indicator.ts
	  Imported via "./loading-indicator.js" from file '../core/src/index.ts'
	../core/src/index.ts
	  Imported via "../../core/src/index.js" from file 'src/index.ts'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/packages/babel-loader/tsconfig.json"
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
          "projectId": "0b2579a5dab38b62470159ea898b5b78e12c94ce69ffdc2d5564aaae36c1bec8",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 232,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "target": "es2018",
            "module": "commonjs",
            "strict": true,
            "esModuleInterop": true,
            "composite": true,
            "rootDir": "",
            "outDir": ""
          },
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
        "triggerFile": "/home/src/projects/project/packages/babel-loader/src/index.ts",
        "configFile": "/home/src/projects/project/packages/babel-loader/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/packages/babel-loader/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/babel-loader/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request
//// [/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts] *Lib*


PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/babel-loader/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/babel-loader/tsconfig.json: *new*
  {}
/home/src/projects/project/packages/core/src/index.ts: *new*
  {}
/home/src/projects/project/packages/core/src/loading-indicator.ts: *new*
  {}
/home/src/projects/project/packages/core/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/packages/babel-loader/src: *new*
  {}
/home/src/projects/project/packages/core/src: *new*
  {}

Projects::
/home/src/projects/project/packages/babel-loader/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/packages/babel-loader/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/babel-loader/tsconfig.json *default*
/home/src/projects/project/packages/core/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/babel-loader/tsconfig.json
/home/src/projects/project/packages/core/src/loading-indicator.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/babel-loader/tsconfig.json
/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/babel-loader/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "openFiles": [
          {
            "file": "/home/src/projects/project/packages/core/src/index.ts",
            "fileContent": "\nimport { Bar } from \"./loading-indicator.js\";\nexport type Foo = {};\nconst bar: Bar = {\n    prop: 0\n}\n"
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/packages/core/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/packages/core/src/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/packages/core/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/packages/core/tsconfig.json, currentDirectory: /home/src/projects/project/packages/core
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/packages/core/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/packages/core/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/core/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/core/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/core/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/core/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/core/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/core/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/core/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/core/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/core/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/core/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/core/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/core/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/core/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/core/src/loading-indicator.ts Text-1 "\nexport interface Bar {\n    prop: number;\n}\nconst bar: Bar = {\n    prop: 1\n}\n"
	/home/src/projects/project/packages/core/src/index.ts Text-1 "\nimport { Bar } from \"./loading-indicator.js\";\nexport type Foo = {};\nconst bar: Bar = {\n    prop: 0\n}\n"


	../../../../tslibs/TS/Lib/lib.es2018.full.d.ts
	  Default library for target 'es2018'
	src/loading-indicator.ts
	  Imported via "./loading-indicator.js" from file 'src/index.ts'
	  Matched by include pattern './src' in 'tsconfig.json'
	src/index.ts
	  Matched by include pattern './src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/packages/core/tsconfig.json"
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
          "projectId": "e6f0bd161f6c734a19239e904454c3d928d93fb78327d3564d9989c64261f0a3",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 179,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "target": "es2018",
            "module": "commonjs",
            "strict": true,
            "esModuleInterop": true,
            "composite": true,
            "rootDir": "",
            "outDir": ""
          },
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
        "triggerFile": "/home/src/projects/project/packages/core/src/index.ts",
        "configFile": "/home/src/projects/project/packages/core/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/packages/core/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/core/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/babel-loader/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/core/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/babel-loader/tsconfig.json,/home/src/projects/project/packages/core/tsconfig.json
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
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/babel-loader/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/core/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/babel-loader/tsconfig.json:
  {}
/home/src/projects/project/packages/core/src/loading-indicator.ts:
  {}
/home/src/projects/project/packages/core/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project/packages/core/src/index.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/packages/babel-loader/src:
  {}
/home/src/projects/project/packages/core/src:
  {}

Projects::
/home/src/projects/project/packages/babel-loader/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/projects/project/packages/core/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/packages/babel-loader/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/babel-loader/tsconfig.json *default*
/home/src/projects/project/packages/core/src/index.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/projects/project/packages/babel-loader/tsconfig.json
        /home/src/projects/project/packages/core/tsconfig.json *default* *new*
/home/src/projects/project/packages/core/src/loading-indicator.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/projects/project/packages/babel-loader/tsconfig.json
        /home/src/projects/project/packages/core/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/projects/project/packages/babel-loader/tsconfig.json
        /home/src/projects/project/packages/core/tsconfig.json *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/home/src/projects/project/packages/babel-loader/src/index.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 26
                },
                "end": {
                  "line": 1,
                  "offset": 26
                },
                "newText": "// comment"
              }
            ]
          }
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/home/src/projects/project/packages/babel-loader/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false
/home/src/projects/project/packages/core/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/packages/babel-loader/src/index.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /home/src/projects/project/packages/babel-loader/tsconfig.json *default*
/home/src/projects/project/packages/core/src/index.ts (Open)
    version: Text-1
    containingProjects: 2
        /home/src/projects/project/packages/babel-loader/tsconfig.json
        /home/src/projects/project/packages/core/tsconfig.json *default*
/home/src/projects/project/packages/core/src/loading-indicator.ts
    version: Text-1
    containingProjects: 2
        /home/src/projects/project/packages/babel-loader/tsconfig.json
        /home/src/projects/project/packages/core/tsconfig.json
/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/projects/project/packages/babel-loader/tsconfig.json
        /home/src/projects/project/packages/core/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references",
      "arguments": {
        "file": "/home/src/projects/project/packages/core/src/index.ts",
        "line": 5,
        "offset": 5
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/projects/project/packages/core/src/index.ts position 92 in project /home/src/projects/project/packages/core/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/babel-loader/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/babel-loader/src/index.ts SVC-1-1 "\nimport type { Foo } from// comment \"../../core/src/index.js\";\n"


	../../../../tslibs/TS/Lib/lib.es2018.full.d.ts
	  Default library for target 'es2018'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/core/dist/loading-indicator.d.ts 2000 undefined Project: /home/src/projects/project/packages/core/tsconfig.json WatchType: Missing generated file
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "refs": [
          {
            "file": "/home/src/projects/project/packages/core/src/loading-indicator.ts",
            "start": {
              "line": 3,
              "offset": 5
            },
            "end": {
              "line": 3,
              "offset": 9
            },
            "contextStart": {
              "line": 3,
              "offset": 5
            },
            "contextEnd": {
              "line": 3,
              "offset": 18
            },
            "lineText": "    prop: number;",
            "isWriteAccess": false,
            "isDefinition": false
          },
          {
            "file": "/home/src/projects/project/packages/core/src/loading-indicator.ts",
            "start": {
              "line": 6,
              "offset": 5
            },
            "end": {
              "line": 6,
              "offset": 9
            },
            "contextStart": {
              "line": 6,
              "offset": 5
            },
            "contextEnd": {
              "line": 6,
              "offset": 12
            },
            "lineText": "    prop: 1",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/home/src/projects/project/packages/core/src/index.ts",
            "start": {
              "line": 5,
              "offset": 5
            },
            "end": {
              "line": 5,
              "offset": 9
            },
            "contextStart": {
              "line": 5,
              "offset": 5
            },
            "contextEnd": {
              "line": 5,
              "offset": 12
            },
            "lineText": "    prop: 0",
            "isWriteAccess": true,
            "isDefinition": true
          }
        ],
        "symbolName": "prop",
        "symbolStartOffset": 5,
        "symbolDisplayString": "(property) Bar.prop: number"
      },
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/babel-loader/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/core/dist/loading-indicator.d.ts: *new*
  {"pollingInterval":2000}
/home/src/projects/project/packages/core/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/babel-loader/tsconfig.json:
  {}
/home/src/projects/project/packages/core/src/loading-indicator.ts:
  {}
/home/src/projects/project/packages/core/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project/packages/babel-loader/src:
  {}
/home/src/projects/project/packages/core/src:
  {}

Projects::
/home/src/projects/project/packages/babel-loader/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*
/home/src/projects/project/packages/core/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /home/src/projects/project/packages/core/dist/loading-indicator.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/packages/babel-loader/src/index.ts (Open)
    version: SVC-1-1
    containingProjects: 1
        /home/src/projects/project/packages/babel-loader/tsconfig.json *default*
/home/src/projects/project/packages/core/src/index.ts (Open) *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/projects/project/packages/core/tsconfig.json *default*
        /home/src/projects/project/packages/babel-loader/tsconfig.json *deleted*
/home/src/projects/project/packages/core/src/loading-indicator.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/projects/project/packages/core/tsconfig.json
        /home/src/projects/project/packages/babel-loader/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.es2018.full.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/projects/project/packages/babel-loader/tsconfig.json
        /home/src/projects/project/packages/core/tsconfig.json
