currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/compiler/lib.es5.d.ts]
declare const eval: any

//// [/compiler/lib.es2015.promise.d.ts]
declare class Promise<T> {}

//// [/src/app.ts]
var x: Promise<string>;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": true,
    "sourceMap": false,
    "lib": [
      "es5"
    ]
  }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /src
Info seq  [hh:mm:ss:mss] For info: /src/app.ts :: Config file name: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/tsconfig.json 2000 undefined Project: /src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/src/tsconfig.json",
        "reason": "Creating possible configured project for /src/app.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /src/tsconfig.json : {
 "rootNames": [
  "/src/app.ts"
 ],
 "options": {
  "module": 1,
  "target": 1,
  "noImplicitAny": true,
  "sourceMap": false,
  "lib": [
   "lib.es5.d.ts"
  ],
  "configFilePath": "/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /src/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /compiler/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/compiler/lib.es5.d.ts Text-1 "declare const eval: any"
	/src/app.ts SVC-1-0 "var x: Promise<string>;"


	../compiler/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/src/tsconfig.json"
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
          "projectId": "7349243dd977a4becae4004c49b16906ff2feb7c53e98f1f8a6f4204047a9e04",
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
            "dtsSize": 23,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "module": "commonjs",
            "target": "es5",
            "noImplicitAny": true,
            "sourceMap": false,
            "lib": [
              "es5"
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
        "triggerFile": "/src/app.ts",
        "configFile": "/src/tsconfig.json",
        "diagnostics": [
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /src/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/compiler/lib.es5.d.ts: *new*
  {}
/src/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/src: *new*
  {}

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /src/tsconfig.json 1:: WatchInfo: /src/tsconfig.json 2000 undefined Project: /src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /src/tsconfig.json 1:: WatchInfo: /src/tsconfig.json 2000 undefined Project: /src/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /src/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": true,
    "sourceMap": false,
    "lib": [
      "es5",
      "es2015.promise"
    ]
  }
}


Timeout callback:: count: 2
1: /src/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] Running: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] Reloading configured project /src/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/src/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /src/tsconfig.json : {
 "rootNames": [
  "/src/app.ts"
 ],
 "options": {
  "module": 1,
  "target": 1,
  "noImplicitAny": true,
  "sourceMap": false,
  "lib": [
   "lib.es5.d.ts",
   "lib.es2015.promise.d.ts"
  ],
  "configFilePath": "/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /compiler/lib.es2015.promise.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /src/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/compiler/lib.es5.d.ts Text-1 "declare const eval: any"
	/compiler/lib.es2015.promise.d.ts Text-1 "declare class Promise<T> {}"
	/src/app.ts SVC-1-0 "var x: Promise<string>;"


	../compiler/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../compiler/lib.es2015.promise.d.ts
	  Library 'lib.es2015.promise.d.ts' specified in compilerOptions
	app.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/src/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/src/tsconfig.json",
        "configFile": "/src/tsconfig.json",
        "diagnostics": [
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /src/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /src/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /src/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /src/app.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/src/app.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

FsWatches::
/compiler/lib.es2015.promise.d.ts: *new*
  {}
/compiler/lib.es5.d.ts:
  {}
/src/tsconfig.json:
  {}

FsWatchesRecursive::
/src:
  {}
