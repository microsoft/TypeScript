Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/node_modules/@angular/forms/forms.d.ts]
export declare class PatternValidator {}

//// [/user/username/projects/project/node_modules/@angular/forms/package.json]
{ "name": "@angular/forms", "typings": "./forms.d.ts" }

//// [/user/username/projects/project/tsconfig.json]
{ "references": [{ "path": "packages/a" }, { "path": "packages/b" }] }

//// [/user/username/projects/project/package.json]
{ "private": true }

//// [/user/username/projects/project/packages/a/package.json]
{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }

//// [/user/username/projects/project/packages/a/tsconfig.json]
{ "compilerOptions": { "composite": true }, "references": [{ "path": "../b" }] }

//// [/user/username/projects/project/packages/a/index.ts]
import { B } from '../b';

//// [/user/username/projects/project/packages/b/package.json]
{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }

//// [/user/username/projects/project/packages/b/tsconfig.json]
{ "compilerOptions": { "composite": true } }

//// [/user/username/projects/project/packages/b/index.ts]
export class B {}

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
      "command": "configure",
      "arguments": {
        "preferences": {
          "includePackageJsonAutoImports": "auto",
          "includeCompletionsForModuleExports": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/packages/b/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/packages/b/index.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/project/packages/b/tsconfig.json, currentDirectory: /user/username/projects/project/packages/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/b/tsconfig.json 2000 undefined Project: /user/username/projects/project/packages/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/packages/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/packages/b/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/project/packages/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/packages/b/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/project/packages/b/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/b 1 undefined Config: /user/username/projects/project/packages/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/b 1 undefined Config: /user/username/projects/project/packages/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/b/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/b/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/packages/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/packages/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/packages/b/index.ts SVC-1-0 "export class B {}"


	../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/b/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Creating AutoImportProviderProject: /dev/null/autoImportProviderProject1*, currentDirectory: /user/username/projects/project/packages/b
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@angular/forms/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/user/username/projects/project/node_modules/@angular/forms/forms.d.ts Text-1 "export declare class PatternValidator {}"


	../../node_modules/@angular/forms/forms.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/packages/b/tsconfig.json"
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
          "projectId": "a4642606d20f8f2038155f50e43a67f9a11a8c31c71eae4610f9bcd441db2bc7",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 17,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true
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
        "triggerFile": "/user/username/projects/project/packages/b/index.ts",
        "configFile": "/user/username/projects/project/packages/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/packages/b/tsconfig.json ProjectRootPath: undefined:: Result: /user/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/project/tsconfig.json, currentDirectory: /user/username/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined Project: /user/username/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/packages/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/packages/b/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/packages/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/packages/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project/node_modules/@angular/forms/package.json: *new*
  {}
/user/username/projects/project/package.json: *new*
  {}
/user/username/projects/project/packages/b/package.json: *new*
  {}
/user/username/projects/project/packages/b/tsconfig.json: *new*
  {}
/user/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/project/node_modules: *new*
  {}
/user/username/projects/project/packages/b: *new*
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/user/username/projects/project/packages/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
/user/username/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
    initialLoadPending: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/packages/b/tsconfig.json
/user/username/projects/project/node_modules/@angular/forms/forms.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/user/username/projects/project/packages/b/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/packages/b/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/project/packages/b/index.ts",
        "line": 1,
        "offset": 13
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/project/packages/b/index.ts position 12 in project /user/username/projects/project/packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/tsconfig.json",
        "reason": "Creating project possibly referencing default composite project /user/username/projects/project/packages/b/tsconfig.json of open file /user/username/projects/project/packages/b/index.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/packages/a/index.ts",
  "/user/username/projects/project/packages/b/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/project/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/project/packages/a",
   "originalPath": "packages/a"
  },
  {
   "path": "/user/username/projects/project/packages/b",
   "originalPath": "packages/b"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project 1 undefined Config: /user/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project 1 undefined Config: /user/username/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/a/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/packages/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/packages/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/project/packages/a/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/project/packages/b",
   "originalPath": "../b"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/a/tsconfig.json 2000 undefined Project: /user/username/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/a 1 undefined Config: /user/username/projects/project/packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/a 1 undefined Config: /user/username/projects/project/packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages 1 undefined Project: /user/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages 1 undefined Project: /user/username/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/b/package.json 2000 undefined Project: /user/username/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/packages/b/index.ts SVC-1-0 "export class B {}"
	/user/username/projects/project/packages/a/index.ts Text-1 "import { B } from '../b';"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	packages/b/index.ts
	  Imported via '../b' from file 'packages/a/index.ts'
	  Matched by default include pattern '**/*'
	packages/a/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/tsconfig.json"
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
          "projectId": "ff5803d884ff4e4485901596e00c181622d4efba4fec19a41fe48adf94ccdf94",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 42,
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
        "triggerFile": "/user/username/projects/project/tsconfig.json",
        "configFile": "/user/username/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/project/packages/a/tsconfig.json, currentDirectory: /user/username/projects/project/packages/a
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/packages/a/tsconfig.json",
        "reason": "Creating project referenced by : /user/username/projects/project/tsconfig.json as it references project /user/username/projects/project/packages/b/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages 0 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages 0 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/b/package.json 2000 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/a/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/a/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/packages/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/packages/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/packages/a/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/packages/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/packages/b/index.ts SVC-1-0 "export class B {}"
	/user/username/projects/project/packages/a/index.ts Text-1 "import { B } from '../b';"


	../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../b/index.ts
	  Imported via '../b' from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/packages/a/tsconfig.json"
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
          "projectId": "51edaa4a722768cff59606d510fd893d7ec4e07c06070778194fd191ff12d9bd",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 42,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true
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
        "triggerFile": "/user/username/projects/project/packages/a/tsconfig.json",
        "configFile": "/user/username/projects/project/packages/a/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/project/packages/b/index.ts position 13 in project /user/username/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/packages/a/index.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/packages/a/index.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/project/packages/b/index.ts position 13 in project /user/username/projects/project/packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/project/packages/b/index.ts",
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
              "offset": 18
            },
            "lineText": "export class B {}",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/user/username/projects/project/packages/a/index.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 11
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 26
            },
            "lineText": "import { B } from '../b';",
            "isWriteAccess": true,
            "isDefinition": false
          }
        ],
        "symbolName": "class",
        "symbolStartOffset": 8,
        "symbolDisplayString": "class B"
      },
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/packages/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/packages/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/packages/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/project/node_modules/@angular/forms/package.json:
  {}
