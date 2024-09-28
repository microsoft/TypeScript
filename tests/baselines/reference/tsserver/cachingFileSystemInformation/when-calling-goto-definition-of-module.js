Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/a/b/controllers/vessels/client.ts]

                    import { Vessel } from '~/models/vessel';
                    const v = new Vessel();
                

//// [/user/username/projects/project/a/b/utils/db.ts]
export class Bookshelf { }

//// [/user/username/projects/project/a/b/models/vessel.ts]

                    import { Bookshelf } from '~/utils/db';
                    export class Vessel extends Bookshelf {}
                

//// [/user/username/projects/project/a/b/tsconfig.json]
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "baseUrl": "./",
    "paths": {
      "~/*": [
        "*"
      ]
    }
  },
  "exclude": [
    "api",
    "build",
    "node_modules",
    "public",
    "seeds",
    "sql_updates",
    "tests.build"
  ]
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/a/b/controllers/vessels/client.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/b/controllers/vessels/client.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/project/a/b/tsconfig.json, currentDirectory: /user/username/projects/project/a/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/tsconfig.json 2000 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/project/a/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/a/b/controllers/vessels/client.ts",
  "/user/username/projects/project/a/b/models/vessel.ts",
  "/user/username/projects/project/a/b/utils/db.ts"
 ],
 "options": {
  "target": 2,
  "module": 5,
  "baseUrl": "/user/username/projects/project/a/b",
  "paths": {
   "~/*": [
    "*"
   ]
  },
  "pathsBasePath": "/user/username/projects/project/a/b",
  "configFilePath": "/user/username/projects/project/a/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/project/a/b/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/project/a/b/controllers/vessels/client.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b 1 undefined Config: /user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b 1 undefined Config: /user/username/projects/project/a/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/models/vessel.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/utils/db.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es6.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/b/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/project/a/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/project/a/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es6.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/b/utils/db.ts Text-1 "export class Bookshelf { }"
	/user/username/projects/project/a/b/models/vessel.ts Text-1 "\n                    import { Bookshelf } from '~/utils/db';\n                    export class Vessel extends Bookshelf {}\n                "
	/user/username/projects/project/a/b/controllers/vessels/client.ts SVC-1-0 "\n                    import { Vessel } from '~/models/vessel';\n                    const v = new Vessel();\n                "


	../../../../../../home/src/tslibs/TS/Lib/lib.es6.d.ts
	  Default library for target 'es6'
	utils/db.ts
	  Imported via '~/utils/db' from file 'models/vessel.ts'
	  Matched by default include pattern '**/*'
	models/vessel.ts
	  Imported via '~/models/vessel' from file 'controllers/vessels/client.ts'
	  Matched by default include pattern '**/*'
	controllers/vessels/client.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/project/a/b/tsconfig.json"
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
          "projectId": "7e3b2b8617d8e0c4d620aa844198acf13d097732523c56cc651fe4595bffe37c",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 287,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "target": "es6",
            "module": "es6",
            "baseUrl": "",
            "paths": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": true,
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
        "triggerFile": "/user/username/projects/project/a/b/controllers/vessels/client.ts",
        "configFile": "/user/username/projects/project/a/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/controllers/vessels/client.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request
//// [/home/src/tslibs/TS/Lib/lib.es6.d.ts] *Lib*


PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts: *new*
  {}
/user/username/projects/project/a/b/models/vessel.ts: *new*
  {}
/user/username/projects/project/a/b/tsconfig.json: *new*
  {}
/user/username/projects/project/a/b/utils/db.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/project/a/b: *new*
  {}

Projects::
/user/username/projects/project/a/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/controllers/vessels/client.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/models/vessel.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/utils/db.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definition",
      "arguments": {
        "file": "/user/username/projects/project/a/b/controllers/vessels/client.ts",
        "position": 54
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/user/username/projects/project/a/b/models/vessel.ts",
          "start": {
            "line": 2,
            "offset": 21
          },
          "end": {
            "line": 4,
            "offset": 17
          }
        }
      ],
      "responseRequired": true
    }
After request

Info seq  [hh:mm:ss:mss] fileExists:: []
Info seq  [hh:mm:ss:mss] directoryExists:: []
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: []
Info seq  [hh:mm:ss:mss] readDirectory:: []
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/a/b/models/vessel.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/b/models/vessel.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/b/models/vessel.ts ProjectRootPath: undefined:: Result: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/project/a/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/controllers/vessels/client.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/b/models/vessel.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/project/a/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/user/username/projects/project/a/b/tsconfig.json:
  {}
/user/username/projects/project/a/b/utils/db.ts:
  {}

FsWatches *deleted*::
/user/username/projects/project/a/b/models/vessel.ts:
  {}

FsWatchesRecursive::
/user/username/projects/project/a/b:
  {}

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json
/user/username/projects/project/a/b/controllers/vessels/client.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/models/vessel.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json *default*
/user/username/projects/project/a/b/utils/db.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/project/a/b/tsconfig.json

Info seq  [hh:mm:ss:mss] fileExists:: [
  {
    "key": "/user/username/projects/project/a/b/models/tsconfig.json",
    "count": 1
  },
  {
    "key": "/user/username/projects/project/a/b/models/jsconfig.json",
    "count": 1
  }
]
Info seq  [hh:mm:ss:mss] directoryExists:: []
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: []
Info seq  [hh:mm:ss:mss] readDirectory:: []