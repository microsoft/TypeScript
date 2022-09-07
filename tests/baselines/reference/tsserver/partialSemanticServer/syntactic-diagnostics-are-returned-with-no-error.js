Info 0    [16:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:22.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/a.ts"}}
//// [/user/username/projects/myproject/a.ts]
if (a < (b + c) { }

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

Info 2    [16:00:23.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 3    [16:00:24.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [16:00:25.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 5    [16:00:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 6    [16:00:27.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/a.ts


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a.ts
	  Root file specified for compilation

Info 7    [16:00:28.000] -----------------------------------------------
Info 8    [16:00:29.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [16:00:30.000] 	Files (2)

Info 8    [16:00:31.000] -----------------------------------------------
Info 8    [16:00:32.000] Open files: 
Info 8    [16:00:33.000] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info 8    [16:00:34.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 8    [16:00:35.000] response:{"responseRequired":false}
Info 9    [16:00:36.000] request:{"type":"request","seq":1,"command":"syntacticDiagnosticsSync","arguments":{"file":"/user/username/projects/myproject/a.ts"}}

PolledWatches::

FsWatches::

FsWatchesRecursive::


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 10   [16:00:37.000] response:{"response":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":18},"text":"')' expected.","code":1005,"category":"error","relatedInformation":[{"span":{"start":{"line":1,"offset":4},"end":{"line":1,"offset":5},"file":"/user/username/projects/myproject/a.ts"},"message":"The parser expected to find a ')' to match the '(' token here.","category":"error","code":1007}]}],"responseRequired":true}
Info 11   [16:00:38.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/a.ts"]},"seq":2,"type":"request"}

PolledWatches::

FsWatches::

FsWatchesRecursive::


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 12   [16:00:39.000] response:{"responseRequired":false}
Info 13   [16:00:40.000] Session does not support events: ignored event: {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/a.ts","diagnostics":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":18},"text":"')' expected.","code":1005,"category":"error","relatedInformation":[{"span":{"start":{"line":1,"offset":4},"end":{"line":1,"offset":5},"file":"/user/username/projects/myproject/a.ts"},"message":"The parser expected to find a ')' to match the '(' token here.","category":"error","code":1007}]}]}}
Info 14   [16:00:41.000] Session does not support events: ignored event: {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}