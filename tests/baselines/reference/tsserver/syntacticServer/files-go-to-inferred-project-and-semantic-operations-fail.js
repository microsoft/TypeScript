Info 0    [16:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:32.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      }
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

Info 2    [16:00:33.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 3    [16:00:34.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [16:00:35.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: false Elapsed:: *ms
Info 5    [16:00:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 6    [16:00:37.000] 	Files (0) NoProgram

Info 7    [16:00:38.000] -----------------------------------------------
Info 8    [16:00:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [16:00:40.000] 	Files (0) NoProgram

Info 8    [16:00:41.000] -----------------------------------------------
Info 8    [16:00:42.000] Open files: 
Info 8    [16:00:43.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 8    [16:00:44.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 8    [16:00:45.000] response:
    {
      "responseRequired": false
    }
Info 9    [16:00:46.000] request:
    {
      "command": "completions",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 3,
        "offset": 47
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 10   [16:00:47.000] Request: completions not allowed in LanguageServiceMode.Syntactic
Info 11   [16:00:48.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 1,
        "offset": 10
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 12   [16:00:49.000] Request: definitionAndBoundSpan not allowed in LanguageServiceMode.Syntactic
Info 13   [16:00:50.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      }
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 14   [16:00:51.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 15   [16:00:52.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false Elapsed:: *ms
Info 16   [16:00:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 17   [16:00:54.000] 	Files (0) NoProgram

Info 18   [16:00:55.000] -----------------------------------------------
Info 19   [16:00:56.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 19   [16:00:57.000] 	Files (0) NoProgram

Info 19   [16:00:58.000] -----------------------------------------------
Info 19   [16:00:59.000] Open files: 
Info 19   [16:01:00.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 19   [16:01:01.000] 		Projects: /dev/null/inferredProject1*
Info 19   [16:01:02.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 19   [16:01:03.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 19   [16:01:04.000] response:
    {
      "responseRequired": false
    }
Info 20   [16:01:05.000] request:
    {
      "command": "completions",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 3,
        "offset": 47
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 21   [16:01:06.000] Request: completions not allowed in LanguageServiceMode.Syntactic
Info 22   [16:01:07.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 1,
        "offset": 10
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 23   [16:01:08.000] Request: definitionAndBoundSpan not allowed in LanguageServiceMode.Syntactic
Info 24   [16:01:09.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts",
        "line": 1,
        "offset": 13
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 25   [16:01:10.000] Request: definitionAndBoundSpan not allowed in LanguageServiceMode.Syntactic
Info 26   [16:01:11.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/c.ts"
      }
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 27   [16:01:12.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 28   [16:01:13.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false Elapsed:: *ms
Info 29   [16:01:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [16:01:15.000] 	Files (0) NoProgram

Info 31   [16:01:16.000] -----------------------------------------------
Info 32   [16:01:17.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [16:01:18.000] 	Files (0) NoProgram

Info 32   [16:01:19.000] -----------------------------------------------
Info 32   [16:01:20.000] Open files: 
Info 32   [16:01:21.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 32   [16:01:22.000] 		Projects: /dev/null/inferredProject1*
Info 32   [16:01:23.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 32   [16:01:24.000] 		Projects: /dev/null/inferredProject1*
Info 32   [16:01:25.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 32   [16:01:26.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 32   [16:01:27.000] response:
    {
      "responseRequired": false
    }
Info 33   [16:01:28.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/node_modules/something/index.d.ts"
      }
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 34   [16:01:29.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 35   [16:01:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: false Elapsed:: *ms
Info 36   [16:01:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 37   [16:01:32.000] 	Files (0) NoProgram

Info 38   [16:01:33.000] -----------------------------------------------
Info 39   [16:01:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 39   [16:01:35.000] 	Files (0) NoProgram

Info 39   [16:01:36.000] -----------------------------------------------
Info 39   [16:01:37.000] Open files: 
Info 39   [16:01:38.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 39   [16:01:39.000] 		Projects: /dev/null/inferredProject1*
Info 39   [16:01:40.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 39   [16:01:41.000] 		Projects: /dev/null/inferredProject1*
Info 39   [16:01:42.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 39   [16:01:43.000] 		Projects: /dev/null/inferredProject1*
Info 39   [16:01:44.000] 	FileName: /user/username/projects/myproject/node_modules/something/index.d.ts ProjectRootPath: undefined
Info 39   [16:01:45.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 39   [16:01:46.000] response:
    {
      "responseRequired": false
    }
Info 40   [16:01:47.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/c.ts"
      }
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 41   [16:01:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 41   [16:01:49.000] 	Files (0) NoProgram

Info 41   [16:01:50.000] -----------------------------------------------
Info 41   [16:01:51.000] Open files: 
Info 41   [16:01:52.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 41   [16:01:53.000] 		Projects: /dev/null/inferredProject1*
Info 41   [16:01:54.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 41   [16:01:55.000] 		Projects: /dev/null/inferredProject1*
Info 41   [16:01:56.000] 	FileName: /user/username/projects/myproject/node_modules/something/index.d.ts ProjectRootPath: undefined
Info 41   [16:01:57.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 41   [16:01:58.000] response:
    {
      "responseRequired": false
    }
Info 42   [16:01:59.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      }
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 43   [16:02:00.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 43   [16:02:01.000] 	Files (0) NoProgram

Info 43   [16:02:02.000] -----------------------------------------------
Info 43   [16:02:03.000] Open files: 
Info 43   [16:02:04.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 43   [16:02:05.000] 		Projects: /dev/null/inferredProject1*
Info 43   [16:02:06.000] 	FileName: /user/username/projects/myproject/node_modules/something/index.d.ts ProjectRootPath: undefined
Info 43   [16:02:07.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 43   [16:02:08.000] response:
    {
      "responseRequired": false
    }