Info 0    [00:00:43.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/user/username/projects/myproject/packages/emit-composite/tsconfig.json]
{"compilerOptions":{"composite":true,"allowJs":true,"emitDeclarationOnly":true,"outDir":"lib","rootDir":"src"},"include":["src"]}

//// [/user/username/projects/myproject/packages/emit-composite/package.json]
{"name":"emit-composite","version":"1.0.0","main":"src/index.js","typings":"lib/index.d.ts"}

//// [/user/username/projects/myproject/packages/emit-composite/src/index.js]
const testModule = require('./testModule');
module.exports = {
    ...testModule
}

//// [/user/username/projects/myproject/packages/emit-composite/src/testModule.js]
/**
 * @param {string} arg
 */
 const testCompositeFunction = (arg) => {
}
module.exports = {
    testCompositeFunction
}

//// [/user/username/projects/myproject/packages/consumer/tsconfig.json]
{"include":["src"],"references":[{"path":"../emit-composite"}]}

//// [/user/username/projects/myproject/packages/consumer/src/index.ts]
import { testCompositeFunction } from 'emit-composite';
testCompositeFunction('why hello there');
testCompositeFunction('why hello there', 42);

//// [/user/username/projects/myproject/node_modules/emit-composite] symlink(/user/username/projects/myproject/packages/emit-composite)

Info 1    [00:00:44.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/packages/consumer/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:45.000] Search path: /user/username/projects/myproject/packages/consumer/src
Info 3    [00:00:46.000] For info: /user/username/projects/myproject/packages/consumer/src/index.ts :: Config file name: /user/username/projects/myproject/packages/consumer/tsconfig.json
Info 4    [00:00:47.000] Creating configuration project /user/username/projects/myproject/packages/consumer/tsconfig.json
Info 5    [00:00:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Config file
Info 6    [00:00:49.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/user/username/projects/myproject/packages/consumer/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/myproject/packages/consumer/src/index.ts to open"}}
Info 7    [00:00:50.000] Config: /user/username/projects/myproject/packages/consumer/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/consumer/src/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/packages/consumer/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/packages/emit-composite",
   "originalPath": "../emit-composite"
  }
 ]
}
Info 8    [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/src 1 undefined Config: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/src 1 undefined Config: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:53.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/consumer/tsconfig.json
Info 11   [00:00:54.000] Config: /user/username/projects/myproject/packages/emit-composite/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/emit-composite/src/index.js",
  "/user/username/projects/myproject/packages/emit-composite/src/testModule.js"
 ],
 "options": {
  "composite": true,
  "allowJs": true,
  "emitDeclarationOnly": true,
  "outDir": "/user/username/projects/myproject/packages/emit-composite/lib",
  "rootDir": "/user/username/projects/myproject/packages/emit-composite/src",
  "configFilePath": "/user/username/projects/myproject/packages/emit-composite/tsconfig.json"
 }
}
Info 12   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Config file
Info 13   [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/src 1 undefined Config: /user/username/projects/myproject/packages/emit-composite/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/src 1 undefined Config: /user/username/projects/myproject/packages/emit-composite/tsconfig.json WatchType: Wild card directory
Info 15   [00:00:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/src/index.js 500 undefined WatchType: Closed Script info
Info 16   [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/src/testModule.js 500 undefined WatchType: Closed Script info
Info 19   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 20   [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/src 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:01:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/src 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 22   [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 23   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 24   [00:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 25   [00:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 26   [00:01:09.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info 28   [00:01:11.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/package.json 2000 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: File location affecting resolution
Info 29   [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info 30   [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info 31   [00:01:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info 32   [00:01:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info 33   [00:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info 34   [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info 35   [00:01:18.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/consumer/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [00:01:19.000] Project '/user/username/projects/myproject/packages/consumer/tsconfig.json' (Configured)
Info 37   [00:01:20.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/packages/emit-composite/src/testModule.js Text-1 "/**\n * @param {string} arg\n */\n const testCompositeFunction = (arg) => {\n}\nmodule.exports = {\n    testCompositeFunction\n}"
	/user/username/projects/myproject/packages/emit-composite/src/index.js Text-1 "const testModule = require('./testModule');\nmodule.exports = {\n    ...testModule\n}"
	/user/username/projects/myproject/packages/consumer/src/index.ts SVC-1-0 "import { testCompositeFunction } from 'emit-composite';\ntestCompositeFunction('why hello there');\ntestCompositeFunction('why hello there', 42);"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../emit-composite/src/testModule.js
	  Imported via './testModule' from file '../emit-composite/src/index.js'
	../emit-composite/src/index.js
	  Imported via 'emit-composite' from file 'src/index.ts' with packageId 'emit-composite/lib/index.d.ts@1.0.0'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info 38   [00:01:21.000] -----------------------------------------------
Info 39   [00:01:22.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/user/username/projects/myproject/packages/consumer/tsconfig.json"}}
Info 40   [00:01:23.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"f6f890b868ee990140855d3b392e7be25cc511c224e307bfaf73c9f27a024a79","fileStats":{"js":2,"jsSize":203,"jsx":0,"jsxSize":0,"ts":1,"tsSize":143,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":true,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 41   [00:01:24.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/user/username/projects/myproject/packages/consumer/src/index.ts","configFile":"/user/username/projects/myproject/packages/consumer/tsconfig.json","diagnostics":[]}}
Info 42   [00:01:25.000] Project '/user/username/projects/myproject/packages/consumer/tsconfig.json' (Configured)
Info 42   [00:01:26.000] 	Files (4)

Info 42   [00:01:27.000] -----------------------------------------------
Info 42   [00:01:28.000] Open files: 
Info 42   [00:01:29.000] 	FileName: /user/username/projects/myproject/packages/consumer/src/index.ts ProjectRootPath: undefined
Info 42   [00:01:30.000] 		Projects: /user/username/projects/myproject/packages/consumer/tsconfig.json
Info 42   [00:01:31.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/packages/consumer/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/consumer/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/packages/consumer/tsconfig.json: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/tsconfig.json: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/src/index.js: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/src/testModule.js: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/package.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/packages/consumer/src: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/src: *new*
  {}
/user/username/projects/myproject/packages/emit-composite: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}

Before request

Info 43   [00:01:32.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/packages/consumer/src/index.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info 44   [00:01:33.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 45   [00:01:34.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/packages/consumer/src/index.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 46   [00:01:35.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/packages/consumer/src/index.ts","diagnostics":[{"start":{"line":3,"offset":42},"end":{"line":3,"offset":44},"text":"Expected 1 arguments, but got 2.","code":2554,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 47   [00:01:36.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/packages/consumer/src/index.ts","diagnostics":[]}}
Info 48   [00:01:37.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)
