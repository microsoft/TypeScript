Info 0    [16:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:20.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/file.ts"}}
//// [/user/username/projects/myproject/file.ts]
const x = 10;
function foo() {
    // @ts-ignore
    let y: string = x;
    return y;
}
function bar() {
    // @ts-ignore
    let z : string = x;
    return z;
}
foo();
bar();

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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:21.000] Search path: /user/username/projects/myproject
Info 3    [16:00:22.000] For info: /user/username/projects/myproject/file.ts :: No config files found.
Info 4    [16:00:23.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 5    [16:00:24.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [16:00:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [16:00:26.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 8    [16:00:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [16:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 10   [16:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [16:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [16:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [16:00:32.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/file.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file.ts
	  Root file specified for compilation

Info 14   [16:00:33.000] -----------------------------------------------
Info 15   [16:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [16:00:35.000] 	Files (2)

Info 15   [16:00:36.000] -----------------------------------------------
Info 15   [16:00:37.000] Open files: 
Info 15   [16:00:38.000] 	FileName: /user/username/projects/myproject/file.ts ProjectRootPath: undefined
Info 15   [16:00:39.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 15   [16:00:40.000] response:{"responseRequired":false}
Info 16   [16:00:41.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/file.ts"]},"seq":1,"type":"request"}

PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::


PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 17   [16:00:42.000] response:{"responseRequired":false}
Info 18   [16:00:43.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
Info 19   [16:00:44.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
Info 20   [16:00:45.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
Info 21   [16:00:46.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Info 22   [16:00:47.000] request:{"command":"updateOpen","arguments":{"changedFiles":[{"fileName":"/user/username/projects/myproject/file.ts","textChanges":[{"newText":"             ","start":{"line":3,"offset":5},"end":{"line":3,"offset":18}}]}]},"seq":2,"type":"request"}

PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::


PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 23   [16:00:48.000] response:{"response":true,"responseRequired":true}
Info 24   [16:00:49.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/file.ts"]},"seq":3,"type":"request"}

PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::


PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 25   [16:00:50.000] response:{"responseRequired":false}
Info 26   [16:00:51.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 27   [16:00:52.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 28   [16:00:53.000] Different program with same set of files
Info 29   [16:00:54.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
Info 30   [16:00:55.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[{"start":{"line":4,"offset":9},"end":{"line":4,"offset":10},"text":"Type 'number' is not assignable to type 'string'.","code":2322,"category":"error"}]}}
Info 31   [16:00:56.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
Info 32   [16:00:57.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":3}}
Info 33   [16:00:58.000] request:{"command":"updateOpen","arguments":{"changedFiles":[{"fileName":"/user/username/projects/myproject/file.ts","textChanges":[{"newText":"// @ts-ignore","start":{"line":3,"offset":5},"end":{"line":3,"offset":18}}]}]},"seq":4,"type":"request"}

PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::


PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 34   [16:00:59.000] response:{"response":true,"responseRequired":true}
Info 35   [16:01:00.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/file.ts"]},"seq":5,"type":"request"}

PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::


PolledWatches::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 36   [16:01:01.000] response:{"responseRequired":false}
Info 37   [16:01:02.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 38   [16:01:03.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 39   [16:01:04.000] Different program with same set of files
Info 40   [16:01:05.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
Info 41   [16:01:06.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
Info 42   [16:01:07.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/file.ts","diagnostics":[]}}
Info 43   [16:01:08.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":5}}