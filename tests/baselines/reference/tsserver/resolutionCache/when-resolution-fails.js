Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/src/typings/electron.d.ts]

declare module 'original-fs' {
    import * as fs from 'fs';
    export = fs;
}

//// [/user/username/projects/myproject/src/somefolder/srcfile.ts]

import { x } from "somefolder/module1";
import { x } from "somefolder/module2";
const y = x;

//// [/user/username/projects/myproject/src/somefolder/module1.ts]

export const x = 10;

//// [/user/username/projects/myproject/src/tsconfig.json]
{
  "compilerOptions": {
    "module": "amd",
    "moduleResolution": "classic",
    "target": "es5",
    "outDir": "../out",
    "baseUrl": "./",
    "typeRoots": [
      "typings"
    ]
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
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/somefolder/srcfile.ts",
        "projectRootPath": "/user/username/projects/myproject",
        "fileContent": "\nimport { x } from \"somefolder/module1\";\nimport { x } from \"somefolder/module2\";\nconst y = x;",
        "scriptKindName": "TS"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/src/somefolder/srcfile.ts ProjectRootPath: /user/username/projects/myproject:: Result: /user/username/projects/myproject/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/src/tsconfig.json, currentDirectory: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/src/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/somefolder/module1.ts",
  "/user/username/projects/myproject/src/somefolder/srcfile.ts",
  "/user/username/projects/myproject/src/typings/electron.d.ts"
 ],
 "options": {
  "module": 2,
  "moduleResolution": 1,
  "target": 1,
  "outDir": "/user/username/projects/myproject/out",
  "baseUrl": "/user/username/projects/myproject/src",
  "typeRoots": [
   "/user/username/projects/myproject/src/typings"
  ],
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/src/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/src/somefolder/srcfile.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/somefolder/module1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings/electron.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 0 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/src/somefolder/module1.ts Text-1 "\nexport const x = 10;"
	/user/username/projects/myproject/src/somefolder/srcfile.ts SVC-1-0 "\nimport { x } from \"somefolder/module1\";\nimport { x } from \"somefolder/module2\";\nconst y = x;"
	/user/username/projects/myproject/src/typings/electron.d.ts Text-1 "\ndeclare module 'original-fs' {\n    import * as fs from 'fs';\n    export = fs;\n}"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	somefolder/module1.ts
	  Matched by default include pattern '**/*'
	  Imported via "somefolder/module1" from file 'somefolder/srcfile.ts'
	somefolder/srcfile.ts
	  Matched by default include pattern '**/*'
	typings/electron.d.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/src/tsconfig.json"
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
          "projectId": "f026568af42c61ce0537de8ee0fa07c9359a76dcfb046248ed49dc76c91e4a37",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 114,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 493,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "module": "amd",
            "moduleResolution": "classic",
            "target": "es5",
            "outDir": "",
            "baseUrl": "",
            "typeRoots": [
              ""
            ]
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
        "triggerFile": "/user/username/projects/myproject/src/somefolder/srcfile.ts",
        "configFile": "/user/username/projects/myproject/src/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/somefolder/srcfile.ts ProjectRootPath: /user/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/src/tsconfig.json
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
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/somefolder: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/src/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/somefolder: *new*
  {"pollingInterval":500}
/user/username/somefolder: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects: *new*
  {}
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/src/somefolder/module1.ts: *new*
  {}
/user/username/projects/myproject/src/tsconfig.json: *new*
  {}
/user/username/projects/myproject/src/typings/electron.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/src/somefolder: *new*
  {}
/user/username/projects/myproject/src/typings: *new*
  {}

Projects::
/user/username/projects/myproject/src/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/src/tsconfig.json
/user/username/projects/myproject/src/somefolder/module1.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/src/tsconfig.json
/user/username/projects/myproject/src/somefolder/srcfile.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/src/tsconfig.json *default*
/user/username/projects/myproject/src/typings/electron.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/src/tsconfig.json

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/somefolder/module1.js :: WatchInfo: /user/username/projects/myproject/src/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/somefolder/module1.js :: WatchInfo: /user/username/projects/myproject/src/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/somefolder/module1.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/projects/myproject/src/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/src/somefolder/module1.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/somefolder/module1.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 1
1: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
//// [/user/username/projects/myproject/src/somefolder/module1.js]
export const x = 10;


Timeout callback:: count: 1
1: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/src/tsconfig.jsonFailedLookupInvalidation
After running Timeout callback:: count: 0
