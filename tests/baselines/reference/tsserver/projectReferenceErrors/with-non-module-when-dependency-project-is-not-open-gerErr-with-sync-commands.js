TI:: Creating typing installer
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


TI:: [00:00:29.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:30.000] Processing cache location '/a/data/'
TI:: [00:00:31.000] Trying to find '/a/data/package.json'...
TI:: [00:00:32.000] Finished processing cache location '/a/data/'
TI:: [00:00:33.000] Npm config file: /a/data/package.json
TI:: [00:00:34.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:39.000] Updating types-registry npm package...
TI:: [00:00:40.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:47.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:48.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:49.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:50.000] Search path: /user/username/projects/myproject/usage
Info 3    [00:00:51.000] For info: /user/username/projects/myproject/usage/usage.ts :: Config file name: /user/username/projects/myproject/usage/tsconfig.json
Info 4    [00:00:52.000] Creating configuration project /user/username/projects/myproject/usage/tsconfig.json
Info 5    [00:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Config file
Info 6    [00:00:54.000] Config: /user/username/projects/myproject/usage/tsconfig.json : {
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
Info 7    [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage 1 undefined Config: /user/username/projects/myproject/usage/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage 1 undefined Config: /user/username/projects/myproject/usage/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:57.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json
Info 10   [00:00:58.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/dependency/fns.ts"
 ],
 "options": {
  "composite": true,
  "outFile": "/user/username/projects/myproject/dependency.js",
  "configFilePath": "/user/username/projects/myproject/dependency/tsconfig.json"
 }
}
Info 11   [00:00:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Config file
Info 12   [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 13   [00:01:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 14   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/fns.ts 500 undefined WatchType: Closed Script info
Info 15   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 17   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/usage/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 18   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 19   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/usage/tsconfig.json WatchType: Type roots
Info 20   [00:01:08.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/usage/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:01:09.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 22   [00:01:10.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/fns.ts
	/user/username/projects/myproject/usage/usage.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../dependency/fns.ts
	  Source from referenced project '../dependency/tsconfig.json' included because '--outFile' specified
	usage.ts
	  Matched by default include pattern '**/*'

Info 23   [00:01:11.000] -----------------------------------------------
Info 24   [00:01:12.000] Search path: /user/username/projects/myproject/usage
Info 25   [00:01:13.000] For info: /user/username/projects/myproject/usage/tsconfig.json :: No config files found.
Info 26   [00:01:14.000] Project '/user/username/projects/myproject/usage/tsconfig.json' (Configured)
Info 26   [00:01:15.000] 	Files (3)

Info 26   [00:01:16.000] -----------------------------------------------
Info 26   [00:01:17.000] Open files: 
Info 26   [00:01:18.000] 	FileName: /user/username/projects/myproject/usage/usage.ts ProjectRootPath: undefined
Info 26   [00:01:19.000] 		Projects: /user/username/projects/myproject/usage/tsconfig.json
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

Info 26   [00:01:20.000] response:
    {
      "responseRequired": false
    }
Info 27   [00:01:21.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request

Info 28   [00:01:22.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 29   [00:01:23.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

After request

Info 30   [00:01:24.000] response:
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
Info 31   [00:01:25.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts"
      },
      "seq": 4,
      "type": "request"
    }
Before request

After request

Info 32   [00:01:26.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 33   [00:01:27.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 5,
      "type": "request"
    }
Before request

After request

Info 34   [00:01:28.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 35   [00:01:29.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 6,
      "type": "request"
    }
Before request

After request

Info 36   [00:01:30.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 37   [00:01:31.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts"
      },
      "seq": 7,
      "type": "request"
    }
Before request

After request

Info 38   [00:01:32.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 39   [00:01:33.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 8,
      "type": "request"
    }
Before request

After request

Info 40   [00:01:34.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 41   [00:01:35.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 9,
      "type": "request"
    }
Before request

After request

Info 42   [00:01:36.000] response:
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
Info 43   [00:01:37.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/usage/usage.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 10,
      "type": "request"
    }
Before request

After request

Info 44   [00:01:38.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 45   [00:01:39.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 11,
      "type": "request"
    }
Before request

After request

Info 46   [00:01:40.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 47   [00:01:41.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 12,
      "type": "request"
    }
Before request

After request

Info 48   [00:01:42.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 49   [00:01:43.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/dependency/fns.ts",
        "projectFileName": "/user/username/projects/myproject/usage/tsconfig.json"
      },
      "seq": 13,
      "type": "request"
    }
Before request

After request

Info 50   [00:01:44.000] response:
    {
      "response": [],
      "responseRequired": true
    }