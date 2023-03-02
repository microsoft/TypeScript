Info 0    [00:00:15.000] For files of style c:/myprojects/project/x.js
Info 1    [00:00:16.000] Provided types map file "c:/a/lib/typesMap.json" doesn't exist
Before request
//// [c:/a/lib/lib.d.ts]
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

//// [c:/myprojects/project/x.js]
const x = 10


Info 2    [00:00:17.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 3    [00:00:18.000] Search path: c:/myprojects/project
Info 4    [00:00:19.000] For info: c:/myprojects/project/x.js :: No config files found.
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: c:/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:21.000] FileWatcher:: Added:: WatchInfo: c:/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 8    [00:00:23.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 10   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:28.000] 	Files (2)
	c:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	c:/myprojects/project/x.js SVC-1-0 "const x = 10"


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 14   [00:00:29.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
c:/myprojects/project/tsconfig.json: *new*
  {"pollingInterval":2000}
c:/myprojects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
c:/a/lib/lib.d.ts: *new*
  {}

TI:: [00:00:30.000] Global cache location 'c:/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:31.000] Processing cache location 'c:/a/data/'
TI:: [00:00:32.000] Trying to find 'c:/a/data/package.json'...
TI:: [00:00:33.000] Finished processing cache location 'c:/a/data/'
TI:: [00:00:34.000] Npm config file: c:/a/data/package.json
TI:: [00:00:35.000] Npm config file: 'c:/a/data/package.json' is missing, creating new one...
TI:: [00:00:40.000] Updating types-registry npm package...
TI:: [00:00:41.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:48.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [c:/a/data/package.json]
{ "private": true }

//// [c:/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:49.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["c:/a/lib/lib.d.ts","c:/myprojects/project/x.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"c:/myprojects/project","cachePath":"c:/a/data/","kind":"discover"}
TI:: [00:00:50.000] Request specifies cache path 'c:/a/data/', loading cached information...
TI:: [00:00:51.000] Processing cache location 'c:/a/data/'
TI:: [00:00:52.000] Cache location was already processed...
TI:: [00:00:53.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:54.000] Explicitly included types: []
TI:: [00:00:55.000] Inferred typings from unresolved imports: []
TI:: [00:00:56.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["c:/myprojects/project/bower_components","c:/myprojects/project/node_modules"]}
TI:: [00:00:57.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["c:/myprojects/project/bower_components","c:/myprojects/project/node_modules"]}
TI:: [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/bower_components
TI:: [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules
TI:: [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:04.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:05.000] No new typings were requested as a result of typings discovery
Info 15   [00:01:06.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:01:07.000] 	Files (2)

Info 15   [00:01:08.000] -----------------------------------------------
Info 15   [00:01:09.000] Open files: 
Info 15   [00:01:10.000] 	FileName: c:/myprojects/project/x.js ProjectRootPath: undefined
Info 15   [00:01:11.000] 		Projects: /dev/null/inferredProject1*
Info 15   [00:01:12.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
c:/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
c:/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
c:/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
c:/myprojects/project/bower_components: *new*
  {"pollingInterval":500}
c:/myprojects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
c:/a/lib/lib.d.ts:
  {}

Info 16   [00:00:17.000] For files of style //vda1cs4850/myprojects/project/x.js
Info 17   [00:00:18.000] Provided types map file "//vda1cs4850/a/lib/typesMap.json" doesn't exist
Before request
//// [//vda1cs4850/a/lib/lib.d.ts]
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

//// [//vda1cs4850/vda1cs4850/myprojects/project/x.js]
const x = 10


Info 18   [00:00:19.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 19   [00:00:20.000] Search path: //vda1cs4850/myprojects/project
Info 20   [00:00:21.000] For info: //vda1cs4850/myprojects/project/x.js :: No config files found.
Info 21   [00:00:22.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 22   [00:00:23.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 23   [00:00:24.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 24   [00:00:25.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 25   [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 26   [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 27   [00:00:28.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:29.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:00:30.000] 	Files (2)
	//vda1cs4850/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	//vda1cs4850/myprojects/project/x.js SVC-1-0 ""


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 30   [00:00:31.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
//vda1cs4850/myprojects/project/tsconfig.json: *new*
  {"pollingInterval":2000}
//vda1cs4850/myprojects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
//vda1cs4850/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
//vda1cs4850/a/lib/lib.d.ts: *new*
  {}

TI:: [00:00:32.000] Global cache location '//vda1cs4850/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:33.000] Processing cache location '//vda1cs4850/a/data/'
TI:: [00:00:34.000] Trying to find '//vda1cs4850/a/data/package.json'...
TI:: [00:00:35.000] Finished processing cache location '//vda1cs4850/a/data/'
TI:: [00:00:36.000] Npm config file: //vda1cs4850/a/data/package.json
TI:: [00:00:37.000] Npm config file: '//vda1cs4850/a/data/package.json' is missing, creating new one...
TI:: [00:00:42.000] Updating types-registry npm package...
TI:: [00:00:43.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:50.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [//vda1cs4850/a/data/package.json]
{ "private": true }

//// [//vda1cs4850/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:51.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["//vda1cs4850/a/lib/lib.d.ts","//vda1cs4850/myprojects/project/x.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"//vda1cs4850/myprojects/project","cachePath":"//vda1cs4850/a/data/","kind":"discover"}
TI:: [00:00:52.000] Request specifies cache path '//vda1cs4850/a/data/', loading cached information...
TI:: [00:00:53.000] Processing cache location '//vda1cs4850/a/data/'
TI:: [00:00:54.000] Cache location was already processed...
TI:: [00:00:55.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:56.000] Explicitly included types: []
TI:: [00:00:57.000] Inferred typings from unresolved imports: []
TI:: [00:00:58.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["//vda1cs4850/myprojects/project/bower_components","//vda1cs4850/myprojects/project/node_modules"]}
TI:: [00:00:59.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["//vda1cs4850/myprojects/project/bower_components","//vda1cs4850/myprojects/project/node_modules"]}
TI:: [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/bower_components
TI:: [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/node_modules
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:06.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:07.000] No new typings were requested as a result of typings discovery
Info 31   [00:01:08.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:01:09.000] 	Files (2)

Info 31   [00:01:10.000] -----------------------------------------------
Info 31   [00:01:11.000] Open files: 
Info 31   [00:01:12.000] 	FileName: //vda1cs4850/myprojects/project/x.js ProjectRootPath: undefined
Info 31   [00:01:13.000] 		Projects: /dev/null/inferredProject1*
Info 31   [00:01:14.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
//vda1cs4850/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/myprojects/project/bower_components: *new*
  {"pollingInterval":500}
//vda1cs4850/myprojects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
//vda1cs4850/a/lib/lib.d.ts:
  {}

Info 32   [00:00:19.000] For files of style //vda1cs4850/c$/myprojects/project/x.js
Info 33   [00:00:20.000] Provided types map file "//vda1cs4850/a/lib/typesMap.json" doesn't exist
Before request
//// [//vda1cs4850/a/lib/lib.d.ts]
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

//// [//vda1cs4850/vda1cs4850/c$/myprojects/project/x.js]
const x = 10


Info 34   [00:00:21.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/c$/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 35   [00:00:22.000] Search path: //vda1cs4850/c$/myprojects/project
Info 36   [00:00:23.000] For info: //vda1cs4850/c$/myprojects/project/x.js :: No config files found.
Info 37   [00:00:24.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 38   [00:00:25.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 39   [00:00:26.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 40   [00:00:27.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 41   [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 42   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 43   [00:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [00:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 45   [00:00:32.000] 	Files (2)
	//vda1cs4850/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	//vda1cs4850/c$/myprojects/project/x.js SVC-1-0 ""


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 46   [00:00:33.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
//vda1cs4850/c$/myprojects/project/tsconfig.json: *new*
  {"pollingInterval":2000}
//vda1cs4850/c$/myprojects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
//vda1cs4850/c$/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
//vda1cs4850/a/lib/lib.d.ts: *new*
  {}

TI:: [00:00:34.000] Global cache location '//vda1cs4850/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:35.000] Processing cache location '//vda1cs4850/a/data/'
TI:: [00:00:36.000] Trying to find '//vda1cs4850/a/data/package.json'...
TI:: [00:00:37.000] Finished processing cache location '//vda1cs4850/a/data/'
TI:: [00:00:38.000] Npm config file: //vda1cs4850/a/data/package.json
TI:: [00:00:39.000] Npm config file: '//vda1cs4850/a/data/package.json' is missing, creating new one...
TI:: [00:00:44.000] Updating types-registry npm package...
TI:: [00:00:45.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:52.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [//vda1cs4850/a/data/package.json]
{ "private": true }

//// [//vda1cs4850/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:53.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["//vda1cs4850/a/lib/lib.d.ts","//vda1cs4850/c$/myprojects/project/x.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"//vda1cs4850/c$/myprojects/project","cachePath":"//vda1cs4850/a/data/","kind":"discover"}
TI:: [00:00:54.000] Request specifies cache path '//vda1cs4850/a/data/', loading cached information...
TI:: [00:00:55.000] Processing cache location '//vda1cs4850/a/data/'
TI:: [00:00:56.000] Cache location was already processed...
TI:: [00:00:57.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:58.000] Explicitly included types: []
TI:: [00:00:59.000] Inferred typings from unresolved imports: []
TI:: [00:01:00.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["//vda1cs4850/c$/myprojects/project/bower_components","//vda1cs4850/c$/myprojects/project/node_modules"]}
TI:: [00:01:01.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["//vda1cs4850/c$/myprojects/project/bower_components","//vda1cs4850/c$/myprojects/project/node_modules"]}
TI:: [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/bower_components
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules
TI:: [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:08.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:09.000] No new typings were requested as a result of typings discovery
Info 47   [00:01:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 47   [00:01:11.000] 	Files (2)

Info 47   [00:01:12.000] -----------------------------------------------
Info 47   [00:01:13.000] Open files: 
Info 47   [00:01:14.000] 	FileName: //vda1cs4850/c$/myprojects/project/x.js ProjectRootPath: undefined
Info 47   [00:01:15.000] 		Projects: /dev/null/inferredProject1*
Info 47   [00:01:16.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
//vda1cs4850/c$/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/bower_components: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
//vda1cs4850/a/lib/lib.d.ts:
  {}

Info 48   [00:00:19.000] For files of style c:/users/username/myprojects/project/x.js
Info 49   [00:00:20.000] Provided types map file "c:/a/lib/typesMap.json" doesn't exist
Before request
//// [c:/a/lib/lib.d.ts]
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

//// [c:/users/username/myprojects/project/x.js]
const x = 10


Info 50   [00:00:21.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/users/username/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 51   [00:00:22.000] Search path: c:/users/username/myprojects/project
Info 52   [00:00:23.000] For info: c:/users/username/myprojects/project/x.js :: No config files found.
Info 53   [00:00:24.000] FileWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 54   [00:00:25.000] FileWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 55   [00:00:26.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 56   [00:00:27.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 57   [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 58   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 59   [00:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 60   [00:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 61   [00:00:32.000] 	Files (2)
	c:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	c:/users/username/myprojects/project/x.js SVC-1-0 "const x = 10"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 62   [00:00:33.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
c:/users/username/myprojects/project/tsconfig.json: *new*
  {"pollingInterval":2000}
c:/users/username/myprojects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/users/username/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
c:/a/lib/lib.d.ts: *new*
  {}

TI:: [00:00:34.000] Global cache location 'c:/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:35.000] Processing cache location 'c:/a/data/'
TI:: [00:00:36.000] Trying to find 'c:/a/data/package.json'...
TI:: [00:00:37.000] Finished processing cache location 'c:/a/data/'
TI:: [00:00:38.000] Npm config file: c:/a/data/package.json
TI:: [00:00:39.000] Npm config file: 'c:/a/data/package.json' is missing, creating new one...
TI:: [00:00:44.000] Updating types-registry npm package...
TI:: [00:00:45.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:52.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [c:/a/data/package.json]
{ "private": true }

//// [c:/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:53.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["c:/a/lib/lib.d.ts","c:/users/username/myprojects/project/x.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"c:/users/username/myprojects/project","cachePath":"c:/a/data/","kind":"discover"}
TI:: [00:00:54.000] Request specifies cache path 'c:/a/data/', loading cached information...
TI:: [00:00:55.000] Processing cache location 'c:/a/data/'
TI:: [00:00:56.000] Cache location was already processed...
TI:: [00:00:57.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:58.000] Explicitly included types: []
TI:: [00:00:59.000] Inferred typings from unresolved imports: []
TI:: [00:01:00.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["c:/users/username/myprojects/project/bower_components","c:/users/username/myprojects/project/node_modules"]}
TI:: [00:01:01.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["c:/users/username/myprojects/project/bower_components","c:/users/username/myprojects/project/node_modules"]}
TI:: [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/bower_components
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules
TI:: [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:08.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:09.000] No new typings were requested as a result of typings discovery
Info 63   [00:01:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 63   [00:01:11.000] 	Files (2)

Info 63   [00:01:12.000] -----------------------------------------------
Info 63   [00:01:13.000] Open files: 
Info 63   [00:01:14.000] 	FileName: c:/users/username/myprojects/project/x.js ProjectRootPath: undefined
Info 63   [00:01:15.000] 		Projects: /dev/null/inferredProject1*
Info 63   [00:01:16.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
c:/users/username/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
c:/users/username/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
c:/users/username/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
c:/users/username/myprojects/project/bower_components: *new*
  {"pollingInterval":500}
c:/users/username/myprojects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
c:/a/lib/lib.d.ts:
  {}

Info 64   [00:00:23.000] For files of style //vda1cs4850/c$/users/username/myprojects/project/x.js
Info 65   [00:00:24.000] Provided types map file "//vda1cs4850/a/lib/typesMap.json" doesn't exist
Before request
//// [//vda1cs4850/a/lib/lib.d.ts]
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

//// [//vda1cs4850/vda1cs4850/c$/users/username/myprojects/project/x.js]
const x = 10


Info 66   [00:00:25.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/c$/users/username/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 67   [00:00:26.000] Search path: //vda1cs4850/c$/users/username/myprojects/project
Info 68   [00:00:27.000] For info: //vda1cs4850/c$/users/username/myprojects/project/x.js :: No config files found.
Info 69   [00:00:28.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 70   [00:00:29.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 71   [00:00:30.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 72   [00:00:31.000] FileWatcher:: Added:: WatchInfo: //vda1cs4850/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 73   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 74   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 75   [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 76   [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 77   [00:00:36.000] 	Files (2)
	//vda1cs4850/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	//vda1cs4850/c$/users/username/myprojects/project/x.js SVC-1-0 ""


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info 78   [00:00:37.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
//vda1cs4850/c$/users/username/myprojects/project/tsconfig.json: *new*
  {"pollingInterval":2000}
//vda1cs4850/c$/users/username/myprojects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
//vda1cs4850/c$/users/username/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
//vda1cs4850/a/lib/lib.d.ts: *new*
  {}

TI:: [00:00:38.000] Global cache location '//vda1cs4850/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:39.000] Processing cache location '//vda1cs4850/a/data/'
TI:: [00:00:40.000] Trying to find '//vda1cs4850/a/data/package.json'...
TI:: [00:00:41.000] Finished processing cache location '//vda1cs4850/a/data/'
TI:: [00:00:42.000] Npm config file: //vda1cs4850/a/data/package.json
TI:: [00:00:43.000] Npm config file: '//vda1cs4850/a/data/package.json' is missing, creating new one...
TI:: [00:00:48.000] Updating types-registry npm package...
TI:: [00:00:49.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:56.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [//vda1cs4850/a/data/package.json]
{ "private": true }

//// [//vda1cs4850/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:57.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["//vda1cs4850/a/lib/lib.d.ts","//vda1cs4850/c$/users/username/myprojects/project/x.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"//vda1cs4850/c$/users/username/myprojects/project","cachePath":"//vda1cs4850/a/data/","kind":"discover"}
TI:: [00:00:58.000] Request specifies cache path '//vda1cs4850/a/data/', loading cached information...
TI:: [00:00:59.000] Processing cache location '//vda1cs4850/a/data/'
TI:: [00:01:00.000] Cache location was already processed...
TI:: [00:01:01.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:02.000] Explicitly included types: []
TI:: [00:01:03.000] Inferred typings from unresolved imports: []
TI:: [00:01:04.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["//vda1cs4850/c$/users/username/myprojects/project/bower_components","//vda1cs4850/c$/users/username/myprojects/project/node_modules"]}
TI:: [00:01:05.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["//vda1cs4850/c$/users/username/myprojects/project/bower_components","//vda1cs4850/c$/users/username/myprojects/project/node_modules"]}
TI:: [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/bower_components
TI:: [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:09.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules
TI:: [00:01:10.000] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:12.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:13.000] No new typings were requested as a result of typings discovery
Info 79   [00:01:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 79   [00:01:15.000] 	Files (2)

Info 79   [00:01:16.000] -----------------------------------------------
Info 79   [00:01:17.000] Open files: 
Info 79   [00:01:18.000] 	FileName: //vda1cs4850/c$/users/username/myprojects/project/x.js ProjectRootPath: undefined
Info 79   [00:01:19.000] 		Projects: /dev/null/inferredProject1*
Info 79   [00:01:20.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
//vda1cs4850/c$/users/username/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/users/username/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/users/username/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/bower_components: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
//vda1cs4850/a/lib/lib.d.ts:
  {}
