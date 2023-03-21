Info 0    [00:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/src/file.ts]
export var y = 10;

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

//// [/user/username/projects/myproject/tsconfig.json]
{"files":["src/file.ts","src/large.js"],"compilerOptions":{"target":1,"allowJs":true}}

//// [/user/username/projects/myproject/src/large.js]
export var x = 10;


Info 1    [00:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/file.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:27.000] Search path: /user/username/projects/myproject/src
Info 3    [00:00:28.000] For info: /user/username/projects/myproject/src/file.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:29.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:31.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/src/file.ts to open"}}
Info 7    [00:00:32.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/file.ts",
  "/user/username/projects/myproject/src/large.js"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 8    [00:00:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/large.js 500 undefined WatchType: Closed Script info
Info 9    [00:00:34.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 10   [00:00:35.000] Skipped loading contents of large file /user/username/projects/myproject/src/large.js for info /user/username/projects/myproject/src/large.js: fileSize: 4194305
Info 11   [00:00:36.000] event:
    {"seq":0,"type":"event","event":"largeFileReferenced","body":{"file":"/user/username/projects/myproject/src/large.js","fileSize":4194305,"maxFileSize":4194304}}
Info 12   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [00:00:40.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:41.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:42.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/file.ts SVC-1-0 "export var y = 10;"
	/user/username/projects/myproject/src/large.js Text-1 ""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/file.ts
	  Part of 'files' list in tsconfig.json
	src/large.js
	  Part of 'files' list in tsconfig.json

Info 18   [00:00:43.000] -----------------------------------------------
Info 19   [00:00:44.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 20   [00:00:45.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":1,"jsSize":4194305,"jsx":0,"jsxSize":0,"ts":1,"tsSize":18,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{"allowJs":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":true,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 21   [00:00:46.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/src/file.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[{"text":"Cannot write file '/user/username/projects/myproject/src/large.js' because it would overwrite input file.","code":5055,"category":"error"},{"start":{"line":1,"offset":69},"end":{"line":1,"offset":70},"text":"Compiler option 'target' requires a value of type string.","code":5024,"category":"error","fileName":"/user/username/projects/myproject/tsconfig.json"}]}}
Info 22   [00:00:47.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 22   [00:00:48.000] 	Files (3)

Info 22   [00:00:49.000] -----------------------------------------------
Info 22   [00:00:50.000] Open files: 
Info 22   [00:00:51.000] 	FileName: /user/username/projects/myproject/src/file.ts ProjectRootPath: undefined
Info 22   [00:00:52.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 22   [00:00:53.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/src/large.js: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
