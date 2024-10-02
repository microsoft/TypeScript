Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/workspaces/project/node_modules/moduleX/index.d.ts]
export const x = 10;

//// [/home/src/workspaces/project/common/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "traceResolution": true
  }
}

//// [/home/src/workspaces/project/common/moduleA.ts]
export const a = 10;

//// [/home/src/workspaces/project/common/moduleB.ts]
import { x } from "moduleX";
export const b = x;


//// [/home/src/workspaces/project/app/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "traceResolution": true
  },
  "references": [
    {
      "path": "../common"
    }
  ]
}

//// [/home/src/workspaces/project/app/appA.ts]
import { x } from "moduleX";
export const y = x;


//// [/home/src/workspaces/project/app/appB.ts]
import { b } from "../common/moduleB";
export const y = b;


//// [/home/src/workspaces/project/common/node_modules/@types/moduleZ/index.d.ts]
export const mz = 10;

//// [/home/src/workspaces/project/app/node_modules/@types/moduleZ/index.d.ts]
export const mz = 10;

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
        "file": "/home/src/workspaces/project/app/appB.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/app/appB.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/app/tsconfig.json, currentDirectory: /home/src/workspaces/project/app
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/app/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/app/appA.ts",
  "/home/src/workspaces/project/app/appB.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/app/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/common",
   "originalPath": "../common"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/app/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/app/appB.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app 1 undefined Config: /home/src/workspaces/project/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app 1 undefined Config: /home/src/workspaces/project/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/appA.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/common/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/common/moduleA.ts",
  "/home/src/workspaces/project/common/moduleB.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/common/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/common/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/common 1 undefined Config: /home/src/workspaces/project/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/common 1 undefined Config: /home/src/workspaces/project/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] ======== Resolving module 'moduleX' from '/home/src/workspaces/project/app/appA.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/node_modules/moduleX.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/node_modules/moduleX.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/node_modules/moduleX.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/node_modules/@types/moduleX.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/moduleX/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/moduleX.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/moduleX.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/moduleX.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/moduleX/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/moduleX/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/moduleX/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/moduleX/index.d.ts', result '/home/src/workspaces/project/node_modules/moduleX/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'moduleX' was successfully resolved to '/home/src/workspaces/project/node_modules/moduleX/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/node_modules 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/node_modules 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/moduleX/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] ======== Resolving module '../common/moduleB' from '/home/src/workspaces/project/app/appB.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/common/moduleB', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/common/moduleB.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name '../common/moduleB' was successfully resolved to '/home/src/workspaces/project/common/moduleB.ts'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/common/moduleB.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving module 'moduleX' from '/home/src/workspaces/project/common/moduleB.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/home/src/workspaces/project/common/tsconfig.json'.
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/common/node_modules/moduleX.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/common/node_modules/moduleX.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/common/node_modules/moduleX.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/common/node_modules/@types/moduleX.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Resolution for module 'moduleX' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'moduleX' was successfully resolved to '/home/src/workspaces/project/node_modules/moduleX/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/common/node_modules 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/common/node_modules 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'moduleZ', containing file '/home/src/workspaces/project/app/__inferred type names__.ts', root directory '/home/src/workspaces/project/app/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/app/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/node_modules/@types/moduleZ/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/node_modules/@types/moduleZ/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/app/node_modules/@types/moduleZ/index.d.ts', result '/home/src/workspaces/project/app/node_modules/@types/moduleZ/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'moduleZ' was successfully resolved to '/home/src/workspaces/project/app/node_modules/@types/moduleZ/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/node_modules/@types/moduleZ/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/node_modules/@types/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/app/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/moduleX/package.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/package.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/node_modules/@types/moduleZ/package.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/node_modules/@types/package.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/node_modules/package.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/package.json 2000 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/node_modules/@types 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/app/node_modules/@types 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/app/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/node_modules/moduleX/index.d.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/app/appA.ts Text-1 "import { x } from \"moduleX\";\nexport const y = x;\n"
	/home/src/workspaces/project/common/moduleB.ts Text-1 "import { x } from \"moduleX\";\nexport const b = x;\n"
	/home/src/workspaces/project/app/appB.ts SVC-1-0 "import { b } from \"../common/moduleB\";\nexport const y = b;\n"
	/home/src/workspaces/project/app/node_modules/@types/moduleZ/index.d.ts Text-1 "export const mz = 10;"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../node_modules/moduleX/index.d.ts
	  Imported via "moduleX" from file 'appA.ts'
	  Imported via "moduleX" from file '../common/moduleB.ts'
	appA.ts
	  Matched by default include pattern '**/*'
	../common/moduleB.ts
	  Imported via "../common/moduleB" from file 'appB.ts'
	appB.ts
	  Matched by default include pattern '**/*'
	node_modules/@types/moduleZ/index.d.ts
	  Entry point for implicit type library 'moduleZ'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/app/tsconfig.json"
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
          "projectId": "b51d2878b7b4b650f577248eb1f0760105190fe9e955df563099203f200d0cc1",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 157,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 3,
            "dtsSize": 454,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "traceResolution": true
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
        "triggerFile": "/home/src/workspaces/project/app/appB.ts",
        "configFile": "/home/src/workspaces/project/app/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/app/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/app/appB.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/app/tsconfig.json
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
/home/src/workspaces/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/app/node_modules/@types/moduleZ/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/app/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/app/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/app/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/moduleX/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspaces/project/app/appA.ts: *new*
  {}
/home/src/workspaces/project/app/tsconfig.json: *new*
  {}
/home/src/workspaces/project/common/moduleB.ts: *new*
  {}
/home/src/workspaces/project/common/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspaces/project/app: *new*
  {}
/home/src/workspaces/project/app/node_modules: *new*
  {}
/home/src/workspaces/project/app/node_modules/@types: *new*
  {}
/home/src/workspaces/project/common: *new*
  {}
/home/src/workspaces/project/common/node_modules: *new*
  {}
/home/src/workspaces/project/node_modules: *new*
  {}

Projects::
/home/src/workspaces/project/app/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/app/tsconfig.json
/home/src/workspaces/project/app/appA.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/app/tsconfig.json
/home/src/workspaces/project/app/appB.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/app/tsconfig.json *default*
/home/src/workspaces/project/app/node_modules/@types/moduleZ/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/app/tsconfig.json
/home/src/workspaces/project/common/moduleB.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/app/tsconfig.json
/home/src/workspaces/project/node_modules/moduleX/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/app/tsconfig.json
