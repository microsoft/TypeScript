currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info 1    [00:00:18.000] request:
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
Info 2    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /root/TypeScriptProject3/TypeScriptProject3/Foo.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:20.000] Starting updateGraphWorker: Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj
Info 4    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /root/TypeScriptProject3/TypeScriptProject3/node_modules/@types 1 undefined Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info 6    [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /root/TypeScriptProject3/TypeScriptProject3/node_modules/@types 1 undefined Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info 7    [00:00:24.000] Finishing updateGraphWorker: Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:25.000] Project '/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj' (External)
Info 9    [00:00:26.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/root/TypeScriptProject3/TypeScriptProject3/Foo.ts Text-1 "consonle.log('file1');"


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	Foo.ts
	  Root file specified for compilation

Info 10   [00:00:27.000] -----------------------------------------------
Info 11   [00:00:28.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/root/typescriptproject3/typescriptproject3/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/root/typescriptproject3/typescriptproject3/foo.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 12   [00:00:29.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/root/TypeScriptProject3/TypeScriptProject3/Foo.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 13   [00:00:34.000] response:
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

