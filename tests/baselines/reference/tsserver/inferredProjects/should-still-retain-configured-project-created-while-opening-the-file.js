currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/app.ts]
const app = 20;

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

//// [/user/username/projects/myproject/tsconfig.json]
{}

//// [/user/username/projects/myproject/jsFile1.js]
const jsFile1 = 10;

//// [/user/username/projects/myproject/jsFile2.js]
const jsFile2 = 10;


Info 1    [00:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/jsFile1.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:27.000] Search path: /user/username/projects/myproject
Info 3    [00:00:28.000] For info: /user/username/projects/myproject/jsFile1.js :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:29.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:31.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:35.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 11   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:39.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 16   [00:00:41.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/app.ts Text-1 "const app = 20;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:42.000] -----------------------------------------------
Info 18   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 19   [00:00:44.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 21   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:00:47.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 24   [00:00:49.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/jsFile1.js SVC-1-0 "const jsFile1 = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	jsFile1.js
	  Root file specified for compilation

Info 25   [00:00:50.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/app.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

TI:: [00:00:51.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:52.000] Processing cache location '/a/data/'
TI:: [00:00:53.000] Trying to find '/a/data/package.json'...
TI:: [00:00:54.000] Finished processing cache location '/a/data/'
TI:: [00:00:55.000] Npm config file: /a/data/package.json
TI:: [00:00:56.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:01:01.000] Updating types-registry npm package...
TI:: [00:01:02.000] npm install --ignore-scripts types-registry@latest
TI:: [00:01:09.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:01:10.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/user/username/projects/myproject/jsFile1.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/myproject","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:11.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:12.000] Processing cache location '/a/data/'
TI:: [00:01:13.000] Cache location was already processed...
TI:: [00:01:14.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:15.000] Explicitly included types: []
TI:: [00:01:16.000] Inferred typings from unresolved imports: []
TI:: [00:01:17.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:01:18.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:01:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components
TI:: [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules
TI:: [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:25.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:26.000] No new typings were requested as a result of typings discovery
Info 26   [00:01:27.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 26   [00:01:28.000] 	Files (2)

Info 26   [00:01:29.000] -----------------------------------------------
Info 26   [00:01:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 26   [00:01:31.000] 	Files (2)

Info 26   [00:01:32.000] -----------------------------------------------
Info 26   [00:01:33.000] Open files: 
Info 26   [00:01:34.000] 	FileName: /user/username/projects/myproject/jsFile1.js ProjectRootPath: undefined
Info 26   [00:01:35.000] 		Projects: /dev/null/inferredProject1*
Info 26   [00:01:36.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/app.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Before request

Info 27   [00:01:37.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/jsFile1.js"
      },
      "seq": 2,
      "type": "request"
    }
Info 28   [00:01:38.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 29   [00:01:39.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 30   [00:01:40.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 31   [00:01:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsFile1.js 500 undefined WatchType: Closed Script info
Info 32   [00:01:42.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 32   [00:01:43.000] 	Files (2)

Info 32   [00:01:44.000] -----------------------------------------------
Info 32   [00:01:45.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:46.000] 	Files (2)

Info 32   [00:01:47.000] -----------------------------------------------
Info 32   [00:01:48.000] Open files: 
Info 32   [00:01:49.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/app.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/jsfile1.js: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Before request

Info 33   [00:01:50.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/jsFile2.js"
      },
      "seq": 3,
      "type": "request"
    }
Info 34   [00:01:51.000] Search path: /user/username/projects/myproject
Info 35   [00:01:52.000] For info: /user/username/projects/myproject/jsFile2.js :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 36   [00:01:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 37   [00:01:54.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 38   [00:01:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 39   [00:01:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 40   [00:01:57.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 41   [00:01:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 42   [00:01:59.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/jsFile2.js SVC-1-0 "const jsFile2 = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	jsFile2.js
	  Root file specified for compilation

Info 43   [00:02:00.000] -----------------------------------------------
TI:: [00:02:01.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/user/username/projects/myproject/jsFile2.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/myproject","cachePath":"/a/data/","kind":"discover"}
TI:: [00:02:02.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:02:03.000] Processing cache location '/a/data/'
TI:: [00:02:04.000] Cache location was already processed...
TI:: [00:02:05.000] Explicitly included types: []
TI:: [00:02:06.000] Inferred typings from unresolved imports: []
TI:: [00:02:07.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:02:08.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:02:09.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:10.000] No new typings were requested as a result of typings discovery
Info 44   [00:02:11.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/jsFile1.js 500 undefined WatchType: Closed Script info
Info 45   [00:02:12.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 45   [00:02:13.000] 	Files (2)

Info 45   [00:02:14.000] -----------------------------------------------
Info 45   [00:02:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 45   [00:02:16.000] 	Files (2)

Info 45   [00:02:17.000] -----------------------------------------------
Info 45   [00:02:18.000] Open files: 
Info 45   [00:02:19.000] 	FileName: /user/username/projects/myproject/jsFile2.js ProjectRootPath: undefined
Info 45   [00:02:20.000] 		Projects: /dev/null/inferredProject1*
Info 45   [00:02:21.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/app.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/jsfile1.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Before request

Info 46   [00:02:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/jsFile1.js"
      },
      "seq": 4,
      "type": "request"
    }
Info 47   [00:02:23.000] Search path: /user/username/projects/myproject
Info 48   [00:02:24.000] For info: /user/username/projects/myproject/jsFile1.js :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 49   [00:02:25.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 50   [00:02:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 51   [00:02:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 52   [00:02:28.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 53   [00:02:29.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 54   [00:02:30.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/jsFile1.js SVC-2-0 "const jsFile1 = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	jsFile1.js
	  Root file specified for compilation

Info 55   [00:02:31.000] -----------------------------------------------
TI:: [00:02:32.000] Got install request {"projectName":"/dev/null/inferredProject2*","fileNames":["/a/lib/lib.d.ts","/user/username/projects/myproject/jsFile1.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/myproject","cachePath":"/a/data/","kind":"discover"}
TI:: [00:02:33.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:02:34.000] Processing cache location '/a/data/'
TI:: [00:02:35.000] Cache location was already processed...
TI:: [00:02:36.000] Explicitly included types: []
TI:: [00:02:37.000] Inferred typings from unresolved imports: []
TI:: [00:02:38.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:02:39.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:02:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components
TI:: [00:02:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules
TI:: [00:02:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:46.000] Sending response:
    {"projectName":"/dev/null/inferredProject2*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:47.000] No new typings were requested as a result of typings discovery
Info 56   [00:02:48.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 56   [00:02:49.000] 	Files (2)

Info 56   [00:02:50.000] -----------------------------------------------
Info 56   [00:02:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 56   [00:02:52.000] 	Files (2)

Info 56   [00:02:53.000] -----------------------------------------------
Info 56   [00:02:54.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 56   [00:02:55.000] 	Files (2)

Info 56   [00:02:56.000] -----------------------------------------------
Info 56   [00:02:57.000] Open files: 
Info 56   [00:02:58.000] 	FileName: /user/username/projects/myproject/jsFile2.js ProjectRootPath: undefined
Info 56   [00:02:59.000] 		Projects: /dev/null/inferredProject1*
Info 56   [00:03:00.000] 	FileName: /user/username/projects/myproject/jsFile1.js ProjectRootPath: undefined
Info 56   [00:03:01.000] 		Projects: /dev/null/inferredProject2*
Info 56   [00:03:02.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 57   [00:03:03.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/lib/lib.d.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 58   [00:03:04.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 59   [00:03:05.000] Search path: /a/lib
Info 60   [00:03:06.000] For info: /a/lib/lib.d.ts :: No config files found.
Info 61   [00:03:07.000] `remove Project::
Info 62   [00:03:08.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 63   [00:03:09.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/app.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Matched by default include pattern '**/*'

Info 64   [00:03:10.000] -----------------------------------------------
Info 65   [00:03:11.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 66   [00:03:12.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 67   [00:03:13.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 68   [00:03:14.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 69   [00:03:15.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/app.ts 500 undefined WatchType: Closed Script info
Info 70   [00:03:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 70   [00:03:17.000] 	Files (2)

Info 70   [00:03:18.000] -----------------------------------------------
Info 70   [00:03:19.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 70   [00:03:20.000] 	Files (2)

Info 70   [00:03:21.000] -----------------------------------------------
Info 70   [00:03:22.000] Open files: 
Info 70   [00:03:23.000] 	FileName: /user/username/projects/myproject/jsFile2.js ProjectRootPath: undefined
Info 70   [00:03:24.000] 		Projects: /dev/null/inferredProject1*
Info 70   [00:03:25.000] 	FileName: /user/username/projects/myproject/jsFile1.js ProjectRootPath: undefined
Info 70   [00:03:26.000] 		Projects: /dev/null/inferredProject2*
Info 70   [00:03:27.000] 	FileName: /a/lib/lib.d.ts ProjectRootPath: undefined
Info 70   [00:03:28.000] 		Projects: /dev/null/inferredProject2*,/dev/null/inferredProject1*
Info 70   [00:03:29.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/app.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject:
  {}
