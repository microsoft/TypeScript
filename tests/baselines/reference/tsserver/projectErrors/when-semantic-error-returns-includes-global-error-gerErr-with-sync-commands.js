currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:22.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/user/username/projects/myproject/ui.ts]
const x = async (_action: string) => {
};

//// [/user/username/projects/myproject/tsconfig.json]
{}


Info 1    [00:00:23.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:24.000] Search path: /user/username/projects/myproject
Info 3    [00:00:25.000] For info: /user/username/projects/myproject/ui.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:26.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:28.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/ui.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:31.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 10   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 12   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:35.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:36.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 15   [00:00:37.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/ui.ts SVC-1-0 "const x = async (_action: string) => {\n};"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	ui.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:38.000] -----------------------------------------------
Info 17   [00:00:39.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:40.000] 	Files (2)

Info 17   [00:00:41.000] -----------------------------------------------
Info 17   [00:00:42.000] Open files: 
Info 17   [00:00:43.000] 	FileName: /user/username/projects/myproject/ui.ts ProjectRootPath: undefined
Info 17   [00:00:44.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 17   [00:00:45.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Before request

Info 18   [00:00:46.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts",
        "projectFileName": "/user/username/projects/myproject/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Info 19   [00:00:47.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 20   [00:00:48.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts",
        "projectFileName": "/user/username/projects/myproject/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info 21   [00:00:49.000] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 11
          },
          "end": {
            "line": 1,
            "offset": 39
          },
          "text": "An async function or method must return a 'Promise'. Make sure you have a declaration for 'Promise' or include 'ES2015' in your '--lib' option.",
          "code": 2697,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 22   [00:00:50.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts",
        "projectFileName": "/user/username/projects/myproject/tsconfig.json"
      },
      "seq": 4,
      "type": "request"
    }
Info 23   [00:00:51.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
