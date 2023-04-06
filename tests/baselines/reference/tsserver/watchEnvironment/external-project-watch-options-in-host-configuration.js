currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Info 0    [00:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/user/username/projects/myproject/src/main.ts]
import { foo } from "bar"; foo();

//// [/user/username/projects/myproject/node_modules/bar/index.d.ts]
export { foo } from "./foo";

//// [/user/username/projects/myproject/node_modules/bar/foo.d.ts]
export function foo(): string;


Info 1    [00:00:30.000] request:
    {
      "command": "configure",
      "arguments": {
        "watchOptions": {
          "excludeDirectories": [
            "node_modules"
          ]
        }
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:31.000] Host watch options changed to {"excludeDirectories":["node_modules"]}, it will be take effect for next watches.
Info 3    [00:00:32.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
Info 4    [00:00:33.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 5    [00:00:34.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/user/username/projects/myproject/project.csproj",
        "rootFiles": [
          {
            "fileName": "/user/username/projects/myproject/src/main.ts"
          },
          {
            "fileName": "/user/username/projects/myproject/node_modules/bar/index.d.ts"
          },
          {
            "fileName": "/user/username/projects/myproject/node_modules/bar/foo.d.ts"
          }
        ],
        "options": {
          "excludeDirectories": [
            "node_modules"
          ]
        }
      },
      "seq": 2,
      "type": "request"
    }
Info 6    [00:00:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 {"excludeDirectories":["node_modules"]} WatchType: Closed Script info
Info 7    [00:00:36.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["node_modules"]} WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 8    [00:00:37.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/project.csproj
Info 9    [00:00:38.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Info 10   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 {"excludeDirectories":["node_modules"]} WatchType: Closed Script info
Info 11   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Info 12   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Info 13   [00:00:42.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Type roots
Info 14   [00:00:43.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/project.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:44.000] Project '/user/username/projects/myproject/project.csproj' (External)
Info 16   [00:00:45.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/node_modules/bar/foo.d.ts Text-1 "export function foo(): string;"
	/user/username/projects/myproject/node_modules/bar/index.d.ts Text-1 "export { foo } from \"./foo\";"
	/user/username/projects/myproject/src/main.ts Text-1 "import { foo } from \"bar\"; foo();"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/bar/foo.d.ts
	  Imported via "./foo" from file 'node_modules/bar/index.d.ts'
	  Imported via "./foo" from file 'node_modules/bar/index.d.ts'
	  Root file specified for compilation
	node_modules/bar/index.d.ts
	  Imported via "bar" from file 'src/main.ts'
	  Root file specified for compilation
	src/main.ts
	  Root file specified for compilation

Info 17   [00:00:46.000] -----------------------------------------------
Info 18   [00:00:47.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

FsWatches::
/user/username/projects/myproject/src/main.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src: *new*
  {}

Before request

Info 19   [00:00:48.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/main.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 20   [00:00:49.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 {"excludeDirectories":["node_modules"]} WatchType: Closed Script info
Info 21   [00:00:50.000] Project '/user/username/projects/myproject/project.csproj' (External)
Info 21   [00:00:51.000] 	Files (4)

Info 21   [00:00:52.000] -----------------------------------------------
Info 21   [00:00:53.000] Open files: 
Info 21   [00:00:54.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 21   [00:00:55.000] 		Projects: /user/username/projects/myproject/project.csproj
Info 21   [00:00:56.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/src/main.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
