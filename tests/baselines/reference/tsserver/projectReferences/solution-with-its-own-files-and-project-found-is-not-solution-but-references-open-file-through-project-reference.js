Info 0    [00:00:57.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:58.000] Search path: /user/username/projects/myproject/src
Info 2    [00:00:59.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:01:00.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:01:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:01:02.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 6    [00:01:03.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 7    [00:01:04.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [00:01:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 9    [00:01:06.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 10   [00:01:07.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info 11   [00:01:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 12   [00:01:09.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 13   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 14   [00:01:11.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 15   [00:01:12.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 17   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 18   [00:01:15.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:01:16.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 20   [00:01:17.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 21   [00:01:18.000] -----------------------------------------------
Info 22   [00:01:19.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 23   [00:01:20.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":134,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 24   [00:01:21.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 25   [00:01:22.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 26   [00:01:23.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 27   [00:01:24.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 28   [00:01:25.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 29   [00:01:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 30   [00:01:27.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 31   [00:01:28.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 32   [00:01:29.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 33   [00:01:30.000] -----------------------------------------------
Info 34   [00:01:31.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 35   [00:01:32.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"75d5ba36c0a162a329bf40235b10e96d2d129b95469e1f02c08da775fb38a2b4","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":77,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 36   [00:01:33.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 37   [00:01:34.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 37   [00:01:35.000] 	Files (4)

Info 37   [00:01:36.000] -----------------------------------------------
Info 37   [00:01:37.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 37   [00:01:38.000] 	Files (3)

Info 37   [00:01:39.000] -----------------------------------------------
Info 37   [00:01:40.000] Open files: 
Info 37   [00:01:41.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 37   [00:01:42.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 37   [00:01:43.000] getDefaultProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Info 37   [00:01:44.000] findDefaultConfiguredProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Info 37   [00:01:45.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/main.ts"
        ]
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/user/username/projects/myproject/tsconfig-src.json]
{"compilerOptions":{"composite":true,"outDir":"./target/","baseUrl":"./src/"},"include":["./src/**/*"]}

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"outDir":"./target/","baseUrl":"./src/"},"references":[{"path":"./tsconfig-src.json"}],"files":["./own/main.ts"]}

//// [/user/username/projects/myproject/src/main.ts]
import { foo } from 'helpers/functions';
export { foo };

//// [/user/username/projects/myproject/src/helpers/functions.ts]
export const foo = 1;

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

//// [/dummy/dummy.ts]
let a = 10;

//// [/user/username/projects/myproject/target/src/main.d.ts]
import { foo } from 'helpers/functions';
export { foo };
//# sourceMappingURL=main.d.ts.map

//// [/user/username/projects/myproject/target/src/main.d.ts.map]
{"version":3,"file":"main.d.ts","sourceRoot":"","sources":["../../src/main.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,GAAG,EAAE,MAAM,mBAAmB,CAAC;AAExC,OAAO,EAAC,GAAG,EAAC,CAAC"}

//// [/user/username/projects/myproject/target/src/helpers/functions.d.ts]
export declare const foo = 1;
//# sourceMappingURL=functions.d.ts.map

//// [/user/username/projects/myproject/target/src/helpers/functions.d.ts.map]
{"version":3,"file":"functions.d.ts","sourceRoot":"","sources":["../../../src/helpers/functions.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,GAAG,IAAI,CAAC"}

//// [/user/username/projects/myproject/indirect3/tsconfig.json]
{"compilerOptions":{"baseUrl":"../target/src/"}}

//// [/user/username/projects/myproject/indirect3/main.ts]
import { foo } from 'main';
foo;
export function bar() {}

//// [/user/username/projects/myproject/own/main.ts]
import { foo } from 'main';
foo;
export function bar() {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 38   [00:01:46.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 39   [00:01:47.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 40   [00:01:48.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 41   [00:01:49.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 42   [00:01:50.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 43   [00:01:51.000] Search path: /dummy
Info 44   [00:01:52.000] For info: /dummy/dummy.ts :: No config files found.
Info 45   [00:01:53.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 46   [00:01:54.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 47   [00:01:55.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 48   [00:01:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 49   [00:01:57.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 50   [00:01:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 51   [00:01:59.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 52   [00:02:00.000] -----------------------------------------------
Info 53   [00:02:01.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 53   [00:02:02.000] 	Files (4)

Info 53   [00:02:03.000] -----------------------------------------------
Info 53   [00:02:04.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 53   [00:02:05.000] 	Files (3)

Info 53   [00:02:06.000] -----------------------------------------------
Info 53   [00:02:07.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 53   [00:02:08.000] 	Files (2)

Info 53   [00:02:09.000] -----------------------------------------------
Info 53   [00:02:10.000] Open files: 
Info 53   [00:02:11.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 53   [00:02:12.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 53   [00:02:13.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 53   [00:02:14.000] 		Projects: /dev/null/inferredProject1*
Info 53   [00:02:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 54   [00:02:16.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 54   [00:02:17.000] 	Files (4)

Info 54   [00:02:18.000] -----------------------------------------------
Info 54   [00:02:19.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 54   [00:02:20.000] 	Files (3)

Info 54   [00:02:21.000] -----------------------------------------------
Info 54   [00:02:22.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 54   [00:02:23.000] 	Files (2)

Info 54   [00:02:24.000] -----------------------------------------------
Info 54   [00:02:25.000] Open files: 
Info 54   [00:02:26.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 54   [00:02:27.000] 		Projects: /dev/null/inferredProject1*
Info 54   [00:02:28.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 55   [00:02:29.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 55   [00:02:30.000] 	Files (4)

Info 55   [00:02:31.000] -----------------------------------------------
Info 55   [00:02:32.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 55   [00:02:33.000] 	Files (3)

Info 55   [00:02:34.000] -----------------------------------------------
Info 55   [00:02:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 55   [00:02:36.000] 	Files (2)

Info 55   [00:02:37.000] -----------------------------------------------
Info 55   [00:02:38.000] Open files: 
Info 55   [00:02:39.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 56   [00:02:40.000] Search path: /dummy
Info 57   [00:02:41.000] For info: /dummy/dummy.ts :: No config files found.
Info 58   [00:02:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 59   [00:02:43.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 60   [00:02:44.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 61   [00:02:45.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 62   [00:02:46.000] -----------------------------------------------
Info 63   [00:02:47.000] `remove Project::
Info 64   [00:02:48.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 65   [00:02:49.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 66   [00:02:50.000] -----------------------------------------------
Info 67   [00:02:51.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 68   [00:02:52.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 69   [00:02:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 70   [00:02:54.000] `remove Project::
Info 71   [00:02:55.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 72   [00:02:56.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 73   [00:02:57.000] -----------------------------------------------
Info 74   [00:02:58.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 75   [00:02:59.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 76   [00:03:00.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 77   [00:03:01.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 78   [00:03:02.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 79   [00:03:03.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 80   [00:03:04.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 81   [00:03:05.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 82   [00:03:06.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 82   [00:03:07.000] 	Files (2)

Info 82   [00:03:08.000] -----------------------------------------------
Info 82   [00:03:09.000] Open files: 
Info 82   [00:03:10.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 82   [00:03:11.000] 		Projects: /dev/null/inferredProject1*
Info 82   [00:03:12.000] Search path: /user/username/projects/myproject/src
Info 83   [00:03:13.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 84   [00:03:14.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 85   [00:03:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 86   [00:03:16.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 87   [00:03:17.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 88   [00:03:18.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 89   [00:03:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 90   [00:03:20.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 91   [00:03:21.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info 92   [00:03:22.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 93   [00:03:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 94   [00:03:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 95   [00:03:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 96   [00:03:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 97   [00:03:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 98   [00:03:28.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 99   [00:03:29.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 100  [00:03:30.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 101  [00:03:31.000] -----------------------------------------------
Info 102  [00:03:32.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 103  [00:03:33.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 104  [00:03:34.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 105  [00:03:35.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 106  [00:03:36.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 107  [00:03:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 108  [00:03:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 109  [00:03:39.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 110  [00:03:40.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 111  [00:03:41.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 112  [00:03:42.000] -----------------------------------------------
Info 113  [00:03:43.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 114  [00:03:44.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 115  [00:03:45.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 115  [00:03:46.000] 	Files (4)

Info 115  [00:03:47.000] -----------------------------------------------
Info 115  [00:03:48.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 115  [00:03:49.000] 	Files (3)

Info 115  [00:03:50.000] -----------------------------------------------
Info 115  [00:03:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 115  [00:03:52.000] 	Files (2)

Info 115  [00:03:53.000] -----------------------------------------------
Info 115  [00:03:54.000] Open files: 
Info 115  [00:03:55.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 115  [00:03:56.000] 		Projects: /dev/null/inferredProject1*
Info 115  [00:03:57.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 115  [00:03:58.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 115  [00:03:59.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 116  [00:04:00.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 116  [00:04:01.000] 	Files (4)

Info 116  [00:04:02.000] -----------------------------------------------
Info 116  [00:04:03.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 116  [00:04:04.000] 	Files (3)

Info 116  [00:04:05.000] -----------------------------------------------
Info 116  [00:04:06.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 116  [00:04:07.000] 	Files (2)

Info 116  [00:04:08.000] -----------------------------------------------
Info 116  [00:04:09.000] Open files: 
Info 116  [00:04:10.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 116  [00:04:11.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 116  [00:04:12.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 117  [00:04:13.000] Search path: /dummy
Info 118  [00:04:14.000] For info: /dummy/dummy.ts :: No config files found.
Info 119  [00:04:15.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 120  [00:04:16.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 121  [00:04:17.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 122  [00:04:18.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 123  [00:04:19.000] -----------------------------------------------
Info 124  [00:04:20.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 124  [00:04:21.000] 	Files (4)

Info 124  [00:04:22.000] -----------------------------------------------
Info 124  [00:04:23.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 124  [00:04:24.000] 	Files (3)

Info 124  [00:04:25.000] -----------------------------------------------
Info 124  [00:04:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 124  [00:04:27.000] 	Files (2)

Info 124  [00:04:28.000] -----------------------------------------------
Info 124  [00:04:29.000] Open files: 
Info 124  [00:04:30.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 124  [00:04:31.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 124  [00:04:32.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 124  [00:04:33.000] 		Projects: /dev/null/inferredProject1*
Info 124  [00:04:34.000] reload projects.
Info 125  [00:04:35.000] Scheduled: /dev/null/inferredProject1*
Info 126  [00:04:36.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 127  [00:04:37.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json
Info 128  [00:04:38.000] Scheduled: *ensureProjectForOpenFiles*
Info 129  [00:04:39.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 130  [00:04:40.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 131  [00:04:41.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 132  [00:04:42.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json, Cancelled earlier one
Info 133  [00:04:43.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 134  [00:04:44.000] Search path: /user/username/projects/myproject/src
Info 135  [00:04:45.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 136  [00:04:46.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 137  [00:04:47.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 138  [00:04:48.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 139  [00:04:49.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"User requested reload projects"}}
Info 140  [00:04:50.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 141  [00:04:51.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 142  [00:04:52.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 143  [00:04:53.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info 144  [00:04:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 145  [00:04:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 146  [00:04:56.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 147  [00:04:57.000] Different program with same set of files
Info 148  [00:04:58.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 149  [00:04:59.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig.json","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 150  [00:05:00.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 151  [00:05:01.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 152  [00:05:02.000] Reloading configured project /user/username/projects/myproject/tsconfig-src.json
Info 153  [00:05:03.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"User requested reload projects"}}
Info 154  [00:05:04.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 155  [00:05:05.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 156  [00:05:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 157  [00:05:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 158  [00:05:08.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 159  [00:05:09.000] Different program with same set of files
Info 160  [00:05:10.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 161  [00:05:11.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig-src.json","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 162  [00:05:12.000] Search path: /dummy
Info 163  [00:05:13.000] For info: /dummy/dummy.ts :: No config files found.
Info 164  [00:05:14.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 165  [00:05:15.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 166  [00:05:16.000] Before ensureProjectForOpenFiles:
Info 167  [00:05:17.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 167  [00:05:18.000] 	Files (4)

Info 167  [00:05:19.000] -----------------------------------------------
Info 167  [00:05:20.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 167  [00:05:21.000] 	Files (3)

Info 167  [00:05:22.000] -----------------------------------------------
Info 167  [00:05:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 167  [00:05:24.000] 	Files (2)

Info 167  [00:05:25.000] -----------------------------------------------
Info 167  [00:05:26.000] Open files: 
Info 167  [00:05:27.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 167  [00:05:28.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 167  [00:05:29.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 167  [00:05:30.000] 		Projects: /dev/null/inferredProject1*
Info 167  [00:05:31.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 168  [00:05:32.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 169  [00:05:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 170  [00:05:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 171  [00:05:35.000] Different program with same set of files
Info 172  [00:05:36.000] After ensureProjectForOpenFiles:
Info 173  [00:05:37.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 173  [00:05:38.000] 	Files (4)

Info 173  [00:05:39.000] -----------------------------------------------
Info 173  [00:05:40.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 173  [00:05:41.000] 	Files (3)

Info 173  [00:05:42.000] -----------------------------------------------
Info 173  [00:05:43.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 173  [00:05:44.000] 	Files (2)

Info 173  [00:05:45.000] -----------------------------------------------
Info 173  [00:05:46.000] Open files: 
Info 173  [00:05:47.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 173  [00:05:48.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 173  [00:05:49.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 173  [00:05:50.000] 		Projects: /dev/null/inferredProject1*
Info 173  [00:05:51.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/myproject/src/main.ts",
        "line": 2,
        "offset": 10
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/dummy/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 174  [00:05:52.000] Finding references to /user/username/projects/myproject/src/main.ts position 50 in project /user/username/projects/myproject/tsconfig-src.json
Info 175  [00:05:53.000] Finding references to /user/username/projects/myproject/src/main.ts position 50 in project /user/username/projects/myproject/tsconfig.json
Info 176  [00:05:54.000] Search path: /user/username/projects/myproject/src
Info 177  [00:05:55.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 178  [00:05:56.000] Search path: /user/username/projects/myproject/src
Info 179  [00:05:57.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 180  [00:05:58.000] Search path: /user/username/projects/myproject/src
Info 181  [00:05:59.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 182  [00:06:00.000] Search path: /user/username/projects/myproject/src/helpers
Info 183  [00:06:01.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 184  [00:06:02.000] Search path: /user/username/projects/myproject/src/helpers
Info 185  [00:06:03.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 186  [00:06:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts 500 undefined WatchType: Closed Script info
Info 187  [00:06:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts.map 500 undefined WatchType: Closed Script info
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/dummy/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts.map:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 188  [00:06:06.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/myproject/src/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 41
            },
            "lineText": "import { foo } from 'helpers/functions';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/src/main.ts",
            "start": {
              "line": 2,
              "offset": 10
            },
            "end": {
              "line": 2,
              "offset": 13
            },
            "contextStart": {
              "line": 2,
              "offset": 1
            },
            "contextEnd": {
              "line": 2,
              "offset": 16
            },
            "lineText": "export { foo };",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/user/username/projects/myproject/src/helpers/functions.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 17
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 22
            },
            "lineText": "export const foo = 1;",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/own/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 28
            },
            "lineText": "import { foo } from 'main';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/own/main.ts",
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 4
            },
            "lineText": "foo;",
            "isWriteAccess": false,
            "isDefinition": false
          }
        ],
        "symbolName": "foo",
        "symbolStartOffset": 10,
        "symbolDisplayString": "(alias) const foo: 1\nexport foo"
      },
      "responseRequired": true
    }
Info 189  [00:06:07.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 190  [00:06:08.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 190  [00:06:09.000] 	Files (4)

Info 190  [00:06:10.000] -----------------------------------------------
Info 190  [00:06:11.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 190  [00:06:12.000] 	Files (3)

Info 190  [00:06:13.000] -----------------------------------------------
Info 190  [00:06:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 190  [00:06:15.000] 	Files (2)

Info 190  [00:06:16.000] -----------------------------------------------
Info 190  [00:06:17.000] Open files: 
Info 190  [00:06:18.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 190  [00:06:19.000] 		Projects: /dev/null/inferredProject1*
Info 190  [00:06:20.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 191  [00:06:21.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 191  [00:06:22.000] 	Files (4)

Info 191  [00:06:23.000] -----------------------------------------------
Info 191  [00:06:24.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 191  [00:06:25.000] 	Files (3)

Info 191  [00:06:26.000] -----------------------------------------------
Info 191  [00:06:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 191  [00:06:28.000] 	Files (2)

Info 191  [00:06:29.000] -----------------------------------------------
Info 191  [00:06:30.000] Open files: 
Info 191  [00:06:31.000] Search path: /user/username/projects/myproject/indirect3
Info 192  [00:06:32.000] For info: /user/username/projects/myproject/indirect3/main.ts :: Config file name: /user/username/projects/myproject/indirect3/tsconfig.json
Info 193  [00:06:33.000] Creating configuration project /user/username/projects/myproject/indirect3/tsconfig.json
Info 194  [00:06:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Config file
Info 195  [00:06:35.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/indirect3/main.ts to open"}}
Info 196  [00:06:36.000] Config: /user/username/projects/myproject/indirect3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect3/main.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/target/src",
  "configFilePath": "/user/username/projects/myproject/indirect3/tsconfig.json"
 }
}
Info 197  [00:06:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 198  [00:06:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 199  [00:06:39.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 200  [00:06:40.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json
Info 201  [00:06:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts 500 undefined WatchType: Closed Script info
Info 202  [00:06:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 203  [00:06:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 204  [00:06:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 205  [00:06:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 206  [00:06:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 207  [00:06:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 208  [00:06:48.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 209  [00:06:49.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 210  [00:06:50.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/target/src/helpers/functions.d.ts
	/user/username/projects/myproject/target/src/main.d.ts
	/user/username/projects/myproject/indirect3/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../target/src/helpers/functions.d.ts
	  Imported via 'helpers/functions' from file '../target/src/main.d.ts'
	../target/src/main.d.ts
	  Imported via 'main' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 211  [00:06:51.000] -----------------------------------------------
Info 212  [00:06:52.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json"}}
Info 213  [00:06:53.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5b0817f69b6871821661b976aa73f4f2533b37c5f4b920541094c2d727d0dc39","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":57,"tsx":0,"tsxSize":0,"dts":3,"dtsSize":494,"deferred":0,"deferredSize":0},"compilerOptions":{"baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 214  [00:06:54.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/indirect3/main.ts","configFile":"/user/username/projects/myproject/indirect3/tsconfig.json","diagnostics":[]}}
Info 215  [00:06:55.000] `remove Project::
Info 216  [00:06:56.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 217  [00:06:57.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 218  [00:06:58.000] -----------------------------------------------
Info 219  [00:06:59.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 220  [00:07:00.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 221  [00:07:01.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 222  [00:07:02.000] `remove Project::
Info 223  [00:07:03.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 224  [00:07:04.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 225  [00:07:05.000] -----------------------------------------------
Info 226  [00:07:06.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 227  [00:07:07.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 228  [00:07:08.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 229  [00:07:09.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 230  [00:07:10.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 231  [00:07:11.000] `remove Project::
Info 232  [00:07:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 233  [00:07:13.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 234  [00:07:14.000] -----------------------------------------------
Info 235  [00:07:15.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 236  [00:07:16.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 237  [00:07:17.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 238  [00:07:18.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 239  [00:07:19.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 240  [00:07:20.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 240  [00:07:21.000] 	Files (4)

Info 240  [00:07:22.000] -----------------------------------------------
Info 240  [00:07:23.000] Open files: 
Info 240  [00:07:24.000] 	FileName: /user/username/projects/myproject/indirect3/main.ts ProjectRootPath: undefined
Info 240  [00:07:25.000] 		Projects: /user/username/projects/myproject/indirect3/tsconfig.json
Info 240  [00:07:26.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/myproject/indirect3/main.ts",
        "line": 1,
        "offset": 10
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/indirect3/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts.map:
  {}
/user/username/projects/myproject/indirect3/tsconfig.json:
  {}
/user/username/projects/myproject/target/src/main.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/indirect3:
  {}
/user/username/projects/myproject/target:
  {}

Info 241  [00:07:27.000] Finding references to /user/username/projects/myproject/indirect3/main.ts position 9 in project /user/username/projects/myproject/indirect3/tsconfig.json
Info 242  [00:07:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts.map 500 undefined WatchType: Closed Script info
Info 243  [00:07:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 244  [00:07:30.000] Search path: /user/username/projects/myproject/src
Info 245  [00:07:31.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 246  [00:07:32.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 247  [00:07:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 248  [00:07:34.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 249  [00:07:35.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 250  [00:07:36.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 251  [00:07:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 252  [00:07:38.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 253  [00:07:39.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info 254  [00:07:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 255  [00:07:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 256  [00:07:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 257  [00:07:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 258  [00:07:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 259  [00:07:45.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 260  [00:07:46.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 261  [00:07:47.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 262  [00:07:48.000] -----------------------------------------------
Info 263  [00:07:49.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 264  [00:07:50.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 265  [00:07:51.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 266  [00:07:52.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 267  [00:07:53.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 268  [00:07:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 269  [00:07:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 270  [00:07:56.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 271  [00:07:57.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 272  [00:07:58.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 273  [00:07:59.000] -----------------------------------------------
Info 274  [00:08:00.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 275  [00:08:01.000] Search path: /user/username/projects/myproject/src
Info 276  [00:08:02.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 277  [00:08:03.000] Search path: /user/username/projects/myproject/src
Info 278  [00:08:04.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 279  [00:08:05.000] Search path: /user/username/projects/myproject/src/helpers
Info 280  [00:08:06.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 281  [00:08:07.000] Search path: /user/username/projects/myproject/src/helpers
Info 282  [00:08:08.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 283  [00:08:09.000] Finding references to /user/username/projects/myproject/src/main.ts position 9 in project /user/username/projects/myproject/tsconfig.json
Info 284  [00:08:10.000] Search path: /user/username/projects/myproject/src
Info 285  [00:08:11.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 286  [00:08:12.000] Search path: /user/username/projects/myproject/src
Info 287  [00:08:13.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 288  [00:08:14.000] Search path: /user/username/projects/myproject/src
Info 289  [00:08:15.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 290  [00:08:16.000] Search path: /user/username/projects/myproject/src/helpers
Info 291  [00:08:17.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 292  [00:08:18.000] Search path: /user/username/projects/myproject/src/helpers
Info 293  [00:08:19.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 294  [00:08:20.000] Finding references to /user/username/projects/myproject/src/main.ts position 9 in project /user/username/projects/myproject/tsconfig-src.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/indirect3/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts.map:
  {}
/user/username/projects/myproject/indirect3/tsconfig.json:
  {}
/user/username/projects/myproject/target/src/main.d.ts:
  {}
/user/username/projects/myproject/target/src/main.d.ts.map:
  {}
/user/username/projects/myproject/src/main.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/indirect3:
  {}
/user/username/projects/myproject/target:
  {}
/user/username/projects/myproject/src:
  {}

Info 295  [00:08:21.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/myproject/indirect3/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 28
            },
            "lineText": "import { foo } from 'main';",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/user/username/projects/myproject/indirect3/main.ts",
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 4
            },
            "lineText": "foo;",
            "isWriteAccess": false,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/src/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 41
            },
            "lineText": "import { foo } from 'helpers/functions';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/src/main.ts",
            "start": {
              "line": 2,
              "offset": 10
            },
            "end": {
              "line": 2,
              "offset": 13
            },
            "contextStart": {
              "line": 2,
              "offset": 1
            },
            "contextEnd": {
              "line": 2,
              "offset": 16
            },
            "lineText": "export { foo };",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/src/helpers/functions.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 17
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 22
            },
            "lineText": "export const foo = 1;",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/own/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 28
            },
            "lineText": "import { foo } from 'main';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/own/main.ts",
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 4
            },
            "lineText": "foo;",
            "isWriteAccess": false,
            "isDefinition": false
          }
        ],
        "symbolName": "foo",
        "symbolStartOffset": 10,
        "symbolDisplayString": "(alias) const foo: 1\nimport foo"
      },
      "responseRequired": true
    }