Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts]
import _ from 'lodash';

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json]
{ "compilerOptions": { } }

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/package.json]

{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "lodash",
    "rxjs"
  },
  "devDependencies": {
    "@types/lodash",
    "typescript"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
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
      "command": "configure",
      "arguments": {
        "preferences": {
          "includePackageJsonAutoImports": "off"
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
        "file": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts ProjectRootPath: undefined:: Result: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, currentDirectory: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json 2000 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json : {
 "rootNames": [
  "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts SVC-1-0 "import _ from 'lodash';"


	../../../../../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json"
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
          "projectId": "3aecf8e0752874af62db739696712f52af1743d744e9319586515946c0aa5053",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 23,
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
        "triggerFile": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts",
        "configFile": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
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
/user/username/rootfolder/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b: *new*
  {}

Projects::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
5: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation
6: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
7: *ensureProjectForOpenFiles*
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json]
{
  "name": "symbol-observable",
  "version": "1.0.4",
  "description": "Symbol.observable ponyfill",
  "license": "MIT",
  "repository": "blesh/symbol-observable",
  "author": {
    "name": "Ben Lesh",
    "email": "ben@benlesh.com"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "test": "npm run build && mocha && tsc ./ts-test/test.ts && node ./ts-test/test.js && check-es3-syntax -p lib/ --kill",
    "build": "babel es --out-dir lib",
    "prepublish": "npm test"
  },
  "files": [
    "

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json]
{
  "name": "lodash",
  "version": "4.17.4",
  "description": "Lodash modular utilities.",
  "keywords": "modules, stdlib, util",
  "homepage": "https://lodash.com/",
  "repository": "lodash/lodash",
  "icon": "https://lodash.com/icon.svg",
  "license": "MIT",
  "main": "lodash.js",
  "author": "John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)",
  "contributors": [
    "John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)",
    "Mathias Bynens <mathias@qiwi.

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json]
{
  "name": "rxjs",
  "version": "5.4.3",
  "description": "Reactive Extensions for modern JavaScript",
  "main": "Rx.js",
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "lint-staged": {
    "*.@(js)": [
      "eslint --fix",
      "git add"
    ],
    "*.@(ts)": [
      "eslint -c .eslintrc --ext .ts . --fix",
      "git add"
    ]
  },
  "scripts-info": {
    "info": "List available script",
    "build_all": "Build all packages (ES6, CJS, UMD) and generate packages",
    "build_cjs": "Build CJS package with clean up existing build, copy source into dist",
    "build_es6": "Build ES6 package with clean up existing build, copy source into dist",
    "build_closure_core": "Minify Global core build using closure compiler",
    "build_global": "Build Global package, then minify build",
    "build_perf": "Build CJS & Global build, run macro performance test",
    "build_test": "Build CJS package & test spec, execute mocha test runner",
    "build_cover": "Run lint to current code, build CJS & test spec, execute test coverage",
    "build_docs": "Build ES6 & global package, create documentation using it",
    "build_spec": "Build test specs",
    "check_circular_dependencies": "Check codebase has circular dependencies",
    "clean_spec": "Clean up existing test spec build output",
    "clean_dist_cjs": "Clean up existing CJS package output",
    "clean_dist_es6": "Clean up existing ES6 package output",
    "clean_dist_global": "Clean up existing Global package output",
    "commit": "Run git commit wizard",
    "compile_dist_cjs": "Compile codebase into CJS module",
    "compile_module_es6": "Compile codebase into ES6",
    "cover": "Execute test coverage",
    "lint_perf": "Run lint against performance test suite",
    "lint_spec": "Run lint against test spec",
    "lint_src": "Run lint against source",
    "lint": "Run lint against everything",
    "perf": "Run macro performance benchmark",
    "perf_micro": "Run micro performance benchmark",
    "test_mocha": "Execute mocha test runner against existing test spec build",
    "test_browser": "Execute mocha test runner on browser against existing test spec build",
    "test": "Clean up existing test spec build, build test spec and execute mocha test runner",
    "tests2png": "Generate marble diagram image from test spec",
    "watch": "Watch codebase, trigger compile when source code changes"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:ReactiveX/RxJS.git"
  },
  "keywords": [
    "Rx",
    "RxJS",
    "ReactiveX",
    "ReactiveExtensions",
    "Streams",
    "Observables",
    "Observable",
    "Stream",
    "ES6",
    "ES2015"
  ],
  "author": "Ben Lesh <ben@benlesh.com>",
  "contributors": [
    {
      "name": "Ben Lesh",
      "email": "ben@benlesh.com"
    },
    {
      "name": "Paul Taylor",
      "email": "paul.e.taylor@me.com"
    },
    {
      "name": "Jeff Cross",
      "email": "crossj@google.com"
    },
    {
      "name": "Matthew Podwysocki",
      "email": "matthewp@microsoft.com"
    },
    {
      "name": "OJ Kwon",
      "email": "kwon.ohjoong@gmail.com"
    },
    {
      "name": "Andre Staltz",
      "email": "andre@staltz.com"
    }
  ],
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/ReactiveX/RxJS/issues"
  },
  "homepage": "https://github.com/ReactiveX/RxJS",
  "devDependencies": {
    "babel-polyfill": "^6.23.0",
    "benchmark": "^2.1.0",
    "benchpress": "2.0.0-beta.1",
    "chai": "^3.5.0",
    "color": "^0.11.1",
    "colors": "1.1.2",
    "commitizen": "^2.8.6",
    "coveralls": "^2.11.13",
    "cz-conventional-changelog": "^1.2.0",
    "danger": "^1.1.0",
    "doctoc": "^1.0.0",
    "escape-string-regexp": "^1.0.5 ",
    "esdoc": "^0.4.7",
    "eslint": "^3.8.0",
    "fs-extra": "^2.1.2",
    "get-folder-size": "^1.0.0",
    "glob": "^7.0.3",
    "gm": "^1.22.0",
    "google-closure-compiler-js": "^20170218.0.0",
    "gzip-size": "^3.0.0",
    "http-server": "^0.9.0",
    "husky": "^0.13.3",
    "lint-staged": "3.2.5",
    "lodash": "^4.15.0",
    "madge": "^1.4.3",
    "markdown-doctest": "^0.9.1",
    "minimist": "^1.2.0",
    "mkdirp": "^0.5.1",
    "mocha": "^3.0.2",
    "mocha-in-sauce": "0.0.1",
    "npm-run-all": "^4.0.2",
    "npm-scripts-info": "^0.3.4",
    "nyc": "^10.2.0",
    "opn-cli": "^3.1.0",
    "platform": "^1.3.1",
    "promise": "^7.1.1",
    "protractor": "^3.1.1",
    "rollup": "0.36.3",
    "rollup-plugin-inject": "^2.0.0",
    "rollup-plugin-node-resolve": "^2.0.0",
    "rx": "latest",
    "rxjs": "latest",
    "shx": "^0.2.2",
    "sinon": "^2.1.0",
    "sinon-chai": "^2.9.0",
    "source-map-support": "^0.4.0",
    "tslib": "^1.5.0",
    "eslint": "^4.4.2",
    "typescript": "~2.0.6",
    "typings": "^2.0.0",
    "validate-commit-msg": "^2.14.0",
    "watch": "^1.0.1",
    "webpack": "^1.13.1",
    "xmlhttprequest": "1.8.0"
  },
  "engines": {
    "npm": ">=2.0.0"
  },
  "typings": "Rx.d.ts",
  "dependencies": {
    "symbol-observable": "^1.0.1"
  }
}

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json]
{
    "name": "typescript",
    "author": "Microsoft Corp.",
    "homepage": "http://typescriptlang.org/",
    "version": "2.4.2",
    "license": "Apache-2.0",
    "description": "TypeScript is a language for application scale JavaScript development",
    "keywords": [
        "TypeScript",
        "Microsoft",
        "compiler",
        "language",
        "javascript"
    ],
    "bugs": {
        "url": "https://github.com/Microsoft/TypeScript/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/Microsoft/TypeScript.git"
    },
    "main": "./lib/typescript.js",
    "typings": "./lib/typescript.d.ts",
    "bin": {
        "tsc": "./bin/tsc",
        "tsserver": "./bin/tsserver"
    },
    "engines": {
        "node": ">=4.2.0"
    },
    "devDependencies": {
        "@types/browserify": "latest",
        "@types/chai": "latest",
        "@types/convert-source-map": "latest",
        "@types/del": "latest",
        "@types/glob": "latest",
        "@types/gulp": "latest",
        "@types/gulp-concat": "latest",
        "@types/gulp-help": "latest",
        "@types/gulp-newer": "latest",
        "@types/gulp-sourcemaps": "latest",
        "@types/merge2": "latest",
        "@types/minimatch": "latest",
        "@types/minimist": "latest",
        "@types/mkdirp": "latest",
        "@types/mocha": "latest",
        "@types/node": "latest",
        "@types/q": "latest",
        "@types/run-sequence": "latest",
        "@types/through2": "latest",
        "browserify": "latest",
        "chai": "latest",
        "convert-source-map": "latest",
        "del": "latest",
        "gulp": "latest",
        "gulp-clone": "latest",
        "gulp-concat": "latest",
        "gulp-help": "latest",
        "gulp-insert": "latest",
        "gulp-newer": "latest",
        "gulp-sourcemaps": "latest",
        "gulp-typescript": "latest",
        "into-stream": "latest",
        "istanbul": "latest",
        "jake": "latest",
        "merge2": "latest",
        "minimist": "latest",
        "mkdirp": "latest",
        "mocha": "latest",
        "mocha-fivemat-progress-reporter": "latest",
        "q": "latest",
        "run-sequence": "latest",
        "sorcery": "latest",
        "through2": "latest",
        "travis-fold": "latest",
        "ts-node": "latest",
        "eslint": "5.16.0",
        "typescript": "^2.4"
    },
    "scripts": {
        "pretest": "jake tests",
        "test": "jake runtests-parallel",
        "build": "npm run build:compiler && npm run build:tests",
        "build:compiler": "jake local",
        "build:tests": "jake tests",
        "start": "node lib/tsc",
        "clean": "jake clean",
        "gulp": "gulp",
        "jake": "jake",
        "lint": "jake lint",
        "setup-hooks": "node scripts/link-hooks.js"
    },
    "browser": {
        "buffer": false,
        "fs": false,
        "os": false,
        "path": false
    }
}

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js]
module.exports = require('./lib/index');


//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts]
declare const observableSymbol: symbol;
export default observableSymbol;


//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js]
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;


PolledWatches::
/user/username/rootfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b:
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules: *new*
  {}

Timeout callback:: count: 3
5: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation *new*
6: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *new*
7: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] Running: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After running Timeout callback:: count: 2

Timeout callback:: count: 2
6: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *deleted*
7: *ensureProjectForOpenFiles* *deleted*
8: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *new*
9: *ensureProjectForOpenFiles* *new*

Before running Timeout callback:: count: 2
8: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
9: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts SVC-1-0 "import _ from 'lodash';"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 0
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json]
{
    "name": "@types/lodash",
    "version": "4.14.74",
    "description": "TypeScript definitions for Lo-Dash",
    "license": "MIT",
    "contributors": [
        {
            "name": "Brian Zengel",
            "url": "https://github.com/bczengel"
        },
        {
            "name": "Ilya Mochalov",
            "url": "https://github.com/chrootsu"
        },
        {
            "name": "Stepan Mikhaylyuk",
            "url": "https://github.com/stepancar"
        },
        {
            "name": "Eric L Anderson",
            "url": "https://github.com/ericanderson"
        },
        {
            "name": "AJ Richardson",
            "url": "https://github.com/aj-r"
        },
        {
            "name": "Junyoung Clare Jang",
            "url": "https://github.com/ailrun"
        }
    ],
    "main": "",
    "repository": {
        "type": "git",
        "url": "https://www.github.com/DefinitelyTyped/DefinitelyTyped.git"
    },
    "scripts": {},
    "dependencies": {},
    "typesPublisherContentHash": "12af578ffaf8d86d2df37e591857906a86b983fa9258414326544a0fe6af0de8",
    "typeScriptVersion": "2.2"
}

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js]
module.exports = require('./lodash');

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594]



