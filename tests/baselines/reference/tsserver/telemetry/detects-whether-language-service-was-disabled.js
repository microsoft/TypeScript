currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:07.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/jsconfig.json]
{}

//// [/a.js]



Info 1    [00:00:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:09.000] Search path: /
Info 3    [00:00:10.000] For info: /a.js :: Config file name: /jsconfig.json
Info 4    [00:00:11.000] Creating configuration project /jsconfig.json
Info 5    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /jsconfig.json 2000 undefined Project: /jsconfig.json WatchType: Config file
Info 6    [00:00:13.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/jsconfig.json","reason":"Creating possible configured project for /a.js to open"}}
Info 7    [00:00:14.000] Config: /jsconfig.json : {
 "rootNames": [
  "/a.js"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/jsconfig.json"
 }
}
Info 8    [00:00:15.000] Non TS file size exceeded limit (20971521). Largest files: /a.js:20971521
Info 9    [00:00:16.000] event:
    {"seq":0,"type":"event","event":"projectLanguageServiceState","body":{"projectName":"/jsconfig.json","languageServiceEnabled":false}}
Info 10   [00:00:17.000] Starting updateGraphWorker: Project: /jsconfig.json
Info 11   [00:00:18.000] Skipped loading contents of large file /a.js for info /a.js: fileSize: 20971521
Info 12   [00:00:19.000] event:
    {"seq":0,"type":"event","event":"largeFileReferenced","body":{"file":"/a.js","fileSize":20971521,"maxFileSize":4194304}}
Info 13   [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /jsconfig.json WatchType: Missing file
Info 14   [00:00:21.000] Finishing updateGraphWorker: Project: /jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:22.000] Project '/jsconfig.json' (Configured)
Info 16   [00:00:23.000] 	Files (1)
	/a.js SVC-1-0 ""


	a.js
	  Matched by default include pattern '**/*'

Info 17   [00:00:24.000] -----------------------------------------------
Info 18   [00:00:25.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/jsconfig.json"}}
Info 19   [00:00:26.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"d3f7418c3d4888d0a51e42716b5a330dab4da64c452eebe918c1e0e634d8ede1","fileStats":{"js":1,"jsSize":20971521,"jsx":0,"jsxSize":0,"ts":0,"tsSize":0,"tsx":0,"tsxSize":0,"dts":0,"dtsSize":0,"deferred":0,"deferredSize":0},"compilerOptions":{"allowJs":true,"maxNodeModuleJsDepth":2,"allowSyntheticDefaultImports":true,"skipLibCheck":true,"noEmit":true},"typeAcquisition":{"enable":true,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"jsconfig.json","projectType":"configured","languageServiceEnabled":false,"version":"FakeVersion"}}}
Info 20   [00:00:27.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/a.js","configFile":"/jsconfig.json","diagnostics":[{"text":"File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'","code":6053,"category":"error"},{"text":"Cannot find global type 'Array'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Boolean'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Function'.","code":2318,"category":"error"},{"text":"Cannot find global type 'IArguments'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Number'.","code":2318,"category":"error"},{"text":"Cannot find global type 'Object'.","code":2318,"category":"error"},{"text":"Cannot find global type 'RegExp'.","code":2318,"category":"error"},{"text":"Cannot find global type 'String'.","code":2318,"category":"error"}]}}
Info 21   [00:00:28.000] Project '/jsconfig.json' (Configured)
Info 21   [00:00:29.000] 	Files (1)

Info 21   [00:00:30.000] -----------------------------------------------
Info 21   [00:00:31.000] Open files: 
Info 21   [00:00:32.000] 	FileName: /a.js ProjectRootPath: undefined
Info 21   [00:00:33.000] 		Projects: /jsconfig.json
Info 21   [00:00:34.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/jsconfig.json: *new*
  {}
