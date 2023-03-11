Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/app.ts]
console.log('Hello world');

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

//// [/user/username/projects/myproject/tsconfig.json]
{}


Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/app.ts",
        "fileContent": "console.log('Hello world');"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Search path: /user/username/projects/myproject
Info 3    [00:00:24.000] For info: /user/username/projects/myproject/app.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 10   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 12   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:34.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:35.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 15   [00:00:36.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/app.ts SVC-1-0 "console.log('Hello world');"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:37.000] -----------------------------------------------
Info 17   [00:00:38.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:39.000] 	Files (2)

Info 17   [00:00:40.000] -----------------------------------------------
Info 17   [00:00:41.000] Open files: 
Info 17   [00:00:42.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 17   [00:00:43.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 17   [00:00:44.000] response:
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
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Info 18   [00:00:47.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/unitTest1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 19   [00:00:48.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 20   [00:00:49.000] Scheduled: *ensureProjectForOpenFiles*
Info 21   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/unitTest1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/user/username/projects/myproject/unitTest1.ts]
import assert = require('assert');

describe("Test Suite 1", () => {
    it("Test A", () => {
        assert.ok(true, "This shouldn't fail");
    });

    it("Test B", () => {
        assert.ok(1 === 1, "This shouldn't fail");
        assert.ok(false, "This should fail");
    });
});


Info 22   [00:00:51.000] Running: /user/username/projects/myproject/tsconfig.json
Info 23   [00:00:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/unitTest1.ts 500 undefined WatchType: Closed Script info
Info 24   [00:00:53.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 25   [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 26   [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [00:00:56.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:57.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 29   [00:00:58.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/app.ts SVC-1-0 "console.log('Hello world');"
	/user/username/projects/myproject/unitTest1.ts Text-1 "import assert = require('assert');\n\ndescribe(\"Test Suite 1\", () => {\n    it(\"Test A\", () => {\n        assert.ok(true, \"This shouldn't fail\");\n    });\n\n    it(\"Test B\", () => {\n        assert.ok(1 === 1, \"This shouldn't fail\");\n        assert.ok(false, \"This should fail\");\n    });\n});"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'
	unitTest1.ts
	  Matched by default include pattern '**/*'

Info 30   [00:00:59.000] -----------------------------------------------
Info 31   [00:01:00.000] Running: *ensureProjectForOpenFiles*
Info 32   [00:01:01.000] Before ensureProjectForOpenFiles:
Info 33   [00:01:02.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 33   [00:01:03.000] 	Files (3)

Info 33   [00:01:04.000] -----------------------------------------------
Info 33   [00:01:05.000] Open files: 
Info 33   [00:01:06.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 33   [00:01:07.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 33   [00:01:08.000] After ensureProjectForOpenFiles:
Info 34   [00:01:09.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 34   [00:01:10.000] 	Files (3)

Info 34   [00:01:11.000] -----------------------------------------------
Info 34   [00:01:12.000] Open files: 
Info 34   [00:01:13.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 34   [00:01:14.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/unittest1.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Before request

Info 34   [00:01:15.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/unitTest1.ts",
        "fileContent": "import assert = require('assert');\n\ndescribe(\"Test Suite 1\", () => {\n    it(\"Test A\", () => {\n        assert.ok(true, \"This shouldn't fail\");\n    });\n\n    it(\"Test B\", () => {\n        assert.ok(1 === 1, \"This shouldn't fail\");\n        assert.ok(false, \"This should fail\");\n    });\n});"
      },
      "seq": 2,
      "type": "request"
    }
Info 35   [00:01:16.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/unitTest1.ts 500 undefined WatchType: Closed Script info
Info 36   [00:01:17.000] Search path: /user/username/projects/myproject
Info 37   [00:01:18.000] For info: /user/username/projects/myproject/unitTest1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 38   [00:01:19.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 38   [00:01:20.000] 	Files (3)

Info 38   [00:01:21.000] -----------------------------------------------
Info 38   [00:01:22.000] Open files: 
Info 38   [00:01:23.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 38   [00:01:24.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 38   [00:01:25.000] 	FileName: /user/username/projects/myproject/unitTest1.ts ProjectRootPath: undefined
Info 38   [00:01:26.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 38   [00:01:27.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/unittest1.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Before request

Info 39   [00:01:28.000] request:
    {
      "command": "navbar-full",
      "arguments": {
        "file": "/user/username/projects/myproject/unitTest1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 40   [00:01:29.000] response:
    {
      "response": [
        {
          "text": "\"unitTest1\"",
          "kind": "module",
          "kindModifiers": "",
          "spans": [
            {
              "start": 0,
              "length": 284
            }
          ],
          "childItems": [
            {
              "text": "assert",
              "kind": "alias",
              "kindModifiers": "",
              "spans": [
                {
                  "start": 0,
                  "length": 34
                }
              ],
              "childItems": [],
              "indent": 0,
              "bolded": false,
              "grayed": false
            },
            {
              "text": "describe(\"Test Suite 1\") callback",
              "kind": "function",
              "kindModifiers": "",
              "spans": [
                {
                  "start": 61,
                  "length": 221
                }
              ],
              "childItems": [],
              "indent": 0,
              "bolded": false,
              "grayed": false
            }
          ],
          "indent": 0,
          "bolded": false,
          "grayed": false
        },
        {
          "text": "describe(\"Test Suite 1\") callback",
          "kind": "function",
          "kindModifiers": "",
          "spans": [
            {
              "start": 61,
              "length": 221
            }
          ],
          "childItems": [
            {
              "text": "it(\"Test A\") callback",
              "kind": "function",
              "kindModifiers": "",
              "spans": [
                {
                  "start": 86,
                  "length": 61
                }
              ],
              "childItems": [],
              "indent": 0,
              "bolded": false,
              "grayed": false
            },
            {
              "text": "it(\"Test B\") callback",
              "kind": "function",
              "kindModifiers": "",
              "spans": [
                {
                  "start": 168,
                  "length": 110
                }
              ],
              "childItems": [],
              "indent": 0,
              "bolded": false,
              "grayed": false
            }
          ],
          "indent": 1,
          "bolded": false,
          "grayed": false
        }
      ],
      "responseRequired": true
    }
After request

Info 41   [00:01:31.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/unitTest1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 42   [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/unitTest1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (0) and running
//// [/user/username/projects/myproject/unitTest1.ts] deleted

After checking timeout queue length (0) and running

Before request

Info 43   [00:01:33.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/unitTest1.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 44   [00:01:34.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 45   [00:01:35.000] Scheduled: *ensureProjectForOpenFiles*
Info 46   [00:01:36.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 46   [00:01:37.000] 	Files (3)

Info 46   [00:01:38.000] -----------------------------------------------
Info 46   [00:01:39.000] Open files: 
Info 46   [00:01:40.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 46   [00:01:41.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 46   [00:01:42.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (2) and running

Info 47   [00:01:43.000] Running: /user/username/projects/myproject/tsconfig.json
Info 48   [00:01:44.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 49   [00:01:45.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 50   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 51   [00:01:47.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 52   [00:01:48.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 53   [00:01:49.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/app.ts SVC-1-0 "console.log('Hello world');"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'

Info 54   [00:01:50.000] -----------------------------------------------
Info 55   [00:01:51.000] Running: *ensureProjectForOpenFiles*
Info 56   [00:01:52.000] Before ensureProjectForOpenFiles:
Info 57   [00:01:53.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 57   [00:01:54.000] 	Files (2)

Info 57   [00:01:55.000] -----------------------------------------------
Info 57   [00:01:56.000] Open files: 
Info 57   [00:01:57.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 57   [00:01:58.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 57   [00:01:59.000] After ensureProjectForOpenFiles:
Info 58   [00:02:00.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 58   [00:02:01.000] 	Files (2)

Info 58   [00:02:02.000] -----------------------------------------------
Info 58   [00:02:03.000] Open files: 
Info 58   [00:02:04.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 58   [00:02:05.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After checking timeout queue length (2) and running

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 58   [00:02:08.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/unitTest1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 59   [00:02:09.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 60   [00:02:10.000] Scheduled: *ensureProjectForOpenFiles*
Info 61   [00:02:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/unitTest1.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/user/username/projects/myproject/unitTest1.ts]
import assert = require('assert');

export function Test1() {
    assert.ok(true, "This shouldn't fail");
};

export function Test2() {
    assert.ok(1 === 1, "This shouldn't fail");
    assert.ok(false, "This should fail");
};


Info 62   [00:02:12.000] Running: /user/username/projects/myproject/tsconfig.json
Info 63   [00:02:13.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/unitTest1.ts 500 undefined WatchType: Closed Script info
Info 64   [00:02:14.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 65   [00:02:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 66   [00:02:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 67   [00:02:17.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 68   [00:02:18.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 69   [00:02:19.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/app.ts SVC-1-0 "console.log('Hello world');"
	/user/username/projects/myproject/unitTest1.ts Text-2 "import assert = require('assert');\n\nexport function Test1() {\n    assert.ok(true, \"This shouldn't fail\");\n};\n\nexport function Test2() {\n    assert.ok(1 === 1, \"This shouldn't fail\");\n    assert.ok(false, \"This should fail\");\n};"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'
	unitTest1.ts
	  Matched by default include pattern '**/*'

Info 70   [00:02:20.000] -----------------------------------------------
Info 71   [00:02:21.000] Running: *ensureProjectForOpenFiles*
Info 72   [00:02:22.000] Before ensureProjectForOpenFiles:
Info 73   [00:02:23.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 73   [00:02:24.000] 	Files (3)

Info 73   [00:02:25.000] -----------------------------------------------
Info 73   [00:02:26.000] Open files: 
Info 73   [00:02:27.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 73   [00:02:28.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 73   [00:02:29.000] After ensureProjectForOpenFiles:
Info 74   [00:02:30.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 74   [00:02:31.000] 	Files (3)

Info 74   [00:02:32.000] -----------------------------------------------
Info 74   [00:02:33.000] Open files: 
Info 74   [00:02:34.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 74   [00:02:35.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/unittest1.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Before request

Info 74   [00:02:36.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/unitTest1.ts",
        "fileContent": "import assert = require('assert');\n\nexport function Test1() {\n    assert.ok(true, \"This shouldn't fail\");\n};\n\nexport function Test2() {\n    assert.ok(1 === 1, \"This shouldn't fail\");\n    assert.ok(false, \"This should fail\");\n};"
      },
      "seq": 5,
      "type": "request"
    }
Info 75   [00:02:37.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/unitTest1.ts 500 undefined WatchType: Closed Script info
Info 76   [00:02:38.000] Search path: /user/username/projects/myproject
Info 77   [00:02:39.000] For info: /user/username/projects/myproject/unitTest1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 78   [00:02:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 78   [00:02:41.000] 	Files (3)

Info 78   [00:02:42.000] -----------------------------------------------
Info 78   [00:02:43.000] Open files: 
Info 78   [00:02:44.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 78   [00:02:45.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 78   [00:02:46.000] 	FileName: /user/username/projects/myproject/unitTest1.ts ProjectRootPath: undefined
Info 78   [00:02:47.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 78   [00:02:48.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/unittest1.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Before request

Info 79   [00:02:49.000] request:
    {
      "command": "navbar-full",
      "arguments": {
        "file": "/user/username/projects/myproject/unitTest1.ts"
      },
      "seq": 6,
      "type": "request"
    }
Info 80   [00:02:50.000] response:
    {
      "response": [
        {
          "text": "\"unitTest1\"",
          "kind": "module",
          "kindModifiers": "",
          "spans": [
            {
              "start": 0,
              "length": 227
            }
          ],
          "childItems": [
            {
              "text": "assert",
              "kind": "alias",
              "kindModifiers": "",
              "spans": [
                {
                  "start": 0,
                  "length": 34
                }
              ],
              "childItems": [],
              "indent": 0,
              "bolded": false,
              "grayed": false
            },
            {
              "text": "Test1",
              "kind": "function",
              "kindModifiers": "export",
              "spans": [
                {
                  "start": 36,
                  "length": 71
                }
              ],
              "childItems": [],
              "indent": 0,
              "bolded": false,
              "grayed": false
            },
            {
              "text": "Test2",
              "kind": "function",
              "kindModifiers": "export",
              "spans": [
                {
                  "start": 110,
                  "length": 116
                }
              ],
              "childItems": [],
              "indent": 0,
              "bolded": false,
              "grayed": false
            }
          ],
          "indent": 0,
          "bolded": false,
          "grayed": false
        },
        {
          "text": "Test1",
          "kind": "function",
          "kindModifiers": "export",
          "spans": [
            {
              "start": 36,
              "length": 71
            }
          ],
          "childItems": [],
          "indent": 1,
          "bolded": false,
          "grayed": false
        },
        {
          "text": "Test2",
          "kind": "function",
          "kindModifiers": "export",
          "spans": [
            {
              "start": 110,
              "length": 116
            }
          ],
          "childItems": [],
          "indent": 1,
          "bolded": false,
          "grayed": false
        }
      ],
      "responseRequired": true
    }
After request
