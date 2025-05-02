Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/project/project/a/b/tsconfig.json]
{
  "compilerOptions": {},
  "include": [
    "*.ts"
  ]
}

//// [/home/src/project/project/a/b/f1.ts]
let x = 1

//// [/home/src/project/project/a/b/f2.ts]
let y = 1

//// [/home/src/project/project/a/b/c/f3.ts]
let z = 1

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
        "file": "/home/src/project/project/a/b/f1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/project/project/a/b/f1.ts ProjectRootPath: undefined:: Result: /home/src/project/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/project/project/a/b/tsconfig.json, currentDirectory: /home/src/project/project/a/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/project/project/a/b/tsconfig.json 2000 undefined Project: /home/src/project/project/a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/project/project/a/b/tsconfig.json : {
 "rootNames": [
  "/home/src/project/project/a/b/f1.ts",
  "/home/src/project/project/a/b/f2.ts"
 ],
 "options": {
  "configFilePath": "/home/src/project/project/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/project/project/a/b/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/project/project/a/b/f1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/project/project/a/b 0 undefined Config: /home/src/project/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project/project/a/b 0 undefined Config: /home/src/project/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/project/project/a/b/f2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/project/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/project/project/a/b/node_modules/@types 1 undefined Project: /home/src/project/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project/project/a/b/node_modules/@types 1 undefined Project: /home/src/project/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/project/project/a/node_modules/@types 1 undefined Project: /home/src/project/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project/project/a/node_modules/@types 1 undefined Project: /home/src/project/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/project/project/node_modules/@types 1 undefined Project: /home/src/project/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project/project/node_modules/@types 1 undefined Project: /home/src/project/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/project/node_modules/@types 1 undefined Project: /home/src/project/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/project/node_modules/@types 1 undefined Project: /home/src/project/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/project/project/a/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/project/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/project/project/a/b/f1.ts SVC-1-0 "let x = 1"
	/home/src/project/project/a/b/f2.ts Text-1 "let y = 1"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	f2.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/project/project/a/b/tsconfig.json"
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
          "projectId": "eaf55330db9b4ad719bc7a4552918dfe7c915d7853dd3d27d292197057b124f4",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 18,
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
        "triggerFile": "/home/src/project/project/a/b/f1.ts",
        "configFile": "/home/src/project/project/a/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/project/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/project/project/a/b/f1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/project/project/a/b/tsconfig.json
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
/home/src/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/project/project/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/project/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/project/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/project/project/a/b: *new*
  {}
/home/src/project/project/a/b/f2.ts: *new*
  {}
/home/src/project/project/a/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/home/src/project/project/a/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/project/project/a/b/f1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/project/project/a/b/tsconfig.json *default*
/home/src/project/project/a/b/f2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/project/project/a/b/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/project/project/a/b/tsconfig.json
