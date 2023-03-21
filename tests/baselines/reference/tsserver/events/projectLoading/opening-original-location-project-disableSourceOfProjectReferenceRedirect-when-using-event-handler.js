Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/user/username/projects/a/a.ts]
export class A { }

//// [/user/username/projects/a/tsconfig.json]
{}

//// [/user/username/projects/a/a.d.ts]
export declare class A {
}
//# sourceMappingURL=a.d.ts.map


//// [/user/username/projects/a/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["./a.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;CAAI"}

//// [/user/username/projects/b/b.ts]
import {A} from "../a/a"; new A();

//// [/user/username/projects/b/tsconfig.json]
{"compilerOptions":{"disableSourceOfProjectReferenceRedirect":true},"references":[{"path":"../a"}]}


Info 1    [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/b/b.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:33.000] Search path: /user/username/projects/b
Info 3    [00:00:34.000] For info: /user/username/projects/b/b.ts :: Config file name: /user/username/projects/b/tsconfig.json
Info 4    [00:00:35.000] Creating configuration project /user/username/projects/b/tsconfig.json
Info 5    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/b/tsconfig.json 2000 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Config file
Info 6    [00:00:37.000] event:
    {"seq":0,"type":"event","event":"CustomHandler::projectLoadingStart","body":{"project":"/user/username/projects/b/tsconfig.json","reason":"Creating possible configured project for /user/username/projects/b/b.ts to open"}}
