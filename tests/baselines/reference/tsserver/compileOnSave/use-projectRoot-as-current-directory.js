Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/root/TypeScriptProject3/TypeScriptProject3/Foo.ts]
consonle.log('file1');

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
            "fileName": "/home/src/root/TypeScriptProject3/TypeScriptProject3/Foo.ts"
          }
        ],
        "options": {
          "outFile": "bar.js",
          "sourceMap": true,
          "compileOnSave": true
        },
        "projectFileName": "/home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Creating ExternalProject: /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj, currentDirectory: /home/src/root/TypeScriptProject3/TypeScriptProject3
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/root/TypeScriptProject3/TypeScriptProject3/Foo.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/root/TypeScriptProject3/TypeScriptProject3/node_modules/@types 1 undefined Project: /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/root/TypeScriptProject3/TypeScriptProject3/node_modules/@types 1 undefined Project: /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/root/TypeScriptProject3/node_modules/@types 1 undefined Project: /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/root/TypeScriptProject3/node_modules/@types 1 undefined Project: /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/root/node_modules/@types 1 undefined Project: /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/root/node_modules/@types 1 undefined Project: /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/root/TypeScriptProject3/TypeScriptProject3/Foo.ts Text-1 "consonle.log('file1');"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	Foo.ts
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
          "projectId": "ec3f015ba6a9aa66192a8cc5550a08c06ca35fc043420f9cb98b1eefbb02222c",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
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
            "outFile": "",
            "sourceMap": true
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
Info seq  [hh:mm:ss:mss] Project '/home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)

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
/home/src/root/TypeScriptProject3/TypeScriptProject3/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/root/TypeScriptProject3/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/root/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/root/TypeScriptProject3/TypeScriptProject3/Foo.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/root/TypeScriptProject3/TypeScriptProject3/Foo.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/home/src/root/TypeScriptProject3/TypeScriptProject3/Foo.ts"
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
//// [/home/src/root/TypeScriptProject3/TypeScriptProject3/bar.js.map]
{"version":3,"file":"bar.js","sourceRoot":"","sources":["Foo.ts"],"names":[],"mappings":"AAAA,QAAQ,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC"}

//// [/home/src/root/TypeScriptProject3/TypeScriptProject3/bar.js]
consonle.log('file1');
//# sourceMappingURL=bar.js.map

