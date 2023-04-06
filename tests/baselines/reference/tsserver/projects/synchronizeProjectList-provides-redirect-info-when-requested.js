currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/project/A/a.ts]
export const foo: string = 5;

//// [/users/username/projects/project/B/b.ts]
import { foo } from "../A/a"; console.log(foo);

//// [/users/username/projects/project/A/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  }
}

//// [/users/username/projects/project/B/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  },
  "references": [
    { "path": "../A" }
  ]
}

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


Info 1    [00:00:30.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/project/A/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:31.000] Search path: /users/username/projects/project/A
Info 3    [00:00:32.000] For info: /users/username/projects/project/A/a.ts :: Config file name: /users/username/projects/project/A/tsconfig.json
Info 4    [00:00:33.000] Creating configuration project /users/username/projects/project/A/tsconfig.json
Info 5    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/A/tsconfig.json 2000 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Config file
Info 6    [00:00:35.000] Config: /users/username/projects/project/A/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/A/a.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "configFilePath": "/users/username/projects/project/A/tsconfig.json"
 }
}
Info 7    [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/a 1 undefined Config: /users/username/projects/project/A/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/a 1 undefined Config: /users/username/projects/project/A/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:38.000] Starting updateGraphWorker: Project: /users/username/projects/project/A/tsconfig.json
Info 10   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/A/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info 12   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/A/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info 13   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info 14   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info 15   [00:00:44.000] Finishing updateGraphWorker: Project: /users/username/projects/project/A/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:45.000] Project '/users/username/projects/project/A/tsconfig.json' (Configured)
Info 17   [00:00:46.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/A/a.ts SVC-1-0 "export const foo: string = 5;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:47.000] -----------------------------------------------
Info 19   [00:00:48.000] Search path: /users/username/projects/project/A
Info 20   [00:00:49.000] For info: /users/username/projects/project/A/tsconfig.json :: No config files found.
Info 21   [00:00:50.000] Project '/users/username/projects/project/A/tsconfig.json' (Configured)
Info 21   [00:00:51.000] 	Files (2)

Info 21   [00:00:52.000] -----------------------------------------------
Info 21   [00:00:53.000] Open files: 
Info 21   [00:00:54.000] 	FileName: /users/username/projects/project/A/a.ts ProjectRootPath: undefined
Info 21   [00:00:55.000] 		Projects: /users/username/projects/project/A/tsconfig.json
Info 21   [00:00:56.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/a/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project/a: *new*
  {}

Before request

Info 22   [00:00:57.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/project/B/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 23   [00:00:58.000] Search path: /users/username/projects/project/B
Info 24   [00:00:59.000] For info: /users/username/projects/project/B/b.ts :: Config file name: /users/username/projects/project/B/tsconfig.json
Info 25   [00:01:00.000] Creating configuration project /users/username/projects/project/B/tsconfig.json
Info 26   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/B/tsconfig.json 2000 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Config file
Info 27   [00:01:02.000] Config: /users/username/projects/project/B/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/B/b.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "configFilePath": "/users/username/projects/project/B/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/users/username/projects/project/A",
   "originalPath": "../A"
  }
 ]
}
Info 28   [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/b 1 undefined Config: /users/username/projects/project/B/tsconfig.json WatchType: Wild card directory
Info 29   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/b 1 undefined Config: /users/username/projects/project/B/tsconfig.json WatchType: Wild card directory
Info 30   [00:01:05.000] Starting updateGraphWorker: Project: /users/username/projects/project/B/tsconfig.json
Info 31   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/B/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info 32   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/B/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info 33   [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info 34   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info 35   [00:01:10.000] Finishing updateGraphWorker: Project: /users/username/projects/project/B/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [00:01:11.000] Project '/users/username/projects/project/B/tsconfig.json' (Configured)
Info 37   [00:01:12.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/A/a.ts SVC-1-0 "export const foo: string = 5;"
	/users/username/projects/project/B/b.ts SVC-1-0 "import { foo } from \"../A/a\"; console.log(foo);"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../A/a.ts
	  Imported via "../A/a" from file 'b.ts'
	b.ts
	  Matched by default include pattern '**/*'

Info 38   [00:01:13.000] -----------------------------------------------
Info 39   [00:01:14.000] Search path: /users/username/projects/project/B
Info 40   [00:01:15.000] For info: /users/username/projects/project/B/tsconfig.json :: No config files found.
Info 41   [00:01:16.000] Project '/users/username/projects/project/A/tsconfig.json' (Configured)
Info 41   [00:01:17.000] 	Files (2)

Info 41   [00:01:18.000] -----------------------------------------------
Info 41   [00:01:19.000] Project '/users/username/projects/project/B/tsconfig.json' (Configured)
Info 41   [00:01:20.000] 	Files (3)

Info 41   [00:01:21.000] -----------------------------------------------
Info 41   [00:01:22.000] Open files: 
Info 41   [00:01:23.000] 	FileName: /users/username/projects/project/A/a.ts ProjectRootPath: undefined
Info 41   [00:01:24.000] 		Projects: /users/username/projects/project/A/tsconfig.json,/users/username/projects/project/B/tsconfig.json
Info 41   [00:01:25.000] 	FileName: /users/username/projects/project/B/b.ts ProjectRootPath: undefined
Info 41   [00:01:26.000] 		Projects: /users/username/projects/project/B/tsconfig.json
Info 41   [00:01:27.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/a/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/users/username/projects/project/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project/a:
  {}
/users/username/projects/project/b: *new*
  {}

Before request

Info 42   [00:01:28.000] request:
    {
      "command": "synchronizeProjectList",
      "arguments": {
        "knownProjects": [],
        "includeProjectReferenceRedirectInfo": true
      },
      "seq": 3,
      "type": "request"
    }
Info 43   [00:01:29.000] response:
    {
      "response": [
        {
          "info": {
            "projectName": "/users/username/projects/project/A/tsconfig.json",
            "version": 1,
            "isInferred": false,
            "options": {
              "composite": true,
              "declaration": true,
              "configFilePath": "/users/username/projects/project/A/tsconfig.json",
              "allowNonTsExtensions": true
            },
            "languageServiceDisabled": false
          },
          "files": [
            {
              "fileName": "/a/lib/lib.d.ts",
              "isSourceOfProjectReferenceRedirect": false
            },
            {
              "fileName": "/users/username/projects/project/A/a.ts",
              "isSourceOfProjectReferenceRedirect": false
            },
            {
              "fileName": "/users/username/projects/project/A/tsconfig.json",
              "isSourceOfProjectReferenceRedirect": false
            }
          ],
          "projectErrors": []
        },
        {
          "info": {
            "projectName": "/users/username/projects/project/B/tsconfig.json",
            "version": 1,
            "isInferred": false,
            "options": {
              "composite": true,
              "declaration": true,
              "configFilePath": "/users/username/projects/project/B/tsconfig.json",
              "allowNonTsExtensions": true
            },
            "languageServiceDisabled": false
          },
          "files": [
            {
              "fileName": "/a/lib/lib.d.ts",
              "isSourceOfProjectReferenceRedirect": false
            },
            {
              "fileName": "/users/username/projects/project/A/a.ts",
              "isSourceOfProjectReferenceRedirect": true
            },
            {
              "fileName": "/users/username/projects/project/B/b.ts",
              "isSourceOfProjectReferenceRedirect": false
            },
            {
              "fileName": "/users/username/projects/project/B/tsconfig.json",
              "isSourceOfProjectReferenceRedirect": false
            }
          ],
          "projectErrors": []
        }
      ],
      "responseRequired": true
    }
After request
