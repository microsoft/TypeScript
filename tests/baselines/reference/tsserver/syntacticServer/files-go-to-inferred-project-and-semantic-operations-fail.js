currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/a.ts]
import { y, cc } from "./b";
import { something } from "something";
class c { prop = "hello"; foo() { return this.prop; } }

//// [/user/username/projects/myproject/b.ts]
export { cc } from "./c";
import { something } from "something";
                export const y = 10;

//// [/user/username/projects/myproject/c.ts]
export const cc = 10;

//// [/user/username/projects/myproject/node_modules/something/index.d.ts]
export const something = 10;

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
      "command": "completionInfo",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 3,
        "offset": 47
      },
      "seq": 2,
      "type": "request"
    }
Info 7    [00:00:44.000] Request: completionInfo not allowed in LanguageServiceMode.Syntactic
Before request

Info 8    [00:00:45.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 1,
        "offset": 10
      },
      "seq": 3,
      "type": "request"
    }
Info 9    [00:00:46.000] Request: definitionAndBoundSpan not allowed in LanguageServiceMode.Syntactic
Before request

Info 10   [00:00:47.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 11   [00:00:48.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 12   [00:00:49.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false Elapsed:: *ms
Info 13   [00:00:50.000] Same program as before
Info 14   [00:00:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:52.000] 	Files (0) NoProgram

Info 14   [00:00:53.000] -----------------------------------------------
Info 14   [00:00:54.000] Open files: 
Info 14   [00:00:55.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 14   [00:00:56.000] 		Projects: /dev/null/inferredProject1*
Info 14   [00:00:57.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 14   [00:00:58.000] 		Projects: /dev/null/inferredProject1*
Info 14   [00:00:59.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 15   [00:01:00.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 3,
        "offset": 47
      },
      "seq": 5,
      "type": "request"
    }
Info 16   [00:01:01.000] Request: completionInfo not allowed in LanguageServiceMode.Syntactic
Before request

Info 17   [00:01:02.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 1,
        "offset": 10
      },
      "seq": 6,
      "type": "request"
    }
Info 18   [00:01:03.000] Request: definitionAndBoundSpan not allowed in LanguageServiceMode.Syntactic
Before request

Info 19   [00:01:04.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 1,
        "offset": 13
      },
      "seq": 7,
      "type": "request"
    }
Info 20   [00:01:05.000] Request: definitionAndBoundSpan not allowed in LanguageServiceMode.Syntactic
Before request

Info 21   [00:01:06.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/c.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info 22   [00:01:07.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 23   [00:01:08.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false Elapsed:: *ms
Info 24   [00:01:09.000] Same program as before
Info 25   [00:01:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:01:11.000] 	Files (0) NoProgram

Info 25   [00:01:12.000] -----------------------------------------------
Info 25   [00:01:13.000] Open files: 
Info 25   [00:01:14.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 25   [00:01:15.000] 		Projects: /dev/null/inferredProject1*
Info 25   [00:01:16.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 25   [00:01:17.000] 		Projects: /dev/null/inferredProject1*
Info 25   [00:01:18.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 25   [00:01:19.000] 		Projects: /dev/null/inferredProject1*
Info 25   [00:01:20.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 26   [00:01:21.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/node_modules/something/index.d.ts"
      },
      "seq": 9,
      "type": "request"
    }
Info 27   [00:01:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 28   [00:01:23.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: false Elapsed:: *ms
Info 29   [00:01:24.000] Same program as before
Info 30   [00:01:25.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:01:26.000] 	Files (0) NoProgram

Info 30   [00:01:27.000] -----------------------------------------------
Info 30   [00:01:28.000] Open files: 
Info 30   [00:01:29.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 30   [00:01:30.000] 		Projects: /dev/null/inferredProject1*
Info 30   [00:01:31.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 30   [00:01:32.000] 		Projects: /dev/null/inferredProject1*
Info 30   [00:01:33.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 30   [00:01:34.000] 		Projects: /dev/null/inferredProject1*
Info 30   [00:01:35.000] 	FileName: /user/username/projects/myproject/node_modules/something/index.d.ts ProjectRootPath: undefined
Info 30   [00:01:36.000] 		Projects: /dev/null/inferredProject1*
Info 30   [00:01:37.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 31   [00:01:38.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/c.ts"
      },
      "seq": 10,
      "type": "request"
    }
Info 32   [00:01:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:40.000] 	Files (0) NoProgram

Info 32   [00:01:41.000] -----------------------------------------------
Info 32   [00:01:42.000] Open files: 
Info 32   [00:01:43.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 32   [00:01:44.000] 		Projects: /dev/null/inferredProject1*
Info 32   [00:01:45.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 32   [00:01:46.000] 		Projects: /dev/null/inferredProject1*
Info 32   [00:01:47.000] 	FileName: /user/username/projects/myproject/node_modules/something/index.d.ts ProjectRootPath: undefined
Info 32   [00:01:48.000] 		Projects: /dev/null/inferredProject1*
Info 32   [00:01:49.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 33   [00:01:50.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      },
      "seq": 11,
      "type": "request"
    }
Info 34   [00:01:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [00:01:52.000] 	Files (0) NoProgram

Info 34   [00:01:53.000] -----------------------------------------------
Info 34   [00:01:54.000] Open files: 
Info 34   [00:01:55.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 34   [00:01:56.000] 		Projects: /dev/null/inferredProject1*
Info 34   [00:01:57.000] 	FileName: /user/username/projects/myproject/node_modules/something/index.d.ts ProjectRootPath: undefined
Info 34   [00:01:58.000] 		Projects: /dev/null/inferredProject1*
Info 34   [00:01:59.000] response:
    {
      "responseRequired": false
    }
After request
