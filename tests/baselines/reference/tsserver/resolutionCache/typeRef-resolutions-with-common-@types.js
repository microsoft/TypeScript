Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/workspaces/project/test/module/ts-require/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "traceResolution": true
  }
}

//// [/home/src/workspaces/project/test/module/ts-require/index.ts]
export const tsRequireIndex= 10;

//// [/home/src/workspaces/project/test/module/ts-require/main.ts]
export const tsRequireMain= 10;

//// [/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts]
/// <reference types="node" />
export const z = 10;


//// [/home/src/workspaces/project/test/module/ts/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "traceResolution": true
  }
}

//// [/home/src/workspaces/project/test/module/ts/index.ts]
export const tsIndex= 10;

//// [/home/src/workspaces/project/test/module/ts/main.ts]
export const tsMain = 10;

//// [/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts]
declare const tsRequireGlobal = 10;

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
        "file": "/home/src/workspaces/project/test/module/ts-require/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/test/module/ts-require/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/test/module/ts-require/tsconfig.json, currentDirectory: /home/src/workspaces/project/test/module/ts-require
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts-require/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/test/module/ts-require/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/test/module/ts-require/index.ts",
  "/home/src/workspaces/project/test/module/ts-require/main.ts"
 ],
 "options": {
  "incremental": true,
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/test/module/ts-require/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/test/module/ts-require/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/test/module/ts-require/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts-require 1 undefined Config: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts-require 1 undefined Config: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts-require/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/test/module/ts-require/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/test/module/ts-require/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/test/module/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', result '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts-require/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts-require/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'responselike', containing file '/home/src/workspaces/project/test/module/ts-require/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/test/module/ts-require/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/test/module/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'responselike' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', root directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/test/module/ts-require/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Resolution for type reference directive 'node' was found in cache from location '/home/src/workspaces/project/test/module/ts-require'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/node_modules/@types/node/package.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/node_modules/@types/package.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/node_modules/package.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/package.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/responselike/package.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/package.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/package.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts-require/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts-require/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/test/module/ts-require/index.ts SVC-1-0 "export const tsRequireIndex= 10;"
	/home/src/workspaces/project/test/module/ts-require/main.ts Text-1 "export const tsRequireMain= 10;"
	/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts Text-1 "declare const tsRequireGlobal = 10;"
	/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts Text-1 "/// <reference types=\"node\" />\nexport const z = 10;\n"


	../../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by default include pattern '**/*'
	main.ts
	  Matched by default include pattern '**/*'
	../../node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'
	  Type library referenced via 'node' from file '../../../node_modules/@types/responselike/index.d.ts'
	../../../node_modules/@types/responselike/index.d.ts
	  Entry point for implicit type library 'responselike'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/test/module/ts-require/tsconfig.json"
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
          "projectId": "adc073e1ea8a882426f22e2be260cb19e98f2f004970753e93218e67537c88c5",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 63,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 3,
            "dtsSize": 500,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "incremental": true,
            "traceResolution": true
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
        "triggerFile": "/home/src/workspaces/project/test/module/ts-require/index.ts",
        "configFile": "/home/src/workspaces/project/test/module/ts-require/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts-require/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
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
/home/src/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/responselike/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/test/module/node_modules: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/test/module/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/test/module/ts-require/node_modules: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/test/module/ts-require/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/test/node_modules/@types/node/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/test/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/test/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/test/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspaces/project/test/module/ts-require/main.ts: *new*
  {}
/home/src/workspaces/project/test/module/ts-require/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules: *new*
  {}
/home/src/workspaces/project/node_modules/@types: *new*
  {}
/home/src/workspaces/project/test/module/ts-require: *new*
  {}
/home/src/workspaces/project/test/node_modules: *new*
  {}
/home/src/workspaces/project/test/node_modules/@types: *new*
  {}

Projects::
/home/src/workspaces/project/test/module/ts-require/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
/home/src/workspaces/project/test/module/ts-require/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts-require/main.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspaces/project/test/module/ts/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/test/module/ts/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/test/module/ts/tsconfig.json, currentDirectory: /home/src/workspaces/project/test/module/ts
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/test/module/ts/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/test/module/ts/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/test/module/ts/index.ts",
  "/home/src/workspaces/project/test/module/ts/main.ts"
 ],
 "options": {
  "incremental": true,
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/test/module/ts/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/test/module/ts/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/test/module/ts/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts 1 undefined Config: /home/src/workspaces/project/test/module/ts/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts 1 undefined Config: /home/src/workspaces/project/test/module/ts/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/test/module/ts/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/test/module/ts/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/test/module/ts/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for type reference directive 'node' was found in cache from location '/home/src/workspaces/project/test/module'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts/node_modules 1 undefined Project: /home/src/workspaces/project/test/module/ts/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'responselike', containing file '/home/src/workspaces/project/test/module/ts/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/test/module/ts/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/test/module/ts/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for type reference directive 'responselike' was found in cache from location '/home/src/workspaces/project/test/module'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'responselike' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', root directory '/home/src/workspaces/project/test/module/ts/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/test/module/ts/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Resolution for type reference directive 'node' was found in cache from location '/home/src/workspaces/project/test/module/ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/test/module/ts/node_modules/@types 1 undefined Project: /home/src/workspaces/project/test/module/ts/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/test/module/ts/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/test/module/ts/index.ts SVC-1-0 "export const tsIndex= 10;"
	/home/src/workspaces/project/test/module/ts/main.ts Text-1 "export const tsMain = 10;"
	/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts Text-1 "declare const tsRequireGlobal = 10;"
	/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts Text-1 "/// <reference types=\"node\" />\nexport const z = 10;\n"


	../../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by default include pattern '**/*'
	main.ts
	  Matched by default include pattern '**/*'
	../../node_modules/@types/node/index.d.ts
	  Entry point for implicit type library 'node'
	  Type library referenced via 'node' from file '../../../node_modules/@types/responselike/index.d.ts'
	../../../node_modules/@types/responselike/index.d.ts
	  Entry point for implicit type library 'responselike'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/test/module/ts/tsconfig.json"
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
          "projectId": "202802eb63111cc0920e4af3b5c1aa71e3fca30c0d80fa0fd67e7c93118049f5",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 50,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 3,
            "dtsSize": 500,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "incremental": true,
            "traceResolution": true
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
        "triggerFile": "/home/src/workspaces/project/test/module/ts/index.ts",
        "configFile": "/home/src/workspaces/project/test/module/ts/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts-require/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/responselike/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/test/module/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/project/test/module/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/test/module/ts-require/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/project/test/module/ts-require/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/test/module/ts/node_modules: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/test/module/ts/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/test/node_modules/@types/node/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/test/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/test/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/test/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces/project/test/module/ts-require/main.ts:
  {}
/home/src/workspaces/project/test/module/ts-require/tsconfig.json:
  {}
/home/src/workspaces/project/test/module/ts/main.ts: *new*
  {}
/home/src/workspaces/project/test/module/ts/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
/home/src/workspaces/project/test/module/ts: *new*
  {}
/home/src/workspaces/project/test/module/ts-require:
  {}
/home/src/workspaces/project/test/node_modules:
  {}
/home/src/workspaces/project/test/node_modules/@types:
  {}

Projects::
/home/src/workspaces/project/test/module/ts-require/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/test/module/ts/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json *new*
/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json *new*
/home/src/workspaces/project/test/module/ts-require/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts-require/main.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
/home/src/workspaces/project/test/module/ts/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts/main.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json *new*

build ts project with edit
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/test/module/ts/main.ts 1:: WatchInfo: /home/src/workspaces/project/test/module/ts/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/test/module/ts/main.ts 1:: WatchInfo: /home/src/workspaces/project/test/module/ts/main.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /home/src/workspaces/project/test/module/ts/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/test/module/ts/main.ts]
export const tsMain = 10;export const z = 10;


