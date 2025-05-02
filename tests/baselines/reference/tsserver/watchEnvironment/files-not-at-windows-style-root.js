Info seq  [hh:mm:ss:mss] currentDirectory:: c:\home\src\Vscode\Projects\bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: c:/home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: c:\home\src\Library\Caches\typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [c:/myfolder/allproject/project/tsconfig.json]
{}

//// [c:/myfolder/allproject/project/file1.ts]
let x = 10;

//// [c:/myfolder/allproject/project/file2.ts]
let y = 10;

//// [c:/home/src/tslibs/TS/Lib/lib.d.ts]
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
        "file": "c:/myfolder/allproject/project/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: c:/myfolder/allproject/project/file1.ts ProjectRootPath: undefined:: Result: c:/myfolder/allproject/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: c:/myfolder/allproject/project/tsconfig.json, currentDirectory: c:/myfolder/allproject/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/tsconfig.json 2000 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: c:/myfolder/allproject/project/tsconfig.json : {
 "rootNames": [
  "c:/myfolder/allproject/project/file1.ts",
  "c:/myfolder/allproject/project/file2.ts"
 ],
 "options": {
  "configFilePath": "c:/myfolder/allproject/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "c:/myfolder/allproject/project/tsconfig.json",
        "reason": "Creating possible configured project for c:/myfolder/allproject/project/file1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project 1 undefined Config: c:/myfolder/allproject/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project 1 undefined Config: c:/myfolder/allproject/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/myfolder/allproject/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/project/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/allproject/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myfolder/node_modules/@types 1 undefined Project: c:/myfolder/allproject/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/myfolder/allproject/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/myfolder/allproject/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	c:/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	c:/myfolder/allproject/project/file1.ts SVC-1-0 "let x = 10;"
	c:/myfolder/allproject/project/file2.ts Text-1 "let y = 10;"


	../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "c:/myfolder/allproject/project/tsconfig.json"
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
          "projectId": "70fe22e3a6567d53295386433f94151088ef6cf9af71fe935b5af94b49218f07",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 22,
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
        "triggerFile": "c:/myfolder/allproject/project/file1.ts",
        "configFile": "c:/myfolder/allproject/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project 'c:/myfolder/allproject/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/myfolder/allproject/project/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/myfolder/allproject/project/tsconfig.json
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
c:/myfolder/allproject/node_modules/@types: *new*
  {"pollingInterval":500}
c:/myfolder/allproject/project/node_modules/@types: *new*
  {"pollingInterval":500}
c:/myfolder/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
c:/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
c:/myfolder/allproject/project/file2.ts: *new*
  {}
c:/myfolder/allproject/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
c:/myfolder/allproject/project: *new*
  {}

Projects::
c:/myfolder/allproject/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
c:/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        c:/myfolder/allproject/project/tsconfig.json
c:/myfolder/allproject/project/file1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        c:/myfolder/allproject/project/tsconfig.json *default*
c:/myfolder/allproject/project/file2.ts *new*
    version: Text-1
    containingProjects: 1
        c:/myfolder/allproject/project/tsconfig.json
