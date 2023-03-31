currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:53.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:54.000] Search path: /user/username/projects/myproject/src
Info 2    [00:00:55.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:00:56.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:58.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 6    [00:00:59.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 7    [00:01:00.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 8    [00:01:01.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 9    [00:01:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 10   [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 11   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 12   [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:01:07.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:01:08.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 16   [00:01:09.000] 	Files (0)

Info 17   [00:01:10.000] -----------------------------------------------
Info 18   [00:01:11.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 19   [00:01:12.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":0,"tsSize":0,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 20   [00:01:13.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 21   [00:01:14.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 22   [00:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 23   [00:01:16.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 24   [00:01:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 25   [00:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 26   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 27   [00:01:20.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:01:21.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 29   [00:01:22.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-1 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-1-0 "import { foo } from 'helpers/functions';\nexport { foo };"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 30   [00:01:23.000] -----------------------------------------------
Info 31   [00:01:24.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 32   [00:01:25.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"75d5ba36c0a162a329bf40235b10e96d2d129b95469e1f02c08da775fb38a2b4","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":77,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"composite":true,"outDir":"","baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"other","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 33   [00:01:26.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 34   [00:01:27.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 34   [00:01:28.000] 	Files (0)

Info 34   [00:01:29.000] -----------------------------------------------
Info 34   [00:01:30.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 34   [00:01:31.000] 	Files (3)

Info 34   [00:01:32.000] -----------------------------------------------
Info 34   [00:01:33.000] Open files: 
Info 34   [00:01:34.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 34   [00:01:35.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 34   [00:01:36.000] getDefaultProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Info 34   [00:01:37.000] findDefaultConfiguredProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Before request
//// [/user/username/projects/myproject/tsconfig-src.json]
{"compilerOptions":{"composite":true,"outDir":"./target/","baseUrl":"./src/"},"include":["./src/**/*"]}

//// [/user/username/projects/myproject/tsconfig.json]
{"references":[{"path":"./tsconfig-src.json"}],"files":[]}

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


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig-src.json: *new*
  {}
/user/username/projects/myproject/src/helpers/functions.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src: *new*
  {}

Info 34   [00:01:38.000] request:
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
Info 35   [00:01:39.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
1: checkOne

Info 36   [00:01:40.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
1: semanticCheck

Info 37   [00:01:41.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
After running Immedidate callback:: count: 1
2: suggestionCheck

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info 38   [00:01:42.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/main.ts","diagnostics":[]}}
Info 39   [00:01:43.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
After running Immedidate callback:: count: 0

Info 40   [00:01:44.000] Search path: /dummy
Info 41   [00:01:45.000] For info: /dummy/dummy.ts :: No config files found.
Info 42   [00:01:46.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 43   [00:01:47.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 44   [00:01:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 45   [00:01:49.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 46   [00:01:50.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 47   [00:01:51.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/dummy/dummy.ts SVC-1-0 "let a = 10;"


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 48   [00:01:52.000] -----------------------------------------------
Info 49   [00:01:53.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 49   [00:01:54.000] 	Files (0)

Info 49   [00:01:55.000] -----------------------------------------------
Info 49   [00:01:56.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 49   [00:01:57.000] 	Files (3)

Info 49   [00:01:58.000] -----------------------------------------------
Info 49   [00:01:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 49   [00:02:00.000] 	Files (2)

Info 49   [00:02:01.000] -----------------------------------------------
Info 49   [00:02:02.000] Open files: 
Info 49   [00:02:03.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 49   [00:02:04.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 49   [00:02:05.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 49   [00:02:06.000] 		Projects: /dev/null/inferredProject1*
Info 49   [00:02:07.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 50   [00:02:08.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 50   [00:02:09.000] 	Files (0)

Info 50   [00:02:10.000] -----------------------------------------------
Info 50   [00:02:11.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 50   [00:02:12.000] 	Files (3)

Info 50   [00:02:13.000] -----------------------------------------------
Info 50   [00:02:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 50   [00:02:15.000] 	Files (2)

Info 50   [00:02:16.000] -----------------------------------------------
Info 50   [00:02:17.000] Open files: 
Info 50   [00:02:18.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 50   [00:02:19.000] 		Projects: /dev/null/inferredProject1*
Info 50   [00:02:20.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 51   [00:02:21.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 51   [00:02:22.000] 	Files (0)

Info 51   [00:02:23.000] -----------------------------------------------
Info 51   [00:02:24.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 51   [00:02:25.000] 	Files (3)

Info 51   [00:02:26.000] -----------------------------------------------
Info 51   [00:02:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 51   [00:02:28.000] 	Files (2)

Info 51   [00:02:29.000] -----------------------------------------------
Info 51   [00:02:30.000] Open files: 
Info 51   [00:02:31.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 52   [00:02:32.000] Search path: /dummy
Info 53   [00:02:33.000] For info: /dummy/dummy.ts :: No config files found.
Info 54   [00:02:34.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 55   [00:02:35.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 56   [00:02:36.000] Same program as before
Info 57   [00:02:37.000] `remove Project::
Info 58   [00:02:38.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 59   [00:02:39.000] 	Files (0)



Info 60   [00:02:40.000] -----------------------------------------------
Info 61   [00:02:41.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 62   [00:02:42.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 63   [00:02:43.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 64   [00:02:44.000] `remove Project::
Info 65   [00:02:45.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 66   [00:02:46.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 67   [00:02:47.000] -----------------------------------------------
Info 68   [00:02:48.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 69   [00:02:49.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 70   [00:02:50.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 71   [00:02:51.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 72   [00:02:52.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 73   [00:02:53.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 74   [00:02:54.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 75   [00:02:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 75   [00:02:56.000] 	Files (2)

Info 75   [00:02:57.000] -----------------------------------------------
Info 75   [00:02:58.000] Open files: 
Info 75   [00:02:59.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 75   [00:03:00.000] 		Projects: /dev/null/inferredProject1*
Info 75   [00:03:01.000] Search path: /user/username/projects/myproject/src
Info 76   [00:03:02.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 77   [00:03:03.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 78   [00:03:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 79   [00:03:05.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 80   [00:03:06.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 81   [00:03:07.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 82   [00:03:08.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 83   [00:03:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 84   [00:03:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 85   [00:03:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 86   [00:03:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 87   [00:03:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 88   [00:03:14.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 89   [00:03:15.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 90   [00:03:16.000] 	Files (0)

Info 91   [00:03:17.000] -----------------------------------------------
Info 92   [00:03:18.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 93   [00:03:19.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 94   [00:03:20.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"}}
Info 95   [00:03:21.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info 96   [00:03:22.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 97   [00:03:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 98   [00:03:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 99   [00:03:25.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 100  [00:03:26.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 101  [00:03:27.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-2-0 "import { foo } from 'helpers/functions';\nexport { foo };"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 102  [00:03:28.000] -----------------------------------------------
Info 103  [00:03:29.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 104  [00:03:30.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/main.ts","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 105  [00:03:31.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 105  [00:03:32.000] 	Files (0)

Info 105  [00:03:33.000] -----------------------------------------------
Info 105  [00:03:34.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 105  [00:03:35.000] 	Files (3)

Info 105  [00:03:36.000] -----------------------------------------------
Info 105  [00:03:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 105  [00:03:38.000] 	Files (2)

Info 105  [00:03:39.000] -----------------------------------------------
Info 105  [00:03:40.000] Open files: 
Info 105  [00:03:41.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 105  [00:03:42.000] 		Projects: /dev/null/inferredProject1*
Info 105  [00:03:43.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 105  [00:03:44.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 105  [00:03:45.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 106  [00:03:46.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 106  [00:03:47.000] 	Files (0)

Info 106  [00:03:48.000] -----------------------------------------------
Info 106  [00:03:49.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 106  [00:03:50.000] 	Files (3)

Info 106  [00:03:51.000] -----------------------------------------------
Info 106  [00:03:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 106  [00:03:53.000] 	Files (2)

Info 106  [00:03:54.000] -----------------------------------------------
Info 106  [00:03:55.000] Open files: 
Info 106  [00:03:56.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 106  [00:03:57.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 106  [00:03:58.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 107  [00:03:59.000] Search path: /dummy
Info 108  [00:04:00.000] For info: /dummy/dummy.ts :: No config files found.
Info 109  [00:04:01.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 110  [00:04:02.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 111  [00:04:03.000] Same program as before
Info 112  [00:04:04.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 112  [00:04:05.000] 	Files (0)

Info 112  [00:04:06.000] -----------------------------------------------
Info 112  [00:04:07.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 112  [00:04:08.000] 	Files (3)

Info 112  [00:04:09.000] -----------------------------------------------
Info 112  [00:04:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 112  [00:04:11.000] 	Files (2)

Info 112  [00:04:12.000] -----------------------------------------------
Info 112  [00:04:13.000] Open files: 
Info 112  [00:04:14.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 112  [00:04:15.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 112  [00:04:16.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 112  [00:04:17.000] 		Projects: /dev/null/inferredProject1*
Info 112  [00:04:18.000] reload projects.
Info 113  [00:04:19.000] Scheduled: /dev/null/inferredProject1*
Info 114  [00:04:20.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json
Info 115  [00:04:21.000] Scheduled: *ensureProjectForOpenFiles*
Info 116  [00:04:22.000] Scheduled: /user/username/projects/myproject/tsconfig-src.json, Cancelled earlier one
Info 117  [00:04:23.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 118  [00:04:24.000] Search path: /user/username/projects/myproject/src
Info 119  [00:04:25.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 120  [00:04:26.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 121  [00:04:27.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 122  [00:04:28.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 123  [00:04:29.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"User requested reload projects"}}
Info 124  [00:04:30.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 125  [00:04:31.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 126  [00:04:32.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 127  [00:04:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 128  [00:04:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 129  [00:04:35.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 130  [00:04:36.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 131  [00:04:37.000] 	Files (0)

Info 132  [00:04:38.000] -----------------------------------------------
Info 133  [00:04:39.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 134  [00:04:40.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig.json","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 135  [00:04:41.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 136  [00:04:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 137  [00:04:43.000] Reloading configured project /user/username/projects/myproject/tsconfig-src.json
Info 138  [00:04:44.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"User requested reload projects"}}
Info 139  [00:04:45.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 140  [00:04:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 141  [00:04:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 142  [00:04:48.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 143  [00:04:49.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 144  [00:04:50.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-2-0 "import { foo } from 'helpers/functions';\nexport { foo };"

Info 145  [00:04:51.000] -----------------------------------------------
Info 146  [00:04:52.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 147  [00:04:53.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/tsconfig-src.json","configFile":"/user/username/projects/myproject/tsconfig-src.json","diagnostics":[]}}
Info 148  [00:04:54.000] Search path: /dummy
Info 149  [00:04:55.000] For info: /dummy/dummy.ts :: No config files found.
Info 150  [00:04:56.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 151  [00:04:57.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 152  [00:04:58.000] Before ensureProjectForOpenFiles:
Info 153  [00:04:59.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 153  [00:05:00.000] 	Files (0)

Info 153  [00:05:01.000] -----------------------------------------------
Info 153  [00:05:02.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 153  [00:05:03.000] 	Files (3)

Info 153  [00:05:04.000] -----------------------------------------------
Info 153  [00:05:05.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 153  [00:05:06.000] 	Files (2)

Info 153  [00:05:07.000] -----------------------------------------------
Info 153  [00:05:08.000] Open files: 
Info 153  [00:05:09.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 153  [00:05:10.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 153  [00:05:11.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 153  [00:05:12.000] 		Projects: /dev/null/inferredProject1*
Info 153  [00:05:13.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 154  [00:05:14.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 155  [00:05:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 156  [00:05:16.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 157  [00:05:17.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 158  [00:05:18.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/dummy/dummy.ts SVC-1-0 "let a = 10;"

Info 159  [00:05:19.000] -----------------------------------------------
Info 160  [00:05:20.000] After ensureProjectForOpenFiles:
Info 161  [00:05:21.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 161  [00:05:22.000] 	Files (0)

Info 161  [00:05:23.000] -----------------------------------------------
Info 161  [00:05:24.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 161  [00:05:25.000] 	Files (3)

Info 161  [00:05:26.000] -----------------------------------------------
Info 161  [00:05:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 161  [00:05:28.000] 	Files (2)

Info 161  [00:05:29.000] -----------------------------------------------
Info 161  [00:05:30.000] Open files: 
Info 161  [00:05:31.000] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info 161  [00:05:32.000] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info 161  [00:05:33.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 161  [00:05:34.000] 		Projects: /dev/null/inferredProject1*
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500} *new*
/dummy/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {} *new*
/user/username/projects/myproject/tsconfig-src.json:
  {} *new*
/user/username/projects/myproject/src/helpers/functions.ts:
  {} *new*

FsWatches *deleted*::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {} *new*

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/src:
  {}

Info 161  [00:05:35.000] request:
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
Info 162  [00:05:36.000] Finding references to /user/username/projects/myproject/src/main.ts position 50 in project /user/username/projects/myproject/tsconfig-src.json
Info 163  [00:05:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts 500 undefined WatchType: Closed Script info
Info 164  [00:05:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts.map 500 undefined WatchType: Closed Script info
Info 165  [00:05:39.000] response:
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
          }
        ],
        "symbolName": "foo",
        "symbolStartOffset": 10,
        "symbolDisplayString": "(alias) const foo: 1\nexport foo"
      },
      "responseRequired": true
    }
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
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts: *new*
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts.map: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 166  [00:05:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 167  [00:05:41.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 167  [00:05:42.000] 	Files (0)

Info 167  [00:05:43.000] -----------------------------------------------
Info 167  [00:05:44.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 167  [00:05:45.000] 	Files (3)

Info 167  [00:05:46.000] -----------------------------------------------
Info 167  [00:05:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 167  [00:05:48.000] 	Files (2)

Info 167  [00:05:49.000] -----------------------------------------------
Info 167  [00:05:50.000] Open files: 
Info 167  [00:05:51.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 167  [00:05:52.000] 		Projects: /dev/null/inferredProject1*
Info 167  [00:05:53.000] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 168  [00:05:54.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 168  [00:05:55.000] 	Files (0)

Info 168  [00:05:56.000] -----------------------------------------------
Info 168  [00:05:57.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 168  [00:05:58.000] 	Files (3)

Info 168  [00:05:59.000] -----------------------------------------------
Info 168  [00:06:00.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 168  [00:06:01.000] 	Files (2)

Info 168  [00:06:02.000] -----------------------------------------------
Info 168  [00:06:03.000] Open files: 
Info 168  [00:06:04.000] Search path: /user/username/projects/myproject/indirect3
Info 169  [00:06:05.000] For info: /user/username/projects/myproject/indirect3/main.ts :: Config file name: /user/username/projects/myproject/indirect3/tsconfig.json
Info 170  [00:06:06.000] Creating configuration project /user/username/projects/myproject/indirect3/tsconfig.json
Info 171  [00:06:07.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Config file
Info 172  [00:06:08.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/indirect3/main.ts to open"}}
Info 173  [00:06:09.000] Config: /user/username/projects/myproject/indirect3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect3/main.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/target/src",
  "configFilePath": "/user/username/projects/myproject/indirect3/tsconfig.json"
 }
}
Info 174  [00:06:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 175  [00:06:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info 176  [00:06:12.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json
Info 177  [00:06:13.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts 500 undefined WatchType: Closed Script info
Info 178  [00:06:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 179  [00:06:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info 180  [00:06:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 181  [00:06:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 182  [00:06:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 183  [00:06:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info 184  [00:06:20.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 185  [00:06:21.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 186  [00:06:22.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/target/src/helpers/functions.d.ts Text-1 "export declare const foo = 1;\n//# sourceMappingURL=functions.d.ts.map"
	/user/username/projects/myproject/target/src/main.d.ts Text-1 "import { foo } from 'helpers/functions';\nexport { foo };\n//# sourceMappingURL=main.d.ts.map"
	/user/username/projects/myproject/indirect3/main.ts SVC-1-0 "import { foo } from 'main';\nfoo;\nexport function bar() {}"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../target/src/helpers/functions.d.ts
	  Imported via 'helpers/functions' from file '../target/src/main.d.ts'
	../target/src/main.d.ts
	  Imported via 'main' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 187  [00:06:23.000] -----------------------------------------------
Info 188  [00:06:24.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/indirect3/tsconfig.json"}}
Info 189  [00:06:25.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5b0817f69b6871821661b976aa73f4f2533b37c5f4b920541094c2d727d0dc39","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":57,"tsx":0,"tsxSize":0,"dts":3,"dtsSize":494,"deferred":0,"deferredSize":0},"compilerOptions":{"baseUrl":""},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 190  [00:06:26.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/indirect3/main.ts","configFile":"/user/username/projects/myproject/indirect3/tsconfig.json","diagnostics":[]}}
Info 191  [00:06:27.000] `remove Project::
Info 192  [00:06:28.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 193  [00:06:29.000] 	Files (0)



Info 194  [00:06:30.000] -----------------------------------------------
Info 195  [00:06:31.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 196  [00:06:32.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 197  [00:06:33.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 198  [00:06:34.000] `remove Project::
Info 199  [00:06:35.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 200  [00:06:36.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 201  [00:06:37.000] -----------------------------------------------
Info 202  [00:06:38.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 203  [00:06:39.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 204  [00:06:40.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 205  [00:06:41.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 206  [00:06:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 207  [00:06:43.000] `remove Project::
Info 208  [00:06:44.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 209  [00:06:45.000] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info 210  [00:06:46.000] -----------------------------------------------
Info 211  [00:06:47.000] DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 212  [00:06:48.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 213  [00:06:49.000] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 214  [00:06:50.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 215  [00:06:51.000] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info 215  [00:06:52.000] 	Files (4)

Info 215  [00:06:53.000] -----------------------------------------------
Info 215  [00:06:54.000] Open files: 
Info 215  [00:06:55.000] 	FileName: /user/username/projects/myproject/indirect3/main.ts ProjectRootPath: undefined
Info 215  [00:06:56.000] 		Projects: /user/username/projects/myproject/indirect3/tsconfig.json
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/indirect3/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/dummy/node_modules/@types:
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
/user/username/projects/myproject/indirect3/tsconfig.json: *new*
  {}
/user/username/projects/myproject/target/src/main.d.ts: *new*
  {}

FsWatches *deleted*::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/indirect3: *new*
  {}
/user/username/projects/myproject/target: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/src:
  {}

Info 215  [00:06:57.000] request:
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
Info 216  [00:06:58.000] Finding references to /user/username/projects/myproject/indirect3/main.ts position 9 in project /user/username/projects/myproject/indirect3/tsconfig.json
Info 217  [00:06:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts.map 500 undefined WatchType: Closed Script info
Info 218  [00:07:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info 219  [00:07:01.000] Search path: /user/username/projects/myproject/src
Info 220  [00:07:02.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 221  [00:07:03.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 222  [00:07:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 223  [00:07:05.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 224  [00:07:06.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info 225  [00:07:07.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 226  [00:07:08.000] Config: /user/username/projects/myproject/tsconfig-src.json : {
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
Info 227  [00:07:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 228  [00:07:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 229  [00:07:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info 230  [00:07:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 231  [00:07:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 232  [00:07:14.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 233  [00:07:15.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 234  [00:07:16.000] 	Files (0)

Info 235  [00:07:17.000] -----------------------------------------------
Info 236  [00:07:18.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 237  [00:07:19.000] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info 238  [00:07:20.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json","reason":"Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"}}
Info 239  [00:07:21.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info 240  [00:07:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 241  [00:07:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info 242  [00:07:24.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 243  [00:07:25.000] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info 244  [00:07:26.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts Text-3 "import { foo } from 'helpers/functions';\nexport { foo };"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info 245  [00:07:27.000] -----------------------------------------------
Info 246  [00:07:28.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig-src.json"}}
Info 247  [00:07:29.000] Search path: /user/username/projects/myproject/src
Info 248  [00:07:30.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 249  [00:07:31.000] Search path: /user/username/projects/myproject/src
Info 250  [00:07:32.000] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 251  [00:07:33.000] Search path: /user/username/projects/myproject/src/helpers
Info 252  [00:07:34.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 253  [00:07:35.000] Search path: /user/username/projects/myproject/src/helpers
Info 254  [00:07:36.000] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 255  [00:07:37.000] Finding references to /user/username/projects/myproject/src/main.ts position 9 in project /user/username/projects/myproject/tsconfig-src.json
Info 256  [00:07:38.000] response:
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
          }
        ],
        "symbolName": "foo",
        "symbolStartOffset": 10,
        "symbolDisplayString": "(alias) const foo: 1\nimport foo"
      },
      "responseRequired": true
    }
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
/user/username/projects/myproject/target/src/main.d.ts.map: *new*
  {}
/user/username/projects/myproject/src/main.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig-src.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/indirect3:
  {}
/user/username/projects/myproject/target:
  {}
/user/username/projects/myproject/src: *new*
  {}