/user/username/projects/project/package.json:
  {}
/user/username/projects/project/packages: *new*
  {}
/user/username/projects/project/packages/a/index.ts: *new*
  {}
/user/username/projects/project/packages/a/tsconfig.json: *new*
  {}
/user/username/projects/project/packages/b/package.json:
  {}
/user/username/projects/project/packages/b/tsconfig.json:
  {}
/user/username/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/project: *new*
  {}
/user/username/projects/project/node_modules:
  {}
/user/username/projects/project/packages: *new*
  {}
/user/username/projects/project/packages/a: *new*
  {}
/user/username/projects/project/packages/b:
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/user/username/projects/project/packages/a/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    originalConfiguredProjects: 3
        /user/username/projects/project/packages/b/tsconfig.json
        /user/username/projects/project/tsconfig.json
        /user/username/projects/project/packages/a/tsconfig.json
/user/username/projects/project/packages/b/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
/user/username/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    dirty: false *changed*
    initialLoadPending: false *changed*
    originalConfiguredProjects: 3 *changed*
        /user/username/projects/project/packages/b/tsconfig.json *new*
        /user/username/projects/project/tsconfig.json *new*
        /user/username/projects/project/packages/a/tsconfig.json *new*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /user/username/projects/project/packages/b/tsconfig.json
        /user/username/projects/project/tsconfig.json *new*
        /user/username/projects/project/packages/a/tsconfig.json *new*
/user/username/projects/project/node_modules/@angular/forms/forms.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/user/username/projects/project/packages/a/index.ts *new*
    version: Text-1
    containingProjects: 2
        /user/username/projects/project/tsconfig.json
        /user/username/projects/project/packages/a/tsconfig.json
/user/username/projects/project/packages/b/index.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 3 *changed*
        /user/username/projects/project/packages/b/tsconfig.json *default*
        /user/username/projects/project/tsconfig.json *new*
        /user/username/projects/project/packages/a/tsconfig.json *new*

After getAutoImportProvider
