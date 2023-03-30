currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/tsconfig.json]
{"watchOptions":{"excludeDirectories":["node_modules"]}}

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


Info 1    [00:00:24.000] request:
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
Info 2    [00:00:25.000] Host watch options changed to {"excludeFiles":["/user/username/projects/myproject/file2.ts"]}, it will be take effect for next watches.
Info 3    [00:00:26.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
Info 4    [00:00:27.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 5    [00:00:28.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 6    [00:00:29.000] Search path: /user/username/projects/myproject
Info 7    [00:00:30.000] For info: /user/username/projects/myproject/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 8    [00:00:31.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 9    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 10   [00:00:33.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/file1.ts",
  "/user/username/projects/myproject/file2.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "watchOptions": {
  "excludeDirectories": [
   "/user/username/projects/myproject/node_modules"
  ]
 }
}
Info 11   [00:00:34.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 12   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 13   [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 15   [00:00:38.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2.ts 500 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: Closed Script info
Info 16   [00:00:39.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 17   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: Closed Script info
Info 18   [00:00:41.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:00:42.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 20   [00:00:43.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:00:44.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 22   [00:00:45.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/file2.ts Text-1 "export function bar(){}"
	/user/username/projects/myproject/file1.ts SVC-1-0 "import { foo } from \"module1\";\n                foo();\n                import { bar } from \"./file2\";\n                bar();"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file2.ts
	  Imported via "./file2" from file 'file1.ts'
	  Matched by default include pattern '**/*'
	file1.ts
	  Matched by default include pattern '**/*'

Info 23   [00:00:46.000] -----------------------------------------------
Info 24   [00:00:47.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 24   [00:00:48.000] 	Files (3)

Info 24   [00:00:49.000] -----------------------------------------------
Info 24   [00:00:50.000] Open files: 
Info 24   [00:00:51.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 24   [00:00:52.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 24   [00:00:53.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Timeout callback:: count: 0
Immedidate callback:: count: 0
//// [/user/username/projects/myproject/node_modules/module1/index.d.ts]
export function foo(): string;


Before request

Info 25   [00:01:00.000] request:
    {
      "command": "reloadProjects",
      "seq": 3,
      "type": "request"
    }
Info 26   [00:01:01.000] reload projects.
Info 27   [00:01:02.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 28   [00:01:03.000] Scheduled: *ensureProjectForOpenFiles*
Info 29   [00:01:04.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 30   [00:01:05.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 31   [00:01:06.000] Search path: /user/username/projects/myproject
Info 32   [00:01:07.000] For info: /user/username/projects/myproject/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 33   [00:01:08.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 34   [00:01:09.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 35   [00:01:10.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 36   [00:01:11.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/file1.ts",
  "/user/username/projects/myproject/file2.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "watchOptions": {
  "excludeDirectories": [
   "/user/username/projects/myproject/node_modules"
  ]
 }
}
Info 37   [00:01:12.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 38   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 39   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 40   [00:01:15.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 41   [00:01:16.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 42   [00:01:17.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 43   [00:01:18.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 44   [00:01:19.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/node_modules/module1/index.d.ts Text-1 "export function foo(): string;"
	/user/username/projects/myproject/file2.ts Text-1 "export function bar(){}"
	/user/username/projects/myproject/file1.ts SVC-1-0 "import { foo } from \"module1\";\n                foo();\n                import { bar } from \"./file2\";\n                bar();"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/module1/index.d.ts
	  Imported via "module1" from file 'file1.ts'
	file2.ts
	  Imported via "./file2" from file 'file1.ts'
	  Matched by default include pattern '**/*'
	file1.ts
	  Matched by default include pattern '**/*'

Info 45   [00:01:20.000] -----------------------------------------------
Info 46   [00:01:21.000] Before ensureProjectForOpenFiles:
Info 47   [00:01:22.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 47   [00:01:23.000] 	Files (4)

Info 47   [00:01:24.000] -----------------------------------------------
Info 47   [00:01:25.000] Open files: 
Info 47   [00:01:26.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 47   [00:01:27.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 47   [00:01:28.000] After ensureProjectForOpenFiles:
Info 48   [00:01:29.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 48   [00:01:30.000] 	Files (4)

Info 48   [00:01:31.000] -----------------------------------------------
Info 48   [00:01:32.000] Open files: 
Info 48   [00:01:33.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 48   [00:01:34.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 48   [00:01:35.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules: *new*
  {}

Timeout callback:: count: 0
Immedidate callback:: count: 0
//// [/user/username/projects/myproject/file2.ts]
export function bar(){}
            bar();


Before request

Info 49   [00:01:39.000] request:
    {
      "command": "reloadProjects",
      "seq": 4,
      "type": "request"
    }
Info 50   [00:01:40.000] reload projects.
Info 51   [00:01:41.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 52   [00:01:42.000] Scheduled: *ensureProjectForOpenFiles*
Info 53   [00:01:43.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 54   [00:01:44.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 55   [00:01:45.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 56   [00:01:46.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 57   [00:01:47.000] Search path: /user/username/projects/myproject
Info 58   [00:01:48.000] For info: /user/username/projects/myproject/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 59   [00:01:49.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 60   [00:01:50.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 61   [00:01:51.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 62   [00:01:52.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/file1.ts",
  "/user/username/projects/myproject/file2.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "watchOptions": {
  "excludeDirectories": [
   "/user/username/projects/myproject/node_modules"
  ]
 }
}
Info 63   [00:01:53.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 64   [00:01:54.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 65   [00:01:55.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 66   [00:01:56.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 67   [00:01:57.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 68   [00:01:58.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/node_modules/module1/index.d.ts Text-1 "export function foo(): string;"
	/user/username/projects/myproject/file2.ts Text-2 "export function bar(){}\n            bar();"
	/user/username/projects/myproject/file1.ts SVC-1-0 "import { foo } from \"module1\";\n                foo();\n                import { bar } from \"./file2\";\n                bar();"

Info 69   [00:01:59.000] -----------------------------------------------
Info 70   [00:02:00.000] Before ensureProjectForOpenFiles:
Info 71   [00:02:01.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 71   [00:02:02.000] 	Files (4)

Info 71   [00:02:03.000] -----------------------------------------------
Info 71   [00:02:04.000] Open files: 
Info 71   [00:02:05.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 71   [00:02:06.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 71   [00:02:07.000] After ensureProjectForOpenFiles:
Info 72   [00:02:08.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 72   [00:02:09.000] 	Files (4)

Info 72   [00:02:10.000] -----------------------------------------------
Info 72   [00:02:11.000] Open files: 
Info 72   [00:02:12.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 72   [00:02:13.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 72   [00:02:14.000] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 0
Immedidate callback:: count: 0
//// [/user/username/projects/myproject/file2.ts] deleted

Before request

Info 73   [00:02:16.000] request:
    {
      "command": "reloadProjects",
      "seq": 5,
      "type": "request"
    }
Info 74   [00:02:17.000] reload projects.
Info 75   [00:02:18.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/file2.ts 500 {"excludeFiles":["/user/username/projects/myproject/file2.ts"]} WatchType: Closed Script info
Info 76   [00:02:19.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 77   [00:02:20.000] Scheduled: *ensureProjectForOpenFiles*
Info 78   [00:02:21.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 79   [00:02:22.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 80   [00:02:23.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 81   [00:02:24.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 82   [00:02:25.000] Search path: /user/username/projects/myproject
Info 83   [00:02:26.000] For info: /user/username/projects/myproject/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 84   [00:02:27.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 85   [00:02:28.000] ExcludeWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 86   [00:02:29.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 87   [00:02:30.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/file1.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "watchOptions": {
  "excludeDirectories": [
   "/user/username/projects/myproject/node_modules"
  ]
 }
}
Info 88   [00:02:31.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 89   [00:02:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 90   [00:02:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 91   [00:02:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 92   [00:02:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 93   [00:02:36.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 94   [00:02:37.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeFiles":["/user/username/projects/myproject/file2.ts"],"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 95   [00:02:38.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 96   [00:02:39.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 97   [00:02:40.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/node_modules/module1/index.d.ts Text-1 "export function foo(): string;"
	/user/username/projects/myproject/file1.ts SVC-1-0 "import { foo } from \"module1\";\n                foo();\n                import { bar } from \"./file2\";\n                bar();"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/module1/index.d.ts
	  Imported via "module1" from file 'file1.ts'
	file1.ts
	  Matched by default include pattern '**/*'

Info 98   [00:02:41.000] -----------------------------------------------
Info 99   [00:02:42.000] Before ensureProjectForOpenFiles:
Info 100  [00:02:43.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 100  [00:02:44.000] 	Files (3)

Info 100  [00:02:45.000] -----------------------------------------------
Info 100  [00:02:46.000] Open files: 
Info 100  [00:02:47.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 100  [00:02:48.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 100  [00:02:49.000] After ensureProjectForOpenFiles:
Info 101  [00:02:50.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 101  [00:02:51.000] 	Files (3)

Info 101  [00:02:52.000] -----------------------------------------------
Info 101  [00:02:53.000] Open files: 
Info 101  [00:02:54.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 101  [00:02:55.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 101  [00:02:56.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/file2: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules:
  {}
