Info 0    [16:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:36.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/index.ts"
      }
    }
//// [/user/username/projects/myproject/bar/tsconfig.json]
{"include":["index.ts"],"compilerOptions":{"lib":["dom","es2017"]}}

//// [/user/username/projects/myproject/bar/index.ts]

export function bar() {
  console.log("hello world");
}

//// [/user/username/projects/myproject/foo/tsconfig.json]
{"include":["index.ts"],"compilerOptions":{"lib":["es2017"]}}

//// [/user/username/projects/myproject/foo/index.ts]

import { bar } from "bar";
bar();

//// [/user/username/projects/myproject/foo/node_modules/bar] symlink(/user/username/projects/myproject/bar)
//// [/a/lib/lib.es2017.d.ts]
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

//// [/a/lib/lib.dom.d.ts]

declare var console: {
    log(...args: any[]): void;
};


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:37.000] Search path: /user/username/projects/myproject/foo
Info 3    [16:00:38.000] For info: /user/username/projects/myproject/foo/index.ts :: Config file name: /user/username/projects/myproject/foo/tsconfig.json
Info 4    [16:00:39.000] Creating configuration project /user/username/projects/myproject/foo/tsconfig.json
Info 5    [16:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Config file
Info 6    [16:00:41.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/foo/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/foo/index.ts to open"}}
Info 7    [16:00:42.000] Config: /user/username/projects/myproject/foo/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/foo/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es2017.d.ts"
  ],
  "configFilePath": "/user/username/projects/myproject/foo/tsconfig.json"
 }
}
Info 8    [16:00:43.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [16:00:44.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json
Info 10   [16:00:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/index.ts 500 undefined WatchType: Closed Script info
Info 11   [16:00:46.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2017.d.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [16:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [16:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 15   [16:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 16   [16:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 17   [16:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 18   [16:00:53.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [16:00:54.000] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info 20   [16:00:55.000] 	Files (3)
	/a/lib/lib.es2017.d.ts
	/user/username/projects/myproject/bar/index.ts
	/user/username/projects/myproject/foo/index.ts


	../../../../../a/lib/lib.es2017.d.ts
	  Library 'lib.es2017.d.ts' specified in compilerOptions
	../bar/index.ts
	  Imported via "bar" from file 'index.ts'
	index.ts
	  Matched by include pattern 'index.ts' in 'tsconfig.json'

Info 21   [16:00:56.000] -----------------------------------------------
Info 22   [16:00:57.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/foo/tsconfig.json"}}
Info 23   [16:00:58.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"36730603d9c37d63f14b455060fadde05a7a93dcbc44aecd507b60e066616be6","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":90,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"lib":["es2017"]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 24   [16:00:59.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/foo/index.ts","configFile":"/user/username/projects/myproject/foo/tsconfig.json","diagnostics":[]}}
Info 25   [16:01:00.000] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info 25   [16:01:01.000] 	Files (3)

Info 25   [16:01:02.000] -----------------------------------------------
Info 25   [16:01:03.000] Open files: 
Info 25   [16:01:04.000] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info 25   [16:01:05.000] 		Projects: /user/username/projects/myproject/foo/tsconfig.json

PolledWatches::
/user/username/projects/myproject/foo/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/foo/tsconfig.json:
  {}
/user/username/projects/myproject/bar/index.ts:
  {}
/a/lib/lib.es2017.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/foo/node_modules:
  {}

Info 25   [16:01:06.000] response:
    {
      "responseRequired": false
    }
Info 26   [16:01:07.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/bar/index.ts"
      }
    }

PolledWatches::
/user/username/projects/myproject/foo/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/foo/tsconfig.json:
  {}
/user/username/projects/myproject/bar/index.ts:
  {}
/a/lib/lib.es2017.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/foo/node_modules:
  {}

Info 27   [16:01:08.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/bar/index.ts 500 undefined WatchType: Closed Script info
Info 28   [16:01:09.000] Search path: /user/username/projects/myproject/bar
Info 29   [16:01:10.000] For info: /user/username/projects/myproject/bar/index.ts :: Config file name: /user/username/projects/myproject/bar/tsconfig.json
Info 30   [16:01:11.000] Creating configuration project /user/username/projects/myproject/bar/tsconfig.json
Info 31   [16:01:12.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Config file
Info 32   [16:01:13.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/bar/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/bar/index.ts to open"}}
Info 33   [16:01:14.000] Config: /user/username/projects/myproject/bar/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/bar/index.ts"
 ],
 "options": {
  "lib": [
   "lib.dom.d.ts",
   "lib.es2017.d.ts"
  ],
  "configFilePath": "/user/username/projects/myproject/bar/tsconfig.json"
 }
}
Info 34   [16:01:15.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 35   [16:01:16.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json
Info 36   [16:01:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.dom.d.ts 500 undefined WatchType: Closed Script info
Info 37   [16:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 38   [16:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 39   [16:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 40   [16:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 41   [16:01:22.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 42   [16:01:23.000] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info 43   [16:01:24.000] 	Files (3)
	/a/lib/lib.es2017.d.ts
	/a/lib/lib.dom.d.ts
	/user/username/projects/myproject/bar/index.ts


	../../../../../a/lib/lib.es2017.d.ts
	  Library 'lib.es2017.d.ts' specified in compilerOptions
	../../../../../a/lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	index.ts
	  Matched by include pattern 'index.ts' in 'tsconfig.json'

Info 44   [16:01:25.000] -----------------------------------------------
Info 45   [16:01:26.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/bar/tsconfig.json"}}
Info 46   [16:01:27.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5370ca7ca3faf398ecd694700ec7a0793b5e111125c5b8f56f69d3de23ff19ae","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":56,"tsx":0,"tsxSize":0,"dts":2,"dtsSize":391,"deferred":0,"deferredSize":0},"compilerOptions":{"lib":["dom","es2017"]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 47   [16:01:28.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/bar/index.ts","configFile":"/user/username/projects/myproject/bar/tsconfig.json","diagnostics":[]}}
Info 48   [16:01:29.000] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info 48   [16:01:30.000] 	Files (3)

Info 48   [16:01:31.000] -----------------------------------------------
Info 48   [16:01:32.000] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info 48   [16:01:33.000] 	Files (3)

Info 48   [16:01:34.000] -----------------------------------------------
Info 48   [16:01:35.000] Open files: 
Info 48   [16:01:36.000] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info 48   [16:01:37.000] 		Projects: /user/username/projects/myproject/foo/tsconfig.json
Info 48   [16:01:38.000] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info 48   [16:01:39.000] 		Projects: /user/username/projects/myproject/foo/tsconfig.json,/user/username/projects/myproject/bar/tsconfig.json

PolledWatches::
/user/username/projects/myproject/foo/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bar/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/foo/tsconfig.json:
  {}
/a/lib/lib.es2017.d.ts:
  {}
/user/username/projects/myproject/bar/tsconfig.json:
  {}
/a/lib/lib.dom.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/foo/node_modules:
  {}

Info 48   [16:01:40.000] response:
    {
      "responseRequired": false
    }
Info 49   [16:01:41.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/bar/index.ts",
          "/user/username/projects/myproject/foo/index.ts"
        ]
      },
      "seq": 1,
      "type": "request"
    }

PolledWatches::
/user/username/projects/myproject/foo/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bar/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/foo/tsconfig.json:
  {}
/a/lib/lib.es2017.d.ts:
  {}
/user/username/projects/myproject/bar/tsconfig.json:
  {}
/a/lib/lib.dom.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/foo/node_modules:
  {}


PolledWatches::
/user/username/projects/myproject/foo/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bar/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/foo/tsconfig.json:
  {}
/a/lib/lib.es2017.d.ts:
  {}
/user/username/projects/myproject/bar/tsconfig.json:
  {}
/a/lib/lib.dom.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/foo/node_modules:
  {}

Info 50   [16:01:42.000] response:
    {
      "responseRequired": false
    }
Info 51   [16:01:43.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/bar/index.ts","diagnostics":[]}}
Info 52   [16:01:44.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/bar/index.ts","diagnostics":[]}}
Info 53   [16:01:45.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/bar/index.ts","diagnostics":[]}}
Info 54   [16:01:46.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/foo/index.ts","diagnostics":[]}}
Info 55   [16:01:47.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/foo/index.ts","diagnostics":[]}}
Info 56   [16:01:48.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/foo/index.ts","diagnostics":[]}}
Info 57   [16:01:49.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}