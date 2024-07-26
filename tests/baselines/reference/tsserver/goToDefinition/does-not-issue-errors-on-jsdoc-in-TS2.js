currentDirectory:: /home/src/vscode/projects/bin useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/packages/babel-loader/tsconfig.json]

{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"],
}


//// [/home/src/projects/project/packages/babel-loader/src/index.ts]

declare class Stuff {
  /**
   * Register a function to be run on mod initialization...
   *
   * {@link https://lua-api.factorio.com/latest/LuaBootstrap.html#LuaBootstrap.on_init View documentation}
   * @param f The handler for this event. Passing nil will unregister it.
   * @remarks For more context, refer to the {@link https://lua-api.factorio.com/latest/Data-Lifecycle.html Data Lifecycle} page.
   * @example Initialize a players table in global for later use.
   *
   */
  on_init(f: (() => void) | undefined): void
}



Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "openFiles": [
          {
            "file": "/home/src/projects/project/packages/babel-loader/src/index.ts",
            "fileContent": "\ndeclare class Stuff {\n  /**\n   * Register a function to be run on mod initialization...\n   *\n   * {@link https://lua-api.factorio.com/latest/LuaBootstrap.html#LuaBootstrap.on_init View documentation}\n   * @param f The handler for this event. Passing nil will unregister it.\n   * @remarks For more context, refer to the {@link https://lua-api.factorio.com/latest/Data-Lifecycle.html Data Lifecycle} page.\n   * @example Initialize a players table in global for later use.\n   *\n   */\n  on_init(f: (() => void) | undefined): void\n}\n"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/packages/babel-loader/src/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /home/src/projects/project/packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/tsconfig.json 2000 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/packages/babel-loader/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/packages/babel-loader/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/packages/babel-loader/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/packages/babel-loader/src/index.ts"
 ],
 "options": {
  "target": 5,
  "module": 1,
  "strict": true,
  "esModuleInterop": true,
  "rootDir": "/home/src/projects/project/packages/babel-loader/src",
  "outDir": "/home/src/projects/project/packages/babel-loader/dist",
  "configFilePath": "/home/src/projects/project/packages/babel-loader/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/src 1 undefined Config: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/src 1 undefined Config: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/ts/lib/lib.es2018.full.d.ts 500 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/babel-loader/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/babel-loader/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/babel-loader/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/home/src/projects/project/packages/babel-loader/src/index.ts SVC-1-0 "\ndeclare class Stuff {\n  /**\n   * Register a function to be run on mod initialization...\n   *\n   * {@link https://lua-api.factorio.com/latest/LuaBootstrap.html#LuaBootstrap.on_init View documentation}\n   * @param f The handler for this event. Passing nil will unregister it.\n   * @remarks For more context, refer to the {@link https://lua-api.factorio.com/latest/Data-Lifecycle.html Data Lifecycle} page.\n   * @example Initialize a players table in global for later use.\n   *\n   */\n  on_init(f: (() => void) | undefined): void\n}\n"


	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/packages/babel-loader/tsconfig.json"
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
          "projectId": "0b2579a5dab38b62470159ea898b5b78e12c94ce69ffdc2d5564aaae36c1bec8",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 529,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "target": "es2018",
            "module": "commonjs",
            "strict": true,
            "esModuleInterop": true,
            "rootDir": "",
            "outDir": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": true,
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
        "triggerFile": "/home/src/projects/project/packages/babel-loader/src/index.ts",
        "configFile": "/home/src/projects/project/packages/babel-loader/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/home/src/tslibs/ts/lib/lib.es2018.full.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es2018'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'CallableFunction'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'NewableFunction'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/babel-loader/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true,
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
/home/src/projects/project/packages/babel-loader/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/tslibs/ts/lib/lib.es2018.full.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/packages/babel-loader/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project/packages/babel-loader/src: *new*
  {}

Projects::
/home/src/projects/project/packages/babel-loader/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/packages/babel-loader/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/babel-loader/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definition",
      "arguments": {
        "line": 6,
        "offset": 13,
        "file": "/home/src/projects/project/packages/babel-loader/src/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/home/src/projects/project/packages/babel-loader/src/index.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
