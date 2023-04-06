currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.js]
function test1() { }

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


Info 1    [00:00:14.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/project.csproj",
        "rootFiles": [
          {
            "fileName": "/a/b/f1.js"
          }
        ],
        "options": {}
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.js 500 undefined WatchType: Closed Script info
Info 3    [00:00:16.000] Starting updateGraphWorker: Project: /a/b/project.csproj
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/project.csproj WatchType: Type roots
Info 6    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/project.csproj WatchType: Type roots
Info 7    [00:00:20.000] Finishing updateGraphWorker: Project: /a/b/project.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:21.000] Project '/a/b/project.csproj' (External)
Info 9    [00:00:22.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.js Text-1 "function test1() { }"


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.js
	  Root file specified for compilation

Info 10   [00:00:23.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

TI:: [00:00:24.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:25.000] Processing cache location '/a/data/'
TI:: [00:00:26.000] Trying to find '/a/data/package.json'...
TI:: [00:00:27.000] Finished processing cache location '/a/data/'
TI:: [00:00:28.000] Npm config file: /a/data/package.json
TI:: [00:00:29.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:34.000] Updating types-registry npm package...
TI:: [00:00:35.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:42.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:43.000] Got install request {"projectName":"/a/b/project.csproj","fileNames":["/a/lib/lib.d.ts","/a/b/f1.js"],"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typeAcquisition":{"include":[],"exclude":[],"enable":true},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:44.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:45.000] Processing cache location '/a/data/'
TI:: [00:00:46.000] Cache location was already processed...
TI:: [00:00:47.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:48.000] Explicitly included types: []
TI:: [00:00:49.000] Inferred typings from unresolved imports: []
TI:: [00:00:50.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:51.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/b/project.csproj watcher already invoked: false
TI:: [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/b/project.csproj watcher already invoked: false
TI:: [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/project.csproj watcher already invoked: false
TI:: [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/project.csproj watcher already invoked: false
TI:: [00:00:58.000] Sending response:
    {"projectName":"/a/b/project.csproj","typeAcquisition":{"include":[],"exclude":[],"enable":true},"compilerOptions":{"allowNonTsExtensions":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:00:59.000] No new typings were requested as a result of typings discovery
Info 11   [00:01:00.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}
/a/b/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js:
  {}
/a/lib/lib.d.ts:
  {}

Before request

Info 12   [00:01:01.000] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/project.csproj"
      },
      "seq": 2,
      "type": "request"
    }
Info 13   [00:01:02.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 14   [00:01:03.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "/a/b/project.csproj",
        "rootFiles": [
          {
            "fileName": "/a/b/f1.js"
          }
        ],
        "options": {
          "module": 1
        }
      },
      "seq": 3,
      "type": "request"
    }
Info 15   [00:01:04.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/project.csproj WatchType: Type roots
Info 16   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/project.csproj WatchType: Type roots
Info 17   [00:01:06.000] Starting updateGraphWorker: Project: /a/b/project.csproj
Info 18   [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/project.csproj WatchType: Type roots
Info 19   [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/project.csproj WatchType: Type roots
Info 20   [00:01:09.000] Finishing updateGraphWorker: Project: /a/b/project.csproj Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:01:10.000] Project '/a/b/project.csproj' (External)
Info 22   [00:01:11.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.js Text-1 "function test1() { }"

Info 23   [00:01:12.000] -----------------------------------------------
Info 24   [00:01:13.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500} *new*

PolledWatches *deleted*::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js:
  {}
/a/lib/lib.d.ts:
  {}

Before request

Info 25   [00:01:14.000] request:
    {
      "command": "compilerOptionsDiagnostics-full",
      "arguments": {
        "projectFileName": "/a/b/project.csproj"
      },
      "seq": 4,
      "type": "request"
    }
Info 26   [00:01:15.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
