Info 0    [16:01:05.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:01:06.000] Search path: /user/username/projects/myproject/src
Info 2    [16:01:07.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [16:01:08.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [16:01:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [16:01:10.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 6    [16:01:11.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  },
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect2.json",
   "originalPath": "./tsconfig-indirect2.json"
  }
 ]
}
Info 7    [16:01:12.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [16:01:13.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 9    [16:01:14.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 10   [16:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 11   [16:01:16.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 12   [16:01:17.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 13   [16:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 14   [16:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 15   [16:01:20.000] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect2/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect2.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 16   [16:01:21.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 17   [16:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 18   [16:01:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 19   [16:01:24.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [16:01:25.000] Different program with same set of files
Info 21   [16:01:26.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 22   [16:01:27.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":0,"tsSize":0,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 23   [16:01:28.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 24   [16:01:29.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 25   [16:01:30.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 26   [16:01:31.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 27   [16:01:32.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 28   [16:01:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 29   [16:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 30   [16:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 31   [16:01:36.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 32   [16:01:37.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 33   [16:01:38.000] 	Files (3)
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

Info 34   [16:01:39.000] -----------------------------------------------
Info 35   [16:01:40.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 36   [16:01:41.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"75d5ba36c0a162a329bf40235b10e96d2d129b95469e1f02c08da775fb38a2b4","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":77,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 37   [16:01:42.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 38   [16:01:43.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 38   [16:01:44.000] 	Files (0)

Info 38   [16:01:45.000] -----------------------------------------------
Info 38   [16:01:46.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 38   [16:01:47.000] 	Files (3)

Info 38   [16:01:48.000] -----------------------------------------------
Info 38   [16:01:49.000] Open files: 
Info 38   [16:01:50.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 38   [16:01:51.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 38   [16:01:52.000] getDefaultProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Info 38   [16:01:53.000] findDefaultConfiguredProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Info 38   [16:01:54.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/src/main.ts"]},"seq":1,"type":"request"}
//// [/user/username/projects/myproject/tsconfig-src.json]
{"compilerOptions":{"composite":true,"outDir":"./target/","baseUrl":"./src/"},"include":["./src/**/*"]}

//// [/user/username/projects/myproject/tsconfig.json]
{"references":[{"path":"./tsconfig-indirect1.json"},{"path":"./tsconfig-indirect2.json"}],"files":[]}

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

//// [/user/username/projects/myproject/tsconfig-indirect1.json]
{"compilerOptions":{"composite":true,"outDir":"./target/","baseUrl":"./src/"},"files":["./indirect1/main.ts"],"references":[{"path":"./tsconfig-src.json"}]}

//// [/user/username/projects/myproject/indirect1/main.ts]
import { foo } from 'main';
foo;
export function bar() {}

//// [/user/username/projects/myproject/tsconfig-indirect2.json]
{"compilerOptions":{"composite":true,"outDir":"./target/","baseUrl":"./src/"},"files":["./indirect2/main.ts"],"references":[{"path":"./tsconfig-src.json"}]}

//// [/user/username/projects/myproject/indirect2/main.ts]
import { foo } from 'main';
foo;
export function bar() {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 39   [16:01:55.000] response:{"responseRequired":false}
Info 40   [16:01:56.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 41   [16:01:57.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 42   [16:01:58.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 43   [16:01:59.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Info 44   [16:02:00.000] Search path: /dummy
Info 45   [16:02:01.000] For info: /dummy/dummy.ts :: No config files found.
Info 46   [16:02:02.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 47   [16:02:03.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 48   [16:02:04.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 49   [16:02:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 50   [16:02:06.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 51   [16:02:07.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 52   [16:02:08.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 53   [16:02:09.000] -----------------------------------------------
Info 54   [16:02:10.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 54   [16:02:11.000] 	Files (0)

Info 54   [16:02:12.000] -----------------------------------------------
Info 54   [16:02:13.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 54   [16:02:14.000] 	Files (3)

Info 54   [16:02:15.000] -----------------------------------------------
Info 54   [16:02:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 54   [16:02:17.000] 	Files (2)

Info 54   [16:02:18.000] -----------------------------------------------
Info 54   [16:02:19.000] Open files: 
Info 54   [16:02:20.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 54   [16:02:21.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 54   [16:02:22.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 54   [16:02:23.000] 		Projects: /dev/null/inferredProject1*
Info 54   [16:02:24.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 55   [16:02:25.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 55   [16:02:26.000] 	Files (0)

Info 55   [16:02:27.000] -----------------------------------------------
Info 55   [16:02:28.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 55   [16:02:29.000] 	Files (3)

Info 55   [16:02:30.000] -----------------------------------------------
Info 55   [16:02:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 55   [16:02:32.000] 	Files (2)

Info 55   [16:02:33.000] -----------------------------------------------
Info 55   [16:02:34.000] Open files: 
Info 55   [16:02:35.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 55   [16:02:36.000] 		Projects: /dev/null/inferredProject1*
Info 55   [16:02:37.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 56   [16:02:38.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 56   [16:02:39.000] 	Files (0)

Info 56   [16:02:40.000] -----------------------------------------------
Info 56   [16:02:41.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 56   [16:02:42.000] 	Files (3)

Info 56   [16:02:43.000] -----------------------------------------------
Info 56   [16:02:44.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 56   [16:02:45.000] 	Files (2)

Info 56   [16:02:46.000] -----------------------------------------------
Info 56   [16:02:47.000] Open files: 
Info 56   [16:02:48.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 57   [16:02:49.000] Search path: /dummy
Info 58   [16:02:50.000] For info: /dummy/dummy.ts :: No config files found.
Info 59   [16:02:51.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 60   [16:02:52.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 61   [16:02:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 62   [16:02:54.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 63   [16:02:55.000] -----------------------------------------------
Info 64   [16:02:56.000] `remove Project::
Info 65   [16:02:57.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 66   [16:02:58.000] 	Files (0)



Info 67   [16:02:59.000] -----------------------------------------------
Info 68   [16:03:00.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 69   [16:03:01.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 70   [16:03:02.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 71   [16:03:03.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 72   [16:03:04.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 73   [16:03:05.000] `remove Project::
Info 74   [16:03:06.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 75   [16:03:07.000] 	Files (3)
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

Info 76   [16:03:08.000] -----------------------------------------------
Info 77   [16:03:09.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 78   [16:03:10.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 79   [16:03:11.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 80   [16:03:12.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 81   [16:03:13.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 82   [16:03:14.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 83   [16:03:15.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 84   [16:03:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 84   [16:03:17.000] 	Files (2)

Info 84   [16:03:18.000] -----------------------------------------------
Info 84   [16:03:19.000] Open files: 
Info 84   [16:03:20.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 84   [16:03:21.000] 		Projects: /dev/null/inferredProject1*
Info 84   [16:03:22.000] Search path: /user/username/projects/myproject/src
Info 85   [16:03:23.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 86   [16:03:24.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 87   [16:03:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 88   [16:03:26.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 89   [16:03:27.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  },
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect2.json",
   "originalPath": "./tsconfig-indirect2.json"
  }
 ]
}
Info 90   [16:03:28.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 91   [16:03:29.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 92   [16:03:30.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 93   [16:03:31.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 94   [16:03:32.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 95   [16:03:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 96   [16:03:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 97   [16:03:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 98   [16:03:36.000] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect2/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect2.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 99   [16:03:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 100  [16:03:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 101  [16:03:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 102  [16:03:40.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 103  [16:03:41.000] Different program with same set of files
Info 104  [16:03:42.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 105  [16:03:43.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 106  [16:03:44.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 107  [16:03:45.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 108  [16:03:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 109  [16:03:47.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 110  [16:03:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 111  [16:03:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 112  [16:03:50.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 113  [16:03:51.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 114  [16:03:52.000] 	Files (3)
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

Info 115  [16:03:53.000] -----------------------------------------------
Info 116  [16:03:54.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 117  [16:03:55.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 118  [16:03:56.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 118  [16:03:57.000] 	Files (0)

Info 118  [16:03:58.000] -----------------------------------------------
Info 118  [16:03:59.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 118  [16:04:00.000] 	Files (3)

Info 118  [16:04:01.000] -----------------------------------------------
Info 118  [16:04:02.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 118  [16:04:03.000] 	Files (2)

Info 118  [16:04:04.000] -----------------------------------------------
Info 118  [16:04:05.000] Open files: 
Info 118  [16:04:06.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 118  [16:04:07.000] 		Projects: /dev/null/inferredProject1*
Info 118  [16:04:08.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 118  [16:04:09.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 118  [16:04:10.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 119  [16:04:11.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 119  [16:04:12.000] 	Files (0)

Info 119  [16:04:13.000] -----------------------------------------------
Info 119  [16:04:14.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 119  [16:04:15.000] 	Files (3)

Info 119  [16:04:16.000] -----------------------------------------------
Info 119  [16:04:17.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 119  [16:04:18.000] 	Files (2)

Info 119  [16:04:19.000] -----------------------------------------------
Info 119  [16:04:20.000] Open files: 
Info 119  [16:04:21.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 119  [16:04:22.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 119  [16:04:23.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 120  [16:04:24.000] Search path: /dummy
Info 121  [16:04:25.000] For info: /dummy/dummy.ts :: No config files found.
Info 122  [16:04:26.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 123  [16:04:27.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 124  [16:04:28.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 125  [16:04:29.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 126  [16:04:30.000] -----------------------------------------------
Info 127  [16:04:31.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 127  [16:04:32.000] 	Files (0)

Info 127  [16:04:33.000] -----------------------------------------------
Info 127  [16:04:34.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 127  [16:04:35.000] 	Files (3)

Info 127  [16:04:36.000] -----------------------------------------------
Info 127  [16:04:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 127  [16:04:38.000] 	Files (2)

Info 127  [16:04:39.000] -----------------------------------------------
Info 127  [16:04:40.000] Open files: 
Info 127  [16:04:41.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 127  [16:04:42.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 127  [16:04:43.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 127  [16:04:44.000] 		Projects: /dev/null/inferredProject1*
Info 127  [16:04:45.000] reload projects.
Info 128  [16:04:46.000] Scheduled: /dev/null/inferredProject1*
Info 129  [16:04:47.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json
Info 130  [16:04:48.000] Scheduled: *ensureProjectForOpenFiles*
Info 131  [16:04:49.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json, Cancelled earlier one
Info 132  [16:04:50.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 133  [16:04:51.000] Search path: /user/username/projects/myproject/src
Info 134  [16:04:52.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 135  [16:04:53.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 136  [16:04:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 137  [16:04:55.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 138  [16:04:56.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"User requested reload projects"}}
Info 139  [16:04:57.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  },
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect2.json",
   "originalPath": "./tsconfig-indirect2.json"
  }
 ]
}
Info 140  [16:04:58.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 141  [16:04:59.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 142  [16:05:00.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 143  [16:05:01.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 144  [16:05:02.000] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect2/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect2.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 145  [16:05:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 146  [16:05:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 147  [16:05:05.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 148  [16:05:06.000] Different program with same set of files
Info 149  [16:05:07.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 150  [16:05:08.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig.json","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 151  [16:05:09.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 152  [16:05:10.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 153  [16:05:11.000] Reloading configured project /user/username/projects/myproject/tsconfig-src.json
Info 154  [16:05:12.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"User requested reload projects"}}
Info 155  [16:05:13.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 156  [16:05:14.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 157  [16:05:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 158  [16:05:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 159  [16:05:17.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 160  [16:05:18.000] Different program with same set of files
Info 161  [16:05:19.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 162  [16:05:20.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig-src.json","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 163  [16:05:21.000] Search path: /dummy
Info 164  [16:05:22.000] For info: /dummy/dummy.ts :: No config files found.
Info 165  [16:05:23.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 166  [16:05:24.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 167  [16:05:25.000] Before ensureProjectForOpenFiles:
Info 168  [16:05:26.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 168  [16:05:27.000] 	Files (0)

Info 168  [16:05:28.000] -----------------------------------------------
Info 168  [16:05:29.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 168  [16:05:30.000] 	Files (3)

Info 168  [16:05:31.000] -----------------------------------------------
Info 168  [16:05:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 168  [16:05:33.000] 	Files (2)

Info 168  [16:05:34.000] -----------------------------------------------
Info 168  [16:05:35.000] Open files: 
Info 168  [16:05:36.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 168  [16:05:37.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 168  [16:05:38.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 168  [16:05:39.000] 		Projects: /dev/null/inferredProject1*
Info 168  [16:05:40.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 169  [16:05:41.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 170  [16:05:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 171  [16:05:43.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 172  [16:05:44.000] Different program with same set of files
Info 173  [16:05:45.000] After ensureProjectForOpenFiles:
Info 174  [16:05:46.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 174  [16:05:47.000] 	Files (0)

Info 174  [16:05:48.000] -----------------------------------------------
Info 174  [16:05:49.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 174  [16:05:50.000] 	Files (3)

Info 174  [16:05:51.000] -----------------------------------------------
Info 174  [16:05:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 174  [16:05:53.000] 	Files (2)

Info 174  [16:05:54.000] -----------------------------------------------
Info 174  [16:05:55.000] Open files: 
Info 174  [16:05:56.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 174  [16:05:57.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 174  [16:05:58.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 174  [16:05:59.000] 		Projects: /dev/null/inferredProject1*
Info 174  [16:06:00.000] request:{"command":"references","arguments":{"file":"/user/username/projects/myproject/src/main.ts","line":2,"offset":10},"seq":2,"type":"request"}

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
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 175  [16:06:01.000] Finding references to /user/username/projects/myproject/src/main.ts position 50 in project /user/username/projects/myproject/tsconfig-src.json
Info 176  [16:06:02.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect1.json
Info 177  [16:06:03.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json","reason":"Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"}}
Info 178  [16:06:04.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 179  [16:06:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 180  [16:06:06.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json
Info 181  [16:06:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 182  [16:06:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 183  [16:06:09.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 184  [16:06:10.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 185  [16:06:11.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Part of 'files' list in tsconfig.json

Info 186  [16:06:12.000] -----------------------------------------------
Info 187  [16:06:13.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json"}}
Info 188  [16:06:14.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"9ccc3aed1af08832ccb25ea453f7b771199f56af238b53cc428549dbd2d59246","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":134,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 189  [16:06:15.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect2.json
Info 190  [16:06:16.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect2.json","reason":"Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"}}
Info 191  [16:06:17.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 192  [16:06:18.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect2/main.ts 500 undefined WatchType: Closed Script info
Info 193  [16:06:19.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json
Info 194  [16:06:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 195  [16:06:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 196  [16:06:22.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 197  [16:06:23.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 198  [16:06:24.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect2/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect2/main.ts'
	indirect2/main.ts
	  Part of 'files' list in tsconfig.json

Info 199  [16:06:25.000] -----------------------------------------------
Info 200  [16:06:26.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect2.json"}}
Info 201  [16:06:27.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"d9a040bddd6b85b85abd507a988a4b809b1515b5e61257ea3f8263da59589565","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":134,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 202  [16:06:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts 500 undefined WatchType: Closed Script info
Info 203  [16:06:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts.map 500 undefined WatchType: Closed Script info
Info 204  [16:06:30.000] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect1.json
Info 205  [16:06:31.000] Search path: /user/username/projects/myproject/src/helpers
Info 206  [16:06:32.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 207  [16:06:33.000] Search path: /user/username/projects/myproject/src/helpers
Info 208  [16:06:34.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 209  [16:06:35.000] Search path: /user/username/projects/myproject/src
Info 210  [16:06:36.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 211  [16:06:37.000] Search path: /user/username/projects/myproject/src
Info 212  [16:06:38.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 213  [16:06:39.000] Search path: /user/username/projects/myproject/src
Info 214  [16:06:40.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 215  [16:06:41.000] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect2.json
Info 216  [16:06:42.000] Search path: /user/username/projects/myproject/src/helpers
Info 217  [16:06:43.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 218  [16:06:44.000] Search path: /user/username/projects/myproject/src/helpers
Info 219  [16:06:45.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 220  [16:06:46.000] Search path: /user/username/projects/myproject/src
Info 221  [16:06:47.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 222  [16:06:48.000] Search path: /user/username/projects/myproject/src
Info 223  [16:06:49.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 224  [16:06:50.000] Search path: /user/username/projects/myproject/src
Info 225  [16:06:51.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json

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
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/user/username/projects/myproject/indirect1/main.ts:
  {}
/user/username/projects/myproject/indirect2/main.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts.map:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 226  [16:06:52.000] response:{"response":{"refs":[{"file":"/user/username/projects/myproject/src/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":41},"lineText":"import { foo } from 'helpers/functions';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/src/main.ts","start":{"line":2,"offset":10},"end":{"line":2,"offset":13},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":16},"lineText":"export { foo };","isWriteAccess":true,"isDefinition":true},{"file":"/user/username/projects/myproject/src/helpers/functions.ts","start":{"line":1,"offset":14},"end":{"line":1,"offset":17},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":22},"lineText":"export const foo = 1;","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/indirect1/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":28},"lineText":"import { foo } from 'main';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/indirect1/main.ts","start":{"line":2,"offset":1},"end":{"line":2,"offset":4},"lineText":"foo;","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/myproject/indirect2/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":28},"lineText":"import { foo } from 'main';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/indirect2/main.ts","start":{"line":2,"offset":1},"end":{"line":2,"offset":4},"lineText":"foo;","isWriteAccess":false,"isDefinition":false}],"symbolName":"foo","symbolStartOffset":10,"symbolDisplayString":"(alias) const foo: 1\nexport foo"},"responseRequired":true}
Info 227  [16:06:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 228  [16:06:54.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 228  [16:06:55.000] 	Files (0)

Info 228  [16:06:56.000] -----------------------------------------------
Info 228  [16:06:57.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 228  [16:06:58.000] 	Files (3)

Info 228  [16:06:59.000] -----------------------------------------------
Info 228  [16:07:00.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 228  [16:07:01.000] 	Files (4)

Info 228  [16:07:02.000] -----------------------------------------------
Info 228  [16:07:03.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 228  [16:07:04.000] 	Files (4)

Info 228  [16:07:05.000] -----------------------------------------------
Info 228  [16:07:06.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 228  [16:07:07.000] 	Files (2)

Info 228  [16:07:08.000] -----------------------------------------------
Info 228  [16:07:09.000] Open files: 
Info 228  [16:07:10.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 228  [16:07:11.000] 		Projects: /dev/null/inferredProject1*
Info 228  [16:07:12.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 229  [16:07:13.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 229  [16:07:14.000] 	Files (0)

Info 229  [16:07:15.000] -----------------------------------------------
Info 229  [16:07:16.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 229  [16:07:17.000] 	Files (3)

Info 229  [16:07:18.000] -----------------------------------------------
Info 229  [16:07:19.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 229  [16:07:20.000] 	Files (4)

Info 229  [16:07:21.000] -----------------------------------------------
Info 229  [16:07:22.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 229  [16:07:23.000] 	Files (4)

Info 229  [16:07:24.000] -----------------------------------------------
Info 229  [16:07:25.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 229  [16:07:26.000] 	Files (2)

Info 229  [16:07:27.000] -----------------------------------------------
Info 229  [16:07:28.000] Open files: 
Info 229  [16:07:29.000] Search path: /user/username/projects/myproject/indirect3
Info 230  [16:07:30.000] For info: /user/username/projects/myproject/indirect3/main.ts :: Config file name: /user/username/projects/myproject/indirect3/tsconfig.json
Info 231  [16:07:31.000] Creating configuration project /user/username/projects/myproject/indirect3/tsconfig.json
Info 232  [16:07:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Config file
Info 233  [16:07:33.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/indirect3/main.ts to open"}}
Info 234  [16:07:34.000] Config: /user/username/projects/myproject/indirect3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect3/main.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/target/src",
  "configFilePath": "/user/username/projects/myproject/indirect3/tsconfig.json"
 }
}
Info 235  [16:07:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 236  [16:07:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 237  [16:07:37.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 238  [16:07:38.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json
Info 239  [16:07:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts 500 undefined WatchType: Closed Script info
Info 240  [16:07:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 241  [16:07:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 242  [16:07:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 243  [16:07:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 244  [16:07:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 245  [16:07:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 246  [16:07:46.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 247  [16:07:47.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 248  [16:07:48.000] 	Files (4)
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

Info 249  [16:07:49.000] -----------------------------------------------
Info 250  [16:07:50.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json"}}
Info 251  [16:07:51.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5b0817f69b6871821661b976aa73f4f2533b37c5f4b920541094c2d727d0dc39","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":57,"tsx":0,"tsxSize":0,"dts":3,"dtsSize":494,"deferred":0,"deferredSize":0},"compilerOptions":{"baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 252  [16:07:52.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/indirect3/main.ts","configFile":"/user/username/projects/myproject/indirect3/tsconfig.json","diagnostics":[]}}
Info 253  [16:07:53.000] `remove Project::
Info 254  [16:07:54.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 255  [16:07:55.000] 	Files (0)



Info 256  [16:07:56.000] -----------------------------------------------
Info 257  [16:07:57.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 258  [16:07:58.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 259  [16:07:59.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 260  [16:08:00.000] `remove Project::
Info 261  [16:08:01.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 262  [16:08:02.000] 	Files (3)
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

Info 263  [16:08:03.000] -----------------------------------------------
Info 264  [16:08:04.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 265  [16:08:05.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 266  [16:08:06.000] `remove Project::
Info 267  [16:08:07.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 268  [16:08:08.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Part of 'files' list in tsconfig.json

Info 269  [16:08:09.000] -----------------------------------------------
Info 270  [16:08:10.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 271  [16:08:11.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 272  [16:08:12.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 273  [16:08:13.000] `remove Project::
Info 274  [16:08:14.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 275  [16:08:15.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect2/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect2/main.ts'
	indirect2/main.ts
	  Part of 'files' list in tsconfig.json

Info 276  [16:08:16.000] -----------------------------------------------
Info 277  [16:08:17.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 278  [16:08:18.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 279  [16:08:19.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 280  [16:08:20.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 281  [16:08:21.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 282  [16:08:22.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 283  [16:08:23.000] `remove Project::
Info 284  [16:08:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 285  [16:08:25.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 286  [16:08:26.000] -----------------------------------------------
Info 287  [16:08:27.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 288  [16:08:28.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 289  [16:08:29.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 290  [16:08:30.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 291  [16:08:31.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 292  [16:08:32.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/indirect2/main.ts 500 undefined WatchType: Closed Script info
Info 293  [16:08:33.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 293  [16:08:34.000] 	Files (4)

Info 293  [16:08:35.000] -----------------------------------------------
Info 293  [16:08:36.000] Open files: 
Info 293  [16:08:37.000] 	FileName: /user/username/projects/myproject/indirect3/main.ts ProjectRootPath: undefined
Info 293  [16:08:38.000] 		Projects: /user/username/projects/myproject/indirect3/tsconfig.json
Info 293  [16:08:39.000] request:{"command":"references","arguments":{"file":"/user/username/projects/myproject/indirect3/main.ts","line":1,"offset":10},"seq":3,"type":"request"}

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

Info 294  [16:08:40.000] Finding references to /user/username/projects/myproject/indirect3/main.ts position 9 in project /user/username/projects/myproject/indirect3/tsconfig.json
Info 295  [16:08:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts.map 500 undefined WatchType: Closed Script info
Info 296  [16:08:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 297  [16:08:43.000] Search path: /user/username/projects/myproject/src
Info 298  [16:08:44.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 299  [16:08:45.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 300  [16:08:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 301  [16:08:47.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 302  [16:08:48.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  },
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect2.json",
   "originalPath": "./tsconfig-indirect2.json"
  }
 ]
}
Info 303  [16:08:49.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 304  [16:08:50.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 305  [16:08:51.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 306  [16:08:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 307  [16:08:53.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 308  [16:08:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 309  [16:08:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 310  [16:08:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 311  [16:08:57.000] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect2/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect2.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 312  [16:08:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 313  [16:08:59.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 314  [16:09:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 315  [16:09:01.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 316  [16:09:02.000] Different program with same set of files
Info 317  [16:09:03.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 318  [16:09:04.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 319  [16:09:05.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 320  [16:09:06.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 321  [16:09:07.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 322  [16:09:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 323  [16:09:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 324  [16:09:10.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 325  [16:09:11.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 326  [16:09:12.000] 	Files (3)
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

Info 327  [16:09:13.000] -----------------------------------------------
Info 328  [16:09:14.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 329  [16:09:15.000] Search path: /user/username/projects/myproject/src
Info 330  [16:09:16.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 331  [16:09:17.000] Search path: /user/username/projects/myproject/src
Info 332  [16:09:18.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 333  [16:09:19.000] Search path: /user/username/projects/myproject/src/helpers
Info 334  [16:09:20.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 335  [16:09:21.000] Search path: /user/username/projects/myproject/src/helpers
Info 336  [16:09:22.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 337  [16:09:23.000] Finding references to /user/username/projects/myproject/src/main.ts position 9 in project /user/username/projects/myproject/tsconfig-src.json
Info 338  [16:09:24.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect1.json
Info 339  [16:09:25.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json","reason":"Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"}}
Info 340  [16:09:26.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 341  [16:09:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 342  [16:09:28.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json
Info 343  [16:09:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 344  [16:09:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 345  [16:09:31.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 346  [16:09:32.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 347  [16:09:33.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Part of 'files' list in tsconfig.json

Info 348  [16:09:34.000] -----------------------------------------------
Info 349  [16:09:35.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json"}}
Info 350  [16:09:36.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect2.json
Info 351  [16:09:37.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect2.json","reason":"Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"}}
Info 352  [16:09:38.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 353  [16:09:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect2/main.ts 500 undefined WatchType: Closed Script info
Info 354  [16:09:40.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json
Info 355  [16:09:41.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 356  [16:09:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 357  [16:09:43.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 358  [16:09:44.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 359  [16:09:45.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect2/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect2/main.ts'
	indirect2/main.ts
	  Part of 'files' list in tsconfig.json

Info 360  [16:09:46.000] -----------------------------------------------
Info 361  [16:09:47.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect2.json"}}
Info 362  [16:09:48.000] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect1.json
Info 363  [16:09:49.000] Search path: /user/username/projects/myproject/src/helpers
Info 364  [16:09:50.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 365  [16:09:51.000] Search path: /user/username/projects/myproject/src/helpers
Info 366  [16:09:52.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 367  [16:09:53.000] Search path: /user/username/projects/myproject/src
Info 368  [16:09:54.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 369  [16:09:55.000] Search path: /user/username/projects/myproject/src
Info 370  [16:09:56.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 371  [16:09:57.000] Search path: /user/username/projects/myproject/src
Info 372  [16:09:58.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 373  [16:09:59.000] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect2.json
Info 374  [16:10:00.000] Search path: /user/username/projects/myproject/src/helpers
Info 375  [16:10:01.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 376  [16:10:02.000] Search path: /user/username/projects/myproject/src/helpers
Info 377  [16:10:03.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 378  [16:10:04.000] Search path: /user/username/projects/myproject/src
Info 379  [16:10:05.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 380  [16:10:06.000] Search path: /user/username/projects/myproject/src
Info 381  [16:10:07.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 382  [16:10:08.000] Search path: /user/username/projects/myproject/src
Info 383  [16:10:09.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json

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
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/indirect1/main.ts:
  {}
/user/username/projects/myproject/indirect2/main.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/indirect3:
  {}
/user/username/projects/myproject/target:
  {}
/user/username/projects/myproject/src:
  {}

Info 384  [16:10:10.000] response:{"response":{"refs":[{"file":"/user/username/projects/myproject/indirect3/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":28},"lineText":"import { foo } from 'main';","isWriteAccess":true,"isDefinition":true},{"file":"/user/username/projects/myproject/indirect3/main.ts","start":{"line":2,"offset":1},"end":{"line":2,"offset":4},"lineText":"foo;","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/myproject/src/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":41},"lineText":"import { foo } from 'helpers/functions';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/src/main.ts","start":{"line":2,"offset":10},"end":{"line":2,"offset":13},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":16},"lineText":"export { foo };","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/src/helpers/functions.ts","start":{"line":1,"offset":14},"end":{"line":1,"offset":17},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":22},"lineText":"export const foo = 1;","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/indirect1/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":28},"lineText":"import { foo } from 'main';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/indirect1/main.ts","start":{"line":2,"offset":1},"end":{"line":2,"offset":4},"lineText":"foo;","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/myproject/indirect2/main.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":13},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":28},"lineText":"import { foo } from 'main';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/myproject/indirect2/main.ts","start":{"line":2,"offset":1},"end":{"line":2,"offset":4},"lineText":"foo;","isWriteAccess":false,"isDefinition":false}],"symbolName":"foo","symbolStartOffset":10,"symbolDisplayString":"(alias) const foo: 1\nimport foo"},"responseRequired":true}