currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let x = 10

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

//// [/a/b/tsconfig.json]
{
                // comment
                "compilerOptions": {
                    "inlineSourceMap": true,
                    "mapRoot": "./"
                }
            }


Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] Search path: /a/b
Info 3    [00:00:18.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:19.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:21.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "inlineSourceMap": true,
  "mapRoot": "./",
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:24.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:28.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:30.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "let x = 10"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:31.000] -----------------------------------------------
Info 17   [00:00:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:33.000] 	Files (2)

Info 17   [00:00:34.000] -----------------------------------------------
Info 17   [00:00:35.000] Open files: 
Info 17   [00:00:36.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 17   [00:00:37.000] 		Projects: /a/b/tsconfig.json
Info 17   [00:00:38.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 18   [00:00:39.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/tsconfig.json",
        "projectFileName": "/a/b/tsconfig.json",
        "includeLinePosition": true
      },
      "seq": 2,
      "type": "request"
    }
Info 19   [00:00:40.000] response:
    {
      "response": [
        {
          "message": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
          "start": 86,
          "length": 17,
          "category": "error",
          "code": 5053,
          "startLocation": {
            "line": 4,
            "offset": 21
          },
          "endLocation": {
            "line": 4,
            "offset": 38
          }
        },
        {
          "message": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
          "start": 131,
          "length": 9,
          "category": "error",
          "code": 5053,
          "startLocation": {
            "line": 5,
            "offset": 21
          },
          "endLocation": {
            "line": 5,
            "offset": 30
          }
        },
        {
          "message": "Option 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.",
          "start": 131,
          "length": 9,
          "category": "error",
          "code": 5069,
          "startLocation": {
            "line": 5,
            "offset": 21
          },
          "endLocation": {
            "line": 5,
            "offset": 30
          }
        }
      ],
      "responseRequired": true
    }
After request

Info 20   [00:00:44.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 21   [00:00:45.000] Scheduled: /a/b/tsconfig.json
Info 22   [00:00:46.000] Scheduled: *ensureProjectForOpenFiles*
Info 23   [00:00:47.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before request
//// [/a/b/tsconfig.json]
{
                "compilerOptions": {
                    "inlineSourceMap": true,
                    "mapRoot": "./"
                }
            }


Info 24   [00:00:48.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/tsconfig.json",
        "projectFileName": "/a/b/tsconfig.json",
        "includeLinePosition": true
      },
      "seq": 3,
      "type": "request"
    }
Info 25   [00:00:49.000] Reloading configured project /a/b/tsconfig.json
Info 26   [00:00:50.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "inlineSourceMap": true,
  "mapRoot": "./",
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 27   [00:00:51.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 28   [00:00:52.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 29   [00:00:53.000] Project '/a/b/tsconfig.json' (Configured)
Info 30   [00:00:54.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "let x = 10"

Info 31   [00:00:55.000] -----------------------------------------------
Info 32   [00:00:56.000] response:
    {
      "response": [
        {
          "message": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
          "start": 59,
          "length": 17,
          "category": "error",
          "code": 5053,
          "startLocation": {
            "line": 3,
            "offset": 21
          },
          "endLocation": {
            "line": 3,
            "offset": 38
          }
        },
        {
          "message": "Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.",
          "start": 104,
          "length": 9,
          "category": "error",
          "code": 5053,
          "startLocation": {
            "line": 4,
            "offset": 21
          },
          "endLocation": {
            "line": 4,
            "offset": 30
          }
        },
        {
          "message": "Option 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.",
          "start": 104,
          "length": 9,
          "category": "error",
          "code": 5069,
          "startLocation": {
            "line": 4,
            "offset": 21
          },
          "endLocation": {
            "line": 4,
            "offset": 30
          }
        }
      ],
      "responseRequired": true
    }
After request
