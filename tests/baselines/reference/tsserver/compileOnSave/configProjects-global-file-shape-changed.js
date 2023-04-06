currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/moduleFile1.ts]
export function Foo() { };

//// [/a/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/a/b/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/a/b/globalFile3.ts]
interface GlobalFoo { age: number }

//// [/a/b/moduleFile2.ts]
export var Foo4 = 10;

//// [/a/b/tsconfig.json]
{
                        "compileOnSave": true
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


Info 1    [00:00:24.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/globalFile3.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:25.000] Search path: /a/b
Info 3    [00:00:26.000] For info: /a/b/globalFile3.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:27.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:29.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1Consumer1.ts",
  "/a/b/file1Consumer2.ts",
  "/a/b/globalFile3.ts",
  "/a/b/moduleFile1.ts",
  "/a/b/moduleFile2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/b/file1Consumer1.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/b/file1Consumer2.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile2.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:36.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 14   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 16   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 17   [00:00:40.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:00:41.000] Project '/a/b/tsconfig.json' (Configured)
Info 19   [00:00:42.000] 	Files (6)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/moduleFile1.ts Text-1 "export function Foo() { };"
	/a/b/file1Consumer1.ts Text-1 "import {Foo} from \"./moduleFile1\"; export var y = 10;"
	/a/b/file1Consumer2.ts Text-1 "import {Foo} from \"./moduleFile1\"; let z = 10;"
	/a/b/globalFile3.ts SVC-1-0 "interface GlobalFoo { age: number }"
	/a/b/moduleFile2.ts Text-1 "export var Foo4 = 10;"


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
	globalFile3.ts
	  Matched by default include pattern '**/*'
	moduleFile2.ts
	  Matched by default include pattern '**/*'

Info 20   [00:00:43.000] -----------------------------------------------
Info 21   [00:00:44.000] Project '/a/b/tsconfig.json' (Configured)
Info 21   [00:00:45.000] 	Files (6)

Info 21   [00:00:46.000] -----------------------------------------------
Info 21   [00:00:47.000] Open files: 
Info 21   [00:00:48.000] 	FileName: /a/b/globalFile3.ts ProjectRootPath: undefined
Info 21   [00:00:49.000] 		Projects: /a/b/tsconfig.json
Info 21   [00:00:50.000] response:
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
/a/b/file1consumer1.ts: *new*
  {}
/a/b/file1consumer2.ts: *new*
  {}
/a/b/modulefile1.ts: *new*
  {}
/a/b/modulefile2.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 22   [00:00:51.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/a/b/globalFile3.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "var T2: string;"
      },
      "seq": 2,
      "type": "request"
    }
Info 23   [00:00:52.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 24   [00:00:53.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b/globalFile3.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 25   [00:00:54.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 26   [00:00:55.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 27   [00:00:56.000] Project '/a/b/tsconfig.json' (Configured)
Info 28   [00:00:57.000] 	Files (6)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/moduleFile1.ts Text-1 "export function Foo() { };"
	/a/b/file1Consumer1.ts Text-1 "import {Foo} from \"./moduleFile1\"; export var y = 10;"
	/a/b/file1Consumer2.ts Text-1 "import {Foo} from \"./moduleFile1\"; let z = 10;"
	/a/b/globalFile3.ts SVC-1-1 "var T2: string;interface GlobalFoo { age: number }"
	/a/b/moduleFile2.ts Text-1 "export var Foo4 = 10;"

Info 29   [00:00:58.000] -----------------------------------------------
Info 30   [00:00:59.000] Before ensureProjectForOpenFiles:
Info 31   [00:01:00.000] Project '/a/b/tsconfig.json' (Configured)
Info 31   [00:01:01.000] 	Files (6)

Info 31   [00:01:02.000] -----------------------------------------------
Info 31   [00:01:03.000] Open files: 
Info 31   [00:01:04.000] 	FileName: /a/b/globalFile3.ts ProjectRootPath: undefined
Info 31   [00:01:05.000] 		Projects: /a/b/tsconfig.json
Info 31   [00:01:06.000] After ensureProjectForOpenFiles:
Info 32   [00:01:07.000] Project '/a/b/tsconfig.json' (Configured)
Info 32   [00:01:08.000] 	Files (6)

Info 32   [00:01:09.000] -----------------------------------------------
Info 32   [00:01:10.000] Open files: 
Info 32   [00:01:11.000] 	FileName: /a/b/globalFile3.ts ProjectRootPath: undefined
Info 32   [00:01:12.000] 		Projects: /a/b/tsconfig.json
Info 32   [00:01:13.000] response:
    {
      "response": [
        {
          "projectFileName": "/a/b/tsconfig.json",
          "fileNames": [
            "/a/b/globalFile3.ts",
            "/a/b/moduleFile1.ts",
            "/a/b/file1Consumer1.ts",
            "/a/b/file1Consumer2.ts",
            "/a/b/moduleFile2.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
After request
