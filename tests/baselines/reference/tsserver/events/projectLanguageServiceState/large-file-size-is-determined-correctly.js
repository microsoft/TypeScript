Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/app.js]
let x = 1;

//// [/user/username/projects/project/largefile.js]


//// [/user/username/projects/project/extremlylarge.d.ts]


//// [/user/username/projects/project/jsconfig.json]
{}

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
        "file": "/user/username/projects/project/app.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/app.js ProjectRootPath: undefined:: Result: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/project/jsconfig.json, currentDirectory: /user/username/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined Project: /user/username/projects/project/jsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/jsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/app.js",
  "/user/username/projects/project/extremlylarge.d.ts",
  "/user/username/projects/project/largefile.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/user/username/projects/project/jsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/project/app.js to open"
      }
    }
Info seq  [hh:mm:ss:mss] Non TS file size exceeded limit (20971531). Largest files: /user/username/projects/project/largefile.js:20971521, /user/username/projects/project/app.js:10
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLanguageServiceState",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json",
        "languageServiceEnabled": false
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/extremlylarge.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/largefile.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/jsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/jsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/app.js SVC-1-0 "let x = 1;"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	app.js
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/jsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] Skipped loading contents of large file /user/username/projects/project/largefile.js for info /user/username/projects/project/largefile.js: fileSize: 20971521
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "largeFileReferenced",
      "body": {
        "file": "/user/username/projects/project/largefile.js",
        "fileSize": 20971521,
        "maxFileSize": 4194304
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
          "projectId": "14e44f2ee3cfa137be67194f588a7a038f0db9769bc5ae66738ae9f27090fec8",
          "fileStats": {
            "js": 2,
            "jsSize": 10,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "allowJs": true,
            "maxNodeModuleJsDepth": 2,
            "allowSyntheticDefaultImports": true,
            "skipLibCheck": true,
            "noEmit": true
          },
          "typeAcquisition": {
            "enable": true,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "jsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": false,
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
        "triggerFile": "/user/username/projects/project/app.js",
        "configFile": "/user/username/projects/project/jsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/jsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/jsconfig.json
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

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/project/extremlylarge.d.ts: *new*
  {}
/user/username/projects/project/jsconfig.json: *new*
  {}
/user/username/projects/project/largefile.js: *new*
  {}

Projects::
/user/username/projects/project/jsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/jsconfig.json
/user/username/projects/project/app.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/jsconfig.json *default*
/user/username/projects/project/extremlylarge.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/jsconfig.json
/user/username/projects/project/largefile.js *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/jsconfig.json

Info seq  [hh:mm:ss:mss] languageServiceEnabled: false
Info seq  [hh:mm:ss:mss] lastFileExceededProgramSize: /user/username/projects/project/largefile.js