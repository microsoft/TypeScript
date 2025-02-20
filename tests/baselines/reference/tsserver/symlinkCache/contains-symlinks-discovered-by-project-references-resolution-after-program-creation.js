Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/packages/app/tsconfig.json]

        {
            "compilerOptions": {
                "module": "commonjs",
                "outDir": "dist",
                "rootDir": "src",
                "baseUrl": "."
            }
            "references": [{ "path": "../dep" }]
        }

//// [/home/src/projects/project/packages/app/src/index.ts]
import "dep/does/not/exist";

//// [/home/src/projects/project/packages/dep/package.json]
{ "name": "dep", "main": "dist/index.js", "types": "dist/index.d.ts" }

//// [/home/src/projects/project/packages/dep/tsconfig.json]

        {
            "compilerOptions": { "outDir": "dist", "rootDir": "src", "module": "commonjs" }
        }

//// [/home/src/projects/project/packages/dep/src/index.ts]

        import "./sub/folder";

//// [/home/src/projects/project/packages/dep/src/sub/folder/index.ts]
export const dep = 0;

//// [/home/src/projects/project/packages/app/node_modules/dep] symlink(/home/src/projects/project/packages/dep)

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
        "file": "/home/src/projects/project/packages/app/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/packages/app/src/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/packages/app/tsconfig.json, currentDirectory: /home/src/projects/project/packages/app
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/tsconfig.json 2000 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/packages/app/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/packages/app/src/index.ts"
 ],
 "options": {
  "module": 1,
  "outDir": "/home/src/projects/project/packages/app/dist",
  "rootDir": "/home/src/projects/project/packages/app/src",
  "baseUrl": "/home/src/projects/project/packages/app",
  "configFilePath": "/home/src/projects/project/packages/app/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/projects/project/packages/dep",
   "originalPath": "../dep"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/packages/app/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/packages/app/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app 1 undefined Config: /home/src/projects/project/packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app 1 undefined Config: /home/src/projects/project/packages/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/packages/dep/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/packages/dep/src/index.ts",
  "/home/src/projects/project/packages/dep/src/sub/folder/index.ts"
 ],
 "options": {
  "outDir": "/home/src/projects/project/packages/dep/dist",
  "rootDir": "/home/src/projects/project/packages/dep/src",
  "module": 1,
  "configFilePath": "/home/src/projects/project/packages/dep/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/dep/tsconfig.json 2000 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/dep 1 undefined Config: /home/src/projects/project/packages/dep/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/dep 1 undefined Config: /home/src/projects/project/packages/dep/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/dep 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/dep 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/src 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/src 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/node_modules/dep 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/node_modules/dep 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/node_modules 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/node_modules 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/dep/package.json 2000 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/app/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/app/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/app/src/index.ts SVC-1-0 "import \"dep/does/not/exist\";"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/packages/app/tsconfig.json"
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
          "projectId": "33329ab3f1098b4e69b8d4af3b152f00ced62fdaa7bc2af65370a6ba677abca6",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 28,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "module": "commonjs",
            "outDir": "",
            "rootDir": "",
            "baseUrl": ""
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
        "triggerFile": "/home/src/projects/project/packages/app/src/index.ts",
        "configFile": "/home/src/projects/project/packages/app/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 9,
              "offset": 28
            },
            "end": {
              "line": 9,
              "offset": 48
            },
            "text": "Referenced project '/home/src/projects/project/packages/dep' must have setting \"composite\": true.",
            "code": 6306,
            "category": "error",
            "fileName": "/home/src/projects/project/packages/app/tsconfig.json"
          },
          {
            "start": {
              "line": 9,
              "offset": 13
            },
            "end": {
              "line": 9,
              "offset": 25
            },
            "text": "',' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/home/src/projects/project/packages/app/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/app/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/app/tsconfig.json
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
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/app/dep: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/app/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/app/tsconfig.json: *new*
  {}
/home/src/projects/project/packages/dep/package.json: *new*
  {}
/home/src/projects/project/packages/dep/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/packages/app: *new*
  {}
/home/src/projects/project/packages/app/node_modules: *new*
  {}
/home/src/projects/project/packages/app/node_modules/dep: *new*
  {}
/home/src/projects/project/packages/app/src: *new*
  {}
/home/src/projects/project/packages/dep: *new*
  {}

Projects::
/home/src/projects/project/packages/app/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/packages/app/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/app/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/app/tsconfig.json

Symlinked directories: {
 "real": "/home/src/projects/project/packages/dep/",
 "realPath": "/home/src/projects/project/packages/dep/"
}