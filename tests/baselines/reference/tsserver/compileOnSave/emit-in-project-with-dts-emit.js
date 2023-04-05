currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/user/username/projects/myproject/tsconfig.json]
{"compileOnSave":true,"compilerOptions":{"declaration":true,"module":"none"}}

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


Info 1    [00:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:27.000] Search path: /user/username/projects/myproject
Info 3    [00:00:28.000] For info: /user/username/projects/myproject/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:29.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:31.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/file1.ts",
  "/user/username/projects/myproject/file2.ts",
  "/user/username/projects/myproject/file3.ts"
 ],
 "options": {
  "declaration": true,
  "module": 0,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file3.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:36.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 12   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [00:00:40.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:41.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:42.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/file1.ts SVC-1-0 "const x = 1;\nfunction foo() {\n    return \"hello\";\n}"
	/user/username/projects/myproject/file2.ts Text-1 "const y = 2;\nfunction bar() {\n    return \"world\";\n}"
	/user/username/projects/myproject/file3.ts Text-1 "const xy = 3;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:43.000] -----------------------------------------------
Info 19   [00:00:44.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 19   [00:00:45.000] 	Files (4)

Info 19   [00:00:46.000] -----------------------------------------------
Info 19   [00:00:47.000] Open files: 
Info 19   [00:00:48.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 19   [00:00:49.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 19   [00:00:50.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/file2.ts: *new*
  {}
/user/username/projects/myproject/file3.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Before request

Info 20   [00:00:51.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/file2.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 21   [00:00:52.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/file2.ts 500 undefined WatchType: Closed Script info
Info 22   [00:00:53.000] Search path: /user/username/projects/myproject
Info 23   [00:00:54.000] For info: /user/username/projects/myproject/file2.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 24   [00:00:55.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 24   [00:00:56.000] 	Files (4)

Info 24   [00:00:57.000] -----------------------------------------------
Info 24   [00:00:58.000] Open files: 
Info 24   [00:00:59.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 24   [00:01:00.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 24   [00:01:01.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 24   [00:01:02.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 24   [00:01:03.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/file2.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Before request

Info 25   [00:01:04.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 26   [00:01:05.000] Before ensureProjectForOpenFiles:
Info 27   [00:01:06.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 27   [00:01:07.000] 	Files (4)

Info 27   [00:01:08.000] -----------------------------------------------
Info 27   [00:01:09.000] Open files: 
Info 27   [00:01:10.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 27   [00:01:11.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 27   [00:01:12.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 27   [00:01:13.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 27   [00:01:14.000] After ensureProjectForOpenFiles:
Info 28   [00:01:15.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 28   [00:01:16.000] 	Files (4)

Info 28   [00:01:17.000] -----------------------------------------------
Info 28   [00:01:18.000] Open files: 
Info 28   [00:01:19.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 28   [00:01:20.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 28   [00:01:21.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 28   [00:01:22.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 28   [00:01:23.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/file1.ts",
            "/user/username/projects/myproject/file2.ts",
            "/user/username/projects/myproject/file3.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 29   [00:01:24.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 30   [00:01:27.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/file1.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 31   [00:01:28.000] Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/file1.js
Info 32   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/file1.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 33   [00:01:32.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/file1.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 34   [00:01:33.000] Project: /user/username/projects/myproject/tsconfig.json Detected output file: /user/username/projects/myproject/file1.d.ts
Info 35   [00:01:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/file1.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 36   [00:01:35.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/user/username/projects/myproject/file1.js]
var x = 1;
function foo() {
    return "hello";
}


//// [/user/username/projects/myproject/file1.d.ts]
declare const x = 1;
declare function foo(): string;



Before request

Info 37   [00:01:36.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file2.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 38   [00:01:39.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/file2.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 39   [00:01:40.000] Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/file2.js
Info 40   [00:01:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/file2.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 41   [00:01:44.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/file2.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 42   [00:01:45.000] Project: /user/username/projects/myproject/tsconfig.json Detected output file: /user/username/projects/myproject/file2.d.ts
Info 43   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/file2.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 44   [00:01:47.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/user/username/projects/myproject/file2.js]
var y = 2;
function bar() {
    return "world";
}


//// [/user/username/projects/myproject/file2.d.ts]
declare const y = 2;
declare function bar(): string;



Before request

Info 45   [00:01:48.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file3.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info 46   [00:01:51.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/file3.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 47   [00:01:52.000] Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/file3.js
Info 48   [00:01:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/file3.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 49   [00:01:56.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/file3.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 50   [00:01:57.000] Project: /user/username/projects/myproject/tsconfig.json Detected output file: /user/username/projects/myproject/file3.d.ts
Info 51   [00:01:58.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/file3.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 52   [00:01:59.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/user/username/projects/myproject/file3.js]
var xy = 3;


//// [/user/username/projects/myproject/file3.d.ts]
declare const xy = 3;



Before request

Info 53   [00:02:00.000] request:
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
      "seq": 7,
      "type": "request"
    }
Info 54   [00:02:01.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info 55   [00:02:02.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info 56   [00:02:03.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 57   [00:02:04.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 58   [00:02:05.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 59   [00:02:06.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/file1.ts SVC-1-1 "const x = 1;\nfunction foo() {\n    return \"world\";\n}"
	/user/username/projects/myproject/file2.ts Text-1 "const y = 2;\nfunction bar() {\n    return \"world\";\n}"
	/user/username/projects/myproject/file3.ts Text-1 "const xy = 3;"

Info 60   [00:02:07.000] -----------------------------------------------
Info 61   [00:02:08.000] Before ensureProjectForOpenFiles:
Info 62   [00:02:09.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 62   [00:02:10.000] 	Files (4)

Info 62   [00:02:11.000] -----------------------------------------------
Info 62   [00:02:12.000] Open files: 
Info 62   [00:02:13.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 62   [00:02:14.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 62   [00:02:15.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 62   [00:02:16.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 62   [00:02:17.000] After ensureProjectForOpenFiles:
Info 63   [00:02:18.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 63   [00:02:19.000] 	Files (4)

Info 63   [00:02:20.000] -----------------------------------------------
Info 63   [00:02:21.000] Open files: 
Info 63   [00:02:22.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 63   [00:02:23.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 63   [00:02:24.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 63   [00:02:25.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 63   [00:02:26.000] response:
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
After request

Before request

Info 64   [00:02:27.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 9,
      "type": "request"
    }
Info 65   [00:02:34.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/user/username/projects/myproject/file1.js]
var x = 1;
function foo() {
    return "world";
}


//// [/user/username/projects/myproject/file1.d.ts] file written with same contents

Before request

Info 66   [00:02:35.000] request:
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
      "seq": 10,
      "type": "request"
    }
Info 67   [00:02:36.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info 68   [00:02:37.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/file2.ts"
      },
      "seq": 11,
      "type": "request"
    }
Info 69   [00:02:38.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 70   [00:02:39.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 71   [00:02:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 72   [00:02:41.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/file1.ts SVC-1-1 "const x = 1;\nfunction foo() {\n    return \"world\";\n}"
	/user/username/projects/myproject/file2.ts SVC-2-1 "const y = 2;\nfunction bar() {\n    return \"hello\";\n}"
	/user/username/projects/myproject/file3.ts Text-1 "const xy = 3;"

Info 73   [00:02:42.000] -----------------------------------------------
Info 74   [00:02:43.000] Before ensureProjectForOpenFiles:
Info 75   [00:02:44.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 75   [00:02:45.000] 	Files (4)

Info 75   [00:02:46.000] -----------------------------------------------
Info 75   [00:02:47.000] Open files: 
Info 75   [00:02:48.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 75   [00:02:49.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 75   [00:02:50.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 75   [00:02:51.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 75   [00:02:52.000] After ensureProjectForOpenFiles:
Info 76   [00:02:53.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 76   [00:02:54.000] 	Files (4)

Info 76   [00:02:55.000] -----------------------------------------------
Info 76   [00:02:56.000] Open files: 
Info 76   [00:02:57.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 76   [00:02:58.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 76   [00:02:59.000] 	FileName: /user/username/projects/myproject/file2.ts ProjectRootPath: undefined
Info 76   [00:03:00.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 76   [00:03:01.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/file2.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 77   [00:03:02.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file2.ts"
      },
      "seq": 12,
      "type": "request"
    }
Info 78   [00:03:09.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/user/username/projects/myproject/file2.js]
var y = 2;
function bar() {
    return "hello";
}


//// [/user/username/projects/myproject/file2.d.ts] file written with same contents
