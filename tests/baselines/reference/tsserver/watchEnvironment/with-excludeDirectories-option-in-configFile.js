Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/main.ts"
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

//// [/user/username/projects/myproject/tsconfig.json]
{"include":["src"],"watchOptions":{"excludeDirectories":["node_modules"]}}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:33.000] Search path: /user/username/projects/myproject/src
Info 3    [00:00:34.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:35.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:37.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts"
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
Info 7    [00:00:38.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 8    [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 9    [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 11   [00:00:42.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 12   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 13   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 14   [00:00:45.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:00:49.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 19   [00:00:50.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:00:51.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 21   [00:00:52.000] 	Files (4)
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
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 22   [00:00:53.000] -----------------------------------------------
Info 23   [00:00:54.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 23   [00:00:55.000] 	Files (4)

Info 23   [00:00:56.000] -----------------------------------------------
Info 23   [00:00:57.000] Open files: 
Info 23   [00:00:58.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 23   [00:00:59.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}

Info 23   [00:01:00.000] response:
    {
      "responseRequired": false
    }