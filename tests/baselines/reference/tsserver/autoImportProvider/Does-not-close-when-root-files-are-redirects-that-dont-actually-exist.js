currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/packages/a/package.json]
{ "dependencies": { "b": "*" } }

//// [/packages/a/tsconfig.json]
{ "compilerOptions": { "composite": true }, "references": [{ "path": "./node_modules/b" }] }

//// [/packages/a/index.ts]


//// [/packages/a/node_modules/b/package.json]
{ "types": "dist/index.d.ts" }

//// [/packages/a/node_modules/b/tsconfig.json]
{ "compilerOptions": { "composite": true, "outDir": "dist" } }

//// [/packages/a/node_modules/b/index.ts]
export class B {}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configure",
      "arguments": {
        "preferences": {
          "includePackageJsonAutoImports": "auto",
          "includeCompletionsForModuleExports": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/packages/a/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /packages/a/index.ts ProjectRootPath: undefined:: Result: /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/a/tsconfig.json 2000 undefined Project: /packages/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/packages/a/tsconfig.json",
        "reason": "Creating possible configured project for /packages/a/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /packages/a/tsconfig.json : {
 "rootNames": [
  "/packages/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/packages/a/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/a/node_modules/b",
   "originalPath": "./node_modules/b"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /packages/a/node_modules/b/tsconfig.json : {
 "rootNames": [
  "/packages/a/node_modules/b/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/packages/a/node_modules/b/dist",
  "configFilePath": "/packages/a/node_modules/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/a/node_modules/b/tsconfig.json 2000 undefined Project: /packages/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/b 1 undefined Config: /packages/a/node_modules/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/b 1 undefined Config: /packages/a/node_modules/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /packages/a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/a/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/packages/a/index.ts SVC-1-0 ""


	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/a/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 1 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/a/node_modules/b/package.json 2000 undefined Project: /dev/null/autoImportProviderProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/packages/a/node_modules/b/index.ts Text-1 "export class B {}"


	node_modules/b/index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/packages/a/tsconfig.json"
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
          "projectId": "6edf479645d32098ca569c63f11983698e9605f9c93434c82d0a11781349a12b",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true
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
        "triggerFile": "/packages/a/index.ts",
        "configFile": "/packages/a/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'",
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
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /packages/a/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/packages/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /packages/a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/packages/a/node_modules/b/package.json: *new*
  {}
/packages/a/node_modules/b/tsconfig.json: *new*
  {}
/packages/a/package.json: *new*
  {}
/packages/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/packages/a: *new*
  {}
/packages/a/node_modules: *new*
  {}
/packages/a/node_modules/b: *new*
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/packages/a/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
/packages/a/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /packages/a/tsconfig.json *default*
/packages/a/node_modules/b/index.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*

After getPackageJsonAutoImportProvider

After getPackageJsonAutoImportProvider
