Info 0    [00:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/src/somefile.d.ts]
class c { }

//// [/user/someuser/projects/someFolder/src/somefile.d.ts]
class c { }


Info 1    [00:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "untitled:Untitled-1",
        "fileContent": "/// <reference path=\"../../../../../../typings/@epic/Core.d.ts\" />\n/// <reference path=\"./src/somefile.d.ts\" />",
        "scriptKindName": "TS"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:27.000] Search path: 
Info 3    [00:00:28.000] For info: untitled:Untitled-1 :: No config files found.
Info 4    [00:00:29.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /typings/@epic/core.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /src/somefile.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 8    [00:00:33.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:35.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	untitled:Untitled-1 SVC-1-0 "/// <reference path=\"../../../../../../typings/@epic/Core.d.ts\" />\n/// <reference path=\"./src/somefile.d.ts\" />"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	untitled:Untitled-1
	  Root file specified for compilation

Info 11   [00:00:36.000] -----------------------------------------------
Info 12   [00:00:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:38.000] 	Files (2)

Info 12   [00:00:39.000] -----------------------------------------------
Info 12   [00:00:40.000] Open files: 
Info 12   [00:00:41.000] 	FileName: untitled:Untitled-1 ProjectRootPath: undefined
Info 12   [00:00:42.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:00:43.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/typings/@epic/core.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/src/somefile.d.ts: *new*
  {}


ScriptInfos:
path: /untitled:untitled-1 fileName: untitled:Untitled-1
path: /a/lib/lib.d.ts fileName: /a/lib/lib.d.ts

Checking timeout queue length: 0

Before request

Info 13   [00:00:44.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "untitled:Untitled-1"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:45.000] response:
    {
      "responseRequired": false
    }
After request

Before checking timeout queue length (1) and running

Info 15   [00:00:46.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"untitled:Untitled-1","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 16   [00:00:47.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"untitled:Untitled-1","diagnostics":[{"start":{"line":1,"offset":22},"end":{"line":1,"offset":63},"text":"File '../../../../../../typings/@epic/Core.d.ts' not found.","code":6053,"category":"error"},{"start":{"line":2,"offset":22},"end":{"line":2,"offset":41},"text":"File 'src/somefile.d.ts' not found.","code":6053,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 17   [00:00:48.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"untitled:Untitled-1","diagnostics":[]}}
Info 18   [00:00:49.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)
