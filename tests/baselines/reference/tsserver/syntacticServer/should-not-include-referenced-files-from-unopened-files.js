currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/a.ts]
///<reference path="b.ts"/>
///<reference path="/user/username/projects/myproject/node_modules/something/index.d.ts"/>
function fooA() { }

//// [/user/username/projects/myproject/b.ts]
///<reference path="./c.ts"/>
///<reference path="/user/username/projects/myproject/node_modules/something/index.d.ts"/>
function fooB() { }

//// [/user/username/projects/myproject/c.ts]
function fooC() { }

//// [/user/username/projects/myproject/node_modules/something/index.d.ts]
function something() {}

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
{}


Info 1    [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:33.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 3    [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: false Elapsed:: *ms
Info 4    [00:00:35.000] Same program as before
Info 5    [00:00:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 5    [00:00:37.000] 	Files (0) NoProgram

Info 5    [00:00:38.000] -----------------------------------------------
Info 5    [00:00:39.000] Open files: 
Info 5    [00:00:40.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 5    [00:00:41.000] 		Projects: /dev/null/inferredProject1*
Info 5    [00:00:42.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 6    [00:00:43.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 7    [00:00:44.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 8    [00:00:45.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false Elapsed:: *ms
Info 9    [00:00:46.000] Same program as before
Info 10   [00:00:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:48.000] 	Files (0) NoProgram

Info 10   [00:00:49.000] -----------------------------------------------
Info 10   [00:00:50.000] Open files: 
Info 10   [00:00:51.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 10   [00:00:52.000] 		Projects: /dev/null/inferredProject1*
Info 10   [00:00:53.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 10   [00:00:54.000] 		Projects: /dev/null/inferredProject1*
Info 10   [00:00:55.000] response:
    {
      "responseRequired": false
    }
After request

Info 11   [00:00:56.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 12   [00:00:57.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false Elapsed:: *ms
Info 13   [00:00:58.000] Same program as before
Before request

Info 14   [00:00:59.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 15   [00:01:00.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:01:01.000] 	Files (0) NoProgram

Info 15   [00:01:02.000] -----------------------------------------------
Info 15   [00:01:03.000] Open files: 
Info 15   [00:01:04.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 15   [00:01:05.000] 		Projects: /dev/null/inferredProject1*
Info 15   [00:01:06.000] response:
    {
      "responseRequired": false
    }
After request
