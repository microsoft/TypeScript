currentDirectory:: / useCaseSensitiveFileNames: true
Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/user/username/projects/myproject/tsconfig.json]
{}

//// [/user/username/projects/myproject/a.ts]
let y = 10;


Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:23.000] Search path: ^walkThroughSnippet:/Users/UserName/projects/someProject/out
Info 3    [00:00:24.000] For info: ^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js :: No config files found.
Info 4    [00:00:25.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:29.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:31.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js SVC-1-0 ""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js
	  Root file specified for compilation

Info 11   [00:00:32.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

TI:: [00:00:33.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:34.000] Processing cache location '/a/data/'
TI:: [00:00:35.000] Trying to find '/a/data/package.json'...
TI:: [00:00:36.000] Finished processing cache location '/a/data/'
TI:: [00:00:37.000] Npm config file: /a/data/package.json
TI:: [00:00:38.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:43.000] Updating types-registry npm package...
TI:: [00:00:44.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:51.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:52.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/user/username/projects/myproject","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:53.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:54.000] Processing cache location '/a/data/'
TI:: [00:00:55.000] Cache location was already processed...
TI:: [00:00:56.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:57.000] Explicitly included types: []
TI:: [00:00:58.000] Inferred typings from unresolved imports: []
TI:: [00:00:59.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["^walkThroughSnippet:/Users/UserName/projects/someProject/out/bower_components","^walkThroughSnippet:/Users/UserName/projects/someProject/out/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:01:00.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["^walkThroughSnippet:/Users/UserName/projects/someProject/out/bower_components","^walkThroughSnippet:/Users/UserName/projects/someProject/out/node_modules","/user/username/projects/myproject/bower_components","/user/username/projects/myproject/node_modules"]}
TI:: [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: ^walkThroughSnippet:/Users/UserName
TI:: [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: ^walkThroughSnippet:/Users/UserName 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: ^walkThroughSnippet:/Users/UserName 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components
TI:: [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules
TI:: [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:10.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:11.000] No new typings were requested as a result of typings discovery
Info 12   [00:01:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:01:13.000] 	Files (2)

Info 12   [00:01:14.000] -----------------------------------------------
Info 12   [00:01:15.000] Open files: 
Info 12   [00:01:16.000] 	FileName: ^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js ProjectRootPath: /user/username/projects/myproject
Info 12   [00:01:17.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:01:18.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/^walkThroughSnippet:/Users/UserName: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

/user/username/projects/myproject/^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js isDynamic:: true
Before request

Info 13   [00:01:19.000] request:
    {
      "command": "getOutliningSpans",
      "arguments": {
        "file": "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:01:20.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 15   [00:01:21.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js",
        "fileContent": "var x = 10;"
      },
      "seq": 3,
      "type": "request"
    }
Info 16   [00:01:22.000] Search path: ^walkThroughSnippet:/Users/UserName/projects/someProject/out
Info 17   [00:01:23.000] For info: ^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js :: No config files found.
Info 18   [00:01:24.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 19   [00:01:25.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:01:26.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 21   [00:01:27.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js SVC-1-0 "var x = 10;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js
	  Root file specified for compilation

Info 22   [00:01:28.000] -----------------------------------------------
TI:: [00:01:29.000] Got install request {"projectName":"/dev/null/inferredProject2*","fileNames":["/a/lib/lib.d.ts","^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:30.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:31.000] Processing cache location '/a/data/'
TI:: [00:01:32.000] Cache location was already processed...
TI:: [00:01:33.000] Explicitly included types: []
TI:: [00:01:34.000] Inferred typings from unresolved imports: []
TI:: [00:01:35.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["^walkThroughSnippet:/Users/UserName/projects/someProject/out/bower_components","^walkThroughSnippet:/Users/UserName/projects/someProject/out/node_modules","/bower_components","/node_modules"]}
TI:: [00:01:36.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["^walkThroughSnippet:/Users/UserName/projects/someProject/out/bower_components","^walkThroughSnippet:/Users/UserName/projects/someProject/out/node_modules","/bower_components","/node_modules"]}
TI:: [00:01:37.000] DirectoryWatcher:: Added:: WatchInfo: ^walkThroughSnippet:
TI:: [00:01:38.000] DirectoryWatcher:: Added:: WatchInfo: ^walkThroughSnippet: 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: ^walkThroughSnippet: 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:01:40.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:01:41.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:01:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:01:43.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:01:44.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:01:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:01:46.000] Sending response:
    {"projectName":"/dev/null/inferredProject2*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:47.000] No new typings were requested as a result of typings discovery
Info 23   [00:01:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:01:49.000] 	Files (2)

Info 23   [00:01:50.000] -----------------------------------------------
Info 23   [00:01:51.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 23   [00:01:52.000] 	Files (2)

Info 23   [00:01:53.000] -----------------------------------------------
Info 23   [00:01:54.000] Open files: 
Info 23   [00:01:55.000] 	FileName: ^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#1.js ProjectRootPath: /user/username/projects/myproject
Info 23   [00:01:56.000] 		Projects: /dev/null/inferredProject1*
Info 23   [00:01:57.000] 	FileName: ^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js ProjectRootPath: undefined
Info 23   [00:01:58.000] 		Projects: /dev/null/inferredProject2*
Info 23   [00:01:59.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/^walkThroughSnippet:/Users/UserName:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/^walkThroughSnippet:: *new*
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
