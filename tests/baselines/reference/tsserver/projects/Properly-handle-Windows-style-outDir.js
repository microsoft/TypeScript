Info seq  [hh:mm:ss:mss] currentDirectory:: c:\home\src\Vscode\Projects\bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: c:/home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: c:\home\src\Library\Caches\typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [C:/projects/a/f1.ts]
let x = 1;

//// [C:/projects/a/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "C:\\projects\\a\\b"
  },
  "include": [
    "*.ts"
  ]
}

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
        "file": "C:\\projects\\a\\f1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: C:/projects/a/f1.ts ProjectRootPath: undefined:: Result: C:/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: C:/projects/a/tsconfig.json, currentDirectory: C:/projects/a
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/projects/a/tsconfig.json 2000 undefined Project: C:/projects/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: C:/projects/a/tsconfig.json : {
 "rootNames": [
  "C:/projects/a/f1.ts"
 ],
 "options": {
  "outDir": "C:/projects/a/b",
  "configFilePath": "C:/projects/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "C:/projects/a/tsconfig.json",
        "reason": "Creating possible configured project for C:/projects/a/f1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: C:/projects/a 0 undefined Config: C:/projects/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: C:/projects/a 0 undefined Config: C:/projects/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: C:/projects/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: C:/projects/a/node_modules/@types 1 undefined Project: C:/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: C:/projects/a/node_modules/@types 1 undefined Project: C:/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: C:/projects/node_modules/@types 1 undefined Project: C:/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: C:/projects/node_modules/@types 1 undefined Project: C:/projects/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: C:/projects/a/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'C:/projects/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	c:/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	C:/projects/a/f1.ts SVC-1-0 "let x = 1;"


	../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "C:/projects/a/tsconfig.json"
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
          "projectId": "6921d58e9b737f6f4767778686dfd4ec2bb5c04baee51f5fe596c67607b8ae93",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 10,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
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
        "triggerFile": "C:/projects/a/f1.ts",
        "configFile": "C:/projects/a/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project 'C:/projects/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: C:/projects/a/f1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: C:/projects/a/tsconfig.json
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
C:/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
C:/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
C:/projects/a: *new*
  {}
C:/projects/a/tsconfig.json: *new*
  {}
c:/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
C:/projects/a/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
C:/projects/a/f1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        C:/projects/a/tsconfig.json *default*
c:/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        C:/projects/a/tsconfig.json
