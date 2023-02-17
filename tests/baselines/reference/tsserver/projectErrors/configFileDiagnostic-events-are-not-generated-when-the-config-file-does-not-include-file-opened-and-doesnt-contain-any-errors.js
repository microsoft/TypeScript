TI:: Creating typing installer
//// [/a/b/app.ts]
let x = 10

//// [/a/b/test.ts]
let x = 10

//// [/a/b/test2.ts]
let xy = 10

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

//// [/a/b/tsconfig.json]
{
                    "files": ["app.ts"]
                }


TI:: [00:00:19.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:20.000] Processing cache location '/a/data/'
TI:: [00:00:21.000] Trying to find '/a/data/package.json'...
TI:: [00:00:22.000] Finished processing cache location '/a/data/'
TI:: [00:00:23.000] Npm config file: /a/data/package.json
TI:: [00:00:24.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:29.000] Updating types-registry npm package...
TI:: [00:00:30.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:37.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:38.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:39.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/test.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:40.000] Search path: /a/b
Info 3    [00:00:41.000] For info: /a/b/test.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:42.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:43.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:44.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/test.ts to open"}}
Info 7    [00:00:45.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 8    [00:00:46.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:47.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:51.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:52.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:53.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/app.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Part of 'files' list in tsconfig.json

Info 16   [00:00:54.000] -----------------------------------------------
Info 17   [00:00:55.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 18   [00:00:56.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":10,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 19   [00:00:57.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/test.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 20   [00:00:58.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 21   [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:01:01.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:01:02.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:01:03.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/test.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	test.ts
	  Root file specified for compilation

Info 26   [00:01:04.000] -----------------------------------------------
Info 27   [00:01:05.000] Project '/a/b/tsconfig.json' (Configured)
Info 27   [00:01:06.000] 	Files (2)

Info 27   [00:01:07.000] -----------------------------------------------
Info 27   [00:01:08.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:01:09.000] 	Files (2)

Info 27   [00:01:10.000] -----------------------------------------------
Info 27   [00:01:11.000] Open files: 
Info 27   [00:01:12.000] 	FileName: /a/b/test.ts ProjectRootPath: undefined
Info 27   [00:01:13.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b/app.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Info 27   [00:01:14.000] response:
    {
      "responseRequired": false
    }
Info 28   [00:01:15.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

Info 29   [00:01:16.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 30   [00:01:17.000] Search path: /a/b
Info 31   [00:01:18.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 32   [00:01:19.000] Project '/a/b/tsconfig.json' (Configured)
Info 32   [00:01:20.000] 	Files (2)

Info 32   [00:01:21.000] -----------------------------------------------
Info 32   [00:01:22.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:23.000] 	Files (2)

Info 32   [00:01:24.000] -----------------------------------------------
Info 32   [00:01:25.000] Open files: 
Info 32   [00:01:26.000] 	FileName: /a/b/test.ts ProjectRootPath: undefined
Info 32   [00:01:27.000] 		Projects: /dev/null/inferredProject1*
Info 32   [00:01:28.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 32   [00:01:29.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/a/b/app.ts:
  {}

Info 32   [00:01:30.000] response:
    {
      "responseRequired": false
    }
Info 33   [00:01:31.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/test2.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

Info 34   [00:01:32.000] Search path: /a/b
Info 35   [00:01:33.000] For info: /a/b/test2.ts :: Config file name: /a/b/tsconfig.json
Info 36   [00:01:34.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/test2.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 37   [00:01:35.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 38   [00:01:36.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 39   [00:01:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 40   [00:01:38.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 41   [00:01:39.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 42   [00:01:40.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/test2.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	test2.ts
	  Root file specified for compilation

Info 43   [00:01:41.000] -----------------------------------------------
Info 44   [00:01:42.000] Project '/a/b/tsconfig.json' (Configured)
Info 44   [00:01:43.000] 	Files (2)

Info 44   [00:01:44.000] -----------------------------------------------
Info 44   [00:01:45.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 44   [00:01:46.000] 	Files (2)

Info 44   [00:01:47.000] -----------------------------------------------
Info 44   [00:01:48.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 44   [00:01:49.000] 	Files (2)

Info 44   [00:01:50.000] -----------------------------------------------
Info 44   [00:01:51.000] Open files: 
Info 44   [00:01:52.000] 	FileName: /a/b/test.ts ProjectRootPath: undefined
Info 44   [00:01:53.000] 		Projects: /dev/null/inferredProject1*
Info 44   [00:01:54.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 44   [00:01:55.000] 		Projects: /a/b/tsconfig.json
Info 44   [00:01:56.000] 	FileName: /a/b/test2.ts ProjectRootPath: undefined
Info 44   [00:01:57.000] 		Projects: /dev/null/inferredProject2*
After request

Info 44   [00:01:58.000] response:
    {
      "responseRequired": false
    }