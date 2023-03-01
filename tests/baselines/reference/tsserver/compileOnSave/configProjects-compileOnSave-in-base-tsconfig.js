Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/moduleFile1.ts]
export function Foo() { };

//// [/a/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/a/b/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/a/tsconfig.json]
{
                        "compileOnSave": true
                    }

//// [/a/b/tsconfig.json]
{
                        "extends": "/a/tsconfig.json"
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


Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/moduleFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Search path: /a/b
Info 3    [00:00:24.000] For info: /a/b/moduleFile1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1Consumer1.ts",
  "/a/b/file1Consumer2.ts",
  "/a/b/moduleFile1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Config: /a/b/tsconfig.json WatchType: Extended config file
Info 8    [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/file1Consumer1.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/b/file1Consumer2.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:33.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 13   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 16   [00:00:37.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:39.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/moduleFile1.ts SVC-1-0 "export function Foo() { };"
	/a/b/file1Consumer1.ts Text-1 "import {Foo} from \"./moduleFile1\"; export var y = 10;"
	/a/b/file1Consumer2.ts Text-1 "import {Foo} from \"./moduleFile1\"; let z = 10;"


	../lib/lib.d.ts
	  Default library for target 'es5'
	moduleFile1.ts
	  Imported via "./moduleFile1" from file 'file1Consumer1.ts'
	  Imported via "./moduleFile1" from file 'file1Consumer2.ts'
	  Matched by default include pattern '**/*'
	file1Consumer1.ts
	  Matched by default include pattern '**/*'
	file1Consumer2.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:40.000] -----------------------------------------------
Info 20   [00:00:41.000] Project '/a/b/tsconfig.json' (Configured)
Info 20   [00:00:42.000] 	Files (4)

Info 20   [00:00:43.000] -----------------------------------------------
Info 20   [00:00:44.000] Open files: 
Info 20   [00:00:45.000] 	FileName: /a/b/moduleFile1.ts ProjectRootPath: undefined
Info 20   [00:00:46.000] 		Projects: /a/b/tsconfig.json
Info 20   [00:00:47.000] response:
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
/a/tsconfig.json: *new*
  {}
/a/b/file1consumer1.ts: *new*
  {}
/a/b/file1consumer2.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 21   [00:00:48.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1Consumer1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 22   [00:00:49.000] FileWatcher:: Close:: WatchInfo: /a/b/file1Consumer1.ts 500 undefined WatchType: Closed Script info
Info 23   [00:00:50.000] Search path: /a/b
Info 24   [00:00:51.000] For info: /a/b/file1Consumer1.ts :: Config file name: /a/b/tsconfig.json
Info 25   [00:00:52.000] Project '/a/b/tsconfig.json' (Configured)
Info 25   [00:00:53.000] 	Files (4)

Info 25   [00:00:54.000] -----------------------------------------------
Info 25   [00:00:55.000] Open files: 
Info 25   [00:00:56.000] 	FileName: /a/b/moduleFile1.ts ProjectRootPath: undefined
Info 25   [00:00:57.000] 		Projects: /a/b/tsconfig.json
Info 25   [00:00:58.000] 	FileName: /a/b/file1Consumer1.ts ProjectRootPath: undefined
Info 25   [00:00:59.000] 		Projects: /a/b/tsconfig.json
Info 25   [00:01:00.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/tsconfig.json:
  {}
/a/b/file1consumer2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/file1consumer1.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info 26   [00:01:01.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b/moduleFile1.ts",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Info 27   [00:01:02.000] response:
    {
      "response": [
        {
          "projectFileName": "/a/b/tsconfig.json",
          "fileNames": [
            "/a/b/moduleFile1.ts",
            "/a/b/file1Consumer2.ts",
            "/a/b/file1Consumer1.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
After request
