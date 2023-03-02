Info 0    [00:00:33.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
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

//// [/user/username/projects/myproject/src/client/app.js]


//// [/user/username/projects/myproject/src/server/utilities.js]
function getHostName() { return "hello"; } export { getHostName };

//// [/user/username/projects/myproject/test/backend/index.js]
import { getHostName } from '../../src/server/utilities';export default getHostName;


Info 1    [00:00:34.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/client/app.js",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:35.000] Search path: /user/username/projects/myproject/src/client
Info 3    [00:00:36.000] For info: /user/username/projects/myproject/src/client/app.js :: No config files found.
Info 4    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [00:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 9    [00:00:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 10   [00:00:43.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 11   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 13   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 14   [00:00:47.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:49.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/client/app.js SVC-1-0 ""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

Info 17   [00:00:50.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
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


TI:: [00:01:10.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/user/username/projects/myproject/src/client/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/myproject","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:11.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:12.000] Processing cache location '/a/data/'
TI:: [00:01:13.000] Cache location was already processed...
TI:: [00:01:14.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:01:15.000] Explicitly included types: []
TI:: [00:01:16.000] Inferred typings from unresolved imports: []
TI:: [00:01:17.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/src/client/bower_components","/user/username/projects/myproject/src/client/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:01:18.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/src/client/bower_components","/user/username/projects/myproject/src/client/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:01:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src
TI:: [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components
TI:: [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:25.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules
TI:: [00:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:28.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:29.000] No new typings were requested as a result of typings discovery
Info 18   [00:01:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 18   [00:01:31.000] 	Files (2)

Info 18   [00:01:32.000] -----------------------------------------------
Info 18   [00:01:33.000] Open files: 
Info 18   [00:01:34.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 18   [00:01:35.000] 		Projects: /dev/null/inferredProject1*
Info 18   [00:01:36.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src: *new*
  {}

Before request

Info 19   [00:01:37.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/test/backend/index.js",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:01:38.000] Search path: /user/username/projects/myproject/test/backend
Info 21   [00:01:39.000] For info: /user/username/projects/myproject/test/backend/index.js :: No config files found.
Info 22   [00:01:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 23   [00:01:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 24   [00:01:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 25   [00:01:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 26   [00:01:44.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 27   [00:01:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 28   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 29   [00:01:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Info 30   [00:01:48.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 31   [00:01:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:50.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/client/app.js SVC-1-0 ""
	/user/username/projects/myproject/src/server/utilities.js Text-1 "function getHostName() { return \"hello\"; } export { getHostName };"
	/user/username/projects/myproject/test/backend/index.js SVC-1-0 "import { getHostName } from '../../src/server/utilities';export default getHostName;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation
	src/server/utilities.js
	  Imported via '../../src/server/utilities' from file 'test/backend/index.js'
	test/backend/index.js
	  Root file specified for compilation

Info 33   [00:01:51.000] -----------------------------------------------
TI:: [00:01:52.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/user/username/projects/myproject/src/client/app.js","/user/username/projects/myproject/src/server/utilities.js","/user/username/projects/myproject/test/backend/index.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/myproject","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:53.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:54.000] Processing cache location '/a/data/'
TI:: [00:01:55.000] Cache location was already processed...
TI:: [00:01:56.000] Explicitly included types: []
TI:: [00:01:57.000] Inferred typings from unresolved imports: []
TI:: [00:01:58.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/src/client/bower_components","/user/username/projects/myproject/src/client/node_modules","/user/username/projects/myproject/src/server/bower_components","/user/username/projects/myproject/src/server/node_modules","/user/username/projects/myproject/test/backend/bower_components","/user/username/projects/myproject/test/backend/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:01:59.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/src/client/bower_components","/user/username/projects/myproject/src/client/node_modules","/user/username/projects/myproject/src/server/bower_components","/user/username/projects/myproject/src/server/node_modules","/user/username/projects/myproject/test/backend/bower_components","/user/username/projects/myproject/test/backend/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:02:00.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test
TI:: [00:02:01.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:02:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:02:03.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:04.000] No new typings were requested as a result of typings discovery
Info 34   [00:02:05.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [00:02:06.000] 	Files (4)

Info 34   [00:02:07.000] -----------------------------------------------
Info 34   [00:02:08.000] Open files: 
Info 34   [00:02:09.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 34   [00:02:10.000] 		Projects: /dev/null/inferredProject1*
Info 34   [00:02:11.000] 	FileName: /user/username/projects/myproject/test/backend/index.js ProjectRootPath: /user/username/projects/myproject
Info 34   [00:02:12.000] 		Projects: /dev/null/inferredProject1*
Info 34   [00:02:13.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/test/backend/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/test/backend/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/test/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/test/jsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test: *new*
  {}

Before request

Info 35   [00:02:14.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/test/backend/index.js",
          "/user/username/projects/myproject/src/client/app.js"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 36   [00:02:15.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 37   [00:02:16.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 38   [00:02:17.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 39   [00:02:18.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before checking timeout queue length (1) and running

Info 40   [00:02:19.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 41   [00:02:20.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 42   [00:02:21.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 43   [00:02:22.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)

Before request

Info 44   [00:02:23.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/test/backend/index.js"
      },
      "seq": 4,
      "type": "request"
    }
Info 45   [00:02:24.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 46   [00:02:25.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 47   [00:02:26.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 48   [00:02:27.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 49   [00:02:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Info 50   [00:02:29.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 50   [00:02:30.000] 	Files (4)

Info 50   [00:02:31.000] -----------------------------------------------
Info 50   [00:02:32.000] Open files: 
Info 50   [00:02:33.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 50   [00:02:34.000] 		Projects: /dev/null/inferredProject1*
Info 50   [00:02:35.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/test/backend/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/backend/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js:
  {}
/user/username/projects/myproject/test/backend/index.js: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test:
  {}

Before request

Info 51   [00:02:36.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/server/utilities.js",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 5,
      "type": "request"
    }
Info 52   [00:02:37.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Info 53   [00:02:38.000] Search path: /user/username/projects/myproject/src/server
Info 54   [00:02:39.000] For info: /user/username/projects/myproject/src/server/utilities.js :: No config files found.
Info 55   [00:02:40.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 56   [00:02:41.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 57   [00:02:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 58   [00:02:43.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [00:02:44.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 60   [00:02:45.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/client/app.js SVC-1-0 ""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

Info 61   [00:02:46.000] -----------------------------------------------
TI:: [00:02:47.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/user/username/projects/myproject/src/client/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/myproject","cachePath":"/a/data/","kind":"discover"}
TI:: [00:02:48.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:02:49.000] Processing cache location '/a/data/'
TI:: [00:02:50.000] Cache location was already processed...
TI:: [00:02:51.000] Explicitly included types: []
TI:: [00:02:52.000] Inferred typings from unresolved imports: []
TI:: [00:02:53.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/src/client/bower_components","/user/username/projects/myproject/src/client/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:02:54.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/src/client/bower_components","/user/username/projects/myproject/src/client/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:02:55.000] DirectoryWatcher:: Closed:: WatchInfo: /user/username/projects/myproject/test
TI:: [00:02:56.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:02:57.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:02:58.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:59.000] No new typings were requested as a result of typings discovery
Info 62   [00:03:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 63   [00:03:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 64   [00:03:02.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 65   [00:03:03.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 66   [00:03:04.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 67   [00:03:05.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/client/app.js SVC-1-0 ""
	/user/username/projects/myproject/src/server/utilities.js Text-1 "function getHostName() { return \"hello\"; } export { getHostName };"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation
	src/server/utilities.js
	  Root file specified for compilation

Info 68   [00:03:06.000] -----------------------------------------------
TI:: [00:03:07.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/user/username/projects/myproject/src/client/app.js","/user/username/projects/myproject/src/server/utilities.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/myproject","cachePath":"/a/data/","kind":"discover"}
TI:: [00:03:08.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:03:09.000] Processing cache location '/a/data/'
TI:: [00:03:10.000] Cache location was already processed...
TI:: [00:03:11.000] Explicitly included types: []
TI:: [00:03:12.000] Inferred typings from unresolved imports: []
TI:: [00:03:13.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/src/client/bower_components","/user/username/projects/myproject/src/client/node_modules","/user/username/projects/myproject/src/server/bower_components","/user/username/projects/myproject/src/server/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:03:14.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/user/username/projects/myproject/src/client/bower_components","/user/username/projects/myproject/src/client/node_modules","/user/username/projects/myproject/src/server/bower_components","/user/username/projects/myproject/src/server/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:03:15.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:03:16.000] No new typings were requested as a result of typings discovery
Info 69   [00:03:17.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Info 70   [00:03:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 70   [00:03:19.000] 	Files (3)

Info 70   [00:03:20.000] -----------------------------------------------
Info 70   [00:03:21.000] Open files: 
Info 70   [00:03:22.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 70   [00:03:23.000] 		Projects: /dev/null/inferredProject1*
Info 70   [00:03:24.000] 	FileName: /user/username/projects/myproject/src/server/utilities.js ProjectRootPath: /user/username/projects/myproject
Info 70   [00:03:25.000] 		Projects: /dev/null/inferredProject1*
Info 70   [00:03:26.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/src/server/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/server/jsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/src/server/utilities.js:
  {}
/user/username/projects/myproject/test/backend/index.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/test:
  {}

Before request

Info 71   [00:03:27.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/server/utilities.js",
          "/user/username/projects/myproject/src/client/app.js"
        ]
      },
      "seq": 6,
      "type": "request"
    }
Info 72   [00:03:28.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 73   [00:03:29.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 74   [00:03:30.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 75   [00:03:31.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before checking timeout queue length (1) and running

Info 76   [00:03:32.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 77   [00:03:33.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 78   [00:03:34.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 79   [00:03:35.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":6}}
Before running immediate callbacks and checking length (1)
