Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:32.000] request:
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

Info 2    [00:00:33.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 3    [00:00:34.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:35.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 5    [00:00:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 6    [00:00:37.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/a.ts


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a.ts
	  Root file specified for compilation

Info 7    [00:00:38.000] -----------------------------------------------
Info 8    [00:00:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:40.000] 	Files (2)

Info 8    [00:00:41.000] -----------------------------------------------
Info 8    [00:00:42.000] Open files: 
Info 8    [00:00:43.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 8    [00:00:44.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 8    [00:00:45.000] response:
    {
      "responseRequired": false
    }
Info 9    [00:00:46.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      }
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 10   [00:00:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:48.000] 	Files (2)

Info 10   [00:00:49.000] -----------------------------------------------
Info 10   [00:00:50.000] Open files: 
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 10   [00:00:51.000] response:
    {
      "responseRequired": false
    }
Info 11   [00:00:52.000] request:
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

Info 12   [00:00:53.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 13   [00:00:54.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:00:56.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/c.ts


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/c.ts
	  Root file specified for compilation

Info 16   [00:00:57.000] -----------------------------------------------
Info 17   [00:00:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 17   [00:00:59.000] 	Files (2)

Info 17   [00:01:00.000] -----------------------------------------------
Info 17   [00:01:01.000] Open files: 
Info 17   [00:01:02.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 17   [00:01:03.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 17   [00:01:04.000] response:
    {
      "responseRequired": false
    }
Info 18   [00:01:05.000] request:
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

Info 19   [00:01:06.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:01:07.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:01:08.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 22   [00:01:09.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/c.ts
	/user/username/projects/myproject/b.ts


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/c.ts
	  Root file specified for compilation
	user/username/projects/myproject/b.ts
	  Root file specified for compilation

Info 23   [00:01:10.000] -----------------------------------------------
Info 24   [00:01:11.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 24   [00:01:12.000] 	Files (3)

Info 24   [00:01:13.000] -----------------------------------------------
Info 24   [00:01:14.000] Open files: 
Info 24   [00:01:15.000] 	FileName: /user/username/projects/myproject/c.ts ProjectRootPath: undefined
Info 24   [00:01:16.000] 		Projects: /dev/null/inferredProject1*
Info 24   [00:01:17.000] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info 24   [00:01:18.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 24   [00:01:19.000] response:
    {
      "responseRequired": false
    }