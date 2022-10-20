Info 0    [00:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:30.000] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "excludeDirectories": [
            "node_modules"
          ]
        },
        "projectRootPath": "/user/username/projects/myproject"
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

After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:31.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 3    [00:00:32.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/main.ts",
        "projectRootPath": "/user/username/projects/myproject"
      }
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 4    [00:00:33.000] Search path: /user/username/projects/myproject/src
Info 5    [00:00:34.000] For info: /user/username/projects/myproject/src/main.ts :: No config files found.
Info 6    [00:00:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 9    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 10   [00:00:39.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 11   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 12   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 13   [00:00:42.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 14   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 16   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 17   [00:00:46.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /dev/null/inferredProject1* WatchType: Type roots
Info 18   [00:00:47.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:00:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 20   [00:00:49.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/node_modules/bar/foo.d.ts
	/user/username/projects/myproject/node_modules/bar/index.d.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	node_modules/bar/foo.d.ts
	  Imported via "./foo" from file 'node_modules/bar/index.d.ts'
	node_modules/bar/index.d.ts
	  Imported via "bar" from file 'src/main.ts'
	src/main.ts
	  Root file specified for compilation

Info 21   [00:00:50.000] -----------------------------------------------
Info 22   [00:00:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 22   [00:00:52.000] 	Files (4)

Info 22   [00:00:53.000] -----------------------------------------------
Info 22   [00:00:54.000] Open files: 
Info 22   [00:00:55.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: /user/username/projects/myproject
Info 22   [00:00:56.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/src:
  {}

Info 22   [00:00:57.000] response:
    {
      "responseRequired": false
    }