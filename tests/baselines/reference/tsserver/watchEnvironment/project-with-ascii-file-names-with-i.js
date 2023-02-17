TI:: Creating typing installer
//// [/User/userName/Projects/i/foo.ts]
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


TI:: [00:00:19.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:20.000] Processing cache location '/a/data/'
TI:: [00:00:21.000] Trying to find '/a/data/package.json'...
TI:: [00:00:22.000] Finished processing cache location '/a/data/'
TI:: [00:00:23.000] Npm config file: /a/data/package.json
TI:: [00:00:24.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:29.000] Updating types-registry npm package...
TI:: [00:00:30.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:37.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:38.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:39.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/User/userName/Projects/i/foo.ts",
        "projectRootPath": "/User/userName/Projects/i"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:40.000] Search path: /User/userName/Projects/i
Info 3    [00:00:41.000] For info: /User/userName/Projects/i/foo.ts :: No config files found.
Info 4    [00:00:42.000] FileWatcher:: Added:: WatchInfo: /User/userName/Projects/i/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:43.000] FileWatcher:: Added:: WatchInfo: /User/userName/Projects/i/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:44.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 7    [00:00:45.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /User/userName/Projects/i/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 9    [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /User/userName/Projects/i/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 10   [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /User/userName/Projects/i/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /User/userName/Projects/i/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:50.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:52.000] 	Files (2)
	/a/lib/lib.d.ts
	/User/userName/Projects/i/foo.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	foo.ts
	  Root file specified for compilation

Info 15   [00:00:53.000] -----------------------------------------------
Info 16   [00:00:54.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:55.000] 	Files (2)

Info 16   [00:00:56.000] -----------------------------------------------
Info 16   [00:00:57.000] Open files: 
Info 16   [00:00:58.000] 	FileName: /User/userName/Projects/i/foo.ts ProjectRootPath: /User/userName/Projects/i
Info 16   [00:00:59.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/user/username/projects/i/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/i/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/i/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/i/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

Info 16   [00:01:00.000] response:
    {
      "responseRequired": false
    }