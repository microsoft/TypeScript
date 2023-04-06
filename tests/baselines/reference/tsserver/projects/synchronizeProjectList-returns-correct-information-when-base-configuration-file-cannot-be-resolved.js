currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/index.ts]
export const foo = 5;

//// [/user/username/projects/myproject/tsconfig.json]
{"extends":"./tsconfig_base.json"}

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


Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Search path: /user/username/projects/myproject
Info 3    [00:00:24.000] For info: /user/username/projects/myproject/index.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig_base.json 2000 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Extended config file
Info 8    [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:31.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 11   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:35.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:36.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 16   [00:00:37.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/index.ts SVC-1-0 "export const foo = 5;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:38.000] -----------------------------------------------
Info 18   [00:00:39.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 18   [00:00:40.000] 	Files (2)

Info 18   [00:00:41.000] -----------------------------------------------
Info 18   [00:00:42.000] Open files: 
Info 18   [00:00:43.000] 	FileName: /user/username/projects/myproject/index.ts ProjectRootPath: undefined
Info 18   [00:00:44.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 18   [00:00:45.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/tsconfig_base.json: *new*
  {"pollingInterval":2000}
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

Before request

Info 19   [00:00:46.000] request:
    {
      "command": "synchronizeProjectList",
      "arguments": {
        "knownProjects": [],
        "includeProjectReferenceRedirectInfo": false
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:47.000] response:
    {
      "response": [
        {
          "info": {
            "projectName": "/user/username/projects/myproject/tsconfig.json",
            "version": 1,
            "isInferred": false,
            "options": {
              "configFilePath": "/user/username/projects/myproject/tsconfig.json",
              "allowNonTsExtensions": true
            },
            "languageServiceDisabled": false
          },
          "files": [
            "/a/lib/lib.d.ts",
            "/user/username/projects/myproject/index.ts",
            "/user/username/projects/myproject/tsconfig.json",
            "/user/username/projects/myproject/tsconfig_base.json"
          ],
          "projectErrors": [
            {
              "message": "Cannot read file '/user/username/projects/myproject/tsconfig_base.json'.",
              "category": "error",
              "code": 5083
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
