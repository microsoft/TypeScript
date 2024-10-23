Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts]
export const getAllUserBookings = async () => {};

//// [/users/username/cal.com/packages/lib/package.json]
{
  "name": "@calcom/lib",
  "version": "0.0.0"
}

//// [/users/username/cal.com/packages/lib/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}

//// [/users/username/cal.com/packages/types/PaymentService.d.ts]


//// [/users/username/cal.com/packages/types/VideoApiAdapter.d.ts]
import {} from "@calcom/lib/bookings/getAllUserBookings";

//// [/users/username/cal.com/packages/types/package.json]
{
  "name": "@calcom/types"
}

//// [/users/username/cal.com/packages/types/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}

//// [/users/username/cal.com/packages/ui/index.tsx]
import type {} from "@calcom/platform-libraries";

//// [/users/username/cal.com/packages/ui/package.json]
{
  "name": "@calcom/ui"
}

//// [/users/username/cal.com/packages/ui/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "node"
  },
  "include": [
    "../types/*.d.ts",
    "**/*.tsx"
  ]
}

//// [/users/username/cal.com/node_modules/@calcom/lib] symlink(/users/username/cal.com/packages/lib)

//// [/users/username/cal.com/node_modules/@calcom/types] symlink(/users/username/cal.com/packages/types)

//// [/users/username/cal.com/node_modules/@calcom/ui] symlink(/users/username/cal.com/packages/ui)

//// [/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/index.d.ts]
export { getAllUserBookings } from '../../lib/bookings/getAllUserBookings';

