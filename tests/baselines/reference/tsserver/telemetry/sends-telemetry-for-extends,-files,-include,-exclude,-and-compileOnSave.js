currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/hunter2/a.ts]


//// [/tsconfig.json]
{"compilerOptions":{},"extends":"hunter2.json","files":["hunter2/a.ts"],"include":["hunter2"],"exclude":["hunter2"],"compileOnSave":true}


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/hunter2/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /hunter2
Info 3    [00:00:12.000] For info: /hunter2/a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:13.000] Creating configuration project /tsconfig.json
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:15.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/tsconfig.json","reason":"Creating possible configured project for /hunter2/a.ts to open"}}
Info 7    [00:00:16.000] Config: /tsconfig.json : {
 "rootNames": [
  "/hunter2/a.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 8    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /hunter2 1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /hunter2 1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 10   [00:00:19.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 11   [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 12   [00:00:21.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:22.000] Project '/tsconfig.json' (Configured)
Info 14   [00:00:23.000] 	Files (1)
	/hunter2/a.ts SVC-1-0 ""


	hunter2/a.ts
	  Part of 'files' list in tsconfig.json

Info 15   [00:00:24.000] -----------------------------------------------
Info 16   [00:00:25.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/tsconfig.json"}}
Info 17   [00:00:26.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"aace87d7c1572ff43c6978074161b586788b4518c7a9d06c79c03e613b6ce5a3","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":0,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":true,"files":true,"include":true,"exclude":true,"compileOnSave":true,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 18   [00:00:27.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/hunter2/a.ts","configFile":"/tsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"},{"start":{"line":1,"offset":33},"end":{"line":1,"offset":47},"text":"File 'hunter2.json' not found.","code":6053,"category":"error","fileName":"/tsconfig.json"}]}}
Info 19   [00:00:28.000] Project '/tsconfig.json' (Configured)
Info 19   [00:00:29.000] 	Files (1)

Info 19   [00:00:30.000] -----------------------------------------------
Info 19   [00:00:31.000] Open files: 
Info 19   [00:00:32.000] 	FileName: /hunter2/a.ts ProjectRootPath: undefined
Info 19   [00:00:33.000] 		Projects: /tsconfig.json
Info 19   [00:00:34.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/hunter2: *new*
  {}
