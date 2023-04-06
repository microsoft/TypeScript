currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:27.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/background/a.ts]
let x = 10;

//// [/user/username/projects/myproject/background/tsconfig.json]
{"compilerOptions":{"types":["../typedefs/filesystem"]}}

//// [/user/username/projects/myproject/typedefs/filesystem.d.ts]
interface LocalFileSystem { someProperty: string; }

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


Info 1    [00:00:28.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/background/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:29.000] Search path: /user/username/projects/myproject/background
Info 3    [00:00:30.000] For info: /user/username/projects/myproject/background/a.ts :: Config file name: /user/username/projects/myproject/background/tsconfig.json
Info 4    [00:00:31.000] Creating configuration project /user/username/projects/myproject/background/tsconfig.json
Info 5    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Config file
Info 6    [00:00:33.000] Config: /user/username/projects/myproject/background/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/background/a.ts"
 ],
 "options": {
  "types": [
   "../typedefs/filesystem"
  ],
  "configFilePath": "/user/username/projects/myproject/background/tsconfig.json"
 }
}
Info 7    [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background 1 undefined Config: /user/username/projects/myproject/background/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background 1 undefined Config: /user/username/projects/myproject/background/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:36.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/background/tsconfig.json
Info 10   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/background/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/background/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/typedefs/filesystem.d.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:42.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:43.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/background/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:44.000] Project '/user/username/projects/myproject/background/tsconfig.json' (Configured)
Info 18   [00:00:45.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/background/a.ts SVC-1-0 "let x = 10;"
	/user/username/projects/myproject/typedefs/filesystem.d.ts Text-1 "interface LocalFileSystem { someProperty: string; }"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'
	../typedefs/filesystem.d.ts
	  Entry point of type library '../typedefs/filesystem' specified in compilerOptions

Info 19   [00:00:46.000] -----------------------------------------------
Info 20   [00:00:47.000] Project '/user/username/projects/myproject/background/tsconfig.json' (Configured)
Info 20   [00:00:48.000] 	Files (3)

Info 20   [00:00:49.000] -----------------------------------------------
Info 20   [00:00:50.000] Open files: 
Info 20   [00:00:51.000] 	FileName: /user/username/projects/myproject/background/a.ts ProjectRootPath: undefined
Info 20   [00:00:52.000] 		Projects: /user/username/projects/myproject/background/tsconfig.json
Info 20   [00:00:53.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/background/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/background/tsconfig.json: *new*
  {}
/user/username/projects/myproject/typedefs/filesystem.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/background: *new*
  {}
