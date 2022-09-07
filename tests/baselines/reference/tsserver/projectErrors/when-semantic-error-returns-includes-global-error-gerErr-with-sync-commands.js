Info 0    [16:00:22.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:23.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts"
      }
    }
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:24.000] Search path: /user/username/projects/myproject
Info 3    [16:00:25.000] For info: /user/username/projects/myproject/ui.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [16:00:26.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [16:00:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [16:00:28.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/ui.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [16:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:31.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:32.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 11   [16:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [16:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [16:00:36.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [16:00:37.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 16   [16:00:38.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/ui.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	ui.ts
	  Matched by default include pattern '**/*'

Info 17   [16:00:39.000] -----------------------------------------------
Info 18   [16:00:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 18   [16:00:41.000] 	Files (2)

Info 18   [16:00:42.000] -----------------------------------------------
Info 18   [16:00:43.000] Open files: 
Info 18   [16:00:44.000] 	FileName: /user/username/projects/myproject/ui.ts ProjectRootPath: undefined
Info 18   [16:00:45.000] 		Projects: /user/username/projects/myproject/tsconfig.json

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 18   [16:00:46.000] response:
    {
      "responseRequired": false
    }
Info 19   [16:00:47.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts",
        "projectFileName": "/user/username/projects/myproject/tsconfig.json"
      },
      "seq": 1,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 20   [16:00:48.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 21   [16:00:49.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts",
        "projectFileName": "/user/username/projects/myproject/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 22   [16:00:50.000] response:
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
Info 23   [16:00:51.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts",
        "projectFileName": "/user/username/projects/myproject/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 24   [16:00:52.000] response:
    {
      "response": [],
      "responseRequired": true
    }