Info 7    [00:00:38.000] Config: /user/username/projects/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/b/b.ts"
 ],
 "options": {
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/a",
   "originalPath": "../a"
  }
 ]
}
Info 8    [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/b 1 undefined Config: /user/username/projects/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/b 1 undefined Config: /user/username/projects/b/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:41.000] Starting updateGraphWorker: Project: /user/username/projects/b/tsconfig.json
Info 11   [00:00:42.000] Config: /user/username/projects/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/a/a.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/a/tsconfig.json"
 }
}
Info 12   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/tsconfig.json 2000 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Config file
Info 13   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a 1 undefined Config: /user/username/projects/a/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a 1 undefined Config: /user/username/projects/a/tsconfig.json WatchType: Wild card directory
Info 15   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/a.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/b/node_modules/@types 1 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Type roots
Info 18   [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/b/node_modules/@types 1 undefined Project: /user/username/projects/b/tsconfig.json WatchType: Type roots
Info 19   [00:00:50.000] Finishing updateGraphWorker: Project: /user/username/projects/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:00:51.000] Project '/user/username/projects/b/tsconfig.json' (Configured)
Info 21   [00:00:52.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/a/a.d.ts Text-1 "export declare class A {\n}\n//# sourceMappingURL=a.d.ts.map\n"
	/user/username/projects/b/b.ts SVC-1-0 "import {A} from \"../a/a\"; new A();"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../a/a.d.ts
	  Imported via "../a/a" from file 'b.ts'
	  File is output of project reference source '../a/a.ts'
	b.ts
	  Matched by default include pattern '**/*'

Info 22   [00:00:53.000] -----------------------------------------------
Info 23   [00:00:54.000] event:
    {"seq":0,"type":"event","event":"CustomHandler::projectLoadingFinish","body":{"project":"/user/username/projects/b/tsconfig.json"}}
Info 24   [00:00:55.000] event:
    {"seq":0,"type":"event","event":"CustomHandler::projectInfo","body":{"projectId":"20501ec57de369fa110ede8c3db8fe97460676d82a7b594783e32439eba20158","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":34,"tsx":0,"tsxSize":0,"dts":2,"dtsSize":393,"deferred":0,"deferredSize":0},"compilerOptions":{"disableSourceOfProjectReferenceRedirect":true},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}
Info 25   [00:00:56.000] event:
    {"seq":0,"type":"event","event":"CustomHandler::configFileDiag","body":{"configFileName":"/user/username/projects/b/tsconfig.json","diagnostics":[{"start":{"line":1,"offset":83},"end":{"line":1,"offset":98},"text":"Referenced project '/user/username/projects/a' must have setting \"composite\": true.","code":6306,"category":"error","fileName":"/user/username/projects/b/tsconfig.json"}],"triggerFile":"/user/username/projects/b/b.ts"}}
Info 26   [00:00:57.000] Project '/user/username/projects/b/tsconfig.json' (Configured)
Info 26   [00:00:58.000] 	Files (3)

Info 26   [00:00:59.000] -----------------------------------------------
Info 26   [00:01:00.000] Open files: 
Info 26   [00:01:01.000] 	FileName: /user/username/projects/b/b.ts ProjectRootPath: undefined
Info 26   [00:01:02.000] 		Projects: /user/username/projects/b/tsconfig.json
Info 26   [00:01:03.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/b/tsconfig.json: *new*
  {}
/user/username/projects/a/tsconfig.json: *new*
  {}
/user/username/projects/a/a.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/b: *new*
  {}
/user/username/projects/a: *new*
  {}

Before request

Info 27   [00:01:04.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/b/b.ts",
        "line": 1,
        "offset": 31
      },
      "seq": 2,
      "type": "request"
    }
Info 28   [00:01:05.000] Finding references to /user/username/projects/b/b.ts position 30 in project /user/username/projects/b/tsconfig.json
Info 29   [00:01:06.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/a.d.ts.map 500 undefined WatchType: Closed Script info
Info 30   [00:01:07.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/a/a.ts 500 undefined WatchType: Closed Script info
Info 31   [00:01:08.000] Search path: /user/username/projects/a
Info 32   [00:01:09.000] For info: /user/username/projects/a/a.ts :: Config file name: /user/username/projects/a/tsconfig.json
Info 33   [00:01:10.000] Creating configuration project /user/username/projects/a/tsconfig.json
Info 34   [00:01:11.000] event:
    {"seq":0,"type":"event","event":"CustomHandler::projectLoadingStart","body":{"project":"/user/username/projects/a/tsconfig.json","reason":"Creating project for original file: /user/username/projects/a/a.ts for location: /user/username/projects/a/a.d.ts"}}
Info 35   [00:01:12.000] Starting updateGraphWorker: Project: /user/username/projects/a/tsconfig.json
Info 36   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Type roots
Info 37   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /user/username/projects/a/tsconfig.json WatchType: Type roots
Info 38   [00:01:15.000] Finishing updateGraphWorker: Project: /user/username/projects/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 39   [00:01:16.000] Project '/user/username/projects/a/tsconfig.json' (Configured)
Info 40   [00:01:17.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/a/a.ts Text-1 "export class A { }"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'

Info 41   [00:01:18.000] -----------------------------------------------
Info 42   [00:01:19.000] event:
    {"seq":0,"type":"event","event":"CustomHandler::projectLoadingFinish","body":{"project":"/user/username/projects/a/tsconfig.json"}}
Info 43   [00:01:20.000] event:
    {"seq":0,"type":"event","event":"CustomHandler::projectInfo","body":{"projectId":"20a91f8dffe761e39e0ada0a62a3058faad15d4a8c135539aaccd61bb5497dea","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":1,"tsSize":18,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}
Info 44   [00:01:21.000] Search path: /user/username/projects/a
Info 45   [00:01:22.000] For info: /user/username/projects/a/a.ts :: Config file name: /user/username/projects/a/tsconfig.json
Info 46   [00:01:23.000] Finding references to /user/username/projects/a/a.ts position 13 in project /user/username/projects/a/tsconfig.json
Info 47   [00:01:24.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/b/b.ts",
            "start": {
              "line": 1,
              "offset": 9
            },
            "end": {
              "line": 1,
              "offset": 10
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 26
            },
            "lineText": "import {A} from \"../a/a\"; new A();",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/b/b.ts",
            "start": {
              "line": 1,
              "offset": 31
            },
            "end": {
              "line": 1,
              "offset": 32
            },
            "lineText": "import {A} from \"../a/a\"; new A();",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/a/a.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 15
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 19
            },
            "lineText": "export class A { }",
            "isWriteAccess": true
          }
        ],
        "symbolName": "A",
        "symbolStartOffset": 31,
        "symbolDisplayString": "(alias) new A(): A\nimport A"
      },
      "responseRequired": true
    }
After request

PolledWatches::
/user/username/projects/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/b/tsconfig.json:
  {}
/user/username/projects/a/tsconfig.json:
  {}
/user/username/projects/a/a.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/a/a.d.ts.map: *new*
  {}
/user/username/projects/a/a.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/b:
  {}
/user/username/projects/a:
  {}
