Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/file1.ts]
interface ka {
                name: string;
            }
            

//// [/home/src/projects/project/file2.tsx]


//// [/home/src/projects/project/file3.mts]


//// [/home/src/projects/project/file4.cts]


//// [/home/src/projects/project/file5.js]


//// [/home/src/projects/project/file6.d.ts]


//// [/home/src/projects/project/file7.ts]


//// [/home/src/projects/project/tsconfig.json]
{
  "files": [
    "./file1.ts",
    "./file2.tsx",
    "./file3.mts",
    "./file4.cts",
    "./file5.js",
    "./file6.d.ts",
    "./file7.ts"
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
        "file": "/home/src/projects/project/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/file1.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/tsconfig.json, currentDirectory: /home/src/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/file1.ts",
  "/home/src/projects/project/file2.tsx",
  "/home/src/projects/project/file3.mts",
  "/home/src/projects/project/file4.cts",
  "/home/src/projects/project/file5.js",
  "/home/src/projects/project/file6.d.ts",
  "/home/src/projects/project/file7.ts"
 ],
 "options": {
  "configFilePath": "/home/src/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/file1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/file2.tsx 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/file3.mts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/file4.cts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/file5.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/file6.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/file7.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/file1.ts SVC-1-0 "interface ka {\n                name: string;\n            }\n            "
	/home/src/projects/project/file2.tsx Text-1 ""
	/home/src/projects/project/file3.mts Text-1 ""
	/home/src/projects/project/file4.cts Text-1 ""
	/home/src/projects/project/file5.js Text-1 ""
	/home/src/projects/project/file6.d.ts Text-1 ""
	/home/src/projects/project/file7.ts Text-1 ""


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Part of 'files' list in tsconfig.json
	file2.tsx
	  Part of 'files' list in tsconfig.json
	file3.mts
	  Part of 'files' list in tsconfig.json
	file4.cts
	  Part of 'files' list in tsconfig.json
	file5.js
	  Part of 'files' list in tsconfig.json
	file6.d.ts
	  Part of 'files' list in tsconfig.json
	file7.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/tsconfig.json"
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
          "projectId": "1097a5f82e8323ba7aba7567ec06402f7ad4ea74abce44ec5efd223ac77ff169",
          "fileStats": {
            "js": 1,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 4,
            "tsSize": 71,
            "tsx": 1,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
        "triggerFile": "/home/src/projects/project/file1.ts",
        "configFile": "/home/src/projects/project/tsconfig.json",
        "diagnostics": [
          {
            "text": "Cannot write file '/home/src/projects/project/file5.js' because it would overwrite input file.",
            "code": 5055,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/tsconfig.json
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

PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/file2.tsx: *new*
  {}
/home/src/projects/project/file3.mts: *new*
  {}
/home/src/projects/project/file4.cts: *new*
  {}
/home/src/projects/project/file5.js: *new*
  {}
/home/src/projects/project/file6.d.ts: *new*
  {}
/home/src/projects/project/file7.ts: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/home/src/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/file1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/projects/project/file2.tsx *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/file3.mts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/file4.cts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/file5.js *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/file6.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/file7.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getMoveToRefactoringFileSuggestions",
      "arguments": {
        "file": "/home/src/projects/project/file1.ts",
        "line": 1,
        "offset": 11
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "newFileName": "/home/src/projects/project/ka.ts",
        "files": [
          "/home/src/projects/project/file7.ts"
        ]
      },
      "responseRequired": true
    }
After request