After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 0
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594] deleted

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 0
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts]

// Stub for lodash
export = _;
export as namespace _;
declare var _: _.LoDashStatic;
declare namespace _ {
    interface LoDashStatic {
        someProp: string;
    }
    class SomeClass {
        someMethod(): void;
    }
}


After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 0
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041]
{
  "_args": [
    [
      {
        "raw": "rxjs@^5.4.2",
        "scope": null,
        "escapedName": "rxjs",
        "name": "rxjs",
        "rawSpec": "^5.4.2",
        "spec": ">=5.4.2 <6.0.0",
        "type": "range"
      },
      "C:\\Users\\shkamat\\Desktop\\app"
    ]
  ],
  "_from": "rxjs@>=5.4.2 <6.0.0",
  "_id": "rxjs@5.4.3",
  "_inCache": true,
  "_location": "/rxjs",
  "_nodeVersion": "7.7.2",
  "_npmOperationalInternal": {
    "host": "s3://npm-registry-packages",
    "tmp": "tmp/rxjs-5.4.3.tgz_1502407898166_0.6800217325799167"
  },
  "_npmUser": {
    "name": "blesh",
    "email": "ben@benlesh.com"
  },
  "_npmVersion": "5.3.0",
  "_phantomChildren": {},
  "_requested": {
    "raw": "rxjs@^5.4.2",
    "scope": null,
    "escapedName": "rxjs",
    "name": "rxjs",
    "rawSpec": "^5.4.2",
    "spec": ">=5.4.2 <6.0.0",
    "type": "range"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/rxjs/-/rxjs-5.4.3.tgz",
  "_shasum": "0758cddee6033d68e0fd53676f0f3596ce3d483f",
  "_shrinkwrap": null,
  "_spec": "rxjs@^5.4.2",
  "_where": "C:\\Users\\shkamat\\Desktop\\app",
  "author": {
    "name": "Ben Lesh",
    "email": "ben@benlesh.com"
  },
  "bugs": {
    "url": "https://github.com/ReactiveX/RxJS/issues"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "contributors": [
    {
      "name": "Ben Lesh",
      "email": "ben@benlesh.com"
    },
    {
      "name": "Paul Taylor",
      "email": "paul.e.taylor@me.com"
    },
    {
      "name": "Jeff Cross",
      "email": "crossj@google.com"
    },
    {
      "name": "Matthew Podwysocki",
      "email": "matthewp@microsoft.com"
    },
    {
      "name": "OJ Kwon",
      "email": "kwon.ohjoong@gmail.com"
    },
    {
      "name": "Andre Staltz",
      "email": "andre@staltz.com"
    }
  ],
  "dependencies": {
    "symbol-observable": "^1.0.1"
  },
  "description": "Reactive Extensions for modern JavaScript",
  "devDependencies": {
    "babel-polyfill": "^6.23.0",
    "benchmark": "^2.1.0",
    "benchpress": "2.0.0-beta.1",
    "chai": "^3.5.0",
    "color": "^0.11.1",
    "colors": "1.1.2",
    "commitizen": "^2.8.6",
    "coveralls": "^2.11.13",
    "cz-conventional-changelog": "^1.2.0",
    "danger": "^1.1.0",
    "doctoc": "^1.0.0",
    "escape-string-regexp": "^1.0.5 ",
    "esdoc": "^0.4.7",
    "eslint": "^3.8.0",
    "fs-extra": "^2.1.2",
    "get-folder-size": "^1.0.0",
    "glob": "^7.0.3",
    "gm": "^1.22.0",
    "google-closure-compiler-js": "^20170218.0.0",
    "gzip-size": "^3.0.0",
    "http-server": "^0.9.0",
    "husky": "^0.13.3",
    "lint-staged": "3.2.5",
    "lodash": "^4.15.0",
    "madge": "^1.4.3",
    "markdown-doctest": "^0.9.1",
    "minimist": "^1.2.0",
    "mkdirp": "^0.5.1",
    "mocha": "^3.0.2",
    "mocha-in-sauce": "0.0.1",
    "npm-run-all": "^4.0.2",
    "npm-scripts-info": "^0.3.4",
    "nyc": "^10.2.0",
    "opn-cli": "^3.1.0",
    "platform": "^1.3.1",
    "promise": "^7.1.1",
    "protractor": "^3.1.1",
    "rollup": "0.36.3",
    "rollup-plugin-inject": "^2.0.0",
    "rollup-plugin-node-resolve": "^2.0.0",
    "rx": "latest",
    "rxjs": "latest",
    "shx": "^0.2.2",
    "sinon": "^2.1.0",
    "sinon-chai": "^2.9.0",
    "source-map-support": "^0.4.0",
    "tslib": "^1.5.0",
    "eslint": "^5.16.0",
    "typescript": "~2.0.6",
    "typings": "^2.0.0",
    "validate-commit-msg": "^2.14.0",
    "watch": "^1.0.1",
    "webpack": "^1.13.1",
    "xmlhttprequest": "1.8.0"
  },
  "directories": {},
  "dist": {
    "integrity": "sha512-fSNi+y+P9ss+EZuV0GcIIqPUK07DEaMRUtLJvdcvMyFjc9dizuDjere+A4V7JrLGnm9iCc+nagV/4QdMTkqC4A==",
    "shasum": "0758cddee6033d68e0fd53676f0f3596ce3d483f",
    "tarball": "https://registry.npmjs.org/rxjs/-/rxjs-5.4.3.tgz"
  },
  "engines": {
    "npm": ">=2.0.0"
  },
  "homepage": "https://github.com/ReactiveX/RxJS",
  "keywords": [
    "Rx",
    "RxJS",
    "ReactiveX",
    "ReactiveExtensions",
    "Streams",
    "Observables",
    "Observable",
    "Stream",
    "ES6",
    "ES2015"
  ],
  "license": "Apache-2.0",
  "lint-staged": {
    "*.@(js)": [
      "eslint --fix",
      "git add"
    ],
    "*.@(ts)": [
      "eslint -c .eslintrc --ext .ts . --fix",
      "git add"
    ]
  },
  "main": "Rx.js",
  "maintainers": [
    {
      "name": "blesh",
      "email": "ben@benlesh.com"
    }
  ],
  "name": "rxjs",
  "optionalDependencies": {},
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/ReactiveX/RxJS.git"
  },
  "scripts-info": {
    "info": "List available script",
    "build_all": "Build all packages (ES6, CJS, UMD) and generate packages",
    "build_cjs": "Build CJS package with clean up existing build, copy source into dist",
    "build_es6": "Build ES6 package with clean up existing build, copy source into dist",
    "build_closure_core": "Minify Global core build using closure compiler",
    "build_global": "Build Global package, then minify build",
    "build_perf": "Build CJS & Global build, run macro performance test",
    "build_test": "Build CJS package & test spec, execute mocha test runner",
    "build_cover": "Run lint to current code, build CJS & test spec, execute test coverage",
    "build_docs": "Build ES6 & global package, create documentation using it",
    "build_spec": "Build test specs",
    "check_circular_dependencies": "Check codebase has circular dependencies",
    "clean_spec": "Clean up existing test spec build output",
    "clean_dist_cjs": "Clean up existing CJS package output",
    "clean_dist_es6": "Clean up existing ES6 package output",
    "clean_dist_global": "Clean up existing Global package output",
    "commit": "Run git commit wizard",
    "compile_dist_cjs": "Compile codebase into CJS module",
    "compile_module_es6": "Compile codebase into ES6",
    "cover": "Execute test coverage",
    "lint_perf": "Run lint against performance test suite",
    "lint_spec": "Run lint against test spec",
    "lint_src": "Run lint against source",
    "lint": "Run lint against everything",
    "perf": "Run macro performance benchmark",
    "perf_micro": "Run micro performance benchmark",
    "test_mocha": "Execute mocha test runner against existing test spec build",
    "test_browser": "Execute mocha test runner on browser against existing test spec build",
    "test": "Clean up existing test spec build, build test spec and execute mocha test runner",
    "tests2png": "Generate marble diagram image from test spec",
    "watch": "Watch codebase, trigger compile when source code changes"
  },
  "typings": "Rx.d.ts",
  "version": "5.4.3"
}



After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbol-observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.bin
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.bin :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
34: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation
35: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
36: *ensureProjectForOpenFiles*
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041] deleted

