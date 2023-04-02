currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/file1.js]
/** @deprecated */
function foo () {}

//// [/a/b/jsconfig.json]
{}

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


Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] Search path: /a/b
Info 3    [00:00:18.000] For info: /a/b/file1.js :: Config file name: /a/b/jsconfig.json
Info 4    [00:00:19.000] Creating configuration project /a/b/jsconfig.json
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/jsconfig.json 2000 undefined Project: /a/b/jsconfig.json WatchType: Config file
Info 6    [00:00:21.000] Config: /a/b/jsconfig.json : {
 "rootNames": [
  "/a/b/file1.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/a/b/jsconfig.json"
 }
}
Info 7    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/jsconfig.json WatchType: Wild card directory
Info 8    [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/jsconfig.json WatchType: Wild card directory
Info 9    [00:00:24.000] Starting updateGraphWorker: Project: /a/b/jsconfig.json
Info 10   [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/jsconfig.json WatchType: Type roots
Info 12   [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/jsconfig.json WatchType: Type roots
Info 13   [00:00:28.000] Finishing updateGraphWorker: Project: /a/b/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:29.000] Project '/a/b/jsconfig.json' (Configured)
Info 15   [00:00:30.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/file1.js SVC-1-0 "/** @deprecated */\nfunction foo () {}"


	../lib/lib.d.ts
	  Default library for target 'es5'
	file1.js
	  Matched by default include pattern '**/*'

Info 16   [00:00:31.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/jsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

TI:: [00:00:32.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:33.000] Processing cache location '/a/data/'
TI:: [00:00:34.000] Trying to find '/a/data/package.json'...
TI:: [00:00:35.000] Finished processing cache location '/a/data/'
TI:: [00:00:36.000] Npm config file: /a/data/package.json
TI:: [00:00:37.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:42.000] Updating types-registry npm package...
TI:: [00:00:43.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:50.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:51.000] Got install request {"projectName":"/a/b/jsconfig.json","fileNames":["/a/lib/lib.d.ts","/a/b/file1.js"],"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/b/jsconfig.json","allowNonTsExtensions":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:52.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:53.000] Processing cache location '/a/data/'
TI:: [00:00:54.000] Cache location was already processed...
TI:: [00:00:55.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:56.000] Explicitly included types: []
TI:: [00:00:57.000] Inferred typings from unresolved imports: []
TI:: [00:00:58.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:59.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/b/jsconfig.json watcher already invoked: false
TI:: [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /a/b/jsconfig.json watcher already invoked: false
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/jsconfig.json watcher already invoked: false
TI:: [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/jsconfig.json watcher already invoked: false
TI:: [00:01:06.000] Sending response:
    {"projectName":"/a/b/jsconfig.json","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true,"configFilePath":"/a/b/jsconfig.json","allowNonTsExtensions":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:07.000] No new typings were requested as a result of typings discovery
Info 17   [00:01:08.000] Project '/a/b/jsconfig.json' (Configured)
Info 17   [00:01:09.000] 	Files (2)

Info 17   [00:01:10.000] -----------------------------------------------
Info 17   [00:01:11.000] Open files: 
Info 17   [00:01:12.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 17   [00:01:13.000] 		Projects: /a/b/jsconfig.json
Info 17   [00:01:14.000] response:
    {
      "responseRequired": false
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
/a/b/jsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info 18   [00:01:15.000] request:
    {
      "command": "navto",
      "arguments": {
        "searchValue": "foo",
        "file": "/a/b/file1.js",
        "projectFileName": "/a/b/jsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Info 19   [00:01:16.000] response:
    {
      "response": [
        {
          "name": "foo",
          "kind": "function",
          "kindModifiers": "deprecated",
          "isCaseSensitive": true,
          "matchKind": "exact",
          "file": "/a/b/file1.js",
          "start": {
            "line": 2,
            "offset": 1
          },
          "end": {
            "line": 2,
            "offset": 19
          }
        }
      ],
      "responseRequired": true
    }
After request