//// [/users/username/cal.com/node_modules/@calcom/platform-libraries/package.json]
{
  "name": "@calcom/platform-libraries",
  "types": "./dist/index.d.ts"
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
        "file": "/users/username/cal.com/packages/ui/index.tsx"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/username/cal.com/packages/ui/index.tsx ProjectRootPath: undefined:: Result: /users/username/cal.com/packages/ui/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /users/username/cal.com/packages/ui/tsconfig.json, currentDirectory: /users/username/cal.com/packages/ui
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui/tsconfig.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /users/username/cal.com/packages/ui/tsconfig.json : {
 "rootNames": [
  "/users/username/cal.com/packages/types/PaymentService.d.ts",
  "/users/username/cal.com/packages/types/VideoApiAdapter.d.ts",
  "/users/username/cal.com/packages/ui/index.tsx"
 ],
 "options": {
  "moduleResolution": 2,
  "configFilePath": "/users/username/cal.com/packages/ui/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/cal.com/packages/ui/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/cal.com/packages/ui/index.tsx to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types 0 undefined Config: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types 0 undefined Config: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui 1 undefined Config: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui 1 undefined Config: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/PaymentService.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/VideoApiAdapter.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/cal.com/packages/ui/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/lib/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@calcom/lib 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@calcom/lib 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@calcom/platform-libraries/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/lib/bookings/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@calcom/platform-libraries/dist/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/cal.com/packages/ui/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/cal.com/packages/ui/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/cal.com/packages/types/PaymentService.d.ts Text-1 ""
	/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts Text-1 "export const getAllUserBookings = async () => {};"
	/users/username/cal.com/packages/types/VideoApiAdapter.d.ts Text-1 "import {} from \"@calcom/lib/bookings/getAllUserBookings\";"
	/users/username/cal.com/node_modules/@calcom/lib/bookings/getAllUserBookings.ts Text-1 "export const getAllUserBookings = async () => {};"
	/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/index.d.ts Text-1 "export { getAllUserBookings } from '../../lib/bookings/getAllUserBookings';"
	/users/username/cal.com/packages/ui/index.tsx SVC-1-0 "import type {} from \"@calcom/platform-libraries\";"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../types/PaymentService.d.ts
	  Matched by include pattern '../types/*.d.ts' in 'tsconfig.json'
	../lib/bookings/getAllUserBookings.ts
	  Imported via "@calcom/lib/bookings/getAllUserBookings" from file '../types/VideoApiAdapter.d.ts' with packageId '@calcom/lib/bookings/getAllUserBookings.ts@0.0.0'
	../types/VideoApiAdapter.d.ts
	  Matched by include pattern '../types/*.d.ts' in 'tsconfig.json'
	../../node_modules/@calcom/lib/bookings/getAllUserBookings.ts
	  Imported via '../../lib/bookings/getAllUserBookings' from file '../../node_modules/@calcom/platform-libraries/dist/index.d.ts' with packageId '@calcom/lib/bookings/getAllUserBookings.ts@0.0.0'
	  File redirects to file '../lib/bookings/getAllUserBookings.ts'
	  File is CommonJS module because '../../node_modules/@calcom/lib/package.json' does not have field "type"
	../../node_modules/@calcom/platform-libraries/dist/index.d.ts
	  Imported via "@calcom/platform-libraries" from file 'index.tsx'
	  File is CommonJS module because '../../node_modules/@calcom/platform-libraries/package.json' does not have field "type"
	index.tsx
	  Matched by include pattern '**/*.tsx' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/cal.com/packages/ui/tsconfig.json"
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
          "projectId": "d72474b4a671326ec4d5b2b10a78e24597216fc0b887f220b886b1e072f34e87",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 98,
            "tsx": 1,
            "tsxSize": 49,
            "dts": 4,
            "dtsSize": 545,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "moduleResolution": "node10"
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
        "triggerFile": "/users/username/cal.com/packages/ui/index.tsx",
        "configFile": "/users/username/cal.com/packages/ui/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/users/username/cal.com/packages/ui/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/cal.com/packages/ui/index.tsx ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/cal.com/packages/ui/tsconfig.json
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
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}
/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/package.json: *new*
  {"pollingInterval":2000}
/users/username/cal.com/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/cal.com/packages/lib/bookings/package.json: *new*
  {"pollingInterval":2000}
/users/username/cal.com/packages/node_modules: *new*
  {"pollingInterval":500}
/users/username/cal.com/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/cal.com/packages/types/node_modules: *new*
  {"pollingInterval":500}
/users/username/cal.com/packages/ui/node_modules: *new*
  {"pollingInterval":500}
/users/username/cal.com/packages/ui/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/cal.com/node_modules/@calcom/platform-libraries/package.json: *new*
  {}
/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts: *new*
  {}
/users/username/cal.com/packages/lib/package.json: *new*
  {}
/users/username/cal.com/packages/types: *new*
  {}
/users/username/cal.com/packages/types/PaymentService.d.ts: *new*
  {}
/users/username/cal.com/packages/types/VideoApiAdapter.d.ts: *new*
  {}
/users/username/cal.com/packages/types/package.json: *new*
  {}
/users/username/cal.com/packages/ui/package.json: *new*
  {}
/users/username/cal.com/packages/ui/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/cal.com/node_modules: *new*
  {}
/users/username/cal.com/node_modules/@calcom/lib: *new*
  {}
/users/username/cal.com/packages/ui: *new*
  {}

Projects::
/users/username/cal.com/packages/ui/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/node_modules/@calcom/lib/bookings/getAllUserBookings.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/packages/types/PaymentService.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/packages/types/VideoApiAdapter.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/packages/ui/index.tsx (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/cal.com/packages/types/VideoApiAdapter.d.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/types/VideoApiAdapter.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/username/cal.com/packages/types/VideoApiAdapter.d.ts ProjectRootPath: undefined:: Result: /users/username/cal.com/packages/types/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /users/username/cal.com/packages/types/tsconfig.json, currentDirectory: /users/username/cal.com/packages/types
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/tsconfig.json 2000 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /users/username/cal.com/packages/types/tsconfig.json : {
 "rootNames": [
  "/users/username/cal.com/packages/types/PaymentService.d.ts",
  "/users/username/cal.com/packages/types/VideoApiAdapter.d.ts"
 ],
 "options": {
  "moduleResolution": 2,
  "configFilePath": "/users/username/cal.com/packages/types/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/cal.com/packages/types/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/cal.com/packages/types/VideoApiAdapter.d.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types 1 undefined Config: /users/username/cal.com/packages/types/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types 1 undefined Config: /users/username/cal.com/packages/types/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/cal.com/packages/types/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/node_modules 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/node_modules 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/node_modules 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/node_modules 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@calcom/lib 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@calcom/lib 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/lib/package.json 2000 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/package.json 2000 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/lib/bookings/package.json 2000 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/cal.com/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/types/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/cal.com/packages/types/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/cal.com/packages/types/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/username/cal.com/packages/types/PaymentService.d.ts Text-1 ""
	/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts Text-1 "export const getAllUserBookings = async () => {};"
	/users/username/cal.com/packages/types/VideoApiAdapter.d.ts Text-1 "import {} from \"@calcom/lib/bookings/getAllUserBookings\";"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	PaymentService.d.ts
	  Matched by default include pattern '**/*'
	../lib/bookings/getAllUserBookings.ts
	  Imported via "@calcom/lib/bookings/getAllUserBookings" from file 'VideoApiAdapter.d.ts' with packageId '@calcom/lib/bookings/getAllUserBookings.ts@0.0.0'
	VideoApiAdapter.d.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/types/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/cal.com/packages/types/tsconfig.json"
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
          "projectId": "b116f41d9f1d024b6b55c0fdb616427faee00dd6053509af53c744d918074c64",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 49,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 3,
            "dtsSize": 470,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "moduleResolution": "node10"
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
        "triggerFile": "/users/username/cal.com/packages/types/VideoApiAdapter.d.ts",
        "configFile": "/users/username/cal.com/packages/types/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/users/username/cal.com/packages/ui/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/users/username/cal.com/packages/types/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/cal.com/packages/ui/index.tsx ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/cal.com/packages/ui/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/cal.com/packages/types/VideoApiAdapter.d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/cal.com/packages/ui/tsconfig.json,/users/username/cal.com/packages/types/tsconfig.json
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
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/package.json:
  {"pollingInterval":2000}
/users/username/cal.com/node_modules/@types:
  {"pollingInterval":500}
/users/username/cal.com/packages/lib/bookings/package.json:
  {"pollingInterval":2000}
/users/username/cal.com/packages/node_modules:
  {"pollingInterval":500}
/users/username/cal.com/packages/node_modules/@types:
  {"pollingInterval":500}
/users/username/cal.com/packages/types/node_modules:
  {"pollingInterval":500}
/users/username/cal.com/packages/types/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/cal.com/packages/ui/node_modules:
  {"pollingInterval":500}
/users/username/cal.com/packages/ui/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/cal.com/node_modules/@calcom/platform-libraries/package.json:
  {}
/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts:
  {}
/users/username/cal.com/packages/lib/package.json:
  {}
/users/username/cal.com/packages/types:
  {}
/users/username/cal.com/packages/types/PaymentService.d.ts:
  {}
/users/username/cal.com/packages/types/package.json:
  {}
/users/username/cal.com/packages/types/tsconfig.json: *new*
  {}
/users/username/cal.com/packages/ui/package.json:
  {}
/users/username/cal.com/packages/ui/tsconfig.json:
  {}

FsWatches *deleted*::
/users/username/cal.com/packages/types/VideoApiAdapter.d.ts:
  {}

FsWatchesRecursive::
/users/username/cal.com/node_modules:
  {}
/users/username/cal.com/node_modules/@calcom/lib:
  {}
/users/username/cal.com/packages/types: *new*
  {}
/users/username/cal.com/packages/ui:
  {}

Projects::
/users/username/cal.com/packages/types/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/users/username/cal.com/packages/ui/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /users/username/cal.com/packages/ui/tsconfig.json
        /users/username/cal.com/packages/types/tsconfig.json *new*
/users/username/cal.com/node_modules/@calcom/lib/bookings/getAllUserBookings.ts
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/index.d.ts
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /users/username/cal.com/packages/ui/tsconfig.json
        /users/username/cal.com/packages/types/tsconfig.json *new*
/users/username/cal.com/packages/types/PaymentService.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /users/username/cal.com/packages/ui/tsconfig.json
        /users/username/cal.com/packages/types/tsconfig.json *new*
/users/username/cal.com/packages/types/VideoApiAdapter.d.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /users/username/cal.com/packages/ui/tsconfig.json
        /users/username/cal.com/packages/types/tsconfig.json *default* *new*
/users/username/cal.com/packages/ui/index.tsx (Open)
    version: SVC-1-0
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/users/username/cal.com/packages/ui/index.tsx"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/cal.com/packages/ui/index.tsx 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/users/username/cal.com/packages/ui/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/users/username/cal.com/packages/types/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/cal.com/packages/types/VideoApiAdapter.d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/cal.com/packages/ui/tsconfig.json,/users/username/cal.com/packages/types/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 3,
      "success": true
    }
After request

PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/package.json:
  {"pollingInterval":2000}
/users/username/cal.com/node_modules/@types:
  {"pollingInterval":500}
/users/username/cal.com/packages/lib/bookings/package.json:
  {"pollingInterval":2000}
/users/username/cal.com/packages/node_modules:
  {"pollingInterval":500}
/users/username/cal.com/packages/node_modules/@types:
  {"pollingInterval":500}
/users/username/cal.com/packages/types/node_modules:
  {"pollingInterval":500}
/users/username/cal.com/packages/types/node_modules/@types:
  {"pollingInterval":500}
/users/username/cal.com/packages/ui/node_modules:
  {"pollingInterval":500}
/users/username/cal.com/packages/ui/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/cal.com/node_modules/@calcom/platform-libraries/package.json:
  {}
/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts:
  {}
/users/username/cal.com/packages/lib/package.json:
  {}
/users/username/cal.com/packages/types:
  {}
/users/username/cal.com/packages/types/PaymentService.d.ts:
  {}
/users/username/cal.com/packages/types/package.json:
  {}
/users/username/cal.com/packages/types/tsconfig.json:
  {}
/users/username/cal.com/packages/ui/index.tsx: *new*
  {}
/users/username/cal.com/packages/ui/package.json:
  {}
/users/username/cal.com/packages/ui/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/cal.com/node_modules:
  {}
/users/username/cal.com/node_modules/@calcom/lib:
  {}
/users/username/cal.com/packages/types:
  {}
/users/username/cal.com/packages/ui:
  {}

Projects::
/users/username/cal.com/packages/types/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/users/username/cal.com/packages/ui/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /users/username/cal.com/packages/ui/tsconfig.json
        /users/username/cal.com/packages/types/tsconfig.json
/users/username/cal.com/node_modules/@calcom/lib/bookings/getAllUserBookings.ts
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/index.d.ts
    version: Text-1
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json
/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts
    version: Text-1
    containingProjects: 2
        /users/username/cal.com/packages/ui/tsconfig.json
        /users/username/cal.com/packages/types/tsconfig.json
/users/username/cal.com/packages/types/PaymentService.d.ts
    version: Text-1
    containingProjects: 2
        /users/username/cal.com/packages/ui/tsconfig.json
        /users/username/cal.com/packages/types/tsconfig.json
/users/username/cal.com/packages/types/VideoApiAdapter.d.ts (Open)
    version: Text-1
    containingProjects: 2
        /users/username/cal.com/packages/ui/tsconfig.json
        /users/username/cal.com/packages/types/tsconfig.json *default*
/users/username/cal.com/packages/ui/index.tsx *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 1
        /users/username/cal.com/packages/ui/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/cal.com/packages/types/PaymentService.d.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/types/PaymentService.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/username/cal.com/packages/types/PaymentService.d.ts ProjectRootPath: undefined:: Result: /users/username/cal.com/packages/types/tsconfig.json
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/users/username/cal.com/packages/ui/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/users/username/cal.com/packages/types/PaymentService.d.ts
	/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts
	/users/username/cal.com/packages/types/VideoApiAdapter.d.ts
	/users/username/cal.com/node_modules/@calcom/lib/bookings/getAllUserBookings.ts
	/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/index.d.ts
	/users/username/cal.com/packages/ui/index.tsx


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../types/PaymentService.d.ts
	  Matched by include pattern '../types/*.d.ts' in 'tsconfig.json'
	../lib/bookings/getAllUserBookings.ts
	  Imported via "@calcom/lib/bookings/getAllUserBookings" from file '../types/VideoApiAdapter.d.ts' with packageId '@calcom/lib/bookings/getAllUserBookings.ts@0.0.0'
	../types/VideoApiAdapter.d.ts
	  Matched by include pattern '../types/*.d.ts' in 'tsconfig.json'
	../../node_modules/@calcom/lib/bookings/getAllUserBookings.ts
	  Imported via '../../lib/bookings/getAllUserBookings' from file '../../node_modules/@calcom/platform-libraries/dist/index.d.ts' with packageId '@calcom/lib/bookings/getAllUserBookings.ts@0.0.0'
	  File redirects to file '../lib/bookings/getAllUserBookings.ts'
	  File is CommonJS module because '../../node_modules/@calcom/lib/package.json' does not have field "type"
	../../node_modules/@calcom/platform-libraries/dist/index.d.ts
	  Imported via "@calcom/platform-libraries" from file 'index.tsx'
	  File is CommonJS module because '../../node_modules/@calcom/platform-libraries/package.json' does not have field "type"
	index.tsx
	  Matched by include pattern '**/*.tsx' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/types 0 undefined Config: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/types 0 undefined Config: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui 1 undefined Config: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui 1 undefined Config: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui/tsconfig.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/types/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/types/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules/@calcom/lib 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules/@calcom/lib 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/lib/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules/@calcom/platform-libraries/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/tslibs/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/types/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/lib/bookings/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules/@calcom/platform-libraries/dist/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui/package.json 2000 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules/@types 1 undefined Project: /users/username/cal.com/packages/ui/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /users/username/cal.com/packages/ui/index.tsx 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /users/username/cal.com/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Project '/users/username/cal.com/packages/types/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/cal.com/packages/types/VideoApiAdapter.d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/cal.com/packages/types/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/cal.com/packages/types/PaymentService.d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/cal.com/packages/types/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true
    }
After request

PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/users/username/cal.com/node_modules/@types:
  {"pollingInterval":500}
/users/username/cal.com/packages/lib/bookings/package.json:
  {"pollingInterval":2000}
/users/username/cal.com/packages/node_modules:
  {"pollingInterval":500}
/users/username/cal.com/packages/node_modules/@types:
  {"pollingInterval":500}
/users/username/cal.com/packages/types/node_modules:
  {"pollingInterval":500}
/users/username/cal.com/packages/types/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/package.json:
  {"pollingInterval":2000}
/users/username/cal.com/packages/ui/node_modules:
  {"pollingInterval":500}
/users/username/cal.com/packages/ui/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts:
  {}
/users/username/cal.com/packages/lib/package.json:
  {}
/users/username/cal.com/packages/types/package.json:
  {}
/users/username/cal.com/packages/types/tsconfig.json:
  {}

FsWatches *deleted*::
/users/username/cal.com/node_modules/@calcom/platform-libraries/package.json:
  {}
/users/username/cal.com/packages/types:
  {}
/users/username/cal.com/packages/types/PaymentService.d.ts:
  {}
/users/username/cal.com/packages/ui/index.tsx:
  {}
/users/username/cal.com/packages/ui/package.json:
  {}
/users/username/cal.com/packages/ui/tsconfig.json:
  {}

FsWatchesRecursive::
/users/username/cal.com/node_modules/@calcom/lib:
  {}
/users/username/cal.com/packages/types:
  {}

FsWatchesRecursive *deleted*::
/users/username/cal.com/node_modules:
  {}
/users/username/cal.com/packages/ui:
  {}

Projects::
/users/username/cal.com/packages/types/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/users/username/cal.com/packages/ui/tsconfig.json (Configured) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
    noOpenRef: true
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /users/username/cal.com/packages/types/tsconfig.json
        /users/username/cal.com/packages/ui/tsconfig.json *deleted*
/users/username/cal.com/node_modules/@calcom/lib/bookings/getAllUserBookings.ts *deleted*
    version: Text-1
    containingProjects: 0 *changed*
        /users/username/cal.com/packages/ui/tsconfig.json *deleted*
/users/username/cal.com/node_modules/@calcom/platform-libraries/dist/index.d.ts *deleted*
    version: Text-1
    containingProjects: 0 *changed*
        /users/username/cal.com/packages/ui/tsconfig.json *deleted*
/users/username/cal.com/packages/lib/bookings/getAllUserBookings.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /users/username/cal.com/packages/types/tsconfig.json
        /users/username/cal.com/packages/ui/tsconfig.json *deleted*
/users/username/cal.com/packages/types/PaymentService.d.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /users/username/cal.com/packages/types/tsconfig.json *default*
        /users/username/cal.com/packages/ui/tsconfig.json *deleted*
/users/username/cal.com/packages/types/VideoApiAdapter.d.ts (Open) *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /users/username/cal.com/packages/types/tsconfig.json *default*
        /users/username/cal.com/packages/ui/tsconfig.json *deleted*
/users/username/cal.com/packages/ui/index.tsx *deleted*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /users/username/cal.com/packages/ui/tsconfig.json *deleted*
