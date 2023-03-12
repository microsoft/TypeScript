Info 0    [00:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/dependency/fns.ts]
function fn1() { }
function fn2() { }
// Introduce error for fnErr import in main
// function fnErr() { }
// Error in dependency ts file
let x: string = 10;

//// [/user/username/projects/myproject/dependency/tsconfig.json]
{"compilerOptions":{"composite":true,"outFile":"../dependency.js"}}

//// [/user/username/projects/myproject/usage/usage.ts]
fn1();
fn2();
fnErr();


//// [/user/username/projects/myproject/usage/tsconfig.json]
{"compilerOptions":{"composite":true,"outFile":"../usage.js"},"references":[{"path":"../dependency"}]}

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


Info 1    [00:00:30.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:31.000] Search path: /user/username/projects/myproject/usage
Info 3    [00:00:32.000] For info: /user/username/projects/myproject/usage/usage.ts :: Config file name: /user/username/projects/myproject/usage/tsconfig.json
Info 4    [00:00:33.000] Creating configuration project /user/username/projects/myproject/usage/tsconfig.json
Info 5    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Config file
Info 6    [00:00:35.000] Config: /user/username/projects/myproject/usage/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/usage/usage.ts"
 ],
 "options": {
  "composite": true,
  "outFile": "/user/username/projects/myproject/usage.js",
  "configFilePath": "/user/username/projects/myproject/usage/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/dependency",
   "originalPath": "../dependency"
  }
 ]
}
Info 7    [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage 1 undefined Config: /user/username/projects/myproject/usage/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage 1 undefined Config: /user/username/projects/myproject/usage/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:38.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json
Info 10   [00:00:39.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/dependency/fns.ts"
 ],
 "options": {
  "composite": true,
  "outFile": "/user/username/projects/myproject/dependency.js",
  "configFilePath": "/user/username/projects/myproject/dependency/tsconfig.json"
 }
}
Info 11   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Config file
Info 12   [00:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/fns.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 17   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 18   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 19   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 20   [00:00:49.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:00:50.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 22   [00:00:51.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/dependency/fns.ts Text-1 "function fn1() { }\nfunction fn2() { }\n// Introduce error for fnErr import in main\n// function fnErr() { }\n// Error in dependency ts file\nlet x: string = 10;"
	/user/username/projects/myproject/usage/usage.ts SVC-1-0 "fn1();\nfn2();\nfnErr();\n"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../dependency/fns.ts
	  Source from referenced project '../dependency/tsconfig.json' included because '--outFile' specified
	usage.ts
	  Matched by default include pattern '**/*'

Info 23   [00:00:52.000] -----------------------------------------------
Info 24   [00:00:53.000] Search path: /user/username/projects/myproject/usage
Info 25   [00:00:54.000] For info: /user/username/projects/myproject/usage/tsconfig.json :: No config files found.
Info 26   [00:00:55.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 26   [00:00:56.000] 	Files (3)

Info 26   [00:00:57.000] -----------------------------------------------
Info 26   [00:00:58.000] Open files: 
Info 26   [00:00:59.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 26   [00:01:00.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
Info 26   [00:01:01.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/usage/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/usage/tsconfig.json: *new*
  {}
/user/username/projects/myproject/dependency/tsconfig.json: *new*
  {}
/user/username/projects/myproject/dependency/fns.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/usage: *new*
  {}
/user/username/projects/myproject/dependency: *new*
  {}

Before request

Info 27   [00:01:02.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 28   [00:01:03.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 29   [00:01:04.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 30   [00:01:05.000] response:
    {
      "response": [
        {
          "start": {
            "line": 3,
            "offset": 1
          },
          "end": {
            "line": 3,
            "offset": 6
          },
          "text": "Cannot find name 'fnErr'.",
          "code": 2304,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 31   [00:01:06.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 32   [00:01:07.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 33   [00:01:08.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 34   [00:01:09.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 35   [00:01:10.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info 36   [00:01:11.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 37   [00:01:12.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 7,
      "type": "request"
    }
Info 38   [00:01:13.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 39   [00:01:14.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 8,
      "type": "request"
    }
Info 40   [00:01:15.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 41   [00:01:16.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 9,
      "type": "request"
    }
Info 42   [00:01:17.000] response:
    {
      "response": [
        {
          "start": {
            "line": 3,
            "offset": 1
          },
          "end": {
            "line": 3,
            "offset": 6
          },
          "text": "Cannot find name 'fnErr'.",
          "code": 2304,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 43   [00:01:18.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 10,
      "type": "request"
    }
Info 44   [00:01:19.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 45   [00:01:20.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 11,
      "type": "request"
    }
Info 46   [00:01:21.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 47   [00:01:22.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 12,
      "type": "request"
    }
Info 48   [00:01:23.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 49   [00:01:24.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 13,
      "type": "request"
    }
Info 50   [00:01:25.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