Timeout callback:: count: 2
1: /home/src/workspaces/project/test/module/ts/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/test/module/ts-require/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/test/module/ts/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/test/module/ts-require/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts-require/main.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
/home/src/workspaces/project/test/module/ts/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts/main.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/test/module/ts/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/test/module/ts/index.ts SVC-1-0 "export const tsIndex= 10;"
	/home/src/workspaces/project/test/module/ts/main.ts Text-2 "export const tsMain = 10;export const z = 10;"
	/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts Text-1 "declare const tsRequireGlobal = 10;"
	/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts Text-1 "/// <reference types=\"node\" />\nexport const z = 10;\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts-require/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts-require/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/test/module/ts-require/index.ts,/home/src/workspaces/project/test/module/ts/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/test/module/ts-require/index.ts",
          "/home/src/workspaces/project/test/module/ts/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/test/module/ts-require/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/test/module/ts/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/test/module/ts-require/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts-require/main.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
/home/src/workspaces/project/test/module/ts/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts/main.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

build ts-require project with edit
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/test/module/ts-require/main.ts 1:: WatchInfo: /home/src/workspaces/project/test/module/ts-require/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/test/module/ts-require/main.ts 1:: WatchInfo: /home/src/workspaces/project/test/module/ts-require/main.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
3: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/test/module/ts-require/main.ts]
export const tsRequireMain= 10;export const z = 10;


Timeout callback:: count: 2
3: /home/src/workspaces/project/test/module/ts-require/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/test/module/ts-require/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false
/home/src/workspaces/project/test/module/ts/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/test/module/ts-require/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts-require/main.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
/home/src/workspaces/project/test/module/ts/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts/main.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/test/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/test/module/ts-require/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/test/module/ts-require/index.ts SVC-1-0 "export const tsRequireIndex= 10;"
	/home/src/workspaces/project/test/module/ts-require/main.ts Text-2 "export const tsRequireMain= 10;export const z = 10;"
	/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts Text-1 "declare const tsRequireGlobal = 10;"
	/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts Text-1 "/// <reference types=\"node\" />\nexport const z = 10;\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts-require/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/test/module/ts/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts-require/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts-require/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/test/module/ts/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/test/module/ts/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/test/module/ts-require/index.ts,/home/src/workspaces/project/test/module/ts/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/test/module/ts-require/index.ts",
          "/home/src/workspaces/project/test/module/ts/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/test/module/ts-require/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false
/home/src/workspaces/project/test/module/ts/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/test/module/ts-require/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts-require/main.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
/home/src/workspaces/project/test/module/ts/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json *default*
/home/src/workspaces/project/test/module/ts/main.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/test/module/ts/tsconfig.json
/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/test/module/ts-require/tsconfig.json
        /home/src/workspaces/project/test/module/ts/tsconfig.json

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0
