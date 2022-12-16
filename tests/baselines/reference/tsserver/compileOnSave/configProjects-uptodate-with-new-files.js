Info 0    [00:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:24.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/moduleFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:25.000] Search path: /a/b
Info 3    [00:00:26.000] For info: /a/b/moduleFile1.ts :: Config file name: /a/b/tsconfig.json
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
Info 11   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/b/globalFile3.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile2.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:36.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 14   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 16   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 17   [00:00:40.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:00:41.000] Project '/a/b/tsconfig.json' (Configured)
Info 19   [00:00:42.000] 	Files (6)
	/a/lib/lib.d.ts
	/a/b/moduleFile1.ts
	/a/b/file1Consumer1.ts
	/a/b/file1Consumer2.ts
	/a/b/globalFile3.ts
	/a/b/moduleFile2.ts


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
Info 21   [00:00:48.000] 	FileName: /a/b/moduleFile1.ts ProjectRootPath: undefined
Info 21   [00:00:49.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1.ts:
  {}
/a/b/file1consumer2.ts:
  {}
/a/b/globalfile3.ts:
  {}
/a/b/modulefile2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 21   [00:00:50.000] response:
    {
      "responseRequired": false
    }
Info 22   [00:00:51.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b/moduleFile1.ts",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1.ts:
  {}
/a/b/file1consumer2.ts:
  {}
/a/b/globalfile3.ts:
  {}
/a/b/modulefile2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1.ts:
  {}
/a/b/file1consumer2.ts:
  {}
/a/b/globalfile3.ts:
  {}
/a/b/modulefile2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 23   [00:00:52.000] response:
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
Info 24   [00:00:55.000] DirectoryWatcher:: Triggered with /a/b/file1Consumer3.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 25   [00:00:56.000] Scheduled: /a/b/tsconfig.json
Info 26   [00:00:57.000] Scheduled: *ensureProjectForOpenFiles*
Info 27   [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/file1Consumer3.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/a/b/file1Consumer3.ts]
import {Foo} from "./moduleFile1"; let y = Foo();


PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1.ts:
  {}
/a/b/file1consumer2.ts:
  {}
/a/b/globalfile3.ts:
  {}
/a/b/modulefile2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 28   [00:00:59.000] Running: /a/b/tsconfig.json
Info 29   [00:01:00.000] FileWatcher:: Added:: WatchInfo: /a/b/file1Consumer3.ts 500 undefined WatchType: Closed Script info
Info 30   [00:01:01.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 31   [00:01:02.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 32   [00:01:03.000] Project '/a/b/tsconfig.json' (Configured)
Info 33   [00:01:04.000] 	Files (7)
	/a/lib/lib.d.ts
	/a/b/moduleFile1.ts
	/a/b/file1Consumer1.ts
	/a/b/file1Consumer2.ts
	/a/b/globalFile3.ts
	/a/b/moduleFile2.ts
	/a/b/file1Consumer3.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	moduleFile1.ts
	  Imported via "./moduleFile1" from file 'file1Consumer1.ts'
	  Imported via "./moduleFile1" from file 'file1Consumer2.ts'
	  Matched by default include pattern '**/*'
	  Imported via "./moduleFile1" from file 'file1Consumer3.ts'
	file1Consumer1.ts
	  Matched by default include pattern '**/*'
	file1Consumer2.ts
	  Matched by default include pattern '**/*'
	globalFile3.ts
	  Matched by default include pattern '**/*'
	moduleFile2.ts
	  Matched by default include pattern '**/*'
	file1Consumer3.ts
	  Matched by default include pattern '**/*'

Info 34   [00:01:05.000] -----------------------------------------------
Info 35   [00:01:06.000] Running: *ensureProjectForOpenFiles*
Info 36   [00:01:07.000] Before ensureProjectForOpenFiles:
Info 37   [00:01:08.000] Project '/a/b/tsconfig.json' (Configured)
Info 37   [00:01:09.000] 	Files (7)

Info 37   [00:01:10.000] -----------------------------------------------
Info 37   [00:01:11.000] Open files: 
Info 37   [00:01:12.000] 	FileName: /a/b/moduleFile1.ts ProjectRootPath: undefined
Info 37   [00:01:13.000] 		Projects: /a/b/tsconfig.json
Info 37   [00:01:14.000] After ensureProjectForOpenFiles:
Info 38   [00:01:15.000] Project '/a/b/tsconfig.json' (Configured)
Info 38   [00:01:16.000] 	Files (7)

Info 38   [00:01:17.000] -----------------------------------------------
Info 38   [00:01:18.000] Open files: 
Info 38   [00:01:19.000] 	FileName: /a/b/moduleFile1.ts ProjectRootPath: undefined
Info 38   [00:01:20.000] 		Projects: /a/b/tsconfig.json
After running timeout callbacks

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1.ts:
  {}
/a/b/file1consumer2.ts:
  {}
/a/b/globalfile3.ts:
  {}
/a/b/modulefile2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/file1consumer3.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 38   [00:01:21.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/a/b/moduleFile1.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "export var T: number;"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1.ts:
  {}
/a/b/file1consumer2.ts:
  {}
/a/b/globalfile3.ts:
  {}
/a/b/modulefile2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/file1consumer3.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1.ts:
  {}
/a/b/file1consumer2.ts:
  {}
/a/b/globalfile3.ts:
  {}
/a/b/modulefile2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/file1consumer3.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 39   [00:01:22.000] response:
    {
      "responseRequired": false
    }
Info 40   [00:01:23.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/a/b/moduleFile1.ts",
        "projectFileName": "/a/b/tsconfig.json"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1.ts:
  {}
/a/b/file1consumer2.ts:
  {}
/a/b/globalfile3.ts:
  {}
/a/b/modulefile2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/file1consumer3.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 41   [00:01:24.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 42   [00:01:25.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 43   [00:01:26.000] Different program with same set of files
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/file1consumer1.ts:
  {}
/a/b/file1consumer2.ts:
  {}
/a/b/globalfile3.ts:
  {}
/a/b/modulefile2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/file1consumer3.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 44   [00:01:27.000] response:
    {
      "response": [
        {
          "projectFileName": "/a/b/tsconfig.json",
          "fileNames": [
            "/a/b/moduleFile1.ts",
            "/a/b/file1Consumer3.ts",
            "/a/b/file1Consumer2.ts",
            "/a/b/file1Consumer1.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }