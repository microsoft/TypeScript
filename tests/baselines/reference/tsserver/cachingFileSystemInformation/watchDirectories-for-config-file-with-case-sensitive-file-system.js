Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: true
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts]
export class SomeClass { };

//// [/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts]
export class configureStore { }

//// [/Users/someuser/work/applications/frontend/tsconfig.json]
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "target": "es2016",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "noEmitOnError": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "types": [
      "node",
      "jest"
    ],
    "noUnusedLocals": true,
    "outDir": "./compiled",
    "typeRoots": [
      "types",
      "node_modules/@types"
    ],
    "baseUrl": ".",
    "paths": {
      "*": [
        "types/*"
      ]
    }
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "compiled"
  ]
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
        "file": "/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined:: Result: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /Users/someuser/work/applications/frontend/tsconfig.json, currentDirectory: /Users/someuser/work/applications/frontend
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/tsconfig.json 2000 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /Users/someuser/work/applications/frontend/tsconfig.json : {
 "rootNames": [
  "/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts",
  "/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts"
 ],
 "options": {
  "strict": true,
  "strictNullChecks": true,
  "target": 3,
  "module": 1,
  "moduleResolution": 2,
  "sourceMap": true,
  "noEmitOnError": true,
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
  "types": [
   "node",
   "jest"
  ],
  "noUnusedLocals": true,
  "outDir": "/Users/someuser/work/applications/frontend/compiled",
  "typeRoots": [
   "/Users/someuser/work/applications/frontend/types",
   "/Users/someuser/work/applications/frontend/node_modules/@types"
  ],
  "baseUrl": "/Users/someuser/work/applications/frontend",
  "paths": {
   "*": [
    "types/*"
   ]
  },
  "pathsBasePath": "/Users/someuser/work/applications/frontend",
  "configFilePath": "/Users/someuser/work/applications/frontend/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/Users/someuser/work/applications/frontend/tsconfig.json",
        "reason": "Creating possible configured project for /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/types 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/types 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/node_modules 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/node_modules 1 undefined Project: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts Text-1 "export class configureStore { }"
	/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts SVC-1-0 "export class SomeClass { };"


	../../../../../home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	src/app/redux/configureStore.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'
	src/app/utils/Analytic.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/Users/someuser/work/applications/frontend/tsconfig.json"
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
          "projectId": "2d5aba8203e19ae7755135b7003574b6cb70305e31b882a3b790e72c763a9fed",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 58,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "strict": true,
            "strictNullChecks": true,
            "target": "es2016",
            "module": "commonjs",
            "moduleResolution": "node10",
            "sourceMap": true,
            "noEmitOnError": true,
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true,
            "types": [
              "",
              ""
            ],
            "noUnusedLocals": true,
            "outDir": "",
            "typeRoots": [
              "",
              ""
            ],
            "baseUrl": "",
            "paths": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": true,
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
        "triggerFile": "/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts",
        "configFile": "/Users/someuser/work/applications/frontend/tsconfig.json",
        "diagnostics": [
          {
            "text": "Cannot find type definition file for 'jest'.\n  The file is in the program because:\n    Entry point of type library 'jest' specified in compilerOptions",
            "code": 2688,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 14,
                    "offset": 7
                  },
                  "end": {
                    "line": 14,
                    "offset": 13
                  },
                  "file": "/Users/someuser/work/applications/frontend/tsconfig.json"
                },
                "message": "File is entry point of type library specified here.",
                "category": "message",
                "code": 1419
              }
            ]
          },
          {
            "text": "Cannot find type definition file for 'node'.\n  The file is in the program because:\n    Entry point of type library 'node' specified in compilerOptions",
            "code": 2688,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 13,
                    "offset": 7
                  },
                  "end": {
                    "line": 13,
                    "offset": 13
                  },
                  "file": "/Users/someuser/work/applications/frontend/tsconfig.json"
                },
                "message": "File is entry point of type library specified here.",
                "category": "message",
                "code": 1419
              }
            ]
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
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
//// [/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts] *Lib*


PolledWatches::
/Users/someuser/work/applications/frontend/node_modules: *new*
  {"pollingInterval":500}
/Users/someuser/work/applications/frontend/types: *new*
  {"pollingInterval":500}

FsWatches::
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts: *new*
  {}
/Users/someuser/work/applications/frontend/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts: *new*
  {}

FsWatchesRecursive::
/Users/someuser/work/applications/frontend/src: *new*
  {}

Projects::
/Users/someuser/work/applications/frontend/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts *new*
    version: Text-1
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json
/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts *new*
    version: Text-1
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts :: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts :: WatchInfo: /Users/someuser/work/applications/frontend/src 1 undefined Config: /Users/someuser/work/applications/frontend/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
1: /Users/someuser/work/applications/frontend/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts]
export class Cookie { }


Timeout callback:: count: 2
1: /Users/someuser/work/applications/frontend/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/Users/someuser/work/applications/frontend/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

Info seq  [hh:mm:ss:mss] Running: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Users/someuser/work/applications/frontend/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts Text-1 "export class configureStore { }"
	/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts SVC-1-0 "export class SomeClass { };"
	/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts Text-1 "export class Cookie { }"


	../../../../../home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	src/app/redux/configureStore.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'
	src/app/utils/Analytic.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'
	src/app/utils/Cookie.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/Users/someuser/work/applications/frontend/node_modules:
  {"pollingInterval":500}
/Users/someuser/work/applications/frontend/types:
  {"pollingInterval":500}

FsWatches::
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts:
  {}
/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts: *new*
  {}
/Users/someuser/work/applications/frontend/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}

FsWatchesRecursive::
/Users/someuser/work/applications/frontend/src:
  {}

Projects::
/Users/someuser/work/applications/frontend/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts
    version: Text-1
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json
/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json *default*
/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts *new*
    version: Text-1
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json

Info seq  [hh:mm:ss:mss] fileExists:: [
  {
    "key": "/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts",
    "count": 2
  }
]
Info seq  [hh:mm:ss:mss] directoryExists:: [
  {
    "key": "/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: [
  {
    "key": "/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] readDirectory:: []
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts ProjectRootPath: undefined:: Result: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/Users/someuser/work/applications/frontend/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Users/someuser/work/applications/frontend/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true
    }
After request

PolledWatches::
/Users/someuser/work/applications/frontend/node_modules:
  {"pollingInterval":500}
/Users/someuser/work/applications/frontend/types:
  {"pollingInterval":500}

FsWatches::
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts:
  {}
/Users/someuser/work/applications/frontend/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}

FsWatches *deleted*::
/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts:
  {}

FsWatchesRecursive::
/Users/someuser/work/applications/frontend/src:
  {}

ScriptInfos::
/Users/someuser/work/applications/frontend/src/app/redux/configureStore.ts
    version: Text-1
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json
/Users/someuser/work/applications/frontend/src/app/utils/Analytic.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json *default*
/Users/someuser/work/applications/frontend/src/app/utils/Cookie.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /Users/someuser/work/applications/frontend/tsconfig.json

Info seq  [hh:mm:ss:mss] fileExists:: []
Info seq  [hh:mm:ss:mss] directoryExists:: []
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: []
Info seq  [hh:mm:ss:mss] readDirectory:: []