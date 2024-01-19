currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/lib/lib.d.ts]
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

//// [/Volumes/git/projects/project/foo.ts]
export const foo = "foo";

//// [/Volumes/git/projects/project/tsconfig.json]
{ }

//// [/Volumes/git/projects/project/package.json]
{
  "name": "project",
  "version": "1.0.0"
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/Volumes/git/projects/project/foo.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /Volumes/git/projects/project
Info seq  [hh:mm:ss:mss] For info: /Volumes/git/projects/project/foo.ts :: Config file name: /Volumes/git/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /Volumes/git/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Volumes/git/projects/project/tsconfig.json 2000 undefined Project: /Volumes/git/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/Volumes/git/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /Volumes/git/projects/project/foo.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /Volumes/git/projects/project/tsconfig.json : {
 "rootNames": [
  "/Volumes/git/projects/project/foo.ts"
 ],
 "options": {
  "configFilePath": "/Volumes/git/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Volumes/git/projects/project 1 undefined Config: /Volumes/git/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Volumes/git/projects/project 1 undefined Config: /Volumes/git/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Volumes/git/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Volumes/git/projects/project/node_modules/@types 1 undefined Project: /Volumes/git/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Volumes/git/projects/project/node_modules/@types 1 undefined Project: /Volumes/git/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Volumes/git/projects/node_modules/@types 1 undefined Project: /Volumes/git/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Volumes/git/projects/node_modules/@types 1 undefined Project: /Volumes/git/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Volumes/git/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Volumes/git/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/Volumes/git/projects/project/foo.ts SVC-1-0 "export const foo = \"foo\";"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	foo.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Volumes/git/projects/project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/Volumes/git/projects/project/tsconfig.json"
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
          "projectId": "e50274f5ddc1e90e52ff9c7e9e1743319de8c195753252405d8c0303805297ea",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 25,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
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
        "triggerFile": "/Volumes/git/projects/project/foo.ts",
        "configFile": "/Volumes/git/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/Volumes/git/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Volumes/git/projects/project/foo.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Volumes/git/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/Volumes/git/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/Volumes/git/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/Volumes/git/projects/project/package.json: *new*
  {}
/Volumes/git/projects/project/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/Volumes/git/projects/project: *new*
  {}

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /Volumes/git/projects/project/Bar.ts :: WatchInfo: /Volumes/git/projects/project 1 undefined Config: /Volumes/git/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /Volumes/git/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /Volumes/git/projects/project/Bar.ts :: WatchInfo: /Volumes/git/projects/project 1 undefined Config: /Volumes/git/projects/project/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
1: /Volumes/git/projects/project/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/Volumes/git/projects/project/Bar.ts]
export const bar = "bar";


Timeout callback:: count: 2
1: /Volumes/git/projects/project/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] Running: /Volumes/git/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Volumes/git/projects/project/Bar.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Volumes/git/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Volumes/git/projects/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Volumes/git/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/Volumes/git/projects/project/foo.ts SVC-1-0 "export const foo = \"foo\";"
	/Volumes/git/projects/project/Bar.ts Text-1 "export const bar = \"bar\";"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	foo.ts
	  Matched by default include pattern '**/*'
	Bar.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/Volumes/git/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Volumes/git/projects/project/foo.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Volumes/git/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/Volumes/git/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Volumes/git/projects/project/foo.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Volumes/git/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /Volumes/git/projects/project/foo.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/Volumes/git/projects/project/foo.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/Volumes/git/projects/node_modules/@types:
  {"pollingInterval":500}
/Volumes/git/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/Volumes/git/projects/project/Bar.ts: *new*
  {}
/Volumes/git/projects/project/package.json:
  {}
/Volumes/git/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/Volumes/git/projects/project:
  {}
