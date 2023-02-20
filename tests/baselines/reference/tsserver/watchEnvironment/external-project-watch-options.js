Info 0    [00:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:30.000] request:
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
      "seq": 1,
      "type": "request"
    }
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 4    [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 5    [00:00:34.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/project.csproj
Info 6    [00:00:35.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Info 7    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Info 9    [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Info 10   [00:00:39.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Type roots
Info 11   [00:00:40.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/project.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:41.000] Project '/user/username/projects/myproject/project.csproj' (External)
Info 13   [00:00:42.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/node_modules/bar/foo.d.ts
	/user/username/projects/myproject/node_modules/bar/index.d.ts
	/user/username/projects/myproject/src/main.ts


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

Info 14   [00:00:43.000] -----------------------------------------------
After request

PolledWatches::

FsWatches::
/user/username/projects/myproject/src/main.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/src:
  {}

Info 15   [00:00:44.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 16   [00:00:45.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/main.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::
/user/username/projects/myproject/src/main.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/src:
  {}

Info 17   [00:00:46.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:47.000] Project '/user/username/projects/myproject/project.csproj' (External)
Info 18   [00:00:48.000] 	Files (4)

Info 18   [00:00:49.000] -----------------------------------------------
Info 18   [00:00:50.000] Open files: 
Info 18   [00:00:51.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 18   [00:00:52.000] 		Projects: /user/username/projects/myproject/project.csproj
After request

PolledWatches::

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/src:
  {}

Info 18   [00:00:53.000] response:
    {
      "responseRequired": false
    }