currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
class c { prop = "hello"; foo() { const x = 0; } }

//// [/b.ts]
class c { prop = "hello"; foo() { const x = 0; } }

//// [/c.ts]
class c { prop = "hello"; foo() { const x = 0; } }

//// [/tsconfig.json]
{"compilerOptions":{"plugins":[{"name":"myplugin"}]}}

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


Info 1    [00:00:18.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:19.000] Search path: /
Info 3    [00:00:20.000] For info: /a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:21.000] Creating configuration project /tsconfig.json
Info 5    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:23.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts",
  "/b.ts",
  "/c.ts",
  "/a/lib/lib.d.ts"
 ],
 "options": {
  "plugins": [
   {
    "name": "myplugin"
   }
  ],
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:26.000] Enabling plugin myplugin from candidate paths: /a/lib/tsc.js/../../..
Info 10   [00:00:27.000] Loading myplugin from /a/lib/tsc.js/../../.. (resolved to /a/lib/tsc.js/../../../node_modules)
Info 11   [00:00:28.000] Plugin validation succeeded
Info 12   [00:00:29.000] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:30.000] FileWatcher:: Added:: WatchInfo: /c.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:32.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 16   [00:00:33.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:34.000] Project '/tsconfig.json' (Configured)
Info 18   [00:00:35.000] 	Files (4)
	/a.ts SVC-1-0 "class c { prop = \"hello\"; foo() { const x = 0; } }"
	/b.ts Text-1 "class c { prop = \"hello\"; foo() { const x = 0; } }"
	/c.ts Text-1 "class c { prop = \"hello\"; foo() { const x = 0; } }"
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"


	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'
	c.ts
	  Matched by default include pattern '**/*'
	a/lib/lib.d.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:36.000] -----------------------------------------------
Info 20   [00:00:37.000] Project '/tsconfig.json' (Configured)
Info 20   [00:00:38.000] 	Files (4)

Info 20   [00:00:39.000] -----------------------------------------------
Info 20   [00:00:40.000] Open files: 
Info 20   [00:00:41.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 20   [00:00:42.000] 		Projects: /tsconfig.json
Info 20   [00:00:43.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/tsconfig.json: *new*
  {}
/b.ts: *new*
  {}
/c.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}

Before request

Info 21   [00:00:44.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 22   [00:00:45.000] FileWatcher:: Close:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info 23   [00:00:46.000] Search path: /
Info 24   [00:00:47.000] For info: /b.ts :: Config file name: /tsconfig.json
Info 25   [00:00:48.000] Project '/tsconfig.json' (Configured)
Info 25   [00:00:49.000] 	Files (4)

Info 25   [00:00:50.000] -----------------------------------------------
Info 25   [00:00:51.000] Open files: 
Info 25   [00:00:52.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 25   [00:00:53.000] 		Projects: /tsconfig.json
Info 25   [00:00:54.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 25   [00:00:55.000] 		Projects: /tsconfig.json
Info 25   [00:00:56.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/tsconfig.json:
  {}
/c.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/b.ts:
  {}

FsWatchesRecursive::
/:
  {}

Before request

Info 26   [00:00:57.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/c.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 27   [00:00:58.000] FileWatcher:: Close:: WatchInfo: /c.ts 500 undefined WatchType: Closed Script info
Info 28   [00:00:59.000] Search path: /
Info 29   [00:01:00.000] For info: /c.ts :: Config file name: /tsconfig.json
Info 30   [00:01:01.000] Project '/tsconfig.json' (Configured)
Info 30   [00:01:02.000] 	Files (4)

Info 30   [00:01:03.000] -----------------------------------------------
Info 30   [00:01:04.000] Open files: 
Info 30   [00:01:05.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 30   [00:01:06.000] 		Projects: /tsconfig.json
Info 30   [00:01:07.000] 	FileName: /b.ts ProjectRootPath: undefined
Info 30   [00:01:08.000] 		Projects: /tsconfig.json
Info 30   [00:01:09.000] 	FileName: /c.ts ProjectRootPath: undefined
Info 30   [00:01:10.000] 		Projects: /tsconfig.json
Info 30   [00:01:11.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/c.ts:
  {}

FsWatchesRecursive::
/:
  {}

Before request

Info 31   [00:01:12.000] request:
    {
      "command": "getSupportedCodeFixes",
      "seq": 4,
      "type": "request"
    }
Info 32   [00:01:13.000] response:
    {
      "response": "ts.getSupportedCodeFixes()",
      "responseRequired": true
    }
After request

Before request

Info 33   [00:01:14.000] request:
    {
      "command": "getSupportedCodeFixes",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 34   [00:01:15.000] response:
    {
      "response": [
        "a"
      ],
      "responseRequired": true
    }
After request

Before request

Info 35   [00:01:16.000] request:
    {
      "command": "getSupportedCodeFixes",
      "arguments": {
        "file": "/b.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info 36   [00:01:17.000] response:
    {
      "response": [
        "b"
      ],
      "responseRequired": true
    }
After request

Before request

Info 37   [00:01:18.000] request:
    {
      "command": "getSupportedCodeFixes",
      "arguments": {
        "file": "/c.ts"
      },
      "seq": 7,
      "type": "request"
    }
Info 38   [00:01:19.000] response:
    {
      "response": "ts.getSupportedCodeFixes()",
      "responseRequired": true
    }
After request

Before request

Info 39   [00:01:20.000] request:
    {
      "command": "getSupportedCodeFixes",
      "arguments": {
        "projectFileName": "/tsconfig.json"
      },
      "seq": 8,
      "type": "request"
    }
Info 40   [00:01:21.000] response:
    {
      "response": "ts.getSupportedCodeFixes()",
      "responseRequired": true
    }
After request