PolledWatches::
/user/username/rootfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b:
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types: *new*
  {}

Timeout callback:: count: 3
34: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation *new*
35: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *new*
36: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] Running: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After running Timeout callback:: count: 2

Timeout callback:: count: 2
35: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *deleted*
36: *ensureProjectForOpenFiles* *deleted*
37: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *new*
38: *ensureProjectForOpenFiles* *new*

Before running Timeout callback:: count: 2
37: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
38: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts SVC-1-0 "import _ from 'lodash';"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json",
        "configFile": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json",
        "diagnostics": [
          {
            "text": "Cannot find type definition file for 'lodash'.\n  The file is in the program because:\n    Entry point for implicit type library 'lodash'",
            "code": 2688,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61 :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected ignored path: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib/index.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/lib :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/add/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json Detected file add/remove of non supported extension: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/index.js
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/index.js :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/bundles :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/operator :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add/observable :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/add/observable/dom :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/index.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/scheduler :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/src/util :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/symbol :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/testing :: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b 1 undefined Config: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
104: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation
105: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
106: *ensureProjectForOpenFiles*
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/package.json]
{
  "name": "symbol-observable",
  "version": "1.0.4",
  "description": "Symbol.observable ponyfill",
  "license": "MIT",
  "repository": "blesh/symbol-observable",
  "author": {
    "name": "Ben Lesh",
    "email": "ben@benlesh.com"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "test": "npm run build && mocha && tsc ./ts-test/test.ts && node ./ts-test/test.js && check-es3-syntax -p lib/ --kill",
    "build": "babel es --out-dir lib",
    "prepublish": "npm test"
  },
  "files": [
    "

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/package.json]
{
  "name": "lodash",
  "version": "4.17.4",
  "description": "Lodash modular utilities.",
  "keywords": "modules, stdlib, util",
  "homepage": "https://lodash.com/",
  "repository": "lodash/lodash",
  "icon": "https://lodash.com/icon.svg",
  "license": "MIT",
  "main": "lodash.js",
  "author": "John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)",
  "contributors": [
    "John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)",
    "Mathias Bynens <mathias@qiwi.

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/rxjs/package.json]
{
  "name": "rxjs",
  "version": "5.4.3",
  "description": "Reactive Extensions for modern JavaScript",
  "main": "Rx.js",
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "lint-staged": {
    "*.@(js)": [
      "eslint --fix",
      "git add"
    ],
    "*.@(ts)": [
      "eslint -c .eslintrc --ext .ts . --fix",
      "git add"
    ]
  },
  "scripts-info": {
    "info": "List available script",
    "build_all": "Build all packages (ES6, CJS, UMD) and generate packages",
    "build_cjs": "Build CJS package with clean up existing build, copy source into dist",
    "build_es6": "Build ES6 package with clean up existing build, copy source into dist",
    "build_closure_core": "Minify Global core build using closure compiler",
    "build_global": "Build Global package, then minify build",
    "build_perf": "Build CJS & Global build, run macro performance test",
    "build_test": "Build CJS package & test spec, execute mocha test runner",
    "build_cover": "Run lint to current code, build CJS & test spec, execute test coverage",
    "build_docs": "Build ES6 & global package, create documentation using it",
    "build_spec": "Build test specs",
    "check_circular_dependencies": "Check codebase has circular dependencies",
    "clean_spec": "Clean up existing test spec build output",
    "clean_dist_cjs": "Clean up existing CJS package output",
    "clean_dist_es6": "Clean up existing ES6 package output",
    "clean_dist_global": "Clean up existing Global package output",
    "commit": "Run git commit wizard",
    "compile_dist_cjs": "Compile codebase into CJS module",
    "compile_module_es6": "Compile codebase into ES6",
    "cover": "Execute test coverage",
    "lint_perf": "Run lint against performance test suite",
    "lint_spec": "Run lint against test spec",
    "lint_src": "Run lint against source",
    "lint": "Run lint against everything",
    "perf": "Run macro performance benchmark",
    "perf_micro": "Run micro performance benchmark",
    "test_mocha": "Execute mocha test runner against existing test spec build",
    "test_browser": "Execute mocha test runner on browser against existing test spec build",
    "test": "Clean up existing test spec build, build test spec and execute mocha test runner",
    "tests2png": "Generate marble diagram image from test spec",
    "watch": "Watch codebase, trigger compile when source code changes"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:ReactiveX/RxJS.git"
  },
  "keywords": [
    "Rx",
    "RxJS",
    "ReactiveX",
    "ReactiveExtensions",
    "Streams",
    "Observables",
    "Observable",
    "Stream",
    "ES6",
    "ES2015"
  ],
  "author": "Ben Lesh <ben@benlesh.com>",
  "contributors": [
    {
      "name": "Ben Lesh",
      "email": "ben@benlesh.com"
    },
    {
      "name": "Paul Taylor",
      "email": "paul.e.taylor@me.com"
    },
    {
      "name": "Jeff Cross",
      "email": "crossj@google.com"
    },
    {
      "name": "Matthew Podwysocki",
      "email": "matthewp@microsoft.com"
    },
    {
      "name": "OJ Kwon",
      "email": "kwon.ohjoong@gmail.com"
    },
    {
      "name": "Andre Staltz",
      "email": "andre@staltz.com"
    }
  ],
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/ReactiveX/RxJS/issues"
  },
  "homepage": "https://github.com/ReactiveX/RxJS",
  "devDependencies": {
    "babel-polyfill": "^6.23.0",
    "benchmark": "^2.1.0",
    "benchpress": "2.0.0-beta.1",
    "chai": "^3.5.0",
    "color": "^0.11.1",
    "colors": "1.1.2",
    "commitizen": "^2.8.6",
    "coveralls": "^2.11.13",
    "cz-conventional-changelog": "^1.2.0",
    "danger": "^1.1.0",
    "doctoc": "^1.0.0",
    "escape-string-regexp": "^1.0.5 ",
    "esdoc": "^0.4.7",
    "eslint": "^3.8.0",
    "fs-extra": "^2.1.2",
    "get-folder-size": "^1.0.0",
    "glob": "^7.0.3",
    "gm": "^1.22.0",
    "google-closure-compiler-js": "^20170218.0.0",
    "gzip-size": "^3.0.0",
    "http-server": "^0.9.0",
    "husky": "^0.13.3",
    "lint-staged": "3.2.5",
    "lodash": "^4.15.0",
    "madge": "^1.4.3",
    "markdown-doctest": "^0.9.1",
    "minimist": "^1.2.0",
    "mkdirp": "^0.5.1",
    "mocha": "^3.0.2",
    "mocha-in-sauce": "0.0.1",
    "npm-run-all": "^4.0.2",
    "npm-scripts-info": "^0.3.4",
    "nyc": "^10.2.0",
    "opn-cli": "^3.1.0",
    "platform": "^1.3.1",
    "promise": "^7.1.1",
    "protractor": "^3.1.1",
    "rollup": "0.36.3",
    "rollup-plugin-inject": "^2.0.0",
    "rollup-plugin-node-resolve": "^2.0.0",
    "rx": "latest",
    "rxjs": "latest",
    "shx": "^0.2.2",
    "sinon": "^2.1.0",
    "sinon-chai": "^2.9.0",
    "source-map-support": "^0.4.0",
    "tslib": "^1.5.0",
    "eslint": "^4.4.2",
    "typescript": "~2.0.6",
    "typings": "^2.0.0",
    "validate-commit-msg": "^2.14.0",
    "watch": "^1.0.1",
    "webpack": "^1.13.1",
    "xmlhttprequest": "1.8.0"
  },
  "engines": {
    "npm": ">=2.0.0"
  },
  "typings": "Rx.d.ts",
  "dependencies": {
    "symbol-observable": "^1.0.1"
  }
}

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/typescript/package.json]
{
    "name": "typescript",
    "author": "Microsoft Corp.",
    "homepage": "http://typescriptlang.org/",
    "version": "2.4.2",
    "license": "Apache-2.0",
    "description": "TypeScript is a language for application scale JavaScript development",
    "keywords": [
        "TypeScript",
        "Microsoft",
        "compiler",
        "language",
        "javascript"
    ],
    "bugs": {
        "url": "https://github.com/Microsoft/TypeScript/issues"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/Microsoft/TypeScript.git"
    },
    "main": "./lib/typescript.js",
    "typings": "./lib/typescript.d.ts",
    "bin": {
        "tsc": "./bin/tsc",
        "tsserver": "./bin/tsserver"
    },
    "engines": {
        "node": ">=4.2.0"
    },
    "devDependencies": {
        "@types/browserify": "latest",
        "@types/chai": "latest",
        "@types/convert-source-map": "latest",
        "@types/del": "latest",
        "@types/glob": "latest",
        "@types/gulp": "latest",
        "@types/gulp-concat": "latest",
        "@types/gulp-help": "latest",
        "@types/gulp-newer": "latest",
        "@types/gulp-sourcemaps": "latest",
        "@types/merge2": "latest",
        "@types/minimatch": "latest",
        "@types/minimist": "latest",
        "@types/mkdirp": "latest",
        "@types/mocha": "latest",
        "@types/node": "latest",
        "@types/q": "latest",
        "@types/run-sequence": "latest",
        "@types/through2": "latest",
        "browserify": "latest",
        "chai": "latest",
        "convert-source-map": "latest",
        "del": "latest",
        "gulp": "latest",
        "gulp-clone": "latest",
        "gulp-concat": "latest",
        "gulp-help": "latest",
        "gulp-insert": "latest",
        "gulp-newer": "latest",
        "gulp-sourcemaps": "latest",
        "gulp-typescript": "latest",
        "into-stream": "latest",
        "istanbul": "latest",
        "jake": "latest",
        "merge2": "latest",
        "minimist": "latest",
        "mkdirp": "latest",
        "mocha": "latest",
        "mocha-fivemat-progress-reporter": "latest",
        "q": "latest",
        "run-sequence": "latest",
        "sorcery": "latest",
        "through2": "latest",
        "travis-fold": "latest",
        "ts-node": "latest",
        "eslint": "5.16.0",
        "typescript": "^2.4"
    },
    "scripts": {
        "pretest": "jake tests",
        "test": "jake runtests-parallel",
        "build": "npm run build:compiler && npm run build:tests",
        "build:compiler": "jake local",
        "build:tests": "jake tests",
        "start": "node lib/tsc",
        "clean": "jake clean",
        "gulp": "gulp",
        "jake": "jake",
        "lint": "jake lint",
        "setup-hooks": "node scripts/link-hooks.js"
    },
    "browser": {
        "buffer": false,
        "fs": false,
        "os": false,
        "path": false
    }
}

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.js]
module.exports = require('./lib/index');


