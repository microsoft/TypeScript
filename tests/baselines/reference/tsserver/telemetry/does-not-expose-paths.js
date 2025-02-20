Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a.ts]


//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "project": "",
    "outFile": "hunter2.js",
    "outDir": "hunter2",
    "rootDir": "hunter2",
    "baseUrl": "hunter2",
    "rootDirs": [
      "hunter2"
    ],
    "typeRoots": [
      "hunter2"
    ],
    "types": [
      "hunter2"
    ],
    "sourceRoot": "hunter2",
    "mapRoot": "hunter2",
    "jsxFactory": "hunter2",
    "out": "hunter2",
    "reactNamespace": "hunter2",
    "charset": "hunter2",
    "locale": "hunter2",
    "declarationDir": "hunter2",
    "paths": {
      "*": [
        "hunter2"
      ]
    },
    "declaration": true,
    "lib": [
      "es6",
      "dom",
      "hunter2"
    ],
    "checkJs": "hunter2",
    "unknownCompilerOption": "hunter2"
  },
  "files": [
    "/home/src/projects/project/a.ts"
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
        "file": "/home/src/projects/project/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/tsconfig.json, currentDirectory: /home/src/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/a.ts"
 ],
 "options": {
  "project": "/home/src/projects/project",
  "outFile": "/home/src/projects/project/hunter2.js",
  "outDir": "/home/src/projects/project/hunter2",
  "rootDir": "/home/src/projects/project/hunter2",
  "baseUrl": "/home/src/projects/project/hunter2",
  "rootDirs": [
   "/home/src/projects/project/hunter2"
  ],
  "typeRoots": [
   "/home/src/projects/project/hunter2"
  ],
  "types": [
   "hunter2"
  ],
  "sourceRoot": "hunter2",
  "mapRoot": "hunter2",
  "jsxFactory": "hunter2",
  "out": "hunter2",
  "reactNamespace": "hunter2",
  "charset": "hunter2",
  "declarationDir": "/home/src/projects/project/hunter2",
  "paths": {
   "*": [
    "hunter2"
   ]
  },
  "declaration": true,
  "lib": [
   "lib.es2015.d.ts",
   "lib.dom.d.ts"
  ],
  "pathsBasePath": "/home/src/projects/project",
  "configFilePath": "/home/src/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/hunter2 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/hunter2 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.dom.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2015.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.dom.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a.ts SVC-1-0 ""


	../../tslibs/TS/Lib/lib.es2015.d.ts
	  Library 'lib.es2015.d.ts' specified in compilerOptions
	../../tslibs/TS/Lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	a.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/tsconfig.json"
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
          "projectId": "1097a5f82e8323ba7aba7567ec06402f7ad4ea74abce44ec5efd223ac77ff169",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 826,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "project": "",
            "outFile": "",
            "outDir": "",
            "rootDir": "",
            "baseUrl": "",
            "rootDirs": [
              ""
            ],
            "typeRoots": [
              ""
            ],
            "types": [
              ""
            ],
            "sourceRoot": "",
            "mapRoot": "",
            "jsxFactory": "",
            "out": "",
            "reactNamespace": "",
            "charset": "",
            "declarationDir": "",
            "paths": "",
            "declaration": true,
            "lib": [
              "es6",
              "dom"
            ]
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
        "triggerFile": "/home/src/projects/project/a.ts",
        "configFile": "/home/src/projects/project/tsconfig.json",
        "diagnostics": [
          {
            "text": "Cannot find type definition file for 'hunter2'.\n  The file is in the program because:\n    Entry point of type library 'hunter2' specified in compilerOptions",
            "code": 2688,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 15,
                    "offset": 7
                  },
                  "end": {
                    "line": 15,
                    "offset": 16
                  },
                  "file": "/home/src/projects/project/tsconfig.json"
                },
                "message": "File is entry point of type library specified here.",
                "category": "message",
                "code": 1419
              }
            ]
          },
          {
            "text": "File '/home/src/projects/project/a.ts' is not under 'rootDir' '/home/src/projects/project/hunter2'. 'rootDir' is expected to contain all source files.\n  The file is in the program because:\n    Part of 'files' list in tsconfig.json",
            "code": 6059,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 40,
                    "offset": 5
                  },
                  "end": {
                    "line": 40,
                    "offset": 38
                  },
                  "file": "/home/src/projects/project/tsconfig.json"
                },
                "message": "File is matched by 'files' list specified here.",
                "category": "message",
                "code": 1410
              }
            ]
          },
          {
            "start": {
              "line": 4,
              "offset": 5
            },
            "end": {
              "line": 4,
              "offset": 14
            },
            "text": "Option 'declarationDir' cannot be specified with option 'outFile'.",
            "code": 5053,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 17,
              "offset": 5
            },
            "end": {
              "line": 17,
              "offset": 17
            },
            "text": "Option 'sourceRoot can only be used when either option '--inlineSourceMap' or option '--sourceMap' is provided.",
            "code": 5051,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 18,
              "offset": 5
            },
            "end": {
              "line": 18,
              "offset": 14
            },
            "text": "Option 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.",
            "code": 5069,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 19,
              "offset": 5
            },
            "end": {
              "line": 19,
              "offset": 17
            },
            "text": "Option 'reactNamespace' cannot be specified with option 'jsxFactory'.",
            "code": 5053,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 20,
              "offset": 5
            },
            "end": {
              "line": 20,
              "offset": 10
            },
            "text": "Option 'out' has been removed. Please remove it from your configuration.\n  Use 'outFile' instead.",
            "code": 5102,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 21,
              "offset": 5
            },
            "end": {
              "line": 21,
              "offset": 21
            },
            "text": "Option 'reactNamespace' cannot be specified with option 'jsxFactory'.",
            "code": 5053,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 22,
              "offset": 5
            },
            "end": {
              "line": 22,
              "offset": 14
            },
            "text": "Option 'charset' has been removed. Please remove it from your configuration.",
            "code": 5102,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 24,
              "offset": 5
            },
            "end": {
              "line": 24,
              "offset": 21
            },
            "text": "Option 'declarationDir' cannot be specified with option 'outFile'.",
            "code": 5053,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 23,
              "offset": 5
            },
            "end": {
              "line": 23,
              "offset": 13
            },
            "text": "Option 'locale' can only be specified on command line.",
            "code": 6266,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 34,
              "offset": 7
            },
            "end": {
              "line": 34,
              "offset": 16
            },
            "text": "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'esnext', 'dom', 'dom.iterable', 'dom.asynciterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'webworker.asynciterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2016.intl', 'es2017.arraybuffer', 'es2017.date', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2019.intl', 'es2020.bigint', 'es2020.date', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2020.number', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'es2021.intl', 'es2022.array', 'es2022.error', 'es2022.intl', 'es2022.object', 'es2022.string', 'es2022.regexp', 'es2023.array', 'es2023.collection', 'es2023.intl', 'es2024.arraybuffer', 'es2024.collection', 'es2024.object', 'es2024.promise', 'es2024.regexp', 'es2024.sharedmemory', 'es2024.string', 'esnext.array', 'esnext.collection', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.disposable', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref', 'esnext.decorators', 'esnext.object', 'esnext.regexp', 'esnext.iterator', 'esnext.float16', 'decorators', 'decorators.legacy'.",
            "code": 6046,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 36,
              "offset": 16
            },
            "end": {
              "line": 36,
              "offset": 25
            },
            "text": "Compiler option 'checkJs' requires a value of type boolean.",
            "code": 5024,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          },
          {
            "start": {
              "line": 37,
              "offset": 5
            },
            "end": {
              "line": 37,
              "offset": 28
            },
            "text": "Unknown compiler option 'unknownCompilerOption'.",
            "code": 5023,
            "category": "error",
            "fileName": "/home/src/projects/project/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/tsconfig.json
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
//// [/home/src/tslibs/TS/Lib/lib.es2015.d.ts] *Lib*

//// [/home/src/tslibs/TS/Lib/lib.dom.d.ts] *Lib*


PolledWatches::
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/hunter2: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.dom.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2015.d.ts: *new*
  {}

Projects::
/home/src/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.dom.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.es2015.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
