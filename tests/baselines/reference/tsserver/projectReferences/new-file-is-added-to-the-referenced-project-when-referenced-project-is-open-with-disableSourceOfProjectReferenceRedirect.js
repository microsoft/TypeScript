currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/projects/project1/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "composite": true
  },
  "exclude": [
    "temp"
  ]
}

//// [/user/username/projects/myproject/projects/project1/class1.ts]
class class1 {}

//// [/user/username/projects/myproject/projects/project1/class1.d.ts]
declare class class1 {}

//// [/user/username/projects/myproject/projects/project2/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "composite": true,
    "disableSourceOfProjectReferenceRedirect": true
  },
  "references": [
    {
      "path": "../project1"
    }
  ]
}

//// [/user/username/projects/myproject/projects/project2/class2.ts]
class class2 {}

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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/projects/project2/class2.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/projects/project2
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/projects/project2/class2.ts :: Config file name: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/projects/project2/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/projects/project2/class2.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/projects/project2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/projects/project2/class2.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/myproject/projects/project2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/projects/project1",
   "originalPath": "../project1"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Config: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Config: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/projects/project1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/projects/project1/class1.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/projects/project1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class1.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/projects/project2/tsconfig.json"
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
          "projectId": "f882baf9605e0eb10c6faf44fb3bdc1cf0428db7f81867e6462774c6b989f621",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 15,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 357,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "module": "none",
            "composite": true,
            "disableSourceOfProjectReferenceRedirect": true
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
        "triggerFile": "/user/username/projects/myproject/projects/project2/class2.ts",
        "configFile": "/user/username/projects/myproject/projects/project2/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/projects/project2
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/projects/project2/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts: *new*
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1: *new*
  {}
/user/username/projects/myproject/projects/project2: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/projects/project1/class1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/projects/project1
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/projects/project1/class1.ts :: Config file name: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/projects/project1/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/projects/project1/class1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.ts SVC-1-0 "class class1 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	class1.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/projects/project1/tsconfig.json"
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
          "projectId": "359408702106046e3b56815c85a157cdc8e0281cb14a2edab2c721e2ae6143f6",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 15,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "module": "none",
            "composite": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": true,
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
        "triggerFile": "/user/username/projects/myproject/projects/project1/class1.ts",
        "configFile": "/user/username/projects/myproject/projects/project1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/projects/project1
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/projects/project1/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1:
  {}
/user/username/projects/myproject/projects/project2:
  {}

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
1: /user/username/projects/myproject/projects/project2/tsconfig.json
3: /user/username/projects/myproject/projects/project1/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/projects/project1/class3.ts]
class class3 {}


Timeout callback:: count: 3
1: /user/username/projects/myproject/projects/project2/tsconfig.json *new*
3: /user/username/projects/myproject/projects/project1/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.ts SVC-1-0 "class class1 {}"
	/user/username/projects/myproject/projects/project1/class3.ts Text-1 "class class3 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	class1.ts
	  Matched by default include pattern '**/*'
	class3.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/projects/myproject/projects/project2/class2.ts,/user/username/projects/myproject/projects/project1/class1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/projects/project2/class2.ts",
          "/user/username/projects/myproject/projects/project1/class1.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/class3.d.ts: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts: *new*
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1:
  {}
/user/username/projects/myproject/projects/project2:
  {}

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
5: /user/username/projects/myproject/projects/project2/tsconfig.json
6: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/projects/project1/class3.d.ts]
declare class class3 {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/projects/project1/class3.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1:
  {}
/user/username/projects/myproject/projects/project2:
  {}

Timeout callback:: count: 2
5: /user/username/projects/myproject/projects/project2/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project1/class3.d.ts Text-1 "declare class class3 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	../project1/class3.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/projects/myproject/projects/project2/class2.ts,/user/username/projects/myproject/projects/project1/class1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/projects/project2/class2.ts",
          "/user/username/projects/myproject/projects/project1/class1.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.d.ts: *new*
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1:
  {}
/user/username/projects/myproject/projects/project2:
  {}

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp/file.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/projects/project1/temp/file.d.ts]
declare class file {}


After running Timeout callback:: count: 0

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 2:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 2:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
7: /user/username/projects/myproject/projects/project2/tsconfig.json
8: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/projects/project1/class3.d.ts] deleted

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/projects/project1/class3.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1:
  {}
/user/username/projects/myproject/projects/project2:
  {}

Timeout callback:: count: 2
7: /user/username/projects/myproject/projects/project2/tsconfig.json *new*
8: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/projects/myproject/projects/project2/class2.ts,/user/username/projects/myproject/projects/project1/class1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/projects/project2/class2.ts",
          "/user/username/projects/myproject/projects/project1/class1.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/class3.d.ts: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1:
  {}
/user/username/projects/myproject/projects/project2:
  {}

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
9: /user/username/projects/myproject/projects/project2/tsconfig.json
10: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/projects/project1/class3.d.ts]
declare class class3 {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/projects/project1/class3.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1:
  {}
/user/username/projects/myproject/projects/project2:
  {}

Timeout callback:: count: 2
9: /user/username/projects/myproject/projects/project2/tsconfig.json *new*
10: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project1/class3.d.ts Text-2 "declare class class3 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	../project1/class3.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/projects/myproject/projects/project2/class2.ts,/user/username/projects/myproject/projects/project1/class1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/projects/project2/class2.ts",
          "/user/username/projects/myproject/projects/project1/class1.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.d.ts: *new*
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project1:
  {}
/user/username/projects/myproject/projects/project2:
  {}
