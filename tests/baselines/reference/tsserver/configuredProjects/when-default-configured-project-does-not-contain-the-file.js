currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:42.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/bar/tsconfig.json]
{}

//// [/user/username/projects/myproject/bar/index.ts]
import {foo} from "../foo/lib";
foo();

//// [/user/username/projects/myproject/foobar/tsconfig.json]
/user/username/projects/myproject/bar/tsconfig.json

//// [/user/username/projects/myproject/foobar/index.ts]
import {foo} from "../foo/lib";
foo();

//// [/user/username/projects/myproject/foo/tsconfig.json]
{"include":["index.ts"],"compilerOptions":{"declaration":true,"outDir":"lib"}}

//// [/user/username/projects/myproject/foo/index.ts]
export function foo() {}

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

//// [/user/username/projects/myproject/foo/lib/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
function foo() { }
exports.foo = foo;


//// [/user/username/projects/myproject/foo/lib/index.d.ts]
export declare function foo(): void;



Info 1    [00:00:43.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/bar/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:44.000] Search path: /user/username/projects/myproject/bar
Info 3    [00:00:45.000] For info: /user/username/projects/myproject/bar/index.ts :: Config file name: /user/username/projects/myproject/bar/tsconfig.json
Info 4    [00:00:46.000] Creating configuration project /user/username/projects/myproject/bar/tsconfig.json
Info 5    [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Config file
Info 6    [00:00:48.000] Config: /user/username/projects/myproject/bar/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/bar/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/bar/tsconfig.json"
 }
}
Info 7    [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar 1 undefined Config: /user/username/projects/myproject/bar/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar 1 undefined Config: /user/username/projects/myproject/bar/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:51.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json
Info 10   [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 15   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 16   [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 17   [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 18   [00:01:00.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:01:01.000] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info 20   [00:01:02.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/foo/lib/index.d.ts Text-1 "export declare function foo(): void;\n"
	/user/username/projects/myproject/bar/index.ts SVC-1-0 "import {foo} from \"../foo/lib\";\nfoo();"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../foo/lib/index.d.ts
	  Imported via "../foo/lib" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 21   [00:01:03.000] -----------------------------------------------
Info 22   [00:01:04.000] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info 22   [00:01:05.000] 	Files (3)

Info 22   [00:01:06.000] -----------------------------------------------
Info 22   [00:01:07.000] Open files: 
Info 22   [00:01:08.000] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info 22   [00:01:09.000] 		Projects: /user/username/projects/myproject/bar/tsconfig.json
Info 22   [00:01:10.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/bar/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/bar/tsconfig.json: *new*
  {}
/user/username/projects/myproject/foo/lib/index.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/bar: *new*
  {}
/user/username/projects/myproject/foo: *new*
  {}

Before request

Info 23   [00:01:11.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/foobar/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 24   [00:01:12.000] Search path: /user/username/projects/myproject/foobar
Info 25   [00:01:13.000] For info: /user/username/projects/myproject/foobar/index.ts :: Config file name: /user/username/projects/myproject/foobar/tsconfig.json
Info 26   [00:01:14.000] Creating configuration project /user/username/projects/myproject/foobar/tsconfig.json
Info 27   [00:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Config file
Info 28   [00:01:16.000] Config: /user/username/projects/myproject/foobar/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/foobar/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/foobar/tsconfig.json"
 }
}
Info 29   [00:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar 1 undefined Config: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Wild card directory
Info 30   [00:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar 1 undefined Config: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Wild card directory
Info 31   [00:01:19.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/foobar/tsconfig.json
Info 32   [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Failed Lookup Locations
Info 33   [00:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Failed Lookup Locations
Info 34   [00:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info 35   [00:01:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info 36   [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info 37   [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info 38   [00:01:26.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/foobar/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 39   [00:01:27.000] Project '/user/username/projects/myproject/foobar/tsconfig.json' (Configured)
Info 40   [00:01:28.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/foo/lib/index.d.ts Text-1 "export declare function foo(): void;\n"
	/user/username/projects/myproject/foobar/index.ts SVC-1-0 "import {foo} from \"../foo/lib\";\nfoo();"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../foo/lib/index.d.ts
	  Imported via "../foo/lib" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 41   [00:01:29.000] -----------------------------------------------
Info 42   [00:01:30.000] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info 42   [00:01:31.000] 	Files (3)

Info 42   [00:01:32.000] -----------------------------------------------
Info 42   [00:01:33.000] Project '/user/username/projects/myproject/foobar/tsconfig.json' (Configured)
Info 42   [00:01:34.000] 	Files (3)

Info 42   [00:01:35.000] -----------------------------------------------
Info 42   [00:01:36.000] Open files: 
Info 42   [00:01:37.000] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info 42   [00:01:38.000] 		Projects: /user/username/projects/myproject/bar/tsconfig.json
Info 42   [00:01:39.000] 	FileName: /user/username/projects/myproject/foobar/index.ts ProjectRootPath: undefined
Info 42   [00:01:40.000] 		Projects: /user/username/projects/myproject/foobar/tsconfig.json
Info 42   [00:01:41.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/bar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/foobar/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/bar/tsconfig.json:
  {}
/user/username/projects/myproject/foo/lib/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/foobar/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/bar:
  {}
/user/username/projects/myproject/foo:
  {}
/user/username/projects/myproject/foobar: *new*
  {}

Before request

Info 43   [00:01:42.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/index.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 44   [00:01:43.000] Search path: /user/username/projects/myproject/foo
Info 45   [00:01:44.000] For info: /user/username/projects/myproject/foo/index.ts :: Config file name: /user/username/projects/myproject/foo/tsconfig.json
Info 46   [00:01:45.000] Creating configuration project /user/username/projects/myproject/foo/tsconfig.json
Info 47   [00:01:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Config file
Info 48   [00:01:47.000] Config: /user/username/projects/myproject/foo/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/foo/index.ts"
 ],
 "options": {
  "declaration": true,
  "outDir": "/user/username/projects/myproject/foo/lib",
  "configFilePath": "/user/username/projects/myproject/foo/tsconfig.json"
 }
}
Info 49   [00:01:48.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json
Info 50   [00:01:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 51   [00:01:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 52   [00:01:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 53   [00:01:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 54   [00:01:53.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 55   [00:01:54.000] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info 56   [00:01:55.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/foo/index.ts SVC-1-0 "export function foo() {}"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by include pattern 'index.ts' in 'tsconfig.json'

Info 57   [00:01:56.000] -----------------------------------------------
Info 58   [00:01:57.000] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info 58   [00:01:58.000] 	Files (3)

Info 58   [00:01:59.000] -----------------------------------------------
Info 58   [00:02:00.000] Project '/user/username/projects/myproject/foobar/tsconfig.json' (Configured)
Info 58   [00:02:01.000] 	Files (3)

Info 58   [00:02:02.000] -----------------------------------------------
Info 58   [00:02:03.000] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info 58   [00:02:04.000] 	Files (2)

Info 58   [00:02:05.000] -----------------------------------------------
Info 58   [00:02:06.000] Open files: 
Info 58   [00:02:07.000] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info 58   [00:02:08.000] 		Projects: /user/username/projects/myproject/bar/tsconfig.json
Info 58   [00:02:09.000] 	FileName: /user/username/projects/myproject/foobar/index.ts ProjectRootPath: undefined
Info 58   [00:02:10.000] 		Projects: /user/username/projects/myproject/foobar/tsconfig.json
Info 58   [00:02:11.000] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info 58   [00:02:12.000] 		Projects: /user/username/projects/myproject/foo/tsconfig.json
Info 58   [00:02:13.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/bar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/foobar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/foo/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/bar/tsconfig.json:
  {}
/user/username/projects/myproject/foo/lib/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/foobar/tsconfig.json:
  {}
/user/username/projects/myproject/foo/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/bar:
  {}
/user/username/projects/myproject/foo:
  {}
/user/username/projects/myproject/foobar:
  {}

Before request

Info 59   [00:02:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/lib/index.d.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 60   [00:02:15.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/foo/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info 61   [00:02:16.000] Search path: /user/username/projects/myproject/foo/lib
Info 62   [00:02:17.000] For info: /user/username/projects/myproject/foo/lib/index.d.ts :: Config file name: /user/username/projects/myproject/foo/tsconfig.json
Info 63   [00:02:18.000] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info 63   [00:02:19.000] 	Files (3)

Info 63   [00:02:20.000] -----------------------------------------------
Info 63   [00:02:21.000] Project '/user/username/projects/myproject/foobar/tsconfig.json' (Configured)
Info 63   [00:02:22.000] 	Files (3)

Info 63   [00:02:23.000] -----------------------------------------------
Info 63   [00:02:24.000] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info 63   [00:02:25.000] 	Files (2)

Info 63   [00:02:26.000] -----------------------------------------------
Info 63   [00:02:27.000] Open files: 
Info 63   [00:02:28.000] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info 63   [00:02:29.000] 		Projects: /user/username/projects/myproject/bar/tsconfig.json
Info 63   [00:02:30.000] 	FileName: /user/username/projects/myproject/foobar/index.ts ProjectRootPath: undefined
Info 63   [00:02:31.000] 		Projects: /user/username/projects/myproject/foobar/tsconfig.json
Info 63   [00:02:32.000] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info 63   [00:02:33.000] 		Projects: /user/username/projects/myproject/foo/tsconfig.json
Info 63   [00:02:34.000] 	FileName: /user/username/projects/myproject/foo/lib/index.d.ts ProjectRootPath: undefined
Info 63   [00:02:35.000] 		Projects: /user/username/projects/myproject/bar/tsconfig.json,/user/username/projects/myproject/foobar/tsconfig.json
Info 63   [00:02:36.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/bar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/foobar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/foo/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/bar/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/foobar/tsconfig.json:
  {}
/user/username/projects/myproject/foo/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/foo/lib/index.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/bar:
  {}
/user/username/projects/myproject/foo:
  {}
/user/username/projects/myproject/foobar:
  {}

Before request

Info 64   [00:02:37.000] request:
    {
      "command": "getApplicableRefactors",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/lib/index.d.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 1
      },
      "seq": 5,
      "type": "request"
    }
Info 65   [00:02:38.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Default project for file: /user/username/projects/myproject/foo/lib/index.d.ts: /user/username/projects/myproject/bar/tsconfig.json