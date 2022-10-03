Info 0    [00:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:20.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/User/userName/Projects/İ/foo.ts",
        "projectRootPath": "/User/userName/Projects/İ"
      }
    }
Before request
//// [/User/userName/Projects/İ/foo.ts]
import { foo } from "bar"

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

Info 2    [00:00:21.000] Search path: /User/userName/Projects/İ
Info 3    [00:00:22.000] For info: /User/userName/Projects/İ/foo.ts :: No config files found.
Info 4    [00:00:23.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /User/userName/Projects/İ/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /User/userName/Projects/İ/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:26.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 8    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /User/userName/Projects/İ/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 10   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /User/userName/Projects/İ/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 11   [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /User/userName/Projects/İ/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /User/userName/Projects/İ/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 13   [00:00:32.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:00:34.000] 	Files (2)
	/a/lib/lib.d.ts
	/User/userName/Projects/İ/foo.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	foo.ts
	  Root file specified for compilation

Info 16   [00:00:35.000] -----------------------------------------------
Info 17   [00:00:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 17   [00:00:37.000] 	Files (2)

Info 17   [00:00:38.000] -----------------------------------------------
Info 17   [00:00:39.000] Open files: 
Info 17   [00:00:40.000] 	FileName: /User/userName/Projects/İ/foo.ts ProjectRootPath: /User/userName/Projects/İ
Info 17   [00:00:41.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/user/username/projects/İ/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/İ/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/İ/node_modules:
  {"pollingInterval":500}
/user/username/projects/İ/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 17   [00:00:42.000] response:
    {
      "responseRequired": false
    }