//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/index.d.ts]
declare const observableSymbol: symbol;
export default observableSymbol;


//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/symbolle/lib/index.js]
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json]
{
    "name": "@types/lodash",
    "version": "4.14.74",
    "description": "TypeScript definitions for Lo-Dash",
    "license": "MIT",
    "contributors": [
        {
            "name": "Brian Zengel",
            "url": "https://github.com/bczengel"
        },
        {
            "name": "Ilya Mochalov",
            "url": "https://github.com/chrootsu"
        },
        {
            "name": "Stepan Mikhaylyuk",
            "url": "https://github.com/stepancar"
        },
        {
            "name": "Eric L Anderson",
            "url": "https://github.com/ericanderson"
        },
        {
            "name": "AJ Richardson",
            "url": "https://github.com/aj-r"
        },
        {
            "name": "Junyoung Clare Jang",
            "url": "https://github.com/ailrun"
        }
    ],
    "main": "",
    "repository": {
        "type": "git",
        "url": "https://www.github.com/DefinitelyTyped/DefinitelyTyped.git"
    },
    "scripts": {},
    "dependencies": {},
    "typesPublisherContentHash": "12af578ffaf8d86d2df37e591857906a86b983fa9258414326544a0fe6af0de8",
    "typeScriptVersion": "2.2"
}

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/index.js]
module.exports = require('./lodash');

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/index.d.ts]

