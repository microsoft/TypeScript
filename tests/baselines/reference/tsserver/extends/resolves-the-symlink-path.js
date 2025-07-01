Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/users/user/projects/myconfigs/node_modules/@something/tsconfig-node/tsconfig.json]
{
  "extends": "@something/tsconfig-base/tsconfig.json",
  "compilerOptions": {
    "removeComments": true
  }
}

//// [/users/user/projects/myconfigs/node_modules/@something/tsconfig-base/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/users/user/projects/myproject/src/index.ts]
// some comment
export const x = 10;


//// [/users/user/projects/myproject/src/tsconfig.json]
{
  "extends": "@something/tsconfig-node/tsconfig.json"
}

//// [/users/user/projects/myproject/node_modules/@something/tsconfig-node] symlink(/users/user/projects/myconfigs/node_modules/@something/tsconfig-node)

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
        "file": "/users/user/projects/myproject/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/user/projects/myproject/src/index.ts ProjectRootPath: undefined:: Result: /users/user/projects/myproject/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /users/user/projects/myproject/src/tsconfig.json, currentDirectory: /users/user/projects/myproject/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/user/projects/myproject/src/tsconfig.json 2000 undefined Project: /users/user/projects/myproject/src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /users/user/projects/myproject/src/tsconfig.json : {
 "rootNames": [
  "/users/user/projects/myproject/src/index.ts"
 ],
 "options": {
  "composite": true,
  "removeComments": true,
  "configFilePath": "/users/user/projects/myproject/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/user/projects/myconfigs/node_modules/@something/tsconfig-node/tsconfig.json 2000 undefined Config: /users/user/projects/myproject/src/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/user/projects/myconfigs/node_modules/@something/tsconfig-base/tsconfig.json 2000 undefined Config: /users/user/projects/myproject/src/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/user/projects/myproject/src/tsconfig.json",
        "reason": "Creating possible configured project for /users/user/projects/myproject/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/user/projects/myproject/src 1 undefined Config: /users/user/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/user/projects/myproject/src 1 undefined Config: /users/user/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/user/projects/myproject/src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/user/projects/myproject/src/node_modules/@types 1 undefined Project: /users/user/projects/myproject/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/user/projects/myproject/src/node_modules/@types 1 undefined Project: /users/user/projects/myproject/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/user/projects/myproject/node_modules/@types 1 undefined Project: /users/user/projects/myproject/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/user/projects/myproject/node_modules/@types 1 undefined Project: /users/user/projects/myproject/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/user/projects/node_modules/@types 1 undefined Project: /users/user/projects/myproject/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/user/projects/node_modules/@types 1 undefined Project: /users/user/projects/myproject/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/user/projects/myproject/src/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/user/projects/myproject/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/users/user/projects/myproject/src/index.ts SVC-1-0 "// some comment\nexport const x = 10;\n"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/user/projects/myproject/src/tsconfig.json"
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
          "projectId": "76e1e6d2d13c83a9d2d8c2e5a527acf3bddb950312dc88f9e3cb7bb546d3f955",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 37,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "removeComments": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": true,
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
        "triggerFile": "/users/user/projects/myproject/src/index.ts",
        "configFile": "/users/user/projects/myproject/src/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /users/user/projects/myproject/src/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/users/user/projects/myproject/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/user/projects/myproject/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/user/projects/myproject/src/tsconfig.json
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
/users/user/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/users/user/projects/myproject/src/node_modules/@types: *new*
  {"pollingInterval":500}
/users/user/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/user/projects/myconfigs/node_modules/@something/tsconfig-base/tsconfig.json: *new*
  {}
/users/user/projects/myconfigs/node_modules/@something/tsconfig-node/tsconfig.json: *new*
  {}
/users/user/projects/myproject/src/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/user/projects/myproject/src: *new*
  {}

Projects::
/users/user/projects/myproject/src/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /users/user/projects/myproject/src/tsconfig.json
/users/user/projects/myproject/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /users/user/projects/myproject/src/tsconfig.json *default*
