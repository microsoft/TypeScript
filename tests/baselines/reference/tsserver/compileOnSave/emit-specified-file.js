TI:: [00:00:17.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:18.000] Processing cache location '/a/data/'
TI:: [00:00:19.000] Trying to find '/a/data/package.json'...
TI:: [00:00:20.000] Finished processing cache location '/a/data/'
Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/f1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/f1.ts]
export function Foo() { return 10; }

//// [/a/b/f2.ts]
import {Foo} from "./f1"; let y = Foo();

//// [/a/b/tsconfig.json]
{}

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


Info 2    [00:00:23.000] Search path: /a/b
Info 3    [00:00:24.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts",
  "/a/b/f2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:31.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 11   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:35.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:37.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/f1.ts
	/a/b/f2.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by default include pattern '**/*'
	  Imported via "./f1" from file 'f2.ts'
	f2.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:38.000] -----------------------------------------------
Info 18   [00:00:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:40.000] 	Files (3)

Info 18   [00:00:41.000] -----------------------------------------------
Info 18   [00:00:42.000] Open files: 
Info 18   [00:00:43.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 18   [00:00:44.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b/f2.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Info 18   [00:00:45.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:00:46.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/f2.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

Info 20   [00:00:47.000] FileWatcher:: Close:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:48.000] Search path: /a/b
Info 22   [00:00:49.000] For info: /a/b/f2.ts :: Config file name: /a/b/tsconfig.json
Info 23   [00:00:50.000] Project '/a/b/tsconfig.json' (Configured)
Info 23   [00:00:51.000] 	Files (3)

Info 23   [00:00:52.000] -----------------------------------------------
Info 23   [00:00:53.000] Open files: 
Info 23   [00:00:54.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 23   [00:00:55.000] 		Projects: /a/b/tsconfig.json
Info 23   [00:00:56.000] 	FileName: /a/b/f2.ts ProjectRootPath: undefined
Info 23   [00:00:57.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/f2.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 23   [00:00:58.000] response:
    {
      "responseRequired": false
    }
Info 24   [00:00:59.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/a/b/f1.ts",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Before request

Info 25   [00:01:02.000] DirectoryWatcher:: Triggered with /a/b/f1.js :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 26   [00:01:03.000] Project: /a/b/tsconfig.json Detected file add/remove of non supported extension: /a/b/f1.js
Info 27   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/f1.js :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
After request
//// [/a/b/f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
function Foo() { return 10; }
exports.Foo = Foo;



Info 28   [00:01:05.000] response:
    {
      "response": true,
      "responseRequired": true
    }