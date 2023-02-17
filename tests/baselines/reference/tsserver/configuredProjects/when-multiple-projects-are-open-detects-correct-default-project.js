TI:: Creating typing installer
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


TI:: [00:00:35.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:36.000] Processing cache location '/a/data/'
TI:: [00:00:37.000] Trying to find '/a/data/package.json'...
TI:: [00:00:38.000] Finished processing cache location '/a/data/'
TI:: [00:00:39.000] Npm config file: /a/data/package.json
TI:: [00:00:40.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:45.000] Updating types-registry npm package...
TI:: [00:00:46.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:53.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:54.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:55.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:56.000] Search path: /user/username/projects/myproject/foo
Info 3    [00:00:57.000] For info: /user/username/projects/myproject/foo/index.ts :: Config file name: /user/username/projects/myproject/foo/tsconfig.json
Info 4    [00:00:58.000] Creating configuration project /user/username/projects/myproject/foo/tsconfig.json
Info 5    [00:00:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Config file
Info 6    [00:01:00.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/foo/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/foo/index.ts to open"}}
Info 7    [00:01:01.000] Config: /user/username/projects/myproject/foo/tsconfig.json : {
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
Info 8    [00:01:02.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json
Info 9    [00:01:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/index.ts 500 undefined WatchType: Closed Script info
Info 10   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2017.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 14   [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 15   [00:01:09.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 16   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info 17   [00:01:11.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:01:12.000] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info 19   [00:01:13.000] 	Files (3)
	/a/lib/lib.es2017.d.ts
	/user/username/projects/myproject/bar/index.ts
	/user/username/projects/myproject/foo/index.ts


	../../../../../a/lib/lib.es2017.d.ts
	  Library 'lib.es2017.d.ts' specified in compilerOptions
	../bar/index.ts
	  Imported via "bar" from file 'index.ts'
	index.ts
	  Matched by include pattern 'index.ts' in 'tsconfig.json'

Info 20   [00:01:14.000] -----------------------------------------------
Info 21   [00:01:15.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/foo/tsconfig.json"}}
Info 22   [00:01:16.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"36730603d9c37d63f14b455060fadde05a7a93dcbc44aecd507b60e066616be6","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":90,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"lib":["es2017"]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 23   [00:01:17.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/foo/index.ts","configFile":"/user/username/projects/myproject/foo/tsconfig.json","diagnostics":[]}}
Info 24   [00:01:18.000] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info 24   [00:01:19.000] 	Files (3)

Info 24   [00:01:20.000] -----------------------------------------------
Info 24   [00:01:21.000] Open files: 
Info 24   [00:01:22.000] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info 24   [00:01:23.000] 		Projects: /user/username/projects/myproject/foo/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/foo/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/foo/tsconfig.json: *new*
  {}
/user/username/projects/myproject/bar/index.ts: *new*
  {}
/a/lib/lib.es2017.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/foo/node_modules: *new*
  {}

Info 24   [00:01:24.000] response:
    {
      "responseRequired": false
    }
Info 25   [00:01:25.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/bar/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

Info 26   [00:01:26.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/bar/index.ts 500 undefined WatchType: Closed Script info
Info 27   [00:01:27.000] Search path: /user/username/projects/myproject/bar
Info 28   [00:01:28.000] For info: /user/username/projects/myproject/bar/index.ts :: Config file name: /user/username/projects/myproject/bar/tsconfig.json
Info 29   [00:01:29.000] Creating configuration project /user/username/projects/myproject/bar/tsconfig.json
Info 30   [00:01:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Config file
Info 31   [00:01:31.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/bar/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/bar/index.ts to open"}}
Info 32   [00:01:32.000] Config: /user/username/projects/myproject/bar/tsconfig.json : {
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
Info 33   [00:01:33.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json
Info 34   [00:01:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.dom.d.ts 500 undefined WatchType: Closed Script info
Info 35   [00:01:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 36   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 37   [00:01:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 38   [00:01:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info 39   [00:01:39.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 40   [00:01:40.000] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info 41   [00:01:41.000] 	Files (3)
	/a/lib/lib.es2017.d.ts
	/a/lib/lib.dom.d.ts
	/user/username/projects/myproject/bar/index.ts


	../../../../../a/lib/lib.es2017.d.ts
	  Library 'lib.es2017.d.ts' specified in compilerOptions
	../../../../../a/lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	index.ts
	  Matched by include pattern 'index.ts' in 'tsconfig.json'

Info 42   [00:01:42.000] -----------------------------------------------
Info 43   [00:01:43.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/bar/tsconfig.json"}}
Info 44   [00:01:44.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5370ca7ca3faf398ecd694700ec7a0793b5e111125c5b8f56f69d3de23ff19ae","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":56,"tsx":0,"tsxSize":0,"dts":2,"dtsSize":391,"deferred":0,"deferredSize":0},"compilerOptions":{"lib":["dom","es2017"]},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 45   [00:01:45.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/bar/index.ts","configFile":"/user/username/projects/myproject/bar/tsconfig.json","diagnostics":[]}}
Info 46   [00:01:46.000] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info 46   [00:01:47.000] 	Files (3)

Info 46   [00:01:48.000] -----------------------------------------------
Info 46   [00:01:49.000] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info 46   [00:01:50.000] 	Files (3)

Info 46   [00:01:51.000] -----------------------------------------------
Info 46   [00:01:52.000] Open files: 
Info 46   [00:01:53.000] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info 46   [00:01:54.000] 		Projects: /user/username/projects/myproject/foo/tsconfig.json
Info 46   [00:01:55.000] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info 46   [00:01:56.000] 		Projects: /user/username/projects/myproject/foo/tsconfig.json,/user/username/projects/myproject/bar/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/foo/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bar/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/foo/tsconfig.json:
  {}
/a/lib/lib.es2017.d.ts:
  {}
/user/username/projects/myproject/bar/tsconfig.json: *new*
  {}
/a/lib/lib.dom.d.ts: *new*
  {}

FsWatches *deleted*::
/user/username/projects/myproject/bar/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/foo/node_modules:
  {}

Info 46   [00:01:57.000] response:
    {
      "responseRequired": false
    }
Info 47   [00:01:58.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/bar/index.ts",
          "/user/username/projects/myproject/foo/index.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Before request

After request

Info 48   [00:01:59.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

Info 49   [00:02:00.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/bar/index.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 50   [00:02:01.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/bar/index.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 51   [00:02:02.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/bar/index.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before checking timeout queue length (1) and running

Info 52   [00:02:03.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/foo/index.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 53   [00:02:04.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/foo/index.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 54   [00:02:05.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/foo/index.ts","diagnostics":[]}}
Info 55   [00:02:06.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Before running immediate callbacks and checking length (1)
