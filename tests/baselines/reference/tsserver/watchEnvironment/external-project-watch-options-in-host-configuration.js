TI:: Creating typing installer
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


TI:: [00:00:29.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:30.000] Processing cache location '/a/data/'
TI:: [00:00:31.000] Trying to find '/a/data/package.json'...
TI:: [00:00:32.000] Finished processing cache location '/a/data/'
TI:: [00:00:33.000] Npm config file: /a/data/package.json
TI:: [00:00:34.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:39.000] Updating types-registry npm package...
TI:: [00:00:40.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:47.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:48.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:49.000] request:
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
Before request

Info 2    [00:00:50.000] Host watch options changed to {"excludeDirectories":["node_modules"]}, it will be take effect for next watches.
Info 3    [00:00:51.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
After request

Info 4    [00:00:52.000] response:
    {
      "responseRequired": false
    }
Info 5    [00:00:53.000] request:
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
Before request

Info 6    [00:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 {"excludeDirectories":["node_modules"]} WatchType: Closed Script info
Info 7    [00:00:55.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["node_modules"]} WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 8    [00:00:56.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/project.csproj
Info 9    [00:00:57.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Info 10   [00:00:58.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 {"excludeDirectories":["node_modules"]} WatchType: Closed Script info
Info 11   [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Info 12   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Info 13   [00:01:01.000] ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Type roots
Info 14   [00:01:02.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/project.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:01:03.000] Project '/user/username/projects/myproject/project.csproj' (External)
Info 16   [00:01:04.000] 	Files (4)
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

Info 17   [00:01:05.000] -----------------------------------------------
After request

FsWatches::
/user/username/projects/myproject/src/main.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src: *new*
  {}

Info 18   [00:01:06.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 19   [00:01:07.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/main.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

Info 20   [00:01:08.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 {"excludeDirectories":["node_modules"]} WatchType: Closed Script info
Info 21   [00:01:09.000] Project '/user/username/projects/myproject/project.csproj' (External)
Info 21   [00:01:10.000] 	Files (4)

Info 21   [00:01:11.000] -----------------------------------------------
Info 21   [00:01:12.000] Open files: 
Info 21   [00:01:13.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 21   [00:01:14.000] 		Projects: /user/username/projects/myproject/project.csproj
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

Info 21   [00:01:15.000] response:
    {
      "responseRequired": false
    }