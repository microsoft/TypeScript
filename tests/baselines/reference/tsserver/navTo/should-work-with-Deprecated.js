Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.js"
      },
      "seq": 1,
      "type": "request"
    }
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

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
	/a/lib/lib.d.ts
	/a/b/file1.js


	../lib/lib.d.ts
	  Default library for target 'es3'
	file1.js
	  Matched by default include pattern '**/*'

Info 16   [00:00:31.000] -----------------------------------------------
Info 17   [00:00:32.000] Project '/a/b/jsconfig.json' (Configured)
Info 17   [00:00:33.000] 	Files (2)

Info 17   [00:00:34.000] -----------------------------------------------
Info 17   [00:00:35.000] Open files: 
Info 17   [00:00:36.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 17   [00:00:37.000] 		Projects: /a/b/jsconfig.json
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/jsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 17   [00:00:38.000] response:
    {
      "responseRequired": false
    }
Info 18   [00:00:39.000] request:
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
Before request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/jsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/jsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 19   [00:00:40.000] response:
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