Info 0    [00:00:33.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:34.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/myproject/src/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
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

//// [/users/username/projects/myproject/src/a.ts]
import * as myModule from "@custom/plugin";
function foo() {
  // hello
}

//// [/users/username/projects/myproject/tsconfig.json]
{"include":["src"]}

//// [/users/username/projects/myproject/node_modules/@custom/plugin/index.d.ts]
import './proposed';
declare module '@custom/plugin' {
    export const version: string;
}

//// [/users/username/projects/myproject/node_modules/@custom/plugin/proposed.d.ts]
declare module '@custom/plugin' {
    export const bar = 10;
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:35.000] Search path: /users/username/projects/myproject/src
Info 3    [00:00:36.000] For info: /users/username/projects/myproject/src/a.ts :: Config file name: /users/username/projects/myproject/tsconfig.json
Info 4    [00:00:37.000] Creating configuration project /users/username/projects/myproject/tsconfig.json
Info 5    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/tsconfig.json 2000 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:39.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/users/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /users/username/projects/myproject/src/a.ts to open"}}
Info 7    [00:00:40.000] Config: /users/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/myproject/src/a.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/myproject/tsconfig.json"
 }
}
Info 8    [00:00:41.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/src 1 undefined Config: /users/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/src 1 undefined Config: /users/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:43.000] Starting updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json
Info 11   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 12   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 13   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 17   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 18   [00:00:51.000] Finishing updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:00:52.000] Project '/users/username/projects/myproject/tsconfig.json' (Configured)
Info 20   [00:00:53.000] 	Files (4)
	/a/lib/lib.d.ts
	/users/username/projects/myproject/node_modules/@custom/plugin/proposed.d.ts
	/users/username/projects/myproject/node_modules/@custom/plugin/index.d.ts
	/users/username/projects/myproject/src/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	node_modules/@custom/plugin/proposed.d.ts
	  Imported via './proposed' from file 'node_modules/@custom/plugin/index.d.ts'
	node_modules/@custom/plugin/index.d.ts
	  Imported via "@custom/plugin" from file 'src/a.ts'
	src/a.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 21   [00:00:54.000] -----------------------------------------------
Info 22   [00:00:55.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/users/username/projects/myproject/tsconfig.json"}}
Info 23   [00:00:56.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"49814c247d0e4666719ac54e31c3f19091be4020c5ac046c86474826dc7e4ede","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":73,"tsx":0,"tsxSize":0,"dts":3,"dtsSize":486,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 24   [00:00:57.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/myproject/src/a.ts","configFile":"/users/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 25   [00:00:58.000] Project '/users/username/projects/myproject/tsconfig.json' (Configured)
Info 25   [00:00:59.000] 	Files (4)

Info 25   [00:01:00.000] -----------------------------------------------
Info 25   [00:01:01.000] Open files: 
Info 25   [00:01:02.000] 	FileName: /users/username/projects/myproject/src/a.ts ProjectRootPath: undefined
Info 25   [00:01:03.000] 		Projects: /users/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 25   [00:01:04.000] response:
    {
      "responseRequired": false
    }
Checking timeout queue length: 0

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 26   [00:01:05.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/src/a.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

After request

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 27   [00:01:06.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 28   [00:01:07.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 29   [00:01:08.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 30   [00:01:09.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[{"start":{"line":1,"offset":1},"end":{"line":1,"offset":44},"text":"'myModule' is declared but its value is never read.","code":6133,"category":"suggestion","reportsUnnecessary":true},{"start":{"line":2,"offset":10},"end":{"line":2,"offset":13},"text":"'foo' is declared but its value is never read.","code":6133,"category":"suggestion","reportsUnnecessary":true}]}}
Info 31   [00:01:10.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 32   [00:01:11.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/users/username/projects/myproject/src/a.ts",
        "line": 3,
        "offset": 8,
        "endLine": 3,
        "endOffset": 8,
        "insertString": "o"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

After request

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 33   [00:01:12.000] response:
    {
      "responseRequired": false
    }
Checking timeout queue length: 0

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 34   [00:01:13.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/src/a.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

After request

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 35   [00:01:14.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 36   [00:01:15.000] Starting updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json
Info 37   [00:01:16.000] Finishing updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 38   [00:01:17.000] Different program with same set of files
Info 39   [00:01:18.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 40   [00:01:19.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}

Info 41   [00:01:20.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/myproject/src/a.ts","diagnostics":[{"start":{"line":1,"offset":1},"end":{"line":1,"offset":44},"text":"'myModule' is declared but its value is never read.","code":6133,"category":"suggestion","reportsUnnecessary":true},{"start":{"line":2,"offset":10},"end":{"line":2,"offset":13},"text":"'foo' is declared but its value is never read.","code":6133,"category":"suggestion","reportsUnnecessary":true}]}}
Info 42   [00:01:21.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":4}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/users/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/myproject/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/myproject/src:
  {}
/users/username/projects/myproject/node_modules:
  {}
