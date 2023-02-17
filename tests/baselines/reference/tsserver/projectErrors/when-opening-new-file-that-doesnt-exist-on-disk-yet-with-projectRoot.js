TI:: Creating typing installer
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


TI:: [00:00:25.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:26.000] Processing cache location '/a/data/'
TI:: [00:00:27.000] Trying to find '/a/data/package.json'...
TI:: [00:00:28.000] Finished processing cache location '/a/data/'
TI:: [00:00:29.000] Npm config file: /a/data/package.json
TI:: [00:00:30.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:35.000] Updating types-registry npm package...
TI:: [00:00:36.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:43.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


Info 0    [00:00:44.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:45.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "untitled:Untitled-1",
        "fileContent": "/// <reference path=\"../../../../../../typings/@epic/Core.d.ts\" />\n/// <reference path=\"./src/somefile.d.ts\" />",
        "scriptKindName": "TS",
        "projectRootPath": "/user/someuser/projects/someFolder"
      },
      "seq": 1,
      "type": "request"
    }
Before request

Info 2    [00:00:46.000] Search path: 
Info 3    [00:00:47.000] For info: untitled:Untitled-1 :: No config files found.
Info 4    [00:00:48.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:49.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:50.000] FileWatcher:: Added:: WatchInfo: /typings/@epic/core.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:51.000] FileWatcher:: Added:: WatchInfo: /user/someuser/projects/somefolder/src/somefile.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 8    [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/someFolder/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/someFolder/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 10   [00:00:54.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 11   [00:00:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:56.000] 	Files (2)
	/a/lib/lib.d.ts
	untitled:Untitled-1


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	untitled:Untitled-1
	  Root file specified for compilation

Info 13   [00:00:57.000] -----------------------------------------------
Info 14   [00:00:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:59.000] 	Files (2)

Info 14   [00:01:00.000] -----------------------------------------------
Info 14   [00:01:01.000] Open files: 
Info 14   [00:01:02.000] 	FileName: untitled:Untitled-1 ProjectRootPath: /user/someuser/projects/someFolder
Info 14   [00:01:03.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/typings/@epic/core.d.ts: *new*
  {"pollingInterval":500}
/user/someuser/projects/somefolder/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/someuser/projects/somefolder/src/somefile.d.ts: *new*
  {}

Info 14   [00:01:04.000] response:
    {
      "responseRequired": false
    }

ScriptInfos:
path: /user/someuser/projects/somefolder/untitled:untitled-1 fileName: untitled:Untitled-1
path: /a/lib/lib.d.ts fileName: /a/lib/lib.d.ts

Checking timeout queue length: 0

Info 15   [00:01:05.000] request:
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
Before request

After request

Info 16   [00:01:06.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

Info 17   [00:01:07.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"untitled:Untitled-1","diagnostics":[]}}
After checking timeout queue length (1) and running

Before running immediate callbacks and checking length (1)

Info 18   [00:01:08.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"untitled:Untitled-1","diagnostics":[{"start":{"line":1,"offset":22},"end":{"line":1,"offset":63},"text":"File '../../../../../../typings/@epic/Core.d.ts' not found.","code":6053,"category":"error"},{"start":{"line":2,"offset":22},"end":{"line":2,"offset":41},"text":"File 'src/somefile.d.ts' not found.","code":6053,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

Before running immediate callbacks and checking length (1)

Info 19   [00:01:09.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"untitled:Untitled-1","diagnostics":[]}}
Info 20   [00:01:10.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)