// Stub for lodash
export = _;
export as namespace _;
declare var _: _.LoDashStatic;
declare namespace _ {
    interface LoDashStatic {
        someProp: string;
    }
    class SomeClass {
        someMethod(): void;
    }
}

//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json] deleted
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/package.json] deleted
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/rxjs-22375c61/package.json] deleted
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/typescript-8493ea5d/package.json] deleted
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js] deleted
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts] deleted
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js] deleted
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json] deleted
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/lodash-b0733faa/index.js] deleted
//// [/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts] deleted

Timeout callback:: count: 3
104: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation *new*
105: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *new*
106: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] Running: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After running Timeout callback:: count: 2

Timeout callback:: count: 2
105: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *deleted*
106: *ensureProjectForOpenFiles* *deleted*
107: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *new*
108: *ensureProjectForOpenFiles* *new*

Before running Timeout callback:: count: 2
107: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
108: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/projects/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/username/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/user/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json projectStateVersion: 4 projectProgramVersion: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/index.d.ts Text-1 "\n// Stub for lodash\nexport = _;\nexport as namespace _;\ndeclare var _: _.LoDashStatic;\ndeclare namespace _ {\n    interface LoDashStatic {\n        someProp: string;\n    }\n    class SomeClass {\n        someMethod(): void;\n    }\n}"
	/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts SVC-1-0 "import _ from 'lodash';"


	../../../../../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/@types/lodash/index.d.ts
	  Imported via 'lodash' from file 'app.ts' with packageId '@types/lodash/index.d.ts@4.14.74'
	  Entry point for implicit type library 'lodash' with packageId '@types/lodash/index.d.ts@4.14.74'
	app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json",
        "configFile": "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/user/username/rootfolder/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/rootfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/user/username/projects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/package.json: *new*
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/lodash/package.json: *new*
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b:
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types:
  {}

Projects::
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json *default*
/user/username/rootfolder/otherfolder/user/username/projects/project/a/b/node_modules/@types/lodash/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/rootfolder/otherfolder/user/username/projects/project/a/b/tsconfig.json
