TI:: Creating typing installer
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


TI:: [00:00:17.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:18.000] Processing cache location '/a/data/'
TI:: [00:00:19.000] Trying to find '/a/data/package.json'...
TI:: [00:00:20.000] Finished processing cache location '/a/data/'
TI:: [00:00:21.000] Npm config file: /a/data/package.json
TI:: [00:00:22.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:27.000] Updating types-registry npm package...
TI:: [00:00:28.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:35.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:36.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:37.000] request:
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
Before request

Info 2    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /root/TypeScriptProject3/TypeScriptProject3/Foo.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:39.000] Starting updateGraphWorker: Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj
Info 4    [00:00:40.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /root/TypeScriptProject3/TypeScriptProject3/node_modules/@types 1 undefined Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info 6    [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /root/TypeScriptProject3/TypeScriptProject3/node_modules/@types 1 undefined Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj WatchType: Type roots
Info 7    [00:00:43.000] Finishing updateGraphWorker: Project: /root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:44.000] Project '/root/TypeScriptProject3/TypeScriptProject3/TypeScriptProject3.csproj' (External)
Info 9    [00:00:45.000] 	Files (2)
	/a/lib/lib.d.ts
	/root/TypeScriptProject3/TypeScriptProject3/Foo.ts


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	Foo.ts
	  Root file specified for compilation

Info 10   [00:00:46.000] -----------------------------------------------
After request

PolledWatches::
/root/typescriptproject3/typescriptproject3/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/root/typescriptproject3/typescriptproject3/foo.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Info 11   [00:00:47.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 12   [00:00:48.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/root/TypeScriptProject3/TypeScriptProject3/Foo.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

After request
//// [/root/TypeScriptProject3/TypeScriptProject3/bar.js.map]
{"version":3,"file":"bar.js","sourceRoot":"","sources":["Foo.ts"],"names":[],"mappings":"AAAA,QAAQ,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC"}

//// [/root/TypeScriptProject3/TypeScriptProject3/bar.js]
consonle.log('file1');
//# sourceMappingURL=bar.js.map


Info 13   [00:00:53.000] response:
    {
      "response": true,
      "responseRequired": true
    }