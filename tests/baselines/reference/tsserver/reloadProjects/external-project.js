currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
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

//// [/user/username/projects/myproject/file1.ts]
import { foo } from "module1";
                foo();
                import { bar } from "./file2";
                bar();

//// [/user/username/projects/myproject/file2.ts]
export function bar(){}


Info 1    [00:00:22.000] request:
    {
      "command": "configure",
      "arguments": {
        "watchOptions": {
          "excludeFiles": [
            "/user/username/projects/myproject/file2.ts"
          ]
        }
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Host watch options changed to {"excludeFiles":["/user/username/projects/myproject/file2.ts"]}, it will be take effect for next watches.
Info 3    [00:00:24.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
Info 4    [00:00:25.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 5    [00:00:26.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/user/username/projects/myproject/project.sln",
        "options": {
          "excludeDirectories": [
            "node_modules"
          ]
        },
        "rootFiles": [
          {
            "fileName": "/user/username/projects/myproject/file1.ts"
          },
          {
            "fileName": "/user/username/projects/myproject/file2.ts"
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info 6    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file1.ts 500 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: Closed Script info
Info 7    [00:00:28.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2.ts 500 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: Closed Script info
Info 8    [00:00:29.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/project.sln
Info 9    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: Closed Script info
Info 10   [00:00:31.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 11   [00:00:32.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Type roots
Info 12   [00:00:33.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/project.sln Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:34.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 14   [00:00:35.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/file2.ts Text-1 "export function bar(){}"
	/user/username/projects/myproject/file1.ts Text-1 "import { foo } from \"module1\";\n                foo();\n                import { bar } from \"./file2\";\n                bar();"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file2.ts
	  Imported via "./file2" from file 'file1.ts'
	  Root file specified for compilation
	file1.ts
	  Root file specified for compilation

Info 15   [00:00:36.000] -----------------------------------------------
Info 16   [00:00:37.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

FsWatches::
/user/username/projects/myproject/file1.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 17   [00:00:38.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 18   [00:00:39.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/file1.ts 500 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: Closed Script info
Info 19   [00:00:40.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 19   [00:00:41.000] 	Files (3)

Info 19   [00:00:42.000] -----------------------------------------------
Info 19   [00:00:43.000] Open files: 
Info 19   [00:00:44.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 19   [00:00:45.000] 		Projects: /user/username/projects/myproject/project.sln
Info 19   [00:00:46.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/file1.ts:
  {}

Timeout callback:: count: 0
Immedidate callback:: count: 0
//// [/user/username/projects/myproject/node_modules/module1/index.d.ts]
export function foo(): string;


Before request

Info 20   [00:00:53.000] request:
    {
      "command": "reloadProjects",
      "seq": 4,
      "type": "request"
    }
Info 21   [00:00:54.000] reload projects.
Info 22   [00:00:55.000] Scheduled: /user/username/projects/myproject/project.sln
Info 23   [00:00:56.000] Scheduled: *ensureProjectForOpenFiles*
Info 24   [00:00:57.000] Scheduled: /user/username/projects/myproject/project.sln, Cancelled earlier one
Info 25   [00:00:58.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 26   [00:00:59.000] Search path: /user/username/projects/myproject
Info 27   [00:01:00.000] For info: /user/username/projects/myproject/file1.ts :: No config files found.
Info 28   [00:01:01.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 29   [00:01:02.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Type roots
Info 30   [00:01:03.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/project.sln
Info 31   [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 32   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 33   [00:01:06.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 34   [00:01:07.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Type roots
Info 35   [00:01:08.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/project.sln Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [00:01:09.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 37   [00:01:10.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/node_modules/module1/index.d.ts Text-1 "export function foo(): string;"
	/user/username/projects/myproject/file2.ts Text-1 "export function bar(){}"
	/user/username/projects/myproject/file1.ts Text-1 "import { foo } from \"module1\";\n                foo();\n                import { bar } from \"./file2\";\n                bar();"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/module1/index.d.ts
	  Imported via "module1" from file 'file1.ts'
	file2.ts
	  Imported via "./file2" from file 'file1.ts'
	  Root file specified for compilation
	file1.ts
	  Root file specified for compilation

Info 38   [00:01:11.000] -----------------------------------------------
Info 39   [00:01:12.000] Before ensureProjectForOpenFiles:
Info 40   [00:01:13.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 40   [00:01:14.000] 	Files (4)

Info 40   [00:01:15.000] -----------------------------------------------
Info 40   [00:01:16.000] Open files: 
Info 40   [00:01:17.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 40   [00:01:18.000] 		Projects: /user/username/projects/myproject/project.sln
Info 40   [00:01:19.000] After ensureProjectForOpenFiles:
Info 41   [00:01:20.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 41   [00:01:21.000] 	Files (4)

Info 41   [00:01:22.000] -----------------------------------------------
Info 41   [00:01:23.000] Open files: 
Info 41   [00:01:24.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 41   [00:01:25.000] 		Projects: /user/username/projects/myproject/project.sln
Info 41   [00:01:26.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules: *new*
  {}

Timeout callback:: count: 0
Immedidate callback:: count: 0
//// [/user/username/projects/myproject/file2.ts]
export function bar(){}
            bar();


Before request

Info 42   [00:01:30.000] request:
    {
      "command": "reloadProjects",
      "seq": 5,
      "type": "request"
    }
Info 43   [00:01:31.000] reload projects.
Info 44   [00:01:32.000] Scheduled: /user/username/projects/myproject/project.sln
Info 45   [00:01:33.000] Scheduled: *ensureProjectForOpenFiles*
Info 46   [00:01:34.000] Scheduled: /user/username/projects/myproject/project.sln, Cancelled earlier one
Info 47   [00:01:35.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 48   [00:01:36.000] Scheduled: /user/username/projects/myproject/project.sln, Cancelled earlier one
Info 49   [00:01:37.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 50   [00:01:38.000] Search path: /user/username/projects/myproject
Info 51   [00:01:39.000] For info: /user/username/projects/myproject/file1.ts :: No config files found.
Info 52   [00:01:40.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 53   [00:01:41.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Type roots
Info 54   [00:01:42.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/project.sln
Info 55   [00:01:43.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 56   [00:01:44.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Type roots
Info 57   [00:01:45.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/project.sln Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 58   [00:01:46.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 59   [00:01:47.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/node_modules/module1/index.d.ts Text-1 "export function foo(): string;"
	/user/username/projects/myproject/file2.ts Text-2 "export function bar(){}\n            bar();"
	/user/username/projects/myproject/file1.ts Text-1 "import { foo } from \"module1\";\n                foo();\n                import { bar } from \"./file2\";\n                bar();"

Info 60   [00:01:48.000] -----------------------------------------------
Info 61   [00:01:49.000] Before ensureProjectForOpenFiles:
Info 62   [00:01:50.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 62   [00:01:51.000] 	Files (4)

Info 62   [00:01:52.000] -----------------------------------------------
Info 62   [00:01:53.000] Open files: 
Info 62   [00:01:54.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 62   [00:01:55.000] 		Projects: /user/username/projects/myproject/project.sln
Info 62   [00:01:56.000] After ensureProjectForOpenFiles:
Info 63   [00:01:57.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 63   [00:01:58.000] 	Files (4)

Info 63   [00:01:59.000] -----------------------------------------------
Info 63   [00:02:00.000] Open files: 
Info 63   [00:02:01.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 63   [00:02:02.000] 		Projects: /user/username/projects/myproject/project.sln
Info 63   [00:02:03.000] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 0
Immedidate callback:: count: 0
//// [/user/username/projects/myproject/file2.ts] deleted

Before request

Info 64   [00:02:05.000] request:
    {
      "command": "reloadProjects",
      "seq": 6,
      "type": "request"
    }
Info 65   [00:02:06.000] reload projects.
Info 66   [00:02:07.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/file2.ts 500 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: Closed Script info
Info 67   [00:02:08.000] Scheduled: /user/username/projects/myproject/project.sln
Info 68   [00:02:09.000] Scheduled: *ensureProjectForOpenFiles*
Info 69   [00:02:10.000] Scheduled: /user/username/projects/myproject/project.sln, Cancelled earlier one
Info 70   [00:02:11.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 71   [00:02:12.000] Scheduled: /user/username/projects/myproject/project.sln, Cancelled earlier one
Info 72   [00:02:13.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 73   [00:02:14.000] Search path: /user/username/projects/myproject
Info 74   [00:02:15.000] For info: /user/username/projects/myproject/file1.ts :: No config files found.
Info 75   [00:02:16.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 76   [00:02:17.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Type roots
Info 77   [00:02:18.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/project.sln
Info 78   [00:02:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 79   [00:02:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 80   [00:02:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 81   [00:02:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 82   [00:02:23.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Failed Lookup Locations
Info 83   [00:02:24.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2.ts 500 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Missing file
Info 84   [00:02:25.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.sln WatchType: Type roots
Info 85   [00:02:26.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/project.sln Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 86   [00:02:27.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 87   [00:02:28.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/node_modules/module1/index.d.ts Text-1 "export function foo(): string;"
	/user/username/projects/myproject/file1.ts Text-1 "import { foo } from \"module1\";\n                foo();\n                import { bar } from \"./file2\";\n                bar();"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/module1/index.d.ts
	  Imported via "module1" from file 'file1.ts'
	file1.ts
	  Root file specified for compilation

Info 88   [00:02:29.000] -----------------------------------------------
Info 89   [00:02:30.000] Before ensureProjectForOpenFiles:
Info 90   [00:02:31.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 90   [00:02:32.000] 	Files (3)

Info 90   [00:02:33.000] -----------------------------------------------
Info 90   [00:02:34.000] Open files: 
Info 90   [00:02:35.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 90   [00:02:36.000] 		Projects: /user/username/projects/myproject/project.sln
Info 90   [00:02:37.000] After ensureProjectForOpenFiles:
Info 91   [00:02:38.000] Project '/user/username/projects/myproject/project.sln' (External)
Info 91   [00:02:39.000] 	Files (3)

Info 91   [00:02:40.000] -----------------------------------------------
Info 91   [00:02:41.000] Open files: 
Info 91   [00:02:42.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 91   [00:02:43.000] 		Projects: /user/username/projects/myproject/project.sln
Info 91   [00:02:44.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/file2: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {}
