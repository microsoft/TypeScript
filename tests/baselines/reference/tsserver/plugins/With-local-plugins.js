Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a.ts]
class c { prop = "hello"; foo() { return this.prop; } }

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@myscoped/plugin"
      },
      {
        "name": "@myscoped/plugin/subpath"
      },
      {
        "name": "@myscoped/plugin/sub/path"
      },
      {
        "name": "unscopedPlugin"
      },
      {
        "name": "unscopedPlugin/subpath"
      },
      {
        "name": "unscopedPlugin/sub/path"
      },
      {
        "name": "../myPlugin"
      },
      {
        "name": "@myscoped/plugin/../malicious"
      },
      {
        "name": "myPlugin/../malicious"
      },
      {
        "name": "myPlugin/subpath/../../malicious"
      },
      {
        "transform": "some-transform"
      }
    ]
  }
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
        "file": "/home/src/projects/project/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/tsconfig.json, currentDirectory: /home/src/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/a.ts"
 ],
 "options": {
  "plugins": [
   {
    "name": "@myscoped/plugin"
   },
   {
    "name": "@myscoped/plugin/subpath"
   },
   {
    "name": "@myscoped/plugin/sub/path"
   },
   {
    "name": "unscopedPlugin"
   },
   {
    "name": "unscopedPlugin/subpath"
   },
   {
    "name": "unscopedPlugin/sub/path"
   },
   {
    "name": "../myPlugin"
   },
   {
    "name": "@myscoped/plugin/../malicious"
   },
   {
    "name": "myPlugin/../malicious"
   },
   {
    "name": "myPlugin/subpath/../../malicious"
   },
   {
    "transform": "some-transform"
   }
  ],
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
        "reason": "Creating possible configured project for /home/src/projects/project/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 1 undefined Config: /home/src/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 1 undefined Config: /home/src/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Enabling plugin @myscoped/plugin from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Loading @myscoped/plugin from /home/src/tslibs/TS/Lib/tsc.js/../../.. (resolved to /home/src/tslibs/TS/Lib/tsc.js/../../../node_modules)
Loading plugin: @myscoped/plugin
Info seq  [hh:mm:ss:mss] Plugin validation succeeded
Info seq  [hh:mm:ss:mss] Enabling plugin @myscoped/plugin/subpath from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Loading @myscoped/plugin/subpath from /home/src/tslibs/TS/Lib/tsc.js/../../.. (resolved to /home/src/tslibs/TS/Lib/tsc.js/../../../node_modules)
Loading plugin: @myscoped/plugin/subpath
Info seq  [hh:mm:ss:mss] Plugin activation failed: Error: Protocol handler already exists for command "testProtocolCommand"
Info seq  [hh:mm:ss:mss] Enabling plugin @myscoped/plugin/sub/path from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Loading @myscoped/plugin/sub/path from /home/src/tslibs/TS/Lib/tsc.js/../../.. (resolved to /home/src/tslibs/TS/Lib/tsc.js/../../../node_modules)
Loading plugin: @myscoped/plugin/sub/path
Info seq  [hh:mm:ss:mss] Plugin activation failed: Error: Protocol handler already exists for command "testProtocolCommand"
Info seq  [hh:mm:ss:mss] Enabling plugin unscopedPlugin from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Loading unscopedPlugin from /home/src/tslibs/TS/Lib/tsc.js/../../.. (resolved to /home/src/tslibs/TS/Lib/tsc.js/../../../node_modules)
Loading plugin: unscopedPlugin
Info seq  [hh:mm:ss:mss] Plugin activation failed: Error: Protocol handler already exists for command "testProtocolCommand"
Info seq  [hh:mm:ss:mss] Enabling plugin unscopedPlugin/subpath from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Loading unscopedPlugin/subpath from /home/src/tslibs/TS/Lib/tsc.js/../../.. (resolved to /home/src/tslibs/TS/Lib/tsc.js/../../../node_modules)
Loading plugin: unscopedPlugin/subpath
Info seq  [hh:mm:ss:mss] Plugin activation failed: Error: Protocol handler already exists for command "testProtocolCommand"
Info seq  [hh:mm:ss:mss] Enabling plugin unscopedPlugin/sub/path from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Loading unscopedPlugin/sub/path from /home/src/tslibs/TS/Lib/tsc.js/../../.. (resolved to /home/src/tslibs/TS/Lib/tsc.js/../../../node_modules)
Loading plugin: unscopedPlugin/sub/path
Info seq  [hh:mm:ss:mss] Plugin activation failed: Error: Protocol handler already exists for command "testProtocolCommand"
Info seq  [hh:mm:ss:mss] Enabling plugin ../myPlugin from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Skipped loading plugin ../myPlugin because only package name is allowed plugin name
Info seq  [hh:mm:ss:mss] Enabling plugin @myscoped/plugin/../malicious from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Skipped loading plugin @myscoped/plugin/../malicious because only package name is allowed plugin name
Info seq  [hh:mm:ss:mss] Enabling plugin myPlugin/../malicious from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Skipped loading plugin myPlugin/../malicious because only package name is allowed plugin name
Info seq  [hh:mm:ss:mss] Enabling plugin myPlugin/subpath/../../malicious from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Skipped loading plugin myPlugin/subpath/../../malicious because only package name is allowed plugin name
Info seq  [hh:mm:ss:mss] Enabling plugin undefined from candidate paths: /home/src/tslibs/TS/Lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Skipped loading plugin {"transform":"some-transform"} because only package name is allowed plugin name
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a.ts SVC-1-0 "class c { prop = \"hello\"; foo() { return this.prop; } }"


	../../tslibs/TS/Lib/lib.d.ts
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
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 55,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "plugins": [
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              ""
            ]
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
        "triggerFile": "/home/src/projects/project/a.ts",
        "configFile": "/home/src/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a.ts ProjectRootPath: undefined
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
/home/src/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project: *new*
  {}

Projects::
/home/src/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
