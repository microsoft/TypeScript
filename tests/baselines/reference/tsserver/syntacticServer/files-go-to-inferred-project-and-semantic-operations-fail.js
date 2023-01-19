Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:33.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 3    [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: false Elapsed:: *ms
Info 4    [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 5    [00:00:36.000] 	Files (0) NoProgram

Info 6    [00:00:37.000] -----------------------------------------------
Info 7    [00:00:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 7    [00:00:39.000] 	Files (0) NoProgram

Info 7    [00:00:40.000] -----------------------------------------------
Info 7    [00:00:41.000] Open files: 
Info 7    [00:00:42.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 7    [00:00:43.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 7    [00:00:44.000] response:
    {
      "responseRequired": false
    }
Info 8    [00:00:45.000] request:
    {
      "command": "completions",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 3,
        "offset": 47
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 9    [00:00:46.000] Request: completions not allowed in LanguageServiceMode.Syntactic
Info 10   [00:00:47.000] request:
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
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 11   [00:00:48.000] Request: definitionAndBoundSpan not allowed in LanguageServiceMode.Syntactic
Info 12   [00:00:49.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 13   [00:00:50.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 14   [00:00:51.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false Elapsed:: *ms
Info 15   [00:00:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:53.000] 	Files (0) NoProgram

Info 17   [00:00:54.000] -----------------------------------------------
Info 18   [00:00:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 18   [00:00:56.000] 	Files (0) NoProgram

Info 18   [00:00:57.000] -----------------------------------------------
Info 18   [00:00:58.000] Open files: 
Info 18   [00:00:59.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 18   [00:01:00.000] 		Projects: /dev/null/inferredProject1*
Info 18   [00:01:01.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 18   [00:01:02.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 18   [00:01:03.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:01:04.000] request:
    {
      "command": "completions",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 3,
        "offset": 47
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 20   [00:01:05.000] Request: completions not allowed in LanguageServiceMode.Syntactic
Info 21   [00:01:06.000] request:
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
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 22   [00:01:07.000] Request: definitionAndBoundSpan not allowed in LanguageServiceMode.Syntactic
Info 23   [00:01:08.000] request:
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
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 24   [00:01:09.000] Request: definitionAndBoundSpan not allowed in LanguageServiceMode.Syntactic
Info 25   [00:01:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/c.ts"
      },
      "seq": 8,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 26   [00:01:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 27   [00:01:12.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false Elapsed:: *ms
Info 28   [00:01:13.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:01:14.000] 	Files (0) NoProgram

Info 30   [00:01:15.000] -----------------------------------------------
Info 31   [00:01:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:01:17.000] 	Files (0) NoProgram

Info 31   [00:01:18.000] -----------------------------------------------
Info 31   [00:01:19.000] Open files: 
Info 31   [00:01:20.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 31   [00:01:21.000] 		Projects: /dev/null/inferredProject1*
Info 31   [00:01:22.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 31   [00:01:23.000] 		Projects: /dev/null/inferredProject1*
Info 31   [00:01:24.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 31   [00:01:25.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 31   [00:01:26.000] response:
    {
      "responseRequired": false
    }
Info 32   [00:01:27.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/node_modules/something/index.d.ts"
      },
      "seq": 9,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 33   [00:01:28.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 34   [00:01:29.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: false Elapsed:: *ms
Info 35   [00:01:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 36   [00:01:31.000] 	Files (0) NoProgram

Info 37   [00:01:32.000] -----------------------------------------------
Info 38   [00:01:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 38   [00:01:34.000] 	Files (0) NoProgram

Info 38   [00:01:35.000] -----------------------------------------------
Info 38   [00:01:36.000] Open files: 
Info 38   [00:01:37.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 38   [00:01:38.000] 		Projects: /dev/null/inferredProject1*
Info 38   [00:01:39.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 38   [00:01:40.000] 		Projects: /dev/null/inferredProject1*
Info 38   [00:01:41.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 38   [00:01:42.000] 		Projects: /dev/null/inferredProject1*
Info 38   [00:01:43.000] 	FileName: /user/username/projects/myproject/node_modules/something/index.d.ts ProjectRootPath: undefined
Info 38   [00:01:44.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 38   [00:01:45.000] response:
    {
      "responseRequired": false
    }
Info 39   [00:01:46.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/c.ts"
      },
      "seq": 10,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 40   [00:01:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 40   [00:01:48.000] 	Files (0) NoProgram

Info 40   [00:01:49.000] -----------------------------------------------
Info 40   [00:01:50.000] Open files: 
Info 40   [00:01:51.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 40   [00:01:52.000] 		Projects: /dev/null/inferredProject1*
Info 40   [00:01:53.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 40   [00:01:54.000] 		Projects: /dev/null/inferredProject1*
Info 40   [00:01:55.000] 	FileName: /user/username/projects/myproject/node_modules/something/index.d.ts ProjectRootPath: undefined
Info 40   [00:01:56.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 40   [00:01:57.000] response:
    {
      "responseRequired": false
    }
Info 41   [00:01:58.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      },
      "seq": 11,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 42   [00:01:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 42   [00:02:00.000] 	Files (0) NoProgram

Info 42   [00:02:01.000] -----------------------------------------------
Info 42   [00:02:02.000] Open files: 
Info 42   [00:02:03.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 42   [00:02:04.000] 		Projects: /dev/null/inferredProject1*
Info 42   [00:02:05.000] 	FileName: /user/username/projects/myproject/node_modules/something/index.d.ts ProjectRootPath: undefined
Info 42   [00:02:06.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 42   [00:02:07.000] response:
    {
      "responseRequired": false
    }