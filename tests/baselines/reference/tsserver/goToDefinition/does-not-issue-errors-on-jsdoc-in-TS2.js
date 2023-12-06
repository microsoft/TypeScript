currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/packages/babel-loader/tsconfig.json]

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


//// [/packages/babel-loader/src/index.ts]

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
            "file": "/packages/babel-loader/src/index.ts",
            "fileContent": "\ndeclare class Stuff {\n  /**\n   * Register a function to be run on mod initialization...\n   *\n   * {@link https://lua-api.factorio.com/latest/LuaBootstrap.html#LuaBootstrap.on_init View documentation}\n   * @param f The handler for this event. Passing nil will unregister it.\n   * @remarks For more context, refer to the {@link https://lua-api.factorio.com/latest/Data-Lifecycle.html Data Lifecycle} page.\n   * @example Initialize a players table in global for later use.\n   *\n   */\n  on_init(f: (() => void) | undefined): void\n}\n"
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/babel-loader/src
Info seq  [hh:mm:ss:mss] For info: /packages/babel-loader/src/index.ts :: Config file name: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/babel-loader/tsconfig.json 2000 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/packages/babel-loader/tsconfig.json",
        "reason": "Creating possible configured project for /packages/babel-loader/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /packages/babel-loader/tsconfig.json : {
 "rootNames": [
  "/packages/babel-loader/src/index.ts"
 ],
 "options": {
  "target": 5,
  "module": 1,
  "strict": true,
  "esModuleInterop": true,
  "rootDir": "/packages/babel-loader/src",
  "outDir": "/packages/babel-loader/dist",
  "configFilePath": "/packages/babel-loader/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/src 1 undefined Config: /packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/babel-loader/src 1 undefined Config: /packages/babel-loader/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2018.full.d.ts 500 undefined Project: /packages/babel-loader/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/babel-loader/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/packages/babel-loader/src/index.ts SVC-1-0 "\ndeclare class Stuff {\n  /**\n   * Register a function to be run on mod initialization...\n   *\n   * {@link https://lua-api.factorio.com/latest/LuaBootstrap.html#LuaBootstrap.on_init View documentation}\n   * @param f The handler for this event. Passing nil will unregister it.\n   * @remarks For more context, refer to the {@link https://lua-api.factorio.com/latest/Data-Lifecycle.html Data Lifecycle} page.\n   * @example Initialize a players table in global for later use.\n   *\n   */\n  on_init(f: (() => void) | undefined): void\n}\n"


	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/packages/babel-loader/tsconfig.json"
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
          "projectId": "b5c9ceadb72d6d15d60a31707ef7d6e2798bddc428873ecb3036d48757a18392",
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
        "triggerFile": "/packages/babel-loader/src/index.ts",
        "configFile": "/packages/babel-loader/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/a/lib/lib.es2018.full.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es2018'",
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
Info seq  [hh:mm:ss:mss] Project '/packages/babel-loader/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/babel-loader/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/babel-loader/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.es2018.full.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/packages/babel-loader/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/packages/babel-loader/src: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definition",
      "arguments": {
        "line": 6,
        "offset": 13,
        "file": "/packages/babel-loader/src/index.ts"
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
        "file": "/packages/babel-loader/src/index.ts"
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
