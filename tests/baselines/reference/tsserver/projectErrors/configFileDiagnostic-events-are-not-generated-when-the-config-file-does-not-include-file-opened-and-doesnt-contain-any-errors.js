Info 0    [00:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/test.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:21.000] Search path: /a/b
Info 3    [00:00:22.000] For info: /a/b/test.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:23.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:25.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/a/b/tsconfig.json","reason":"Creating possible configured project for /a/b/test.ts to open"}}
Info 7    [00:00:26.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 8    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:28.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:32.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:33.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:34.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/app.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	app.ts
	  Part of 'files' list in tsconfig.json

Info 16   [00:00:35.000] -----------------------------------------------
Info 17   [00:00:36.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/a/b/tsconfig.json"}}
Info 18   [00:00:37.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"e10a1dc99ee63f16cb9b69bcee75540cdf41a1137371d3afbd4e7de507be5207","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":10,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 19   [00:00:38.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/test.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 20   [00:00:39.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 21   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:00:42.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:43.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:44.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/test.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	test.ts
	  Root file specified for compilation

Info 26   [00:00:45.000] -----------------------------------------------
Info 27   [00:00:46.000] Project '/a/b/tsconfig.json' (Configured)
Info 27   [00:00:47.000] 	Files (2)

Info 27   [00:00:48.000] -----------------------------------------------
Info 27   [00:00:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:00:50.000] 	Files (2)

Info 27   [00:00:51.000] -----------------------------------------------
Info 27   [00:00:52.000] Open files: 
Info 27   [00:00:53.000] 	FileName: /a/b/test.ts ProjectRootPath: undefined
Info 27   [00:00:54.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/app.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 27   [00:00:55.000] response:
    {
      "responseRequired": false
    }
Info 28   [00:00:56.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/app.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 29   [00:00:57.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 30   [00:00:58.000] Search path: /a/b
Info 31   [00:00:59.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 32   [00:01:00.000] Project '/a/b/tsconfig.json' (Configured)
Info 32   [00:01:01.000] 	Files (2)

Info 32   [00:01:02.000] -----------------------------------------------
Info 32   [00:01:03.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:04.000] 	Files (2)

Info 32   [00:01:05.000] -----------------------------------------------
Info 32   [00:01:06.000] Open files: 
Info 32   [00:01:07.000] 	FileName: /a/b/test.ts ProjectRootPath: undefined
Info 32   [00:01:08.000] 		Projects: /dev/null/inferredProject1*
Info 32   [00:01:09.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 32   [00:01:10.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 32   [00:01:11.000] response:
    {
      "responseRequired": false
    }
Info 33   [00:01:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/test2.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 34   [00:01:13.000] Search path: /a/b
Info 35   [00:01:14.000] For info: /a/b/test2.ts :: Config file name: /a/b/tsconfig.json
Info 36   [00:01:15.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a/b/test2.ts","configFile":"/a/b/tsconfig.json","diagnostics":[]}}
Info 37   [00:01:16.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 38   [00:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 39   [00:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 40   [00:01:19.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 41   [00:01:20.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 42   [00:01:21.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/test2.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	test2.ts
	  Root file specified for compilation

Info 43   [00:01:22.000] -----------------------------------------------
Info 44   [00:01:23.000] Project '/a/b/tsconfig.json' (Configured)
Info 44   [00:01:24.000] 	Files (2)

Info 44   [00:01:25.000] -----------------------------------------------
Info 44   [00:01:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 44   [00:01:27.000] 	Files (2)

Info 44   [00:01:28.000] -----------------------------------------------
Info 44   [00:01:29.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 44   [00:01:30.000] 	Files (2)

Info 44   [00:01:31.000] -----------------------------------------------
Info 44   [00:01:32.000] Open files: 
Info 44   [00:01:33.000] 	FileName: /a/b/test.ts ProjectRootPath: undefined
Info 44   [00:01:34.000] 		Projects: /dev/null/inferredProject1*
Info 44   [00:01:35.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 44   [00:01:36.000] 		Projects: /a/b/tsconfig.json
Info 44   [00:01:37.000] 	FileName: /a/b/test2.ts ProjectRootPath: undefined
Info 44   [00:01:38.000] 		Projects: /dev/null/inferredProject2*
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 44   [00:01:39.000] response:
    {
      "responseRequired": false
    }