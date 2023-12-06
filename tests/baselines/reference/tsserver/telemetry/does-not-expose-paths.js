currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a.ts]


//// [/tsconfig.json]
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
    "/a.ts"
  ]
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /a.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tsconfig.json",
        "reason": "Creating possible configured project for /a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts"
 ],
 "options": {
  "project": "/",
  "outFile": "/hunter2.js",
  "outDir": "/hunter2",
  "rootDir": "/hunter2",
  "baseUrl": "/hunter2",
  "rootDirs": [
   "/hunter2"
  ],
  "typeRoots": [
   "/hunter2"
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
  "declarationDir": "/hunter2",
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
  "pathsBasePath": "/",
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2015.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.dom.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a.ts SVC-1-0 ""


	a.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tsconfig.json"
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
          "projectId": "aace87d7c1572ff43c6978074161b586788b4518c7a9d06c79c03e613b6ce5a3",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
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
        "triggerFile": "/a.ts",
        "configFile": "/tsconfig.json",
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
                  "file": "/tsconfig.json"
                },
                "message": "File is entry point of type library specified here.",
                "category": "message",
                "code": 1419
              }
            ]
          },
          {
            "text": "File '/a/lib/lib.dom.d.ts' not found.\n  The file is in the program because:\n    Library 'lib.dom.d.ts' specified in compilerOptions",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "File '/a/lib/lib.es2015.d.ts' not found.\n  The file is in the program because:\n    Library 'lib.es2015.d.ts' specified in compilerOptions",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "File '/a.ts' is not under 'rootDir' '/hunter2'. 'rootDir' is expected to contain all source files.\n  The file is in the program because:\n    Part of 'files' list in tsconfig.json",
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
                    "offset": 12
                  },
                  "file": "/tsconfig.json"
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
            "text": "Option 'out' cannot be specified with option 'outFile'.",
            "code": 5053,
            "category": "error",
            "fileName": "/tsconfig.json"
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
            "fileName": "/tsconfig.json"
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
            "fileName": "/tsconfig.json"
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
            "fileName": "/tsconfig.json"
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
            "text": "Option 'declarationDir' cannot be specified with option 'out'.",
            "code": 5053,
            "category": "error",
            "fileName": "/tsconfig.json"
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
            "text": "Option 'out' cannot be specified with option 'outFile'.",
            "code": 5053,
            "category": "error",
            "fileName": "/tsconfig.json"
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
            "text": "Option 'out' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '\"ignoreDeprecations\": \"5.0\"' to silence this error.\n  Use 'outFile' instead.",
            "code": 5101,
            "category": "error",
            "fileName": "/tsconfig.json"
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
            "fileName": "/tsconfig.json"
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
            "text": "Option 'charset' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '\"ignoreDeprecations\": \"5.0\"' to silence this error.",
            "code": 5101,
            "category": "error",
            "fileName": "/tsconfig.json"
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
            "text": "Option 'declarationDir' cannot be specified with option 'out'.",
            "code": 5053,
            "category": "error",
            "fileName": "/tsconfig.json"
          },
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
            "fileName": "/tsconfig.json"
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
            "text": "Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2016.intl', 'es2017.date', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2019.intl', 'es2020.bigint', 'es2020.date', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2020.number', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'es2021.intl', 'es2022.array', 'es2022.error', 'es2022.intl', 'es2022.object', 'es2022.sharedmemory', 'es2022.string', 'es2022.regexp', 'es2023.array', 'es2023.collection', 'esnext.array', 'esnext.collection', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.disposable', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref', 'esnext.decorators', 'decorators', 'decorators.legacy'.",
            "code": 6046,
            "category": "error",
            "fileName": "/tsconfig.json"
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
            "fileName": "/tsconfig.json"
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
            "fileName": "/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.dom.d.ts: *new*
  {"pollingInterval":500}
/a/lib/lib.es2015.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
