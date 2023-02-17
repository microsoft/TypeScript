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

//// [/user/username/projects/myproject/ui.ts]
const x = async (_action: string) => {
};

//// [/user/username/projects/myproject/tsconfig.json]
{}


TI:: [00:00:22.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:23.000] Processing cache location '/a/data/'
TI:: [00:00:24.000] Trying to find '/a/data/package.json'...
TI:: [00:00:25.000] Finished processing cache location '/a/data/'
TI:: [00:00:26.000] Npm config file: /a/data/package.json
TI:: [00:00:27.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:32.000] Updating types-registry npm package...
TI:: [00:00:33.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:40.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:41.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:42.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:43.000] Search path: /user/username/projects/myproject
Info 3    [00:00:44.000] For info: /user/username/projects/myproject/ui.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:45.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:47.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/ui.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:50.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 10   [00:00:51.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 12   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:54.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:55.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 15   [00:00:56.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/ui.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	ui.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:57.000] -----------------------------------------------
Info 17   [00:00:58.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:59.000] 	Files (2)

Info 17   [00:01:00.000] -----------------------------------------------
Info 17   [00:01:01.000] Open files: 
Info 17   [00:01:02.000] 	FileName: /user/username/projects/myproject/ui.ts ProjectRootPath: undefined
Info 17   [00:01:03.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Info 17   [00:01:04.000] response:
    {
      "responseRequired": false
    }
Info 18   [00:01:05.000] request:
    {
      "command": "syntacticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts",
        "projectFileName": "/user/username/projects/myproject/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request

Info 19   [00:01:06.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 20   [00:01:07.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts",
        "projectFileName": "/user/username/projects/myproject/tsconfig.json"
      },
      "seq": 3,
      "type": "request"
    }
Before request

After request

Info 21   [00:01:08.000] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 11
          },
          "end": {
            "line": 1,
            "offset": 39
          },
          "text": "An async function or method must return a 'Promise'. Make sure you have a declaration for 'Promise' or include 'ES2015' in your '--lib' option.",
          "code": 2697,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
Info 22   [00:01:09.000] request:
    {
      "command": "suggestionDiagnosticsSync",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts",
        "projectFileName": "/user/username/projects/myproject/tsconfig.json"
      },
      "seq": 4,
      "type": "request"
    }
Before request

After request

Info 23   [00:01:10.000] response:
    {
      "response": [],
      "responseRequired": true
    }