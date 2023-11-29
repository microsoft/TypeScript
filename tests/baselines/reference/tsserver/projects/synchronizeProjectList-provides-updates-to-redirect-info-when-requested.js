currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/project/A/a.ts]
export const foo: string = 5;

//// [/users/username/projects/project/B/b.ts]
import { foo } from "../B/b2"; console.log(foo);

//// [/users/username/projects/project/B/b2.ts]
export const foo: string = 5;

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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/project/A/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/project/A
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/project/A/a.ts :: Config file name: /users/username/projects/project/A/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/project/A/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/A/tsconfig.json 2000 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/projects/project/A/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/projects/project/A/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/project/A/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/A/a.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "configFilePath": "/users/username/projects/project/A/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/A 1 undefined Config: /users/username/projects/project/A/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/A 1 undefined Config: /users/username/projects/project/A/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/A/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/A/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/A/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/A/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/A/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/A/a.ts SVC-1-0 "export const foo: string = 5;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/projects/project/A/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "1c00de0599b9397934e1fd532ec7325c1ceb8988d1970f981c3903be1911db6b",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 29,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "declaration": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/users/username/projects/project/A/a.ts",
        "configFile": "/users/username/projects/project/A/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/project/A
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/project/A/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/A/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/A/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/A/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/A/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/project/A/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project/A: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/project/B/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/project/B
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/project/B/b.ts :: Config file name: /users/username/projects/project/B/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/project/B/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/B/tsconfig.json 2000 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/projects/project/B/tsconfig.json",
        "reason": "Creating possible configured project for /users/username/projects/project/B/b.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/project/B/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/B/b.ts",
  "/users/username/projects/project/B/b2.ts"
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
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/B 1 undefined Config: /users/username/projects/project/B/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/B 1 undefined Config: /users/username/projects/project/B/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/B/b2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/B/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/B/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/B/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/project/B/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/B/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/B/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/B/b2.ts Text-1 "export const foo: string = 5;"
	/users/username/projects/project/B/b.ts SVC-1-0 "import { foo } from \"../B/b2\"; console.log(foo);"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	b2.ts
	  Imported via "../B/b2" from file 'b.ts'
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/projects/project/B/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "63173ef60374bf2592e410e2362984267b0c92ae2aea7481159a72f6fb7b1848",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 77,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "declaration": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/users/username/projects/project/B/b.ts",
        "configFile": "/users/username/projects/project/B/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/project/B
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/project/B/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/A/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/B/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/A/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/A/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/project/B/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/project/B/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/B/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/project/A/tsconfig.json:
  {}
/users/username/projects/project/B/b2.ts: *new*
  {}
/users/username/projects/project/B/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project/A:
  {}
/users/username/projects/project/B: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "synchronizeProjectList",
      "arguments": {
        "knownProjects": [],
        "includeProjectReferenceRedirectInfo": true
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
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
              "fileName": "/users/username/projects/project/B/b2.ts",
              "isSourceOfProjectReferenceRedirect": false
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

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "synchronizeProjectList",
      "arguments": {
        "knownProjects": [],
        "includeProjectReferenceRedirectInfo": true
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
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
              "fileName": "/users/username/projects/project/B/b2.ts",
              "isSourceOfProjectReferenceRedirect": false
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

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /users/username/projects/project/A/tsconfig.json 1:: WatchInfo: /users/username/projects/project/A/tsconfig.json 2000 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/A/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: /users/username/projects/project/B/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /users/username/projects/project/A/tsconfig.json 1:: WatchInfo: /users/username/projects/project/A/tsconfig.json 2000 undefined Project: /users/username/projects/project/A/tsconfig.json WatchType: Config file
Before request
//// [/users/username/projects/project/A/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  },
  "include": [
      "**/*",
      "../B/b2.ts"
  ]
}


Timeout callback:: count: 3
1: /users/username/projects/project/A/tsconfig.json *new*
2: /users/username/projects/project/B/tsconfig.json *new*
3: *ensureProjectForOpenFiles* *new*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "synchronizeProjectList",
      "arguments": {
        "knownProjects": [
          {
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
          {
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
          }
        ],
        "includeProjectReferenceRedirectInfo": true
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Reloading configured project /users/username/projects/project/A/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/users/username/projects/project/A/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/project/A/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/A/a.ts",
  "/users/username/projects/project/B/b2.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "configFilePath": "/users/username/projects/project/A/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/A/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/A/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/A/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/A/a.ts SVC-1-0 "export const foo: string = 5;"
	/users/username/projects/project/B/b2.ts Text-1 "export const foo: string = 5;"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'
	../B/b2.ts
	  Matched by include pattern '../B/b2.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/users/username/projects/project/A/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/users/username/projects/project/A/tsconfig.json",
        "configFile": "/users/username/projects/project/A/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/users/username/projects/project/B/b2.ts' is not under 'rootDir' '/users/username/projects/project/A'. 'rootDir' is expected to contain all source files.\n  The file is in the program because:\n    Matched by include pattern '../B/b2.ts' in '/users/username/projects/project/A/tsconfig.json'",
            "code": 6059,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 8,
                    "offset": 7
                  },
                  "end": {
                    "line": 8,
                    "offset": 19
                  },
                  "file": "/users/username/projects/project/A/tsconfig.json"
                },
                "message": "File is matched by include pattern specified here.",
                "category": "message",
                "code": 1408
              }
            ]
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/project/B/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/project/B/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/project/B/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/B/b2.ts Text-1 "export const foo: string = 5;"
	/users/username/projects/project/B/b.ts SVC-1-0 "import { foo } from \"../B/b2\"; console.log(foo);"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "info": {
            "projectName": "/users/username/projects/project/A/tsconfig.json",
            "version": 2,
            "isInferred": false,
            "options": {
              "composite": true,
              "declaration": true,
              "configFilePath": "/users/username/projects/project/A/tsconfig.json",
              "allowNonTsExtensions": true
            },
            "languageServiceDisabled": false
          },
          "changes": {
            "added": [
              {
                "fileName": "/users/username/projects/project/B/b2.ts",
                "isSourceOfProjectReferenceRedirect": false
              }
            ],
            "removed": [],
            "updated": [],
            "updatedRedirects": []
          },
          "projectErrors": []
        },
        {
          "info": {
            "projectName": "/users/username/projects/project/B/tsconfig.json",
            "version": 2,
            "isInferred": false,
            "options": {
              "composite": true,
              "declaration": true,
              "configFilePath": "/users/username/projects/project/B/tsconfig.json",
              "allowNonTsExtensions": true
            },
            "languageServiceDisabled": false
          },
          "changes": {
            "added": [],
            "removed": [],
            "updated": [],
            "updatedRedirects": [
              {
                "fileName": "/users/username/projects/project/B/b2.ts",
                "isSourceOfProjectReferenceRedirect": true
              }
            ]
          },
          "projectErrors": []
        }
      ],
      "responseRequired": true
    }
After request
