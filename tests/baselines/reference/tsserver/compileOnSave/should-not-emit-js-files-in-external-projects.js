Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/workspace/projects/b/file1.ts]
consonle.log('file1');

//// [/home/src/workspace/projects/b/file2.js]
console.log'file2');

//// [/home/src/workspace/projects/b/file3.js]
console.log('file3');

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
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/home/src/workspace/projects/b/file1.ts"
          },
          {
            "fileName": "/home/src/workspace/projects/b/file2.js"
          }
        ],
        "options": {
          "allowJs": true,
          "outFile": "dist.js",
          "compileOnSave": true
        },
        "projectFileName": "/home/src/workspace/projects/b/externalproject"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /home/src/workspace/projects/b/externalproject, currentDirectory: /home/src/workspace/projects/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/file2.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/b/externalproject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/b/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules/@types 1 undefined Project: /home/src/workspace/projects/b/externalproject WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/b/externalproject projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/b/externalproject' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspace/projects/b/file1.ts Text-1 "consonle.log('file1');"
	/home/src/workspace/projects/b/file2.js Text-1 "console.log'file2');"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Root file specified for compilation
	file2.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "d8b3bed745daf27ebe8ab6618f11a5a63aad6adf0100ed5a962474beeb58f078",
          "fileStats": {
            "js": 1,
            "jsSize": 20,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 22,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "allowJs": true,
            "outFile": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "compileOnSave": true,
          "configFileName": "other",
          "projectType": "external",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/b/externalproject' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
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
/home/src/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspace/projects/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspace/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspace/projects/b/file1.ts: *new*
  {}
/home/src/workspace/projects/b/file2.js: *new*
  {}

Projects::
/home/src/workspace/projects/b/externalproject (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/externalproject
/home/src/workspace/projects/b/file1.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/externalproject
/home/src/workspace/projects/b/file2.js *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/b/externalproject

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/home/src/workspace/projects/b/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/home/src/workspace/projects/b/dist.js]
consonle.log('file1');


