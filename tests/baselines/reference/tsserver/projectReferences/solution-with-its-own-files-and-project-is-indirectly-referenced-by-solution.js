Info 0    [16:01:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:01:10.000] Search path: /user/username/projects/myproject/src
Info 2    [16:01:11.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [16:01:12.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [16:01:13.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [16:01:14.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 6    [16:01:15.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/indirect1",
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
Info 7    [16:01:16.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [16:01:17.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 9    [16:01:18.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 10   [16:01:19.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
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
Info 11   [16:01:20.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 12   [16:01:21.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 13   [16:01:22.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 14   [16:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 15   [16:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 16   [16:01:25.000] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
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
Info 17   [16:01:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 18   [16:01:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 19   [16:01:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 20   [16:01:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 21   [16:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 22   [16:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 23   [16:01:32.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [16:01:33.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 25   [16:01:34.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 26   [16:01:35.000] -----------------------------------------------
Info 27   [16:01:36.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 28   [16:01:37.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":4,"tsSize":166,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 29   [16:01:38.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 30   [16:01:39.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 31   [16:01:40.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 32   [16:01:41.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 33   [16:01:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 34   [16:01:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 35   [16:01:44.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [16:01:45.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 37   [16:01:46.000] 	Files (3)
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

Info 38   [16:01:47.000] -----------------------------------------------
Info 39   [16:01:48.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 40   [16:01:49.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"75d5ba36c0a162a329bf40235b10e96d2d129b95469e1f02c08da775fb38a2b4","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":77,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 41   [16:01:50.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 42   [16:01:51.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 42   [16:01:52.000] 	Files (5)

Info 42   [16:01:53.000] -----------------------------------------------
Info 42   [16:01:54.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 42   [16:01:55.000] 	Files (3)

Info 42   [16:01:56.000] -----------------------------------------------
Info 42   [16:01:57.000] Open files: 
Info 42   [16:01:58.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 42   [16:01:59.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 42   [16:02:00.000] getDefaultProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Info 42   [16:02:01.000] findDefaultConfiguredProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Info 42   [16:02:02.000] request:
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
//// [/user/username/projects/myproject/tsconfig-src.json]
{"compilerOptions":{"composite":true,"outDir":"./target/","baseUrl":"./src/"},"include":["./src/**/*"]}

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"outDir":"./target/","baseUrl":"./indirect1/"},"references":[{"path":"./tsconfig-indirect1.json"},{"path":"./tsconfig-indirect2.json"}],"files":["./own/main.ts"]}

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

//// [/user/username/projects/myproject/own/main.ts]
import { bar } from 'main';
bar;


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/indirect1/main.ts:
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
/user/username/projects/myproject/own/main.ts:
  {}
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/indirect1/main.ts:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 43   [16:02:03.000] response:
    {
      "responseRequired": false
    }
Info 44   [16:02:04.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 45   [16:02:05.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 46   [16:02:06.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 47   [16:02:07.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Info 48   [16:02:08.000] Search path: /dummy
Info 49   [16:02:09.000] For info: /dummy/dummy.ts :: No config files found.
Info 50   [16:02:10.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 51   [16:02:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 52   [16:02:12.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 53   [16:02:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 54   [16:02:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 55   [16:02:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 56   [16:02:16.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 57   [16:02:17.000] -----------------------------------------------
Info 58   [16:02:18.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 58   [16:02:19.000] 	Files (5)

Info 58   [16:02:20.000] -----------------------------------------------
Info 58   [16:02:21.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 58   [16:02:22.000] 	Files (3)

Info 58   [16:02:23.000] -----------------------------------------------
Info 58   [16:02:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 58   [16:02:25.000] 	Files (2)

Info 58   [16:02:26.000] -----------------------------------------------
Info 58   [16:02:27.000] Open files: 
Info 58   [16:02:28.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 58   [16:02:29.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 58   [16:02:30.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 58   [16:02:31.000] 		Projects: /dev/null/inferredProject1*
Info 58   [16:02:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 59   [16:02:33.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 59   [16:02:34.000] 	Files (5)

Info 59   [16:02:35.000] -----------------------------------------------
Info 59   [16:02:36.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 59   [16:02:37.000] 	Files (3)

Info 59   [16:02:38.000] -----------------------------------------------
Info 59   [16:02:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 59   [16:02:40.000] 	Files (2)

Info 59   [16:02:41.000] -----------------------------------------------
Info 59   [16:02:42.000] Open files: 
Info 59   [16:02:43.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 59   [16:02:44.000] 		Projects: /dev/null/inferredProject1*
Info 59   [16:02:45.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 60   [16:02:46.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 60   [16:02:47.000] 	Files (5)

Info 60   [16:02:48.000] -----------------------------------------------
Info 60   [16:02:49.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 60   [16:02:50.000] 	Files (3)

Info 60   [16:02:51.000] -----------------------------------------------
Info 60   [16:02:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 60   [16:02:53.000] 	Files (2)

Info 60   [16:02:54.000] -----------------------------------------------
Info 60   [16:02:55.000] Open files: 
Info 60   [16:02:56.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 61   [16:02:57.000] Search path: /dummy
Info 62   [16:02:58.000] For info: /dummy/dummy.ts :: No config files found.
Info 63   [16:02:59.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 64   [16:03:00.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 65   [16:03:01.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 66   [16:03:02.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 67   [16:03:03.000] -----------------------------------------------
Info 68   [16:03:04.000] `remove Project::
Info 69   [16:03:05.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 70   [16:03:06.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 71   [16:03:07.000] -----------------------------------------------
Info 72   [16:03:08.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 73   [16:03:09.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 74   [16:03:10.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 75   [16:03:11.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 76   [16:03:12.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 77   [16:03:13.000] `remove Project::
Info 78   [16:03:14.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 79   [16:03:15.000] 	Files (3)
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

Info 80   [16:03:16.000] -----------------------------------------------
Info 81   [16:03:17.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 82   [16:03:18.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 83   [16:03:19.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 84   [16:03:20.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 85   [16:03:21.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 86   [16:03:22.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 87   [16:03:23.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 88   [16:03:24.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 89   [16:03:25.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 90   [16:03:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 90   [16:03:27.000] 	Files (2)

Info 90   [16:03:28.000] -----------------------------------------------
Info 90   [16:03:29.000] Open files: 
Info 90   [16:03:30.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 90   [16:03:31.000] 		Projects: /dev/null/inferredProject1*
Info 90   [16:03:32.000] Search path: /user/username/projects/myproject/src
Info 91   [16:03:33.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 92   [16:03:34.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 93   [16:03:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 94   [16:03:36.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 95   [16:03:37.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/indirect1",
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
Info 96   [16:03:38.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 97   [16:03:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 98   [16:03:40.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 99   [16:03:41.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
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
Info 100  [16:03:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 101  [16:03:43.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 102  [16:03:44.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 103  [16:03:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 104  [16:03:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 105  [16:03:47.000] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
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
Info 106  [16:03:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 107  [16:03:49.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 108  [16:03:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 109  [16:03:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 110  [16:03:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 111  [16:03:53.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 112  [16:03:54.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 113  [16:03:55.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 114  [16:03:56.000] -----------------------------------------------
Info 115  [16:03:57.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 116  [16:03:58.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 117  [16:03:59.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 118  [16:04:00.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 119  [16:04:01.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 120  [16:04:02.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 121  [16:04:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 122  [16:04:04.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 123  [16:04:05.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 124  [16:04:06.000] 	Files (3)
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

Info 125  [16:04:07.000] -----------------------------------------------
Info 126  [16:04:08.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 127  [16:04:09.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 128  [16:04:10.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 128  [16:04:11.000] 	Files (5)

Info 128  [16:04:12.000] -----------------------------------------------
Info 128  [16:04:13.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 128  [16:04:14.000] 	Files (3)

Info 128  [16:04:15.000] -----------------------------------------------
Info 128  [16:04:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 128  [16:04:17.000] 	Files (2)

Info 128  [16:04:18.000] -----------------------------------------------
Info 128  [16:04:19.000] Open files: 
Info 128  [16:04:20.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 128  [16:04:21.000] 		Projects: /dev/null/inferredProject1*
Info 128  [16:04:22.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 128  [16:04:23.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 128  [16:04:24.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 129  [16:04:25.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 129  [16:04:26.000] 	Files (5)

Info 129  [16:04:27.000] -----------------------------------------------
Info 129  [16:04:28.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 129  [16:04:29.000] 	Files (3)

Info 129  [16:04:30.000] -----------------------------------------------
Info 129  [16:04:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 129  [16:04:32.000] 	Files (2)

Info 129  [16:04:33.000] -----------------------------------------------
Info 129  [16:04:34.000] Open files: 
Info 129  [16:04:35.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 129  [16:04:36.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 129  [16:04:37.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 130  [16:04:38.000] Search path: /dummy
Info 131  [16:04:39.000] For info: /dummy/dummy.ts :: No config files found.
Info 132  [16:04:40.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 133  [16:04:41.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 134  [16:04:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 135  [16:04:43.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 136  [16:04:44.000] -----------------------------------------------
Info 137  [16:04:45.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 137  [16:04:46.000] 	Files (5)

Info 137  [16:04:47.000] -----------------------------------------------
Info 137  [16:04:48.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 137  [16:04:49.000] 	Files (3)

Info 137  [16:04:50.000] -----------------------------------------------
Info 137  [16:04:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 137  [16:04:52.000] 	Files (2)

Info 137  [16:04:53.000] -----------------------------------------------
Info 137  [16:04:54.000] Open files: 
Info 137  [16:04:55.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 137  [16:04:56.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 137  [16:04:57.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 137  [16:04:58.000] 		Projects: /dev/null/inferredProject1*
Info 137  [16:04:59.000] reload projects.
Info 138  [16:05:00.000] Scheduled: /dev/null/inferredProject1*
Info 139  [16:05:01.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 140  [16:05:02.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json
Info 141  [16:05:03.000] Scheduled: *ensureProjectForOpenFiles*
Info 142  [16:05:04.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 143  [16:05:05.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 144  [16:05:06.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 145  [16:05:07.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 146  [16:05:08.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 147  [16:05:09.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json, Cancelled earlier one
Info 148  [16:05:10.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 149  [16:05:11.000] Search path: /user/username/projects/myproject/src
Info 150  [16:05:12.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 151  [16:05:13.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 152  [16:05:14.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 153  [16:05:15.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 154  [16:05:16.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"User requested reload projects"}}
Info 155  [16:05:17.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/indirect1",
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
Info 156  [16:05:18.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 157  [16:05:19.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 158  [16:05:20.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
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
Info 159  [16:05:21.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 160  [16:05:22.000] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
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
Info 161  [16:05:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 162  [16:05:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 163  [16:05:25.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 164  [16:05:26.000] Different program with same set of files
Info 165  [16:05:27.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 166  [16:05:28.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig.json","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 167  [16:05:29.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 168  [16:05:30.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 169  [16:05:31.000] Reloading configured project /user/username/projects/myproject/tsconfig-src.json
Info 170  [16:05:32.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"User requested reload projects"}}
Info 171  [16:05:33.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 172  [16:05:34.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 173  [16:05:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 174  [16:05:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 175  [16:05:37.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 176  [16:05:38.000] Different program with same set of files
Info 177  [16:05:39.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 178  [16:05:40.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig-src.json","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 179  [16:05:41.000] Search path: /dummy
Info 180  [16:05:42.000] For info: /dummy/dummy.ts :: No config files found.
Info 181  [16:05:43.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 182  [16:05:44.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 183  [16:05:45.000] Before ensureProjectForOpenFiles:
Info 184  [16:05:46.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 184  [16:05:47.000] 	Files (5)

Info 184  [16:05:48.000] -----------------------------------------------
Info 184  [16:05:49.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 184  [16:05:50.000] 	Files (3)

Info 184  [16:05:51.000] -----------------------------------------------
Info 184  [16:05:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 184  [16:05:53.000] 	Files (2)

Info 184  [16:05:54.000] -----------------------------------------------
Info 184  [16:05:55.000] Open files: 
Info 184  [16:05:56.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 184  [16:05:57.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 184  [16:05:58.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 184  [16:05:59.000] 		Projects: /dev/null/inferredProject1*
Info 184  [16:06:00.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 185  [16:06:01.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 186  [16:06:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 187  [16:06:03.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 188  [16:06:04.000] Different program with same set of files
Info 189  [16:06:05.000] After ensureProjectForOpenFiles:
Info 190  [16:06:06.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 190  [16:06:07.000] 	Files (5)

Info 190  [16:06:08.000] -----------------------------------------------
Info 190  [16:06:09.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 190  [16:06:10.000] 	Files (3)

Info 190  [16:06:11.000] -----------------------------------------------
Info 190  [16:06:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 190  [16:06:13.000] 	Files (2)

Info 190  [16:06:14.000] -----------------------------------------------
Info 190  [16:06:15.000] Open files: 
Info 190  [16:06:16.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 190  [16:06:17.000] 		Projects: /user/username/projects/myproject/tsconfig.json,/user/username/projects/myproject/tsconfig-src.json
Info 190  [16:06:18.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 190  [16:06:19.000] 		Projects: /dev/null/inferredProject1*
Info 190  [16:06:20.000] request:
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
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/indirect1/main.ts:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 191  [16:06:21.000] Finding references to /user/username/projects/myproject/src/main.ts position 50 in project /user/username/projects/myproject/tsconfig-src.json
Info 192  [16:06:22.000] Finding references to /user/username/projects/myproject/src/main.ts position 50 in project /user/username/projects/myproject/tsconfig.json
Info 193  [16:06:23.000] Search path: /user/username/projects/myproject/src
Info 194  [16:06:24.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 195  [16:06:25.000] Search path: /user/username/projects/myproject/src
Info 196  [16:06:26.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 197  [16:06:27.000] Search path: /user/username/projects/myproject/src
Info 198  [16:06:28.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 199  [16:06:29.000] Search path: /user/username/projects/myproject/src/helpers
Info 200  [16:06:30.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 201  [16:06:31.000] Search path: /user/username/projects/myproject/src/helpers
Info 202  [16:06:32.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 203  [16:06:33.000] Search path: /user/username/projects/myproject/indirect1
Info 204  [16:06:34.000] For info: /user/username/projects/myproject/indirect1/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 205  [16:06:35.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect1.json
Info 206  [16:06:36.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for original file: /user/username/projects/myproject/indirect1/main.ts"}}
Info 207  [16:06:37.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 208  [16:06:38.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json
Info 209  [16:06:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 210  [16:06:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 211  [16:06:41.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 212  [16:06:42.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 213  [16:06:43.000] 	Files (4)
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

Info 214  [16:06:44.000] -----------------------------------------------
Info 215  [16:06:45.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json"}}
Info 216  [16:06:46.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"9ccc3aed1af08832ccb25ea453f7b771199f56af238b53cc428549dbd2d59246","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":134,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 217  [16:06:47.000] Search path: /user/username/projects/myproject/indirect1
Info 218  [16:06:48.000] For info: /user/username/projects/myproject/indirect1/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 219  [16:06:49.000] Search path: /user/username/projects/myproject/indirect1
Info 220  [16:06:50.000] For info: /user/username/projects/myproject/indirect1/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 221  [16:06:51.000] Finding references to /user/username/projects/myproject/indirect1/main.ts position 9 in project /user/username/projects/myproject/tsconfig-indirect1.json
Info 222  [16:06:52.000] Search path: /user/username/projects/myproject/src
Info 223  [16:06:53.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 224  [16:06:54.000] Search path: /user/username/projects/myproject/src
Info 225  [16:06:55.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 226  [16:06:56.000] Search path: /user/username/projects/myproject/src
Info 227  [16:06:57.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 228  [16:06:58.000] Search path: /user/username/projects/myproject/src/helpers
Info 229  [16:06:59.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 230  [16:07:00.000] Search path: /user/username/projects/myproject/src/helpers
Info 231  [16:07:01.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 232  [16:07:02.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect2.json
Info 233  [16:07:03.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect2.json","reason":"Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"}}
Info 234  [16:07:04.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 235  [16:07:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect2/main.ts 500 undefined WatchType: Closed Script info
Info 236  [16:07:06.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json
Info 237  [16:07:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 238  [16:07:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 239  [16:07:09.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 240  [16:07:10.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 241  [16:07:11.000] 	Files (4)
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

Info 242  [16:07:12.000] -----------------------------------------------
Info 243  [16:07:13.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect2.json"}}
Info 244  [16:07:14.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"d9a040bddd6b85b85abd507a988a4b809b1515b5e61257ea3f8263da59589565","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":3,"tsSize":134,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 245  [16:07:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts 500 undefined WatchType: Closed Script info
Info 246  [16:07:16.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts.map 500 undefined WatchType: Closed Script info
Info 247  [16:07:17.000] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect2.json
Info 248  [16:07:18.000] Search path: /user/username/projects/myproject/src/helpers
Info 249  [16:07:19.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 250  [16:07:20.000] Search path: /user/username/projects/myproject/src/helpers
Info 251  [16:07:21.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 252  [16:07:22.000] Search path: /user/username/projects/myproject/src
Info 253  [16:07:23.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 254  [16:07:24.000] Search path: /user/username/projects/myproject/src
Info 255  [16:07:25.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 256  [16:07:26.000] Search path: /user/username/projects/myproject/src
Info 257  [16:07:27.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json

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
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/indirect1/main.ts:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
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

Info 258  [16:07:28.000] response:
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
            "file": "/user/username/projects/myproject/indirect1/main.ts",
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
            "file": "/user/username/projects/myproject/indirect1/main.ts",
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
            "file": "/user/username/projects/myproject/indirect2/main.ts",
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
            "file": "/user/username/projects/myproject/indirect2/main.ts",
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
Info 259  [16:07:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 260  [16:07:30.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 260  [16:07:31.000] 	Files (5)

Info 260  [16:07:32.000] -----------------------------------------------
Info 260  [16:07:33.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 260  [16:07:34.000] 	Files (3)

Info 260  [16:07:35.000] -----------------------------------------------
Info 260  [16:07:36.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 260  [16:07:37.000] 	Files (4)

Info 260  [16:07:38.000] -----------------------------------------------
Info 260  [16:07:39.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 260  [16:07:40.000] 	Files (4)

Info 260  [16:07:41.000] -----------------------------------------------
Info 260  [16:07:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 260  [16:07:43.000] 	Files (2)

Info 260  [16:07:44.000] -----------------------------------------------
Info 260  [16:07:45.000] Open files: 
Info 260  [16:07:46.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 260  [16:07:47.000] 		Projects: /dev/null/inferredProject1*
Info 260  [16:07:48.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 261  [16:07:49.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 261  [16:07:50.000] 	Files (5)

Info 261  [16:07:51.000] -----------------------------------------------
Info 261  [16:07:52.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 261  [16:07:53.000] 	Files (3)

Info 261  [16:07:54.000] -----------------------------------------------
Info 261  [16:07:55.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 261  [16:07:56.000] 	Files (4)

Info 261  [16:07:57.000] -----------------------------------------------
Info 261  [16:07:58.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 261  [16:07:59.000] 	Files (4)

Info 261  [16:08:00.000] -----------------------------------------------
Info 261  [16:08:01.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 261  [16:08:02.000] 	Files (2)

Info 261  [16:08:03.000] -----------------------------------------------
Info 261  [16:08:04.000] Open files: 
Info 261  [16:08:05.000] Search path: /user/username/projects/myproject/indirect3
Info 262  [16:08:06.000] For info: /user/username/projects/myproject/indirect3/main.ts :: Config file name: /user/username/projects/myproject/indirect3/tsconfig.json
Info 263  [16:08:07.000] Creating configuration project /user/username/projects/myproject/indirect3/tsconfig.json
Info 264  [16:08:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Config file
Info 265  [16:08:09.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/indirect3/main.ts to open"}}
Info 266  [16:08:10.000] Config: /user/username/projects/myproject/indirect3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect3/main.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/target/src",
  "configFilePath": "/user/username/projects/myproject/indirect3/tsconfig.json"
 }
}
Info 267  [16:08:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 268  [16:08:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 269  [16:08:13.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 270  [16:08:14.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json
Info 271  [16:08:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts 500 undefined WatchType: Closed Script info
Info 272  [16:08:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 273  [16:08:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 274  [16:08:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 275  [16:08:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 276  [16:08:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 277  [16:08:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 278  [16:08:22.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 279  [16:08:23.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 280  [16:08:24.000] 	Files (4)
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

Info 281  [16:08:25.000] -----------------------------------------------
Info 282  [16:08:26.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json"}}
Info 283  [16:08:27.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5b0817f69b6871821661b976aa73f4f2533b37c5f4b920541094c2d727d0dc39","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":57,"tsx":0,"tsxSize":0,"dts":3,"dtsSize":494,"deferred":0,"deferredSize":0},"compilerOptions":{"baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 284  [16:08:28.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/indirect3/main.ts","configFile":"/user/username/projects/myproject/indirect3/tsconfig.json","diagnostics":[]}}
Info 285  [16:08:29.000] `remove Project::
Info 286  [16:08:30.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 287  [16:08:31.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 288  [16:08:32.000] -----------------------------------------------
Info 289  [16:08:33.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 290  [16:08:34.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 291  [16:08:35.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 292  [16:08:36.000] `remove Project::
Info 293  [16:08:37.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 294  [16:08:38.000] 	Files (3)
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

Info 295  [16:08:39.000] -----------------------------------------------
Info 296  [16:08:40.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 297  [16:08:41.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 298  [16:08:42.000] `remove Project::
Info 299  [16:08:43.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 300  [16:08:44.000] 	Files (4)
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

Info 301  [16:08:45.000] -----------------------------------------------
Info 302  [16:08:46.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 303  [16:08:47.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 304  [16:08:48.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 305  [16:08:49.000] `remove Project::
Info 306  [16:08:50.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 307  [16:08:51.000] 	Files (4)
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

Info 308  [16:08:52.000] -----------------------------------------------
Info 309  [16:08:53.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 310  [16:08:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 311  [16:08:55.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 312  [16:08:56.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 313  [16:08:57.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 314  [16:08:58.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 315  [16:08:59.000] `remove Project::
Info 316  [16:09:00.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 317  [16:09:01.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 318  [16:09:02.000] -----------------------------------------------
Info 319  [16:09:03.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 320  [16:09:04.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 321  [16:09:05.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 322  [16:09:06.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 323  [16:09:07.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 324  [16:09:08.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 325  [16:09:09.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/indirect2/main.ts 500 undefined WatchType: Closed Script info
Info 326  [16:09:10.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 326  [16:09:11.000] 	Files (4)

Info 326  [16:09:12.000] -----------------------------------------------
Info 326  [16:09:13.000] Open files: 
Info 326  [16:09:14.000] 	FileName: /user/username/projects/myproject/indirect3/main.ts ProjectRootPath: undefined
Info 326  [16:09:15.000] 		Projects: /user/username/projects/myproject/indirect3/tsconfig.json
Info 326  [16:09:16.000] request:
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

Info 327  [16:09:17.000] Finding references to /user/username/projects/myproject/indirect3/main.ts position 9 in project /user/username/projects/myproject/indirect3/tsconfig.json
Info 328  [16:09:18.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts.map 500 undefined WatchType: Closed Script info
Info 329  [16:09:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 330  [16:09:20.000] Search path: /user/username/projects/myproject/src
Info 331  [16:09:21.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 332  [16:09:22.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 333  [16:09:23.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 334  [16:09:24.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 335  [16:09:25.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/own/main.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/indirect1",
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
Info 336  [16:09:26.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 337  [16:09:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/own/main.ts 500 undefined WatchType: Closed Script info
Info 338  [16:09:28.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 339  [16:09:29.000] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
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
Info 340  [16:09:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 341  [16:09:31.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 342  [16:09:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 343  [16:09:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 344  [16:09:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 345  [16:09:35.000] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
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
Info 346  [16:09:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 347  [16:09:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info 348  [16:09:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 349  [16:09:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 350  [16:09:40.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 351  [16:09:41.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 352  [16:09:42.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts
	/user/username/projects/myproject/own/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Imported via 'main' from file 'own/main.ts'
	own/main.ts
	  Part of 'files' list in tsconfig.json

Info 353  [16:09:43.000] -----------------------------------------------
Info 354  [16:09:44.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 355  [16:09:45.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 356  [16:09:46.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 357  [16:09:47.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 358  [16:09:48.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 359  [16:09:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 360  [16:09:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 361  [16:09:51.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 362  [16:09:52.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 363  [16:09:53.000] 	Files (3)
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

Info 364  [16:09:54.000] -----------------------------------------------
Info 365  [16:09:55.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 366  [16:09:56.000] Search path: /user/username/projects/myproject/src
Info 367  [16:09:57.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 368  [16:09:58.000] Search path: /user/username/projects/myproject/src
Info 369  [16:09:59.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 370  [16:10:00.000] Search path: /user/username/projects/myproject/src/helpers
Info 371  [16:10:01.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 372  [16:10:02.000] Search path: /user/username/projects/myproject/src/helpers
Info 373  [16:10:03.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 374  [16:10:04.000] Finding references to /user/username/projects/myproject/src/main.ts position 9 in project /user/username/projects/myproject/tsconfig.json
Info 375  [16:10:05.000] Search path: /user/username/projects/myproject/src
Info 376  [16:10:06.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 377  [16:10:07.000] Search path: /user/username/projects/myproject/src
Info 378  [16:10:08.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 379  [16:10:09.000] Search path: /user/username/projects/myproject/src
Info 380  [16:10:10.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 381  [16:10:11.000] Search path: /user/username/projects/myproject/src/helpers
Info 382  [16:10:12.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 383  [16:10:13.000] Search path: /user/username/projects/myproject/src/helpers
Info 384  [16:10:14.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 385  [16:10:15.000] Search path: /user/username/projects/myproject/indirect1
Info 386  [16:10:16.000] For info: /user/username/projects/myproject/indirect1/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 387  [16:10:17.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect1.json
Info 388  [16:10:18.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for original file: /user/username/projects/myproject/indirect1/main.ts"}}
Info 389  [16:10:19.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 390  [16:10:20.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json
Info 391  [16:10:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 392  [16:10:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info 393  [16:10:23.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 394  [16:10:24.000] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info 395  [16:10:25.000] 	Files (4)
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

Info 396  [16:10:26.000] -----------------------------------------------
Info 397  [16:10:27.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect1.json"}}
Info 398  [16:10:28.000] Search path: /user/username/projects/myproject/indirect1
Info 399  [16:10:29.000] For info: /user/username/projects/myproject/indirect1/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 400  [16:10:30.000] Search path: /user/username/projects/myproject/indirect1
Info 401  [16:10:31.000] For info: /user/username/projects/myproject/indirect1/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 402  [16:10:32.000] Finding references to /user/username/projects/myproject/src/main.ts position 9 in project /user/username/projects/myproject/tsconfig-src.json
Info 403  [16:10:33.000] Finding references to /user/username/projects/myproject/indirect1/main.ts position 9 in project /user/username/projects/myproject/tsconfig-indirect1.json
Info 404  [16:10:34.000] Search path: /user/username/projects/myproject/src
Info 405  [16:10:35.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 406  [16:10:36.000] Search path: /user/username/projects/myproject/src
Info 407  [16:10:37.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 408  [16:10:38.000] Search path: /user/username/projects/myproject/src
Info 409  [16:10:39.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 410  [16:10:40.000] Search path: /user/username/projects/myproject/src/helpers
Info 411  [16:10:41.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 412  [16:10:42.000] Search path: /user/username/projects/myproject/src/helpers
Info 413  [16:10:43.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 414  [16:10:44.000] Creating configuration project /user/username/projects/myproject/tsconfig-indirect2.json
Info 415  [16:10:45.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect2.json","reason":"Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"}}
Info 416  [16:10:46.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 417  [16:10:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect2/main.ts 500 undefined WatchType: Closed Script info
Info 418  [16:10:48.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json
Info 419  [16:10:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 420  [16:10:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info 421  [16:10:51.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 422  [16:10:52.000] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info 423  [16:10:53.000] 	Files (4)
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

Info 424  [16:10:54.000] -----------------------------------------------
Info 425  [16:10:55.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-indirect2.json"}}
Info 426  [16:10:56.000] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect2.json
Info 427  [16:10:57.000] Search path: /user/username/projects/myproject/src/helpers
Info 428  [16:10:58.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 429  [16:10:59.000] Search path: /user/username/projects/myproject/src/helpers
Info 430  [16:11:00.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 431  [16:11:01.000] Search path: /user/username/projects/myproject/src
Info 432  [16:11:02.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 433  [16:11:03.000] Search path: /user/username/projects/myproject/src
Info 434  [16:11:04.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 435  [16:11:05.000] Search path: /user/username/projects/myproject/src
Info 436  [16:11:06.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json

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

Info 437  [16:11:07.000] response:
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
            "file": "/user/username/projects/myproject/indirect1/main.ts",
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
            "file": "/user/username/projects/myproject/indirect1/main.ts",
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
            "file": "/user/username/projects/myproject/indirect2/main.ts",
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
            "file": "/user/username/projects/myproject/indirect2/main.ts",
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