currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:22.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/user/username/projects/myproject/ui.ts]
const x = async (_action: string) => {
};

//// [/user/username/projects/myproject/tsconfig.json]
{}


Info 1    [00:00:23.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/ui.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:24.000] Search path: /user/username/projects/myproject
Info 3    [00:00:25.000] For info: /user/username/projects/myproject/ui.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:26.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:28.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/ui.ts to open"}}
Info 7    [00:00:29.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/ui.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 8    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:32.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 11   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:36.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:37.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 16   [00:00:38.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/ui.ts SVC-1-0 "const x = async (_action: string) => {\n};"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	ui.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:39.000] -----------------------------------------------
Info 18   [00:00:40.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/tsconfig.json"}}
Info 19   [00:00:41.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":41,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 20   [00:00:42.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/ui.ts","configFile":"/user/username/projects/myproject/tsconfig.json","diagnostics":[]}}
Info 21   [00:00:43.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 21   [00:00:44.000] 	Files (2)

Info 21   [00:00:45.000] -----------------------------------------------
Info 21   [00:00:46.000] Open files: 
Info 21   [00:00:47.000] 	FileName: /user/username/projects/myproject/ui.ts ProjectRootPath: undefined
Info 21   [00:00:48.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 21   [00:00:49.000] response:
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
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Before request

Info 22   [00:00:50.000] request:
    {
      "command": "geterrForProject",
      "arguments": {
        "delay": 0,
        "file": "/user/username/projects/myproject/ui.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 23   [00:00:51.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 24   [00:00:52.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/ui.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 25   [00:00:53.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/ui.ts","diagnostics":[{"start":{"line":1,"offset":11},"end":{"line":1,"offset":39},"text":"An async function or method must return a 'Promise'. Make sure you have a declaration for 'Promise' or include 'ES2015' in your '--lib' option.","code":2697,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 26   [00:00:54.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/ui.ts","diagnostics":[]}}
Info 27   [00:00:55.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)
