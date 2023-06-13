currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/root/TypeScriptProject3/TypeScriptProject3/Foo.ts]
consonle.log('file1');

//// [/a/lib/lib.d.ts]
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/root/TypeScriptProject3/TypeScriptProject3/Foo.ts"
          }
        ],
        "options": {
          "outFile": "bar.js",
          "sourceMap": true,
          "compileOnSave": true
        },
        "projectFileName": "/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /root/TypeScriptProject3/TypeScriptProject3/Foo.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /root/TypeScriptProject3/TypeScriptProject3/node_modules/@types 1 undefined Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /root/TypeScriptProject3/TypeScriptProject3/node_modules/@types 1 undefined Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/root/TypeScriptProject3/TypeScriptProject3/Foo.ts Text-1 "consonle.log('file1');"


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	Foo.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/root/typescriptproject3/typescriptproject3/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/root/typescriptproject3/typescriptproject3/foo.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/root/TypeScriptProject3/TypeScriptProject3/Foo.ts"
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
//// [/root/TypeScriptProject3/TypeScriptProject3/bar.js.map]
{"version":3,"file":"bar.js","sourceRoot":"","sources":["Foo.ts"],"names":[],"mappings":"AAAA,QAAQ,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC"}

//// [/root/TypeScriptProject3/TypeScriptProject3/bar.js]
consonle.log('file1');
//# sourceMappingURL=bar.js.map

