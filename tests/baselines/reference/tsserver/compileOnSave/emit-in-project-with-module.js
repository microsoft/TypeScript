Info 0    [00:00:27.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:28.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/user/username/projects/myproject/file1.ts]
const x = 1;
function foo() {
    return "hello";
}

//// [/user/username/projects/myproject/file2.ts]
const y = 2;
function bar() {
    return "world";
}

//// [/user/username/projects/myproject/file3.ts]
const xy = 3;

//// [/user/username/projects/myproject/module.ts]
export const xyz = 4;

//// [/user/username/projects/myproject/tsconfig.json]
{"compileOnSave":true,"compilerOptions":{"declaration":false}}

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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:29.000] Search path: /user/username/projects/myproject
Info 3    [00:00:30.000] For info: /user/username/projects/myproject/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:31.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:33.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/file1.ts",
  "/user/username/projects/myproject/file2.ts",
  "/user/username/projects/myproject/file3.ts",
  "/user/username/projects/myproject/module.ts"
 ],
 "options": {
  "declaration": false,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file3.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/module.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:39.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 13   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 16   [00:00:43.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:44.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 18   [00:00:45.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/file1.ts
	/user/username/projects/myproject/file2.ts
	/user/username/projects/myproject/file3.ts
	/user/username/projects/myproject/module.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	module.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:46.000] -----------------------------------------------
Info 20   [00:00:47.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 20   [00:00:48.000] 	Files (5)

Info 20   [00:00:49.000] -----------------------------------------------
Info 20   [00:00:50.000] Open files: 
Info 20   [00:00:51.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 20   [00:00:52.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file2.ts:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 20   [00:00:53.000] response:
    {
      "responseRequired": false
    }
Info 21   [00:00:54.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/file2.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file2.ts:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 22   [00:00:55.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/file2.ts 500 undefined WatchType: Closed Script info
Info 23   [00:00:56.000] Search path: /user/username/projects/myproject
Info 24   [00:00:57.000] For info: /user/username/projects/myproject/file2.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 25   [00:00:58.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 25   [00:00:59.000] 	Files (5)

Info 25   [00:01:00.000] -----------------------------------------------
Info 25   [00:01:01.000] Open files: 
Info 25   [00:01:02.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 25   [00:01:03.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 25   [00:01:04.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 25   [00:01:05.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 25   [00:01:06.000] response:
    {
      "responseRequired": false
    }
Info 26   [00:01:07.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 27   [00:01:08.000] Before ensureProjectForOpenFiles:
Info 28   [00:01:09.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 28   [00:01:10.000] 	Files (5)

Info 28   [00:01:11.000] -----------------------------------------------
Info 28   [00:01:12.000] Open files: 
Info 28   [00:01:13.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 28   [00:01:14.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 28   [00:01:15.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 28   [00:01:16.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 28   [00:01:17.000] After ensureProjectForOpenFiles:
Info 29   [00:01:18.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 29   [00:01:19.000] 	Files (5)

Info 29   [00:01:20.000] -----------------------------------------------
Info 29   [00:01:21.000] Open files: 
Info 29   [00:01:22.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 29   [00:01:23.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 29   [00:01:24.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 29   [00:01:25.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 29   [00:01:26.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/file1.ts",
            "/user/username/projects/myproject/file2.ts",
            "/user/username/projects/myproject/file3.ts",
            "/user/username/projects/myproject/module.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
Info 30   [00:01:27.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 31   [00:01:30.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/file1.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 32   [00:01:31.000] Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/file1.js
Info 33   [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/file1.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
After request
//// [/user/username/projects/myproject/file1.js]
var x = 1;
function foo() {
    return "hello";
}



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 34   [00:01:33.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 35   [00:01:34.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file2.ts"
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 36   [00:01:37.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/file2.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 37   [00:01:38.000] Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/file2.js
Info 38   [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/file2.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
After request
//// [/user/username/projects/myproject/file2.js]
var y = 2;
function bar() {
    return "world";
}



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 39   [00:01:40.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 40   [00:01:41.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file3.ts"
      },
      "seq": 6,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 41   [00:01:44.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/file3.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 42   [00:01:45.000] Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/file3.js
Info 43   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/file3.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
After request
//// [/user/username/projects/myproject/file3.js]
var xy = 3;



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 44   [00:01:47.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 45   [00:01:48.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/module.ts"
      },
      "seq": 7,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 46   [00:01:51.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/module.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 47   [00:01:52.000] Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/module.js
Info 48   [00:01:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/module.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
After request
//// [/user/username/projects/myproject/module.js]
"use strict";
exports.__esModule = true;
exports.xyz = void 0;
exports.xyz = 4;



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 49   [00:01:54.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 50   [00:01:55.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/user/username/projects/myproject/file1.ts",
            "textChanges": [
              {
                "newText": "world",
                "start": {
                  "line": 3,
                  "offset": 13
                },
                "end": {
                  "line": 3,
                  "offset": 18
                }
              }
            ]
          }
        ]
      },
      "seq": 8,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 51   [00:01:56.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 52   [00:01:57.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 9,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 53   [00:01:58.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 54   [00:01:59.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 55   [00:02:00.000] Different program with same set of files
Info 56   [00:02:01.000] Before ensureProjectForOpenFiles:
Info 57   [00:02:02.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 57   [00:02:03.000] 	Files (5)

Info 57   [00:02:04.000] -----------------------------------------------
Info 57   [00:02:05.000] Open files: 
Info 57   [00:02:06.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 57   [00:02:07.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 57   [00:02:08.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 57   [00:02:09.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 57   [00:02:10.000] After ensureProjectForOpenFiles:
Info 58   [00:02:11.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 58   [00:02:12.000] 	Files (5)

Info 58   [00:02:13.000] -----------------------------------------------
Info 58   [00:02:14.000] Open files: 
Info 58   [00:02:15.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 58   [00:02:16.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 58   [00:02:17.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 58   [00:02:18.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 58   [00:02:19.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/file1.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
Info 59   [00:02:20.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 10,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

After request
//// [/user/username/projects/myproject/file1.js]
var x = 1;
function foo() {
    return "world";
}



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 60   [00:02:24.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 61   [00:02:25.000] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/user/username/projects/myproject/file2.ts",
            "textChanges": [
              {
                "newText": "hello",
                "start": {
                  "line": 3,
                  "offset": 13
                },
                "end": {
                  "line": 3,
                  "offset": 18
                }
              }
            ]
          }
        ]
      },
      "seq": 11,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 62   [00:02:26.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 63   [00:02:27.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/file2.ts"
      },
      "seq": 12,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 64   [00:02:28.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 65   [00:02:29.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 66   [00:02:30.000] Different program with same set of files
Info 67   [00:02:31.000] Before ensureProjectForOpenFiles:
Info 68   [00:02:32.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 68   [00:02:33.000] 	Files (5)

Info 68   [00:02:34.000] -----------------------------------------------
Info 68   [00:02:35.000] Open files: 
Info 68   [00:02:36.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 68   [00:02:37.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 68   [00:02:38.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 68   [00:02:39.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 68   [00:02:40.000] After ensureProjectForOpenFiles:
Info 69   [00:02:41.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 69   [00:02:42.000] 	Files (5)

Info 69   [00:02:43.000] -----------------------------------------------
Info 69   [00:02:44.000] Open files: 
Info 69   [00:02:45.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 69   [00:02:46.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 69   [00:02:47.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 69   [00:02:48.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 69   [00:02:49.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/file2.ts",
            "/user/username/projects/myproject/file1.ts",
            "/user/username/projects/myproject/file3.ts",
            "/user/username/projects/myproject/module.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
Info 70   [00:02:50.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file2.ts"
      },
      "seq": 13,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

After request
//// [/user/username/projects/myproject/file2.js]
var y = 2;
function bar() {
    return "hello";
}



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/user/username/projects/myproject/module.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 71   [00:02:54.000] response:
    {
      "response": true,
      "responseRequired": true
